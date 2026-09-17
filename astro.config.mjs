// @ts-check

import { readdir } from "node:fs/promises"
import { join } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import react from "@astrojs/react"

const moduleDirectory = new URL("./.ben-base/modules/", import.meta.url)

async function loadModuleConfig() {
  /** @type {import("node:fs").Dirent[]} */
  let entries = []
  try {
    entries = await readdir(moduleDirectory, { withFileTypes: true })
  } catch (error) {
    if (!isErrorWithCode(error, "ENOENT")) throw error
  }

  const config = {}
  for (const entry of entries
    .filter((item) => item.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name))) {
    const url = pathToFileURL(
      join(fileURLToPath(moduleDirectory), entry.name, "astro.config.mjs")
    )
    try {
      Object.assign(config, (await import(url.href)).default)
    } catch (error) {
      if (!isErrorWithCode(error, "ERR_MODULE_NOT_FOUND")) throw error
    }
  }
  return config
}

/** @param {unknown} error @param {string} code */
function isErrorWithCode(error, code) {
  return error instanceof Error && "code" in error && error.code === code
}

const moduleConfig = await loadModuleConfig()

// https://astro.build/config
export default defineConfig({
  ...moduleConfig,
  vite: {
    plugins: [tailwindcss()],
    server: {
      strictPort: true,
    },
  },
  integrations: [react()],
})
