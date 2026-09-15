# Astro + React + TypeScript + shadcn/ui

This is a template for a new Astro project with React, TypeScript, and shadcn/ui.

## Tooling

See `.mise.toml`.

## Debugging in VS Code

Open the Run and Debug panel and select `Web: Launch Chrome` or
`Web: Launch Firefox`. VS Code starts the Astro development server, opens the
selected browser, and attaches a JavaScript debugger with source maps enabled.
Firefox debugging requires the workspace-recommended `Debugger for Firefox`
extension.

To attach to an existing Chrome session, start Chrome with remote debugging on
port `9222`, run `pnpm dev`, and select `Web: Attach to Chrome`.

To attach to Firefox, enable remote debugging in Firefox, start it with
`firefox -start-debugger-server`, run `pnpm dev`, and select
`Web: Attach to Firefox`. Firefox uses debugger port `6000` by default.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `src/components` directory.

## Using components

To use the components in your app, import them in an `.astro` file:

```astro
---
import { Button } from "@/components/ui/button"
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Astro App</title>
  </head>
  <body>
    <div class="grid h-screen place-items-center content-center">
      <Button>Button</Button>
    </div>
  </body>
</html>
```
