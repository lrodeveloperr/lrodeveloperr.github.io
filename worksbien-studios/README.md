# WorksBien Studios website

Production website for `worksbienstudios.com`.

## Cloudflare Pages settings

- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist/client`
- Root directory: `worksbien-studios`

Cloudflare Pages automatically deploys the production site whenever a commit is pushed to `main`.

The build downloads each app icon from its authoritative production repository, so the website uses the exact current artwork rather than a recreated logo.
