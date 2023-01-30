import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'

export default function getVersion() {
  const packagePath = fileURLToPath(new URL('../../package.json', import.meta.url))
  const packageData = readFileSync(packagePath, {encoding: 'utf-8'})
  return JSON.parse(packageData).version
}