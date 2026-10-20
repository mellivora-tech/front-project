import {
  LayoutGrid,
  Sparkles,
  Share2,
  Users,
  Map,
  Lightbulb,
  RefreshCw,
  Search, Search as SearchIcon,
  Target,
  Waypoints,
  Plus,
} from 'lucide-react'
import { cn } from '@/lib/utils'

/* ── 缩略图 ────────────────────────────────── */

const ThumbShell = ({ children }) => (
  <div className="relative h-20 w-[128px] shrink-0 overflow-hidden rounded-lg border border-black/[0.06] bg-[#fafafa]">
    {children}
  </div>
)

const ThumbBlankBoard = () => (
  <ThumbShell>
    <div
      className="absolute inset-0"
      style={{ backgroundImage: 'radial-gradient(circle, #d6d6da 1px, transparent 1px)', backgroundSize: '13px 13px', backgroundPosition: 'center' }}
    />
    <div className="absolute left-1/2 top-1/2 grid size-5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-black/10 bg-white shadow-sm">
      <Plus className="size-3 text-black/50" />
    </div>
  </ThumbShell>
)

const ThumbBlankDoc = () => (
  <ThumbShell>
    <div className="absolute inset-y-1.5 left-1/2 w-[72px] -translate-x-1/2 rounded-t-md rounded-b-sm border border-black/[0.05] bg-white shadow-sm">
      <div className="mx-2 mt-2 h-1 w-8 rounded-full bg-black/10" />
    </div>
    <div className="absolute left-1/2 top-1/2 grid size-5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-black/10 bg-white shadow-sm">
      <Plus className="size-3 text-black/50" />
    </div>
  </ThumbShell>
)

const Sticky = ({ color }) => <div className="h-7 w-7 rounded-[3px] shadow-sm" style={{ background: color }} />

const ThumbBrainstorm = () => (
  <ThumbShell>
    <div className="flex h-full items-center justify-center gap-5 bg-white">
      <div>
        <div className="mb-1 h-0.5 w-7 rounded-full bg-black/15" />
        <div className="grid grid-cols-2 gap-1">
          <Sticky color="#f5c518" /><Sticky color="#f5c518" />
          <Sticky color="#f5c518" /><Sticky color="#b9a7f9" />
        </div>
      </div>
      <div>
        <div className="mb-1 h-0.5 w-7 rounded-full bg-black/15" />
        <div className="grid grid-cols-2 gap-1">
          <Sticky color="#7fd9c0" /><Sticky color="#7fd9c0" />
          <Sticky color="#f2a3a0" /><Sticky color="#b9a7f9" />
        </div>
      </div>
    </div>
  </ThumbShell>
)

const ThumbMindMap = () => (
  <ThumbShell>
    <svg viewBox="0 0 128 80" className="h-full w-full bg-white">
      <path d="M60 40 C 44 40, 40 18, 26 18" stroke="#a78bfa" strokeWidth="1.5" fill="none" />
      <path d="M60 44 C 46 46, 42 64, 28 64" stroke="#2dd4bf" strokeWidth="1.5" fill="none" />
      <path d="M74 36 C 88 34, 92 16, 106 16" stroke="#f5b40a" strokeWidth="1.5" fill="none" />
      <path d="M74 46 C 88 48, 92 64, 106 64" stroke="#f26d6d" strokeWidth="1.5" fill="none" />
      <rect x="12" y="12" width="26" height="9" rx="4.5" fill="#fff" stroke="#e4e4e7" />
      <rect x="14" y="58" width="26" height="9" rx="4.5" fill="#fff" stroke="#e4e4e7" />
      <rect x="92" y="10" width="26" height="9" rx="4.5" fill="#fff" stroke="#e4e4e7" />
      <rect x="92" y="58" width="26" height="9" rx="4.5" fill="#fff" stroke="#e4e4e7" />
      <rect x="52" y="34" width="30" height="12" rx="6" fill="#17171a" />
      <rect x="59" y="39" width="16" height="2" rx="1" fill="#fff" />
    </svg>
  </ThumbShell>
)

