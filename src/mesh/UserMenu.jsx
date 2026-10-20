import { useEffect, useRef, useState } from 'react'
import { UserRound, Building2, Users, CreditCard, SlidersHorizontal, LogOut, Sun, Moon, Monitor } from 'lucide-react'
import { useProfile } from './profile.js'
import ProfileDialog from './ProfileDialog.jsx'
import { cn } from '@/lib/utils'

const MENU = [
  { icon: UserRound, label: 'Profile', shortcut: '⌥⌘P', action: 'profile' },
  { icon: Building2, label: 'Workspace', action: 'workspace' },
  { icon: Users, label: 'Team', action: 'team' },
  { icon: CreditCard, label: 'Billing', action: 'billing' },
  { icon: SlidersHorizontal, label: 'Preferences', action: 'preferences' },
]

const THEME_OPTIONS = [
  { id: 'light', icon: Sun },
  { id: 'dark', icon: Moon },
  { id: 'system', icon: Monitor },
]

export default function UserMenu() {
  const [profile] = useProfile()
  const [open, setOpen] = useState(false)
  const [dialog, setDialog] = useState(null)
  const [theme, setTheme] = useState(() => localStorage.getItem('mesh-theme') || 'light')
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    window.addEventListener('mousedown', onDown)
    return () => window.removeEventListener('mousedown', onDown)
  }, [open])

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.dataset.theme = 'dark'
    else delete root.dataset.theme
    localStorage.setItem('mesh-theme', theme)
  }, [theme])

  const itemCls =
    'flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-[13px] text-black/75 transition-colors hover:bg-black/[0.05]'

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        title={profile.name}
        className="block rounded-full transition-transform hover:scale-105"
      >
        <img src={profile.avatar} alt={profile.name} className="size-7 rounded-full object-cover" />
      </button>

      {open && (
        <div className="absolute bottom-0 left-9 z-40 w-64 origin-bottom-left animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-3 rounded-xl border border-black/[0.08] bg-white p-1.5 shadow-xl duration-200">
          {/* 用户卡片 */}
          <div className="flex items-center gap-2.5 rounded-lg px-2 py-2">
            <img src={profile.avatar} alt="" className="size-9 rounded-lg object-cover" />
            <div className="min-w-0">
              <div className="truncate text-[13px] font-semibold tracking-tight">{profile.name}</div>
              <div className="truncate text-xs text-black/45">{profile.email}</div>
            </div>
          </div>

          <div className="my-1 h-px bg-black/[0.06]" />

          {MENU.map(({ icon: Icon, label, shortcut, action }) => (
            <button
              key={label}
              className={itemCls}
              onClick={() => {
                setOpen(false)
                setDialog(action)
              }}
            >
              <Icon className="size-3.5 text-black/50" />
              <span className="flex-1">{label}</span>
              {shortcut && <span className="text-[11px] text-black/35">{shortcut}</span>}
            </button>
          ))}

          <div className="my-1 h-px bg-black/[0.06]" />

          {/* 主题切换 */}
          <div className="flex items-center gap-2.5 rounded-lg px-2 py-1.5">
            <span className="flex flex-1 items-center gap-2.5 text-[13px] text-black/75">
              <Sun className="size-3.5 text-black/50" /> Theme
            </span>
            <span className="flex gap-0.5 rounded-lg bg-black/[0.05] p-0.5">
              {THEME_OPTIONS.map(({ id, icon: Icon }) => (
                <button
                  key={id}
                  title={id}
                  onClick={() => setTheme(id)}
                  className={cn(
                    'grid size-6 place-items-center rounded-md text-black/50 transition-colors',
                    theme === id && 'bg-white text-ink shadow-sm',
                  )}
                >
                  <Icon className="size-3" />
                </button>
              ))}
            </span>
          </div>

          <div className="my-1 h-px bg-black/[0.06]" />

          <button className={itemCls} onClick={() => setOpen(false)}>
            <LogOut className="size-3.5 text-black/50" /> Sign Out
          </button>
        </div>
      )}

      {dialog && <ProfileDialog initialPage={dialog} onClose={() => setDialog(null)} />}
    </div>
  )
}
