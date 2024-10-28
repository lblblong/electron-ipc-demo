// @ts-ignore
export const ipc: import('../../main/ipc').Ipc = new Proxy(
  {},
  {
    get(_, action: string) {
      return async (...args: any[]) => {
        return await window.electron.ipcRenderer.invoke('ipc', {
          action,
          args
        })
      }
    }
  }
) as any