const AGENDA_BARS = ['#8b5cf6', '#f5b40a', '#12b76a', '#17171a']

const ThumbAgenda = () => (
  <ThumbShell>
    <div className="flex h-full flex-col justify-center gap-1.5 bg-white p-2.5">
      {AGENDA_BARS.map((c, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <span className="h-0.5 w-2.5 rounded-full bg-black/15" />
          <span className="w-[3px] self-stretch rounded-full" style={{ background: c }} />
          <span className="flex h-4 flex-1 items-center rounded-[4px] border border-black/[0.06] bg-white px-1.5">
            <span className="h-0.5 w-1/2 rounded-full bg-black/10" />
          </span>
          <span className="h-1.5 w-3 rounded-full bg-black/[0.08]" />
        </div>
      ))}
    </div>
  </ThumbShell>
)

const Column = ({ dot, cards }) => (
  <div className="flex-1 rounded-md bg-[#f4f4f5] p-1">
    <div className="mb-1 flex items-center gap-1 px-0.5">
      <span className="size-1 rounded-full" style={{ background: dot }} />
      <span className="h-0.5 w-4 rounded-full bg-black/15" />
    </div>
    <div className="space-y-0.5">
      {Array.from({ length: cards }).map((_, i) => (
        <div key={i} className="h-3 rounded-[3px] border border-black/[0.05] bg-white px-1 py-0.5">
          <span className="block h-0.5 w-2/3 rounded-full bg-black/10" />
        </div>
      ))}
    </div>
  </div>
)

const ThumbColumns = ({ counts }) => (
  <ThumbShell>
    <div className="flex h-full gap-1.5 bg-white p-2.5">
      {counts.map(([dot, n], i) => <Column key={i} dot={dot} cards={n} />)}
    </div>
  </ThumbShell>
)

/* ── 数据 ────────────────────────────────── */

const CATEGORIES = [
  { icon: LayoutGrid, tint: 'bg-violet-bg text-violet', name: 'All templates', desc: 'Every board and doc', active: true },
  { icon: Lightbulb, tint: 'bg-warn-bg text-warn', name: 'Brainstorming', desc: 'Ideas and clustering' },
  { icon: Users, tint: 'bg-sky-bg text-sky', name: 'Meetings and workshops', desc: 'Agendas and notes' },
  { icon: RefreshCw, tint: 'bg-teal-bg text-teal', name: 'Agile', desc: 'Sprints and retros' },
  { icon: Search, tint: 'bg-danger-bg text-danger', name: 'Research and design', desc: 'Interviews and journeys' },
  { icon: Target, tint: 'bg-violet-bg text-violet', name: 'Strategy and planning', desc: 'Briefs and roadmaps' },
  { icon: Waypoints, tint: 'bg-sky-bg text-sky', name: 'Diagramming', desc: 'Flows and processes' },
]

const TEMPLATES = [
  { title: 'Blank Board', desc: 'An empty canvas with nothing on it yet.', type: 'Board', from: 'Mesh', thumb: <ThumbBlankBoard /> },
  { title: 'Blank Doc', desc: 'An empty page with nothing on it yet.', type: 'Doc', from: 'Mesh', thumb: <ThumbBlankDoc /> },
  { title: 'Brainstorm', desc: 'Gather ideas on stickies, then cluster and vote on them.', type: 'Board', from: 'Mesh', thumb: <ThumbBrainstorm /> },
  { title: 'Mind Map', desc: 'Branch one topic out into themes and details.', type: 'Board', from: 'Mesh', thumb: <ThumbMindMap /> },
  { title: 'Workshop Agenda', desc: 'Timebox each step of a workshop, from warm up to wrap up.', type: 'Board', from: 'Iris', thumb: <ThumbAgenda /> },
  { title: 'Retrospective', desc: 'What went well, what to improve, and the actions you take.', type: 'Board', from: 'Iris', thumb: <ThumbColumns counts={[['#12b76a', 2], ['#f5b40a', 2], ['#8b5cf6', 1]]} /> },
  { title: 'Kanban Board', desc: 'Move work across To Do, Doing and Done.', type: 'Board', from: 'Mesh', thumb: <ThumbColumns counts={[['#12b76a', 3], ['#f5b40a', 2], ['#8b5cf6', 1]]} /> },
]

