import { contextBridge } from 'electron'
import fs from 'fs'
import path from 'path'
import os from 'os'

export interface ElectronNodejsAPI {
  fs: {
    readFileSync: (
      path: string,
      options: {
        encoding?: null | undefined
        flag?: string | undefined
      }
    ) => Buffer
    existsSync: (path: string) => boolean
    writeFileSync: (
      path: string,
      data: string | Buffer,
      options?: fs.WriteFileOptions
    ) => void
  }
  os: typeof os
  path: {
    resolve: (...paths: string[]) => string
    join: (...paths: string[]) => string
  }
}

const nodeModule: ElectronNodejsAPI = {
  fs: {
    readFileSync: (
      path: string,
      options?: {
        encoding?: null | undefined
        flag?: string | undefined
      }
    ) => fs.readFileSync(path, options),
    existsSync: (path: string) => fs.existsSync(path),
    writeFileSync: (
      path: fs.PathOrFileDescriptor,
      data: string | NodeJS.ArrayBufferView,
      options?: fs.WriteFileOptions
    ) => fs.writeFileSync(path, data, options)
  },
  os,
  path: {
    resolve: (...paths: string[]) => path.resolve(...paths),
    join: (...paths: string[]) => path.join(...paths)
  }
}

contextBridge.exposeInMainWorld('nodejs', nodeModule)
