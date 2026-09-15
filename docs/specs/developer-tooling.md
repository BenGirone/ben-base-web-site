# Developer Tooling

## Runtime

The project uses Node.js 24 and the latest pnpm release managed through mise.

## Validation

- Astro Check and TypeScript 6 validate Astro, JavaScript, and TypeScript code.
- Oxlint enforces JavaScript, TypeScript, React, and React Hooks correctness.
- Oxfmt formats supported source files and sorts Tailwind CSS classes.
- The production build runs Astro Check before creating the site.

## Browser Debugging

VS Code provides launch and attach configurations for Chrome and Firefox.
Launch configurations start Astro on port 4321. Chrome attachment uses port 9222. Firefox attachment uses port 6000 and requires the workspace-recommended
Firefox debugger extension.

## Branding

The template uses `public/ben-base.svg` as its favicon. The asset is a centered
green `B` on a rounded black tile.
