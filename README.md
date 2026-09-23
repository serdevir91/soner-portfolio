# Soner Erdevir Portfolio

React + Vite portfolio published with GitHub Pages.

## Development

```bash
npm install
npm run build
npm run preview
```

## Content workflow

The footer opens the content editor. It can edit the profile, projects, experience, skills, education and app listings. **Save** keeps a local draft in that browser; **Download JSON** exports `portfolio-data.json`. Replace [`public/portfolio-data.json`](public/portfolio-data.json) with that file, commit it, and deploy through the repository's authorized GitHub account. Visitors cannot publish to the live site from the browser.

The editor intentionally has no password form. GitHub Pages is static and cannot verify credentials or protect a shared admin session. The former client-side password and token code has been removed. Repository permissions control publishing. Existing `portfolio_data` browser drafts remain readable for migration.

## Contact

The contact form checks required fields and opens a composed `mailto:` message in the visitor's email app. This does not send mail automatically. Direct mail links are available alongside the form. Server-side delivery would need a configured mail service or backend.

## Deployment

```bash
npm run deploy
```
