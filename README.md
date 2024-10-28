# 基于 Proxy 实现的 ipc 演示

![QQ20241028 143637](https://s1.imagehub.cc/images/2024/10/28/2142b71fa6a9ba84589d7da4e63da7fd.png)

## 实现方式

1. 首先需要在主进程注册 ipc 事件

```typescript
ipcMain.handle('ipc', async (event, { action, args }) => {
  // 通过 cls-hooked 无感在调用链中传递 event
  return ipcHook.runAndReturn(() => {
    ipcHook.set('event', event)
    return ipc[action](...args)
  })
})
```

以上使用 cls-hooked 在调用链中传递 event，避免需要显式传递 event。

2. 在入口文件中初始化 ipc

```typescript
ipc.init()
```

3. 在渲染进程中使用 proxy 调用 ipc

```typescript
// 直接通过 import 获得 ipc 类型
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
```

以上。

## 黑魔法总结

- cls-hooked 避免显式传递 event
- ClassAsyncify 抹平 Promise 差异
