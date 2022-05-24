import { contextBridge } from 'electron'
import { login } from './login'

export interface ElectronFetchApi {
  login: typeof login
}

const fetchApi: ElectronFetchApi = {
  login
}

contextBridge.exposeInMainWorld('api', fetchApi)
