import { useEffect, useState } from 'react'
import {
  LayoutDashboard, FolderKanban, Grid3x3, Calendar, SquareKanban, Settings,
  Moon, Sun, Download, Plus, Zap, Info, TriangleAlert,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/reui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/reui/alert'
import { cn } from '@/lib/utils'

const NAV = [
  { icon: LayoutDashboard, label: '仪表盘', active: true },
  { icon: FolderKanban, label: '项目' },
  { icon: Grid3x3, label: '数据网格' },
  { icon: Calendar, label: '日历' },
  { icon: SquareKanban, label: '看板' },
  { icon: Settings, label: '设置' },
]

const STATS = [
  { label: '总访问量', value: '128,430', delta: '▲ 12.5% 较上周', up: true },
  { label: '活跃项目', value: '36', delta: '▲ 4 个新增', up: true },
  { label: '错误率', value: '0.32%', delta: '▼ 0.08% 改善', up: false },
]

const DEPLOYS = [
  { name: 'web-console', status: ['已上线', 'success-light'], owner: '李雷', time: '10 分钟前' },
  { name: 'data-pipeline', status: ['构建中', 'info-light'], owner: '韩梅梅', time: '1 小时前' },
  { name: 'mobile-sdk', status: ['待审核', 'warning-light'], owner: '陈晨', time: '昨天 18:20' },
  { name: 'legacy-admin', status: ['失败', 'destructive-light'], owner: '王强', time: '昨天 09:41' },
]

const AVATARS = ['#f59e0b', '#10b981', '#8b5cf6']

export default function LegacyDemo() {
  // 支持 #dark 直达暗色(便于演示/测试)
  const [dark, setDark] = useState(() => window.location.hash === '#dark')

  useEffect(() => {
    if (dark) document.documentElement.dataset.theme = 'dark'
    else delete document.documentElement.dataset.theme
  }, [dark])

  const toggleTheme = () => setDark(!dark)

  return (
    <div className="grid h-screen grid-cols-[232px_1fr_264px] overflow-hidden bg-background text-foreground">
      {/* ── 左栏:侧栏导航 ── */}
      <aside className="flex flex-col gap-4 border-r border-border bg-card p-3">
        <div className="flex items-center gap-2 px-2 py-1 text-sm font-bold">
          <Zap className="size-4 text-primary" /> Acme Studio
        </div>
        <nav className="flex flex-col gap-0.5">
          {NAV.map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              className={cn(
                'flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
                active && 'bg-accent font-semibold text-foreground hover:text-foreground',
              )}
            >
              <Icon className="size-3.5 opacity-70" /> {label}
            </button>
          ))}
        </nav>
        <div className="mt-auto border-t border-border pt-3">
          <div className="px-2 pb-2 text-[11px] text-muted-foreground">在线协作</div>
          <div className="flex px-2">
            {AVATARS.map((color, i) => (
              <span
                key={color}
                className={cn(
                  'grid size-6 place-items-center rounded-full border-2 border-card text-[10px] font-bold text-white',
                  i > 0 && '-ml-1.5',
                )}
                style={{ background: color }}
              >
                {['李', '王', '陈'][i]}
              </span>
            ))}
          </div>
        </div>
      </aside>

      {/* ── 中栏:内容区 ── */}
      <main className="flex min-w-0 flex-col">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="mr-auto text-sm font-semibold">项目总览</span>
          <Button variant="ghost" size="sm" onClick={toggleTheme}>
            {dark ? <Sun /> : <Moon />} {dark ? '亮色' : '暗色'}
          </Button>
          <Button variant="outline" size="sm"><Download /> 导出</Button>
          <Button size="sm"><Plus /> 新建项目</Button>
        </div>

        <div className="grid content-start gap-4 overflow-auto p-4">
          <div className="grid grid-cols-3 gap-3">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-lg border border-border bg-card p-4 shadow-card">
                <div className="text-xs text-muted-foreground">{s.label}</div>
                <div className="mt-1 text-[22px] font-bold tabular-nums">{s.value}</div>
                <div className={cn('mt-1 text-xs', s.up ? 'text-success-foreground' : 'text-destructive-foreground')}>
                  {s.delta}
                </div>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
            <div className="border-b border-border px-4 py-3 text-sm font-semibold">部署记录</div>
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className="bg-muted text-left text-xs text-muted-foreground">
                  <th className="px-4 py-2 font-medium">项目</th>
                  <th className="px-4 py-2 font-medium">状态</th>
                  <th className="px-4 py-2 font-medium">负责人</th>
                  <th className="px-4 py-2 font-medium">时间</th>
                </tr>
              </thead>
              <tbody>
                {DEPLOYS.map((d) => (
                  <tr key={d.name} className="border-b border-border last:border-0">
                    <td className="px-4 py-2 font-mono text-xs">{d.name}</td>
                    <td className="px-4 py-2"><Badge variant={d.status[1]}>{d.status[0]}</Badge></td>
                    <td className="px-4 py-2">{d.owner}</td>
                    <td className="px-4 py-2 text-muted-foreground">{d.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* ── 右栏:属性检查器 ── */}
      <aside className="flex flex-col gap-4 overflow-auto border-l border-border bg-card p-4">
        <div className="text-sm font-semibold">属性检查器</div>

        <div className="grid gap-1.5">
          <label className="text-xs text-muted-foreground">项目名称</label>
          <Input defaultValue="web-console" />
        </div>
        <div className="grid gap-1.5">
          <label className="text-xs text-muted-foreground">环境</label>
          <Select defaultValue="prod">
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="prod">生产</SelectItem>
              <SelectItem value="staging">预发</SelectItem>
              <SelectItem value="test">测试</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Alert>
          <Info />
          <AlertTitle>构建队列正常</AlertTitle>
          <AlertDescription>预计 2 分钟内完成。</AlertDescription>
        </Alert>
        <Alert>
          <TriangleAlert />
          <AlertTitle>legacy-admin 连续失败 3 次</AlertTitle>
          <AlertDescription>建议回滚到上一个稳定版本。</AlertDescription>
        </Alert>

        <div className="flex items-center justify-between rounded-md bg-invert px-3 py-2 text-xs text-invert-foreground">
          <span>快捷键</span><span>⌘ K</span>
        </div>
        <div className="flex items-center justify-between rounded-md bg-invert px-3 py-2 text-xs text-invert-foreground">
          <span>主题模式</span><span>{dark ? 'Dark' : 'Light'}</span>
        </div>
      </aside>
    </div>
  )
}
