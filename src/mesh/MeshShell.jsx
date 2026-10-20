import Rail from './Rail.jsx'

/* ── 持久页面骨架:渐变背景 + Rail + 右侧卡片外框 ── */

export default function MeshShell({ active, children }) {
  return (
    <div className="h-screen bg-gradient-to-br from-[#e9edf6] via-[#f6f4f1] to-[#faeee3] text-ink">
      <div className="flex h-full">
        <Rail active={active} />
        <div className="m-2 flex min-w-0 flex-1 flex-col overflow-hidden rounded-xl bg-[#f5f5f6] shadow-xl">
          {children}
        </div>
      </div>
    </div>
  )
}
