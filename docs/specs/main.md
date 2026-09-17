# Ben Base Website

## Purpose

This repository is the base template for content-focused websites. It provides
a small production foundation using Astro, React, TypeScript, Tailwind CSS, and
shadcn/ui.

## Engineering Requirements

- Use Astro for page composition and React only for interactive UI islands.
- Use TypeScript for application and build configuration code.
- Keep business rules independent of Astro, React, and infrastructure details.
- Keep type checking, linting, formatting, and production builds passing.
- Provide reproducible local tooling through mise.
- Support source-mapped browser debugging from VS Code.

## Module Extension Points

The template renders a stable placeholder for each optional ben-base module.
An installed module supplies `src/module-examples/[module].astro`; when the file
is absent, the homepage displays `Not installed` without importing optional
module code.

Optional modules may add Astro configuration and development process hooks in
`.ben-base/modules/[module]/`. The template discovers those files by convention,
so module recipes do not patch or overwrite template-owned source files.

## Supporting Specifications

- [Developer tooling](./developer-tooling.md)