/* ── 页面内容(骨架由 MeshShell 提供) ────────── */

export default function MeshTemplates() {
  return (
    <>
      {/* 顶栏 */}
      <header className="flex h-13 items-center justify-between border-b border-black/[0.07] bg-white px-4 py-2.5">
          <h1 className="text-[15px] font-semibold tracking-tight">Templates</h1>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 rounded-lg border border-black/[0.08] px-3 py-1.5 text-[13px] font-medium hover:bg-black/[0.04]">
              <Sparkles className="size-3.5" /> Ask AI
            </button>
            <button className="flex items-center gap-1.5 rounded-lg border border-black/[0.08] px-3 py-1.5 text-[13px] font-medium hover:bg-black/[0.04]">
              <Share2 className="size-3.5" /> Share
            </button>
            <button className="flex items-center gap-1.5 rounded-lg bg-ink px-3 py-1.5 text-[13px] font-medium text-white hover:bg-black/85">
              Upgrade
              <span className="rounded-full bg-[#12b76a] px-1.5 py-px text-[10px] font-semibold text-white">New</span>
            </button>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          {/* 分类侧栏 */}
          <aside className="w-[268px] shrink-0 space-y-1 overflow-auto border-r border-black/[0.07] bg-white p-3">
            <div className="px-2 pb-2 text-[13px] font-medium text-black/50">Categories</div>
            {CATEGORIES.map(({ icon: Icon, tint, name, desc, active }) => (
              <button
                key={name}
                className={cn(
                  'flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left transition-colors hover:bg-black/[0.04]',
                  active && 'bg-black/[0.06] hover:bg-black/[0.06]',
                )}
              >
                <span className={cn('grid size-7 shrink-0 place-items-center rounded-lg', tint)}>
                  <Icon className="size-3.5" />
                </span>
                <span>
                  <span className="block text-[13.5px] font-semibold tracking-tight">{name}</span>
                  <span className="block text-xs text-black/45">{desc}</span>
                </span>
              </button>
            ))}
          </aside>

          {/* 模板列表 */}
          <main className="scroll-slim min-w-0 flex-1 space-y-2.5 overflow-auto p-4">
            <div className="flex h-9 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3">
              <SearchIcon className="size-3.5 text-black/35" />
              <input
                placeholder="Search boards, docs or categories..."
                className="w-full bg-transparent text-[13px] outline-none placeholder:text-black/35"
              />
            </div>

            {TEMPLATES.map((t) => (
              <div
                key={t.title}
                className="flex cursor-pointer items-center gap-3.5 rounded-xl border border-black/[0.07] bg-white p-3 transition-shadow hover:shadow-md"
              >
                {t.thumb}
                <div className="min-w-0">
                  <div className="text-[14.5px] font-semibold tracking-tight">{t.title}</div>
                  <div className="mt-0.5 truncate text-[13px] text-black/50">{t.desc}</div>
                  <span className="mt-1.5 inline-block rounded border border-black/[0.1] px-1.5 py-px text-[11px] font-medium text-black/60">
                    {t.type}
                  </span>
                </div>
                <span className="ml-auto mr-1 rounded border border-black/[0.1] px-1.5 py-px text-[11px] font-medium text-black/60">
                  {t.from}
                </span>
              </div>
            ))}
        </main>
      </div>
    </>
  )
}
