# Soner Erdevir Portfolio

React + Vite portfolio with a built-in content editor and a CV that is generated from the same data.

- Live: https://serdevir91.github.io/soner-portfolio/
- CV preview: `#/cv` · Content editor: `#/admin`

## Development

```bash
npm install
npm run dev      # local dev server
npm run lint
npm run build    # output in dist/
npm run preview
```

## One data file

Everything on the site and in the CV comes from [`src/data/portfolio.json`](src/data/portfolio.json): profile, highlights, experience, projects, education, skills, languages, references, apps and CV settings. Text fields hold both languages as `{ "en": "...", "tr": "..." }`. Dates are `YYYY` or `YYYY-MM`; an empty `end` means "Present / Günümüz". Items with `"showOnCv": false` appear on the site but not in the CV.

## CV generation

The **Download CV** menu builds the PDF in the browser with `@react-pdf/renderer` (Turkish or English, A4, same layout as the original CV). The PDF library loads only when someone asks for a CV. `#/cv` shows the same CV as a web page. Change the data and both the site and the CV change with it. CV options (file name, include projects, include references) are in the editor under **CV settings**.

## Content editor (`#/admin`)

Open **Edit content** in the footer.

1. Edit any section. Turkish and English fields sit side by side.
2. Use **Site preview** and **CV preview** to check the result. **Download CV** in the sidebar builds the PDF from the draft.
3. The draft is saved in this browser automatically. **Export JSON** / **Import JSON** move it between browsers.
4. **Publish** commits `src/data/portfolio.json` (and a new profile photo, if changed) to `master` through the GitHub API. GitHub Pages and Vercel then rebuild the site in about a minute.

Publishing needs a GitHub fine-grained personal access token with access to this repository only and **Contents: Read and write** permission. The token is entered in the browser, kept in session storage (or local storage if "remember" is ticked) and sent only to `api.github.com`. Visitors without a token can use the editor, but cannot publish.

## Deployment

### GitHub Pages

[`.github/workflows/pages.yml`](.github/workflows/pages.yml) builds and deploys on every push to `master`. Repository setting: **Settings → Pages → Source: GitHub Actions**.

### Vercel

[`vercel.json`](vercel.json) is ready. Import the repository at https://vercel.com/new; no settings need to change. On Vercel the site is served from `/` (the build reads the `VERCEL` environment variable); on GitHub Pages it is served from `/soner-portfolio/`. Set `BASE_PATH` to override. Every push to `master`, including editor publishes, redeploys both.

Vercel's free Hobby plan is for personal, non-commercial use, which fits a personal portfolio.
