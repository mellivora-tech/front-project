import { useEffect, useState } from 'react'
import { UserRound, Building2, Users, CreditCard, SlidersHorizontal, LogOut, Sun, Moon, Monitor } from 'lucide-react'
import { useProfile } from './profile.js'
import ProfileDialog from './ProfileDialog.jsx'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
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

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.dataset.theme = 'dark'
    else delete root.dataset.theme
    localStorage.setItem('mesh-theme', theme)
  }, [theme])

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger
          title={profile.name}
          aria-label={profile.name}
          className="block rounded-full transition-transform outline-none hover:scale-105 focus-visible:ring-2 focus-visible:ring-black/20"
        >
          <Avatar className="size-7">
            <AvatarImage src={profile.avatar} alt={profile.name} />
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="top" align="start" sideOffset={8} className="w-64 rounded-xl p-1.5 shadow-xl">
          {/* 用户卡片 */}
          <div className="flex items-center gap-2.5 rounded-lg px-2 py-2">
            <Avatar className="size-9 rounded-lg">
              <AvatarImage src={profile.avatar} alt="" />
            </Avatar>
            <div className="min-w-0">
              <div className="truncate text-[13px] font-semibold tracking-tight">{profile.name}</div>
              <div className="truncate text-xs text-black/45">{profile.email}</div>
            </div>
          </div>

          <DropdownMenuSeparator className="my-1 bg-black/[0.06]" />

          {MENU.map(({ icon: Icon, label, shortcut, action }) => (
            <DropdownMenuItem
              key={label}
              className="gap-2.5 px-2 py-1.5 text-[13px] text-black/75"
              onSelect={() => setDialog(action)}
            >
              <Icon className="size-3.5 text-black/50" />
              <span className="flex-1">{label}</span>
              {shortcut && <DropdownMenuShortcut className="text-[11px] text-black/35">{shortcut}</DropdownMenuShortcut>}
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator className="my-1 bg-black/[0.06]" />

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

          <DropdownMenuSeparator className="my-1 bg-black/[0.06]" />

          <DropdownMenuItem className="gap-2.5 px-2 py-1.5 text-[13px] text-black/75" onSelect={() => setOpen(false)}>
            <LogOut className="size-3.5 text-black/50" /> Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {dialog && <ProfileDialog initialPage={dialog} onClose={() => setDialog(null)} />}
    </>
  )
}
