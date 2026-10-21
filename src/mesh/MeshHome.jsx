import {
  Home,
  Sparkles,
  Share2,
  Download,
  Rocket,
  TriangleAlert,
  CalendarCheck2,
  Users,
  Activity,
  Monitor,
  Map,
  FlaskConical,
  ListOrdered,
  Route,
  Flag,
  Clock,
  Calendar,
  MessageCircleQuestion,
  Mail,
  ClipboardList,
  ListChecks,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

/* ── 基础元件 ─────────────────────────────── */

const AVATARS = {
  leo: 'https://i.pravatar.cc/56?img=12', nora: 'https://i.pravatar.cc/56?img=32',
  ada: 'https://i.pravatar.cc/56?img=45', mira: 'https://i.pravatar.cc/56?img=5',
  ravi: 'https://i.pravatar.cc/56?img=68', iris: 'https://i.pravatar.cc/56?img=9',
  me: 'https://i.pravatar.cc/56?img=47',
}

function IconChip({ icon: Icon, tint = 'bg-black/5 text-ink', className }) {
  return (
    <span className={cn('grid size-8 shrink-0 place-items-center rounded-lg', tint, className)}>
      <Icon className="size-4" />
    </span>
  )
}

function Avatar({ who, className }) {
  return <img src={AVATARS[who]} alt="" className={cn('size-6 rounded-full object-cover', className)} />
}

function Tag({ children, className }) {
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium', className)}>
      {children}
    </span>
  )
}

function Panel({ title, sub, action, children, className }) {
  return (
    <section className={cn('rounded-xl border border-black/[0.07] bg-white', className)}>
      <header className="flex items-start justify-between px-4 pt-3.5 pb-2.5">
        <div>
          <h2 className="text-[15px] font-semibold tracking-tight">{title}</h2>
          {sub && <p className="mt-0.5 text-[13px] text-black/50">{sub}</p>}
        </div>
        {action}
      </header>
      {children}
    </section>
  )
}

/* ── 顶部统计卡 ────────────────────────────── */

const STATS = [
  { icon: Rocket, tint: 'bg-danger-bg text-danger', label: 'Days to beta', value: '20', caption: 'Wed 4 Nov',
    tag: <Tag className="bg-black/[0.05] text-black/60">⌁ GA in 35 days</Tag> },
  { icon: TriangleAlert, tint: 'bg-danger-bg text-danger', label: 'Needs attention', value: '5', caption: 'of 17 tasks',
    tag: <Tag className="bg-danger-bg text-danger">⌁ 1 blocked</Tag> },
  { icon: CalendarCheck2, tint: 'bg-warn-bg text-warn', label: 'Due this week', value: '5', caption: 'week of Mon 12 Oct',
    tag: <Tag className="bg-warn-bg text-warn">1 today</Tag> },
  { icon: Users, tint: 'bg-ok-bg text-ok', label: 'Online now', value: '7', caption: 'of 9 teammates',
    tag: <Tag className="bg-ok-bg text-ok">⌁ 2 on the map</Tag> },
  { icon: Activity, tint: 'bg-violet-bg text-violet', label: 'Launch progress', value: '61%', caption: 'mean completion',
    tag: <Tag className="bg-violet-bg text-violet">⌁ 2 of 17 done</Tag> },
]

/* ── Project Status 表 ─────────────────────── */

const WEEK_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

const PROJECTS = [
  { icon: Monitor, tint: 'bg-danger-bg text-danger', name: 'Dispatcher Console', desc: 'Reorders and overrides', who: 'leo', lead: 'Leo Grant',
    pct: 80, due: 'Due Oct 22', bar: 'bg-danger', open: 2, week: { 4: 'bg-white ring-1 ring-black/15' }, status: ['Blocked', 'bg-danger-bg text-danger'] },
  { icon: Map, tint: 'bg-warn-bg text-warn', name: 'Offline Maps', desc: 'Maps on older phones', who: 'nora', lead: 'Nora Vale',
    pct: 55, due: 'Due Oct 17', bar: 'bg-warn-bar', open: 3, week: { 4: 'bg-white ring-1 ring-black/15', 5: 'bg-warn-bar' }, status: ['At risk', 'bg-warn-bg text-warn'] },
  { icon: FlaskConical, tint: 'bg-warn-bg text-warn', name: 'Beta Program', desc: '200 drivers, a diary study', who: 'ada', lead: 'Ada Brooks',
    pct: 57, due: 'Due Oct 18', bar: 'bg-warn-bar', open: 4, week: { 4: 'bg-white ring-1 ring-black/15', 5: 'bg-warn-bar' }, status: ['At risk', 'bg-warn-bg text-warn'] },
  { icon: ListOrdered, tint: 'bg-ok-bg text-ok', name: 'Stop List', desc: 'Drag to reorder stops', who: 'mira', lead: 'Mira Stone',
    pct: 98, due: 'Due today', bar: 'bg-ok-bar', open: 1, week: { 2: 'bg-ok-bar' }, status: ['On track', 'bg-ok-bg text-ok'] },
  { icon: Route, tint: 'bg-ok-bg text-ok', name: 'Live Re-routing', desc: 'Re-routes that say why', who: 'ravi', lead: 'Ravi Shah',
    pct: 89, due: 'Due Oct 16', bar: 'bg-ok-bar', open: 2, week: { 3: 'bg-white ring-1 ring-black/15', 4: 'bg-ok-bar' }, status: ['On track', 'bg-ok-bg text-ok'] },
  { icon: Flag, tint: 'bg-violet-bg text-violet', name: 'GA Launch', desc: 'Bug fixes, review, announce', who: 'iris', lead: 'Iris Fox',
    pct: 5, due: 'Due Nov 13', bar: 'bg-violet', open: 3, week: { 4: 'bg-white ring-1 ring-black/15' }, status: ['Not started', 'bg-violet-bg text-violet ring-1 ring-violet/30'] },
]

