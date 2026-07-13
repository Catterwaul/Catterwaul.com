# Catterwaul.com

Static site served via GitHub Pages, deployed from the `main` branch root.

## Domain

`CNAME` holds the custom domain (`catterwaul.com`) that GitHub Pages reads to serve this repo there instead of the default `catterwaul.github.io` URL. Don't delete it without knowing why.

DNS, set at the registrar for `catterwaul.com`:

- Apex (`catterwaul.com`) — 4 A records to GitHub Pages:
  `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- `www` — CNAME to `catterwaul.github.io`

Once DNS resolves to those, GitHub auto-provisions HTTPS; enable "Enforce HTTPS" in repo Settings → Pages after that finishes.
