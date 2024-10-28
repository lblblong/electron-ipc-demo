import { createNamespace } from 'cls-hooked'

export const ipcHook = createNamespace('ipc-hook')

export function useEvent(): Electron.IpcMainInvokeEvent {
  return ipcHook.get('event')
}
