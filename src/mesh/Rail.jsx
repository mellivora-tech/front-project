import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  Home, LayoutTemplate, Shapes, FileText, Palette,
  StickyNote, Square, Circle, Spline, Type, Frame,
  Users, RefreshCw, Search,
} from 'lucide-react'
import UserMenu from './UserMenu.jsx'
import { cn } from '@/lib/utils'

/* ── 二级菜单数据 ─────────────────────────── */

const FLYOUTS = {
  Home: {
    groups: [
      {
        heading: 'Recent boards',
        items: [
          { dot: '#12b76a', label: 'Launch Map', desc: 'Route Planner launch', href: '#home' },
          { dot: '#f5b40a', label: 'Driver Diary Study', desc: '200 drivers, a diary', href: '#home' },
          { dot: '#8b5cf6', label: 'GA Launch Plan', desc: 'Iris Fox owns', href: '#home' },
        ],
      },
    ],
  },
  Templates: {
    groups: [
      {
        heading: 'Categories',
        items: [
          { icon: StickyNote, label: 'Brainstorming', desc: 'Ideas and clustering', href: '#templates' },
          { icon: Users, label: 'Meetings and workshops', desc: 'Agendas and notes', href: '#templates' },
          { icon: RefreshCw, label: 'Agile', desc: 'Sprints and retros', href: '#templates' },
          { icon: Search, label: 'Research and design', desc: 'Interviews, journeys', href: '#templates' },
        ],
      },
    ],
  },
  Shapes: {
    groups: [
      {
        heading: 'Insert',
        grid: true,
        items: [
          { icon: StickyNote, label: 'Sticky note' },
          { icon: Square, label: 'Card' },
          { icon: Circle, label: 'Circle' },
          { icon: Spline, label: 'Connector' },
          { icon: Type, label: 'Text' },
          { icon: Frame, label: 'Frame' },
        ],
      },
    ],
  },
  Docs: {
    groups: [
      {
        heading: 'Recent docs',
        items: [
          { icon: FileText, label: 'Product Brief', desc: 'Route Planner' },
          { icon: FileText, label: 'Design Crit Notes', desc: '3 open actions' },
          { icon: FileText, label: 'Launch Checklist', desc: '4 checklist items' },
        ],
      },
    ],
  },
}

const ITEMS = [
  { icon: Home, hash: '#home', label: 'Home' },
  { icon: LayoutTemplate, hash: '#templates', label: 'Templates' },
  { icon: Shapes, hash: null, label: 'Shapes' },
  { icon: FileText, hash: null, label: 'Docs' },
]

const OPEN_DELAY = 200
const CLOSE_DELAY = 120
const VIEWPORT_MARGIN = 8

/* ── 单个 Rail 项(含悬浮二级菜单) ────────────── */

