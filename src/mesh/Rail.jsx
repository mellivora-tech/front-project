import { Home, LayoutTemplate, Shapes, FileText, Palette } from 'lucide-react'
import UserMenu from './UserMenu.jsx'
import { cn } from '@/lib/utils'

const ITEMS = [
  { icon: Home, hash: '#home', label: 'Home' },
  { icon: LayoutTemplate, hash: '#templates', label: 'Templates' },
  { icon: Shapes, hash: null, label: 'Shapes' },
  { icon: FileText, hash: null, label: 'Docs' },
]

export default function Rail({ active }) {
  return (
    <nav className="flex w-12 flex-col items-center gap-1 py-3">
      <a href="#home" className="grid size-8 place-items-center rounded-lg bg-ink text-[11px] font-bold text-white">
        Li
      </a>
      <div className="mt-3 flex flex-col gap-1">
        {ITEMS.map(({ icon: Icon, hash, label }) => {
          const cls = cn(
            'grid size-8 place-items-center rounded-lg text-black/45 transition-colors hover:bg-black/5 hover:text-ink',
            active === label && 'bg-ink text-white hover:bg-ink hover:text-white',
          )
          return hash ? (
            <a key={label} href={hash} title={label} aria-current={active === label} className={cls}>
              <Icon className="size-4" />
            </a>
          ) : (
            <span key={label} title={label} className={cn(cls, 'cursor-default')}>
              <Icon className="size-4" />
            </span>
          )
        })}
      </div>
      <div className="mt-auto flex flex-col items-center gap-3">
        <Palette className="size-4 text-black/45" />
        <UserMenu />
      </div>
    </nav>
  )
}