function WeekCells({ cells }) {
  return (
    <div>
      <div className="flex gap-[5px] text-[9px] text-black/40">
        {WEEK_DAYS.map((d, i) => <span key={i} className="w-4 text-center">{d}</span>)}
      </div>
      <div className="mt-1 flex gap-[5px]">
        {WEEK_DAYS.map((_, i) => (
          <span key={i} className={cn('h-4 w-4 rounded-[4px] bg-black/[0.04]', cells[i])} />
        ))}
      </div>
    </div>
  )
}

function ProjectStatus() {
  return (
    <Panel
      title="Project Status"
      sub="Route Planner launch, by project"
      action={<Tag className="bg-violet-bg text-violet">6 projects</Tag>}
    >
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-y border-black/[0.06] text-left text-[13px] text-black/50">
            <th className="py-2.5 pl-4 font-medium">Project</th>
            <th className="py-2.5 font-medium">Lead</th>
            <th className="py-2.5 font-medium">Progress</th>
            <th className="py-2.5 font-medium">Open</th>
            <th className="py-2.5 font-medium">This week</th>
            <th className="py-2.5 pr-4 text-right font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {PROJECTS.map((p) => (
            <tr key={p.name} className="border-b border-black/[0.05] last:border-0">
              <td className="py-2.5 pl-4">
                <div className="flex items-center gap-3">
                  <IconChip icon={p.icon} tint={p.tint} className="size-7 rounded-md" />
                  <div>
                    <div className="text-[13.5px] font-semibold tracking-tight">{p.name}</div>
                    <div className="text-xs text-black/45">{p.desc}</div>
                  </div>
                </div>
              </td>
              <td className="py-2.5">
                <div className="flex items-center gap-2">
                  <Avatar who={p.who} /><span className="text-[13px] font-medium">{p.lead}</span>
                </div>
              </td>
              <td className="py-2.5">
                <div className="flex items-baseline gap-2 text-[13px] font-semibold tabular-nums">
                  {p.pct}%
                  <span className="text-xs font-normal text-black/45">{p.due}</span>
                </div>
                <div className="mt-1.5 h-1 w-36 overflow-hidden rounded-full bg-black/[0.06]">
                  <div className={cn('h-full rounded-full', p.bar)} style={{ width: `${p.pct}%` }} />
                </div>
              </td>
              <td className="py-2.5 text-[13px] text-black/60 tabular-nums">{p.open}</td>
              <td className="py-2.5"><WeekCells cells={p.week} /></td>
              <td className="py-2.5 pr-4 text-right"><Tag className={p.status[1]}>{p.status[0]}</Tag></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  )
}

/* ── Action Queue ─────────────────────────── */

const ACTIONS = [
  { icon: Clock, tint: 'bg-danger-bg text-danger', title: '1 blocked task', desc: 'dispatcher override rules', cta: 'Nudge' },
  { icon: Calendar, tint: 'bg-warn-bg text-warn', title: '1 due today', desc: 'stop list designs', cta: 'Check' },
  { icon: MessageCircleQuestion, tint: 'bg-violet-bg text-violet', title: '3 open questions', desc: 'Route Planner Product Brief', cta: 'Answer' },
  { icon: Mail, tint: 'bg-sky-bg text-sky', title: 'Beta invite draft', desc: '200 drivers, Ada with Owen', cta: 'Approve' },
  { icon: ClipboardList, tint: 'bg-ok-bg text-ok', title: '3 crit actions', desc: 'Design Crit Meeting Notes', cta: 'Assign' },
  { icon: ListChecks, tint: 'bg-teal-bg text-teal', title: '4 checklist items', desc: 'Route Planner Launch Plan', cta: 'Review' },
]

function ActionQueue() {
  return (
    <Panel
      title="Action Queue"
      sub="6 open before the beta review"
      action={<span className="px-1 text-black/40">···</span>}
      className="flex flex-col"
    >
      <ul className="flex flex-1 flex-col divide-y divide-black/[0.05]">
        {ACTIONS.map((a) => (
          <li key={a.title} className="flex flex-1 items-center gap-3 px-4 py-3">
            <IconChip icon={a.icon} tint={a.tint} className="size-8" />
            <div className="min-w-0">
              <div className="truncate text-[13.5px] font-semibold tracking-tight">{a.title}</div>
              <div className="truncate text-xs text-black/45">{a.desc}</div>
            </div>
            <button className="ml-auto rounded-lg border border-black/[0.08] px-3 py-1 text-xs font-medium text-black/70 transition-colors hover:bg-black/[0.04]">
              {a.cta}
            </button>
          </li>
        ))}
      </ul>
    </Panel>
  )
}

