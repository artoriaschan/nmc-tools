#!/usr/bin/env node

const path = require('path')
const minimist = require('minimist')
const builder = require('electron-builder')
const builderConfig = require('./builder-config')

const Platforms = ['MAC', 'LINUX', 'WINDOWS']
const Arch = ['ia32', 'x64', 'armv7l', 'arm64', 'universal']

const argv = minimist(process.argv.slice(2))
const platform = argv.p || argv.platform || 'WINDOWS'
const arch = argv.a || argv.arch || 'x64'
async function run() {
  const platforms = platform
    .split(',')
    .map(p => p.toUpperCase())
    .filter(p => Platforms.includes(p))
    .map(p => builder.Platform[p])

  if (platforms.length === 0) {
    console.error('invalid platform: ' + platform)
    process.exit(1)
  }

  const targets = builder.createTargets(platforms)

  await builder.build({
    config: builderConfig,
    targets
  })
}

run()
