import type { ElectronNodejsAPI } from './main/bridge/node.ts'
import type { ElectronFetchApi } from './main/api'

declare global {
  interface Window {
    api: ElectronFetchApi
    nodejs: ElectronNodejsAPI
  }
}
