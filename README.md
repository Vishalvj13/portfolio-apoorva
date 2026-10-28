# Apoorva Lambat — React portfolio

A responsive React + Vite portfolio with a circular portrait, matching AL favicon, light/dark themes, accessible tabs, project filtering, native dialogs, and expandable experience details.

## Run locally

```sh
npm install
npm run dev
```

Vite prints the local preview URL. To build and preview production output:

```sh
npm run build
npm run preview
```

## Structure

- `src/App.jsx`: page composition and shared state.
- `src/components/`: section components, navigation, and dialogs.
- `src/hooks.js`: saved theme and typewriter behavior.
- `src/data.js`: navigation labels and project detail content.
- `src/styles.css`: responsive layout and themes.
- `public/assets/apoorva-portrait.jpg`: supplied portrait.
- `public/favicon.svg`: AL badge favicon.
- `index.html`: Vite entry page and metadata.
- `dist/`: generated production output; do not edit by hand.

## Checks

```sh
npm test
npm run build
```

DOM tests cover the section links, content, tabs and keyboard interaction, project filtering, dialogs, theme persistence, mobile-menu state, and placeholder highlighting. They do not replace a visual or real-browser accessibility review.

## Deploy

Use `npm run build` and publish `dist/`. `vercel.json` configures Vite and the output directory for GitHub imports. Sites configuration is retained in `.openai/hosting.json` for the existing private Site.

## Content still to add

Dashed boxes identify missing information. Add an approved resume, exact employment roles and dates, contributions and supported results, full degree details, project methodology and original imagery, verified tools/publications/certifications, interests, and preferred public contact details. Resume controls intentionally show a placeholder notice until a PDF is supplied.

## Sources

- https://www.linkedin.com/in/apoorva-lambat-871611204/
- https://sites.google.com/view/anerglab/members/past-members
- https://www.coeptech.ac.in/wp-content/uploads/2024/09/Annual-Report-2019-20-final-draft-1.pdf

Exact role titles and dates were not publicly accessible. Public records support the academic connections, while exact qualifications remain marked for confirmation. Project topics are public; detailed methods/results are not invented. Project illustrations are decorative, not research findings. No private third-party contact details have been copied.
