import electronLogo from './assets/electron.svg'
import Versions from './components/Versions'
import { ipc } from './ipc'

function App(): JSX.Element {
  const actions = [
    {
      label: '最小化',
      handler: () => {
        ipc.hideWindow()
      }
    },
    {
      label: '获取窗口尺寸',
      handler: async () => {
        const sizes = await ipc.getWindowSize()
        alert(`窗口尺寸：${sizes?.join(' x ')}`)
      }
    },
    {
      label: '调用异步的 ipc 方法',
      handler: async () => {
        const res = await ipc.asyncDemo()
        alert(res)
      }
    },
    {
      label: '传参到主进程（查看主进程console）',
      handler: async () => {
        await ipc.paramsDemo('来自渲染进程的问候', '---- 爱你的老鼠哥')
      }
    }
  ]

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">基于 Proxy 实现的 ipc 演示</div>
      <div className="text">
        绝佳的 <span className="react">类型体验</span>
        &nbsp;和极低 <span className="ts">心智负担</span>
      </div>
      <p className="tip">
        以下按钮事件从渲染进程调用主进程服务，请拉取并修改 click 中的代码以体验 ts 的魔力
      </p>
      <div className="actions">
        {actions.map((it) => {
          return (
            <div className="action">
              <a href="#" onClick={it.handler}>
                {it.label}
              </a>
            </div>
          )
        })}
      </div>
      <img
        style={{
          width: '100%',
          margin: 18
        }}
        src="https://s1.imagehub.cc/images/2024/10/28/a7de249f1ebe307e20c524235d34d6d3.png"
      />
      <p>基于以下黑魔法</p>
      <Versions></Versions>
    </>
  )
}

export default App