function RailItem({ icon: Icon, hash, label, active, open, onEnter, onLeave, onNavigate }) {
  const wrapRef = useRef(null)
  const panelRef = useRef(null)
  const [top, setTop] = useState(0) // 相对 wrapper 顶部的偏移,打开时按视口边界钳制
  const flyout = FLYOUTS[label]

  // 面板垂直居中于图标,但钳制在视口 [MARGIN, 100vh-MARGIN] 内,防止顶部/底部溢出裁切
  useLayoutEffect(() => {
    if (!open || !wrapRef.current || !panelRef.current) return
    const clamp = () => {
      const wrapRect = wrapRef.current.getBoundingClientRect()
      const h = panelRef.current.offsetHeight
      const min = VIEWPORT_MARGIN - wrapRect.top
      const max = window.innerHeight - VIEWPORT_MARGIN - h - wrapRect.top
      setTop(Math.min(Math.max(-h / 2, min), Math.max(min, max)))
    }
    clamp()
    window.addEventListener('resize', clamp)
    return () => window.removeEventListener('resize', clamp)
  }, [open])

  const cls = cn(
    'grid size-8 place-items-center rounded-lg text-black/45 transition-colors hover:bg-black/5 hover:text-ink',
    active === label && 'bg-ink text-white hover:bg-ink hover:text-white',
  )
  return (
    <div ref={wrapRef} className="relative" onMouseEnter={() => onEnter(label)} onMouseLeave={onLeave}>
      {hash ? (
        <a href={hash} aria-current={active === label} aria-label={label} className={cls}>
          <Icon className="size-4" />
        </a>
      ) : (
        <span aria-label={label} className={cn(cls, 'cursor-default')}>
          <Icon className="size-4" />
        </span>
      )}

      {flyout && open && (
        <div
          ref={panelRef}
          role="menu"
          aria-label={`${label} menu`}
          style={{ top }}
          className="scroll-slim absolute left-[calc(100%+8px)] z-50 max-h-[calc(100vh-16px)] w-60 origin-left animate-in fade-in-0 zoom-in-95 slide-in-from-left-1 overflow-y-auto rounded-xl border border-black/[0.08] bg-white p-1.5 shadow-xl duration-150"
        >
          {flyout.groups.map((group, gi) => (
            <div key={group.heading}>
              {gi > 0 && <div className="my-1 h-px bg-black/[0.06]" />}
              <div className="px-2 pb-1 pt-1.5 text-[11px] font-medium text-black/40">{group.heading}</div>
              <div className={cn(group.grid && 'grid grid-cols-2 gap-0.5')}>
                {group.items.map((item) => {
                  const ItemIcon = item.icon
                  const body = (
                    <>
                      {item.dot && <span className="size-2 shrink-0 rounded-full" style={{ background: item.dot }} />}
                      {ItemIcon && <ItemIcon className="size-3.5 shrink-0 text-black/50" />}
                      <span className="min-w-0">
                        <span className="block truncate text-[13px] font-medium tracking-tight">{item.label}</span>
                        {item.desc && <span className="block truncate text-xs text-black/45">{item.desc}</span>}
                      </span>
                    </>
                  )
                  const itemCls = cn(
                    'flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-black/[0.05]',
                    group.grid && 'flex-col justify-center gap-1.5 py-2.5 text-center',
                  )
                  return item.href ? (
                    <a key={item.label} href={item.href} role="menuitem" onClick={onNavigate} className={itemCls}>
                      {body}
                    </a>
                  ) : (
                    <button key={item.label} role="menuitem" onClick={onNavigate} className={cn(itemCls, 'w-full cursor-pointer')}>
                      {body}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Rail ─────────────────────────────────── */

export default function Rail({ active }) {
  const [openMenu, setOpenMenu] = useState(null)
  const openTimer = useRef()
  const closeTimer = useRef()

  useEffect(() => {
    if (!openMenu) return
    const onKey = (e) => e.key === 'Escape' && setOpenMenu(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openMenu])

  useEffect(() => () => {
    clearTimeout(openTimer.current)
    clearTimeout(closeTimer.current)
  }, [])

  const enter = (label) => {
    clearTimeout(closeTimer.current)
    if (openMenu === label) return
    clearTimeout(openTimer.current)
    openTimer.current = setTimeout(() => setOpenMenu(label), OPEN_DELAY)
  }
  const leave = () => {
    clearTimeout(openTimer.current)
    closeTimer.current = setTimeout(() => setOpenMenu(null), CLOSE_DELAY)
  }

  return (
    <nav className="flex w-12 flex-col items-center gap-1 py-3">
      <a href="#home" className="grid size-8 place-items-center rounded-lg bg-ink text-[11px] font-bold text-white">
        Li
      </a>
      <div className="mt-3 flex flex-col gap-1">
        {ITEMS.map(({ icon, hash, label }) => (
          <RailItem
            key={label}
            icon={icon}
            hash={hash}
            label={label}
            active={active}
            open={openMenu === label}
            onEnter={enter}
            onLeave={leave}
            onNavigate={() => setOpenMenu(null)}
          />
        ))}
      </div>
      <div className="mt-auto flex flex-col items-center gap-3">
        <Palette className="size-4 text-black/45" />
        <UserMenu />
      </div>
    </nav>
  )
}
