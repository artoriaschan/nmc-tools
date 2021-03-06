import { app, BrowserWindow } from 'electron'
import path from 'path'

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, './bridge/index.js'),
      contextIsolation: true // 上下文隔离
    }
  })

  win.loadURL(' http://localhost:3000/')
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
