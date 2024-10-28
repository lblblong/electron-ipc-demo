import { BrowserWindow, ipcMain } from 'electron'
import { ClassAsyncify } from '../common/TypedUtils'
import { ipcHook, useEvent } from './hook'

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const ipc = new (class {
  hideWindow() {
    const event = useEvent()
    const win = BrowserWindow.fromWebContents(event.sender)
    win?.close()
  }

  getWindowSize() {
    const event = useEvent()
    const win = BrowserWindow.fromWebContents(event.sender)
    return win?.getSize()
  }

  paramsDemo(message: string, name: string) {
    console.log(message, name)
  }

  async asyncDemo() {
    await sleep(1000)
    return 'Ok!'
  }

  init() {
    ipcMain.handle('ipc', async (event, { action, args }) => {
      // 通过 cls-hooked 无感在调用链中传递 event
      return ipcHook.runAndReturn(() => {
        ipcHook.set('event', event)
        return ipc[action](...args)
      })
    })
  }
})()

export type Ipc = ClassAsyncify<typeof ipc>
