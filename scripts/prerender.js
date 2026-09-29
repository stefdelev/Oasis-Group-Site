// Injects the server-rendered App into dist/index.html so crawlers and
// agents get real content without executing JavaScript.
import { readFile, writeFile, rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const dist = fileURLToPath(new URL('../dist/', import.meta.url))
const server = fileURLToPath(new URL('../dist-server/', import.meta.url))

const { render } = await import(`${server}entry-server.js`)
const template = await readFile(`${dist}index.html`, 'utf8')

const placeholder = '<!--app-html-->'
if (!template.includes(placeholder)) {
  throw new Error(`prerender: ${placeholder} not found in dist/index.html`)
}

await writeFile(`${dist}index.html`, template.replace(placeholder, render()))
await rm(server, { recursive: true, force: true })
console.log('prerender: wrote dist/index.html')
