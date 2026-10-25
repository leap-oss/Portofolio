(() => {
  'use strict';

  const root = document.documentElement;
  root.classList.add('js');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const motionButton = document.querySelector('.motion-toggle');
  const activeAnimations = new Set();
  const pointerResets = [];
  let revealObserver = null;
  let revealTargets = [];
  let motionChoice = null;
  try { motionChoice = localStorage.getItem('portfolio-motion'); } catch { /* Storage is optional. */ }

  const cancelAnimations = () => {
    activeAnimations.forEach(animation => animation.cancel());
    activeAnimations.clear();
  };

  const setMotion = () => {
    const paused = reducedMotion.matches || motionChoice === 'paused';
    root.dataset.motion = paused ? 'paused' : 'playing';
    document.querySelectorAll('[data-motion-image]').forEach(image => {
      const source = paused ? image.dataset.staticSrc : image.dataset.animatedSrc;
      if (image.getAttribute('src') !== source) image.setAttribute('src', source);
    });
    if (paused) {
      cancelAnimations();
      pointerResets.forEach(reset => reset());
      revealTargets.forEach(element => element.classList.add('is-revealed'));
      if (revealObserver) revealObserver.disconnect();
    }
    if (motionButton) {
      motionButton.hidden = reducedMotion.matches;
      motionButton.setAttribute('aria-pressed', String(paused));
      motionButton.querySelector('span').textContent = paused ? 'Resume motion' : 'Pause motion';
    }
  };

  setMotion();
  reducedMotion.addEventListener('change', setMotion);
  if (motionButton) motionButton.addEventListener('click', () => {
    motionChoice = root.dataset.motion === 'paused' ? 'playing' : 'paused';
    try { localStorage.setItem('portfolio-motion', motionChoice); } catch { /* Storage is optional. */ }
    setMotion();
  });

  document.querySelectorAll('[data-project-logo]').forEach(image => {
    image.addEventListener('error', () => image.classList.add('is-unavailable'));
    image.addEventListener('load', () => image.classList.remove('is-unavailable'));
  });

  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#mobile-nav');
  const closeMenu = () => {
    if (!menuButton || !menu) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
    menu.inert = window.matchMedia('(max-width: 760px)').matches;
  };

  if (menuButton && menu) {
    closeMenu();
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('is-open', open);
      menu.inert = !open;
    });
    menu.addEventListener('click', event => {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menuButton.focus();
      }
    });
    window.matchMedia('(max-width: 760px)').addEventListener('change', closeMenu);
  }

  const filters = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('[data-project-grid] [data-category]')];
  const filterStatus = document.querySelector('[data-filter-status]');
  const validFilters = new Set(filters.map(button => button.dataset.filter));

  const applyFilter = (value, updateURL = false) => {
    if (!validFilters.has(value)) value = 'all';
    cancelAnimations();
    let visible = 0;
    cards.forEach(card => {
      const match = value === 'all' || card.dataset.category.split(' ').includes(value);
      card.hidden = !match;
      if (match) {
        if (updateURL) card.classList.add('is-revealed');
        if (updateURL && root.dataset.motion === 'playing' && typeof card.animate === 'function') {
          const animation = card.animate(
            [{ opacity: 0, transform: 'translateY(25px)' }, { opacity: 1, transform: 'none' }],
            { duration: 500, delay: visible * 70, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' }
          );
          activeAnimations.add(animation);
          animation.onfinish = animation.oncancel = () => activeAnimations.delete(animation);
        }
        visible++;
      }
    });
    filters.forEach(button => {
      const selected = button.dataset.filter === value;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    if (filterStatus) filterStatus.textContent = `${visible} ${visible === 1 ? 'project' : 'projects'} shown.`;
    if (updateURL) {
      const url = new URL(window.location.href);
      if (value === 'all') url.searchParams.delete('filter');
      else url.searchParams.set('filter', value);
      window.history.replaceState(null, '', url);
    }
  };

  if (filters.length) {
    applyFilter(new URLSearchParams(window.location.search).get('filter') || 'all');
    filters.forEach(button => button.addEventListener('click', () => applyFilter(button.dataset.filter, true)));
    window.addEventListener('popstate', () => applyFilter(new URLSearchParams(window.location.search).get('filter') || 'all'));
  }

  // Reveal once on entry; no permanent frame loop or scroll-position polling.
  if ('IntersectionObserver' in window && root.dataset.motion === 'playing') {
    revealTargets = [...document.querySelectorAll('.section-heading, .project-card, .about-side, .about-main, .experience-row, .oss-section > div, .contact-band > .section-label, .contact-band > h2, .contact-band-bottom, .page-intro, .case-header, .case-cover, .case-workflow, .case-body, .case-next')];
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -25px 0px', threshold: 0.06 });
    revealTargets.forEach(element => {
      const siblings = [...element.parentElement.children];
      const index = siblings.indexOf(element);
      element.style.setProperty('--reveal-delay', `${element.classList.contains('project-card') ? (index % 2) * 110 : 0}ms`);
      element.classList.add('motion-reveal');
      revealObserver.observe(element);
    });
    root.classList.add('motion-ready');
  }

  // Pointer movement is 2D and only schedules frames while the pointer moves.
  const bindPointer = (element, properties) => {
    let frame = 0;
    let bounds = null;
    let x = 0;
    let y = 0;
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      bounds = null;
      properties.forEach(([name]) => element.style.setProperty(name, '0px'));
    };
    pointerResets.push(reset);
    element.addEventListener('pointerenter', () => {
      if (finePointer.matches) bounds = element.getBoundingClientRect();
    });
    element.addEventListener('pointermove', event => {
      if (!bounds || !finePointer.matches || root.dataset.motion !== 'playing') return;
      x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
      y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
      if (!frame) frame = requestAnimationFrame(() => {
        frame = 0;
        if (root.dataset.motion !== 'playing') return;
        properties.forEach(([name, axis, amount]) => element.style.setProperty(name, `${((axis === 'x' ? x : y) * amount).toFixed(2)}px`));
      });
    });
    element.addEventListener('pointerleave', reset);
    element.addEventListener('pointercancel', reset);
  };
  document.querySelectorAll('.project-art').forEach(element => bindPointer(element, [
    ['--logo-x', 'x', 12], ['--logo-y', 'y', 10], ['--grid-x', 'x', -8], ['--grid-y', 'y', -8]
  ]));
  document.querySelectorAll('.button').forEach(element => bindPointer(element, [
    ['--button-x', 'x', 5], ['--button-y', 'y', 4]
  ]));

  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.prepend(progress);
  const hero = document.querySelector('.hero');
  let scrollFrame = 0;
  const updateScroll = () => {
    scrollFrame = 0;
    const maximum = root.scrollHeight - window.innerHeight;
    const ratio = maximum > 0 ? Math.min(1, Math.max(0, window.scrollY / maximum)) : 0;
    progress.style.transform = `scaleX(${ratio})`;
    if (hero && window.scrollY < window.innerHeight * 1.5) {
      hero.style.setProperty('--hero-shift', root.dataset.motion === 'playing' ? `${Math.min(window.scrollY * 0.09, 55)}px` : '0px');
    }
  };
  const scheduleScroll = () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
  };
  window.addEventListener('scroll', scheduleScroll, { passive: true });
  window.addEventListener('resize', () => {
    pointerResets.forEach(reset => reset());
    scheduleScroll();
  });
  updateScroll();
})();