/* ── Launch Runway ────────────────────────── */

function RunwayStat({ label, tag, children, caption }) {
  return (
    <div className="px-5 py-3">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium text-black/60">{label}</span>
        <Tag className="border border-black/[0.08] bg-white text-black/55">{tag}</Tag>
      </div>
      <div className="mt-2 text-[26px] font-bold tracking-tight tabular-nums">{children}</div>
      <div className="mt-1 text-xs text-black/50">{caption}</div>
    </div>
  )
}

function LaunchRunway() {
  return (
    <Panel
      title={<span>Launch Runway <span className="ml-1 font-normal text-black/40">· Thu 15 Oct</span></span>}
      sub="Days until each open task is due, against the work left on it"
      action={
        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-black/[0.08] px-3 py-1.5 text-xs font-medium text-black/70 hover:bg-black/[0.04]">Due date</button>
          <button className="rounded-lg border border-black/[0.08] px-3 py-1.5 text-xs font-medium text-black/70 hover:bg-black/[0.04]">Milestone</button>
          <span className="px-1 text-black/40">···</span>
        </div>
      }
    >
      <div className="grid grid-cols-4 divide-x divide-black/[0.06] border-t border-black/[0.06]">
        <RunwayStat label="Blocked" tag="5 not started"
          caption={<span className="flex items-center gap-3"><span className="flex items-center gap-1"><i className="size-1.5 rounded-full bg-warn-bar" />3 at risk</span><span className="flex items-center gap-1"><i className="size-1.5 rounded-full bg-ok-bar" />6 on track</span></span>}>
          <span className="text-danger">1</span>
          <span className="text-lg font-semibold text-black/35"> /15</span>
        </RunwayStat>
        <RunwayStat label="Due First" tag="1 today"
          caption={<span><b className="font-semibold text-black/80">Stop list</b> 94% done</span>}>
          Today
        </RunwayStat>
        <RunwayStat label="Work at Risk" tag="4 tasks"
          caption="of the work left on 15 open tasks">
          19%
        </RunwayStat>
        <div className="px-5 py-3">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-black/60">Due by the Beta</span>
            <Tag className="border border-black/[0.08] bg-white text-black/55">20 days</Tag>
          </div>
          <div className="mt-2 text-[26px] font-bold tracking-tight tabular-nums">73%</div>
          <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-black/[0.06]">
            <div className="h-full w-[73%] rounded-full bg-ok-bar" />
          </div>
        </div>
      </div>
      <footer className="flex items-center justify-between border-t border-black/[0.06] px-5 py-2.5 text-xs text-black/45">
        <span>Task, by work left</span>
        <span className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><i className="size-2 rounded-full bg-danger" />Blocked</span>
          <span className="flex items-center gap-1.5"><i className="size-2 rounded-full bg-warn-bar" />At risk</span>
          <span className="flex items-center gap-1.5"><i className="size-2 rounded-full bg-ok-bar" />On track</span>
          <span className="flex items-center gap-1.5"><i className="size-2 rounded-full bg-black/20" />Not started</span>
        </span>
        <span>Time left, to due date</span>
      </footer>
    </Panel>
  )
}

/* ── 页面内容(骨架由 MeshShell 提供) ────────── */

export default function MeshHome() {
  return (
    <>
      <header className="flex h-13 items-center justify-between border-b border-black/[0.07] bg-white px-4 py-2.5">
          <h1 className="text-[15px] font-semibold tracking-tight">Home</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5 border-black/[0.08] bg-white px-3 text-[13px] font-medium hover:bg-black/[0.04]">
              <Sparkles className="size-3.5" /> Ask AI
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 border-black/[0.08] bg-white px-3 text-[13px] font-medium hover:bg-black/[0.04]">
              <Share2 className="size-3.5" /> Share
            </Button>
            <Button size="sm" className="gap-1.5 bg-ink px-3.5 text-[13px] font-medium text-white hover:bg-black/85">
              <Download className="size-3.5" /> Export
            </Button>
          </div>
        </header>

        <main className="scroll-slim grid flex-1 content-start gap-3 overflow-auto p-4">
          <div className="grid grid-cols-5 gap-3">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-xl border border-black/[0.07] bg-white p-4">
                <div className="flex items-center gap-2.5">
                  <IconChip icon={s.icon} tint={s.tint} />
                  <span className="text-[13px] font-medium text-black/70">{s.label}</span>
                </div>
                <div className="mt-3 text-[26px] font-bold leading-none tracking-tight tabular-nums">{s.value}</div>
                <div className="mt-2.5 flex items-center justify-between text-xs text-black/45">
                  <span>{s.caption}</span>{s.tag}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2"><ProjectStatus /></div>
            <ActionQueue />
          </div>

      <LaunchRunway />
      </main>
    </>
  )
}
