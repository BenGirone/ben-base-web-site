import { readdir } from "node:fs/promises"
import { join, resolve } from "node:path"
import { pathToFileURL } from "node:url"
import { spawn } from "node:child_process"

const projectDirectory = resolve(import.meta.dirname, "..")
const moduleDirectory = join(projectDirectory, ".ben-base", "modules")

async function loadHooks() {
  let entries = []
  try {
    entries = await readdir(moduleDirectory, { withFileTypes: true })
  } catch (error) {
    if (error?.code !== "ENOENT") throw error
  }

  const hooks = []
  for (const entry of entries
    .filter((item) => item.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name))) {
    const url = pathToFileURL(join(moduleDirectory, entry.name, "dev.mjs"))
    try {
      hooks.push((await import(url.href)).default)
    } catch (error) {
      if (error?.code !== "ERR_MODULE_NOT_FOUND") throw error
    }
  }
  return hooks
}

function start(processDefinition) {
  return spawn(processDefinition.command, processDefinition.arguments, {
    env: process.env,
    shell: process.platform === "win32",
    stdio: "inherit",
  })
}

const hooks = await loadHooks()
for (const hook of hooks) {
  for (const step of hook.before ?? []) {
    const child = start(step)
    const exitCode = await new Promise((resolve, reject) => {
      child.once("error", reject)
      child.once("exit", (code) => resolve(code ?? 1))
    })
    if (exitCode !== 0)
      throw new Error(`${step.name} failed with exit code ${exitCode}.`)
  }
}

const processes = hooks.flatMap((hook) => hook.processes ?? [])
processes.push({ arguments: ["astro", "dev"], command: "pnpm", name: "Astro" })
const children = processes.map(start)
let stopping = false

function stop(signal = "SIGTERM") {
  if (stopping) return
  stopping = true
  for (const child of children) child.kill(signal)
}

process.once("SIGINT", () => stop("SIGINT"))
process.once("SIGTERM", () => stop("SIGTERM"))

const result = await Promise.race(
  children.map(
    (child) =>
      new Promise((resolve, reject) => {
        child.once("error", reject)
        child.once("exit", (code, signal) =>
          resolve({ code: code ?? 1, signal })
        )
      })
  )
)
stop()
process.exitCode = result.signal ? 1 : result.code
