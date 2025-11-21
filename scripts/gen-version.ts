import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { cwd } from 'node:process'
import packageJson from '../package.json' with { type: 'json' }

writeFileSync(
  resolve(cwd(), 'src', 'version.ts'),
  `export const NAIVE_VERSION = '${packageJson.naiveVersion}'\nexport const ITHINKDT_VERSION = '${packageJson.version}'\nexport default ITHINKDT_VERSION\n`
)
