# Ahmad Muzaki — Portfolio

Hugo + Tailwind CSS v4. A dark, lime-accented portfolio inspired by the typography and visual energy of [Swash](https://swashmotion.com/), with project logos, original 2D illustrations, and CSS/vanilla JavaScript motion.

## Run locally

Requires **Hugo 0.166.0 or newer** and **Node.js 22+** for Tailwind.

Run from this portfolio repository's root. In the current Codespace, enter it with `cd /workspaces/codespaces-blank/web` first.

```bash
npm install
npm run dev
```

Open `http://localhost:1313`. In Codespaces, forward port **1313** through the Ports panel.

If npm/network access is unavailable, the project includes an authored CSS fallback for the small set of utilities it uses. The same visual system works directly with Hugo:

```bash
hugo server --bind 0.0.0.0 --port 1313 --disableFastRender
```

The fallback is **not a compiled Tailwind distribution**. Once `node_modules/@tailwindcss/cli` exists, Hugo automatically uses its native `css.TailwindCSS` integration, scanning Hugo's build statistics and producing the Tailwind stylesheet. Both paths include `assets/css/site.css`. Install dependencies before production deployment to use Tailwind. Commit the lockfile produced by the first successful installation.

## Edit content

| What | File |
| --- | --- |
| Name, location, GitHub, organization, LinkedIn, optional email | `hugo.toml` |
| Homepage copy and layout | `layouts/home.html` |
| Project summaries, categories, stack, links, details | `content/projects/*.md` |
| Project detail actions, workflows, table of contents, next project | `layouts/projects/single.html` |
| About, education, skills | `content/about/index.md` |
| Work history summary | `data/journey.toml` |
| Work experience logos | `static/images/experience/` |
| Experience detail | `content/experience/index.md` |
| Contact copy | `content/contact/index.md` |
| Colors, spacing, typography, responsive behavior | `assets/css/site.css` |
| Tailwind imports and theme | `assets/css/main.css` |
| Original project cover artwork | `static/images/*.svg` |
| Downloaded project logos | `static/images/logos/` |
| Shared logo/illustration rendering | `layouts/_partials/project-visual.html` |

Content is adapted from `../portfolio-content-master.md` and the user's updates. Project details also use the current DealMile, MaskUI (`paper` branch), and EtherealDumpster repository READMEs. Fusion Enchanting details were checked against `../minecraft/plugin/README.md`, `../minecraft/plugin/src/main/java/org/leap/enchantmentfusion/model/FusionCatalog.java`, and `../minecraft/plugin/docs/VALIDATION.md`. English is used for this first version. The supplied LinkedIn profile and email are included. Contact calls to action use `mailto:` with the exact address in `hugo.toml`; the contact page lists email first. Unverified achievement counts are omitted.

Add projects as Markdown files in `content/projects/`:

```yaml
---
title: "Project name"
weight: 7
kind: "Fullstack web application"
label: "In development"
period: "2026"
role: "Developer"
filters: ["web", "development"]
stack: ["TypeScript", "PostgreSQL"]
repo: "https://github.com/your-account/project"
demo: "https://your-demo.example/" # optional; renders a prominent Live demo button
art: "dealmile" # existing SVG basename, or add a new illustration
cover_alt: "Describe the project cover"
summary: "A short, specific description of the project."
---
```

Filters accept `web`, `open-source`, `internship`, and `development`. The first four projects ordered by `weight` appear on the homepage; the full collection keeps all six. Filter links support `?filter=open-source` and work with keyboard controls. With JavaScript disabled, all projects and mobile navigation remain available.

Each detail page has prominent project links, a four-step workflow or contribution overview, a table of contents generated from Markdown headings, and navigation to the next project. `workflow_title`, optional `workflow_label`, and the `workflow` list in front matter control the overview; each workflow entry has `title` and `description`. `demo` is a live application link, `repo` is source code, and `website`/`website_label` cover other public pages or distribution listings.

The supplied Yummy Choice and Diskominfotik logos are stored in `static/images/experience/` and referenced by `logo`/`logo_alt` in `data/journey.toml`. Both the homepage and Experience page use the same work-history partial. These source files were copied from the supplied images in `public/`, so they survive rebuilding the generated output.

## Project logos

MaskUI's original GIF and DealMile's original SVG are stored locally. To download the remaining Metro Kita and Bapokting PNGs (or restore missing logos), run this from a terminal with network access:

```bash
bash scripts/download-project-assets.sh
```

The script skips existing files, validates image signatures, and never replaces a logo with a failed download or HTML error page. Restart the Hugo dev server after downloading a previously missing logo. Templates prefer local assets; when a logo is missing, they use the exact remote URL supplied in the project's front matter. Metro Kita and Bapokting currently use this remote fallback because the sandbox could not resolve their host.

Local hosting removes the third-party request dependency; it does not reduce the original file's byte size by itself. MaskUI's GIF is approximately 107 KB and is lazy-loaded. Hugo also creates a static PNG for reduced motion and the pause control. ED uses a small original SVG pixel landscape with large white ED lettering.

## Motion

- Staggered, masked hero text entrance and hover treatment.
- Once-per-section scroll reveals and staggered project cards.
- Two-dimensional logo/grid pointer response and magnetic buttons on fine pointers.
- Animated filter changes, mobile menu entrance, logo float, and button highlights.
- A scroll progress line, subtle hero parallax, and the existing marquee.

There is no animation framework or permanent JavaScript render loop. Pointer and scroll work use animation frames only after events. The footer pause control stops CSS motion, cancels filter animations, reveals pending content, and swaps the GIF to a static frame. Reduced motion preferences are respected automatically. Without JavaScript, content and navigation remain visible.

## Build

```bash
npm run check
npm run build
# For a real deployment, set the site's actual URL:
hugo --gc --minify --panicOnWarning --baseURL https://your-domain.example/
```

Output is static HTML, fingerprinted CSS/JS, and SVG files in `public/`. No Go server, Node runtime, frontend framework, WebGL, video, remote font, or animation library is required in visitors' browsers. Motion respects `prefers-reduced-motion` and can be paused using the footer control.

## Independent GitHub repository

This folder is a standalone Git repository with branch `main`. Its GitHub repository has not been created or connected yet. The Minecraft project is managed separately; it is not part of this repository.

Create an empty GitHub repository for the portfolio, without initializing it with a README, license, or `.gitignore`. Then run from this folder, replacing `REPOSITORY_NAME` with the name you chose:

```bash
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/SkulZOnTheYT/REPOSITORY_NAME.git
git push -u origin main
```

The GitHub repository root should contain `hugo.toml`, `netlify.toml`, `package.json`, `package-lock.json`, `layouts/`, `content/`, and `static/` directly. Generated `public/`, `resources/`, and installed `node_modules/` are ignored and rebuilt.

## Deploy to Netlify

Import the independent portfolio repository in Netlify and use:

| Setting | Value |
| --- | --- |
| Base directory | Leave empty (repository root) |
| Build command | `npm run build` |
| Publish directory | `public` |

Netlify reads `netlify.toml` directly from the repository root. It pins Hugo 0.166.0 and Node 24, includes the Tailwind build dependencies, and sets the public base URL from Netlify's production/preview/branch deployment environment. Fingerprinted CSS and JavaScript receive immutable cache headers. A generated `404.html` handles missing routes without a single-page-app redirect.

There are no runtime secrets, server process, or database required for the portfolio. This project has not been deployed from this session. After the first deploy, check the site on desktop/mobile, contact links, and external demo links. The public email is stored exactly as supplied (`ahmad.muzaki.dev@gail.com`), and the Metro Kita/Bapokting logos use their remote URLs until downloaded locally.

## Content notes

- DealMile's payments are explicitly PayPal Sandbox. The user-supplied demo is linked at `https://dealmile.skulz.cloud/`; Bapokting is linked at `https://bapokting.metrokota.go.id/`. The links are included as supplied; browser availability has not been confirmed by this environment.
- Government work is described as internship contributions. No internal/admin screenshots are included.
- EtherealDumpster is marked in development with its release-candidate state described from the current repository README. The detailed page covers the implemented shared SQLite pool, item recovery, and milestones, with real-server acceptance checks still noted. Concept-only projects are not presented as shipped.
- Fusion Enchanting has an implemented local 1.1.0 build with 36 recipes. Its public repository is linked, without claiming a published GitHub release. The old 1.0 poster is not used as it depicts an earlier gameplay flow; the portfolio uses an original SVG cover.
- GitHub repository and Modrinth links come from the supplied content; their current visibility/releases still need a manual check because they could not be fetched in this environment.
- MaskUI, DealMile, Metro Kita, and Bapokting use supplied project logos. ED and Fusion Enchanting use original SVG illustrations. The covers are not product screenshots.
