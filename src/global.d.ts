import type { ElectronNodejsAPI } from './main/bridge/node.ts'
interface Window {
  nodejs: ElectronNodejsAPI
}
