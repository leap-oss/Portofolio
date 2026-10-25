#!/usr/bin/env bash
set -eu

project_dir="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
asset_dir="$project_dir/static/images/logos"
mkdir -p "$asset_dir"
failed=0

download() {
  local name="$1" url="$2" expected="$3" temp_file signature
  if [ -s "$asset_dir/$name" ]; then
    printf 'Already local: %s\n' "$name"
    return
  fi
  temp_file="$(mktemp /tmp/portfolio-logo.XXXXXX)"
  if ! curl --fail --location --proto '=https' --connect-timeout 10 --max-time 40 --retry 1 --retry-delay 1 --silent --show-error "$url" --output "$temp_file"; then
    rm -f "$temp_file"
    printf 'Could not download: %s\n' "$name" >&2
    failed=1
    return
  fi
  signature="$(od -An -tx1 -N8 "$temp_file" | tr -d ' \n')"
  case "$expected:$signature" in
    png:89504e470d0a1a0a|gif:474946383761*|gif:474946383961*) ;;
    svg:*) if ! head -c 4096 "$temp_file" | grep -q '<svg'; then
      rm -f "$temp_file"; printf 'Invalid SVG: %s\n' "$name" >&2; failed=1; return
    fi ;;
    *) rm -f "$temp_file"; printf 'Invalid image: %s\n' "$name" >&2; failed=1; return ;;
  esac
  mv "$temp_file" "$asset_dir/$name"
  printf 'Saved locally: %s (%s bytes)\n' "$name" "$(wc -c < "$asset_dir/$name" | tr -d ' ')"
}

download maskui.gif 'https://raw.githubusercontent.com/leap-oss/MaskUI/refs/heads/paper/icon.gif' gif
download dealmile.svg 'https://raw.githubusercontent.com/leap-oss/DealMile/9869d7230fdcad43a597a6241bd4ff2fcc695004/app/icon.svg' svg
download metrokita.png 'https://www.metrokota.go.id/images/logo/logo_metrokita.png' png
download bapokting.png 'https://www.metrokota.go.id/images/app/1766060302_bapoktingx.png' png
exit "$failed"
