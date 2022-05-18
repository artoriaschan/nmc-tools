#!/usr/bin/env node

const { spawn } = require('child_process')
const path = require('path')
const chalk = require('chalk')
const { createServer } = require('vite')

const electron = require('electron')
const TscWatchClient = require('tsc-watch/client')

let electronProcess = null
let manualRestart = false

function log(type, data, color) {
  let log = ''
  data = data.toString().split(/\r?\n/)
  data.forEach(line => {
    log += `  ${line}\n`
  })
  if (/[0-9A-z]+/.test(log)) {
    console.log(
      chalk[color].bold(`┏ ${type} ${new Array(28 - type.length).join('-')}`) +
        '\n\n' +
        log +
        chalk[color].bold(`┗ ${new Array(28 + 1).join('-')}`) +
        '\n'
    )
  }
}

function startRenderer() {
  return new Promise((resolve, reject) => {
    createServer({
      configFile: path.join(__dirname, '../vite.config.ts')
    })
      .then(server => {
        return server.listen(3000)
      })
      .then(server => {
        console.log()
        server.printUrls()
        console.log()
        resolve()
      })
  })
}

function startMain() {
  return new Promise((resolve, reject) => {
    const watch = new TscWatchClient()

    watch.on('started', () => {
      log('Main', 'Main Compilation Started!\n', 'green')
    })

    watch.on('first_success', () => {
      log('Main', 'Main Compile Success!\n', 'green')
      resolve()
    })

    watch.on('success', () => {
      log('Main', 'Main Recompile Success!\n', 'green')

      if (electronProcess && electronProcess.kill) {
        manualRestart = true
        process.kill(electronProcess.pid)
        electronProcess = null
        startElectron()

        setTimeout(() => {
          manualRestart = false
        }, 5000)
      }
    })

    watch.on('compile_errors', error => {
      log('Main', error, 'red')
      reject(error)
    })

    watch.start('--project', 'tsconfig.json')
  })
}

function startElectron() {
  const args = [
    '--inspect=5858',
    path.join(__dirname, '../public-electron/main.dev.js')
  ]

  electronProcess = spawn(electron, args)

  electronProcess.stdout.on('data', data => {
    log('Electron', data, 'blue')
  })
  electronProcess.stderr.on('data', data => {
    log('Electron', data, 'red')
  })

  electronProcess.on('close', () => {
    if (!manualRestart) process.exit()
  })
}

function run() {
  Promise.all([startRenderer(), startMain()])
    .then(() => {
      startElectron()
    })
    .catch(err => {
      console.error(err)
      process.exit()
    })
}

run()
