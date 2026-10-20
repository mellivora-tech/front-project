import { useEffect, useRef, useState } from 'react'
import {
  X, UserRound, Building2, Users, CreditCard, SlidersHorizontal, Upload,
} from 'lucide-react'
import { useProfile, saveProfile, DEFAULT_PROFILE } from './profile.js'
import { cn } from '@/lib/utils'

const NAV = [
  { id: 'profile', icon: UserRound, label: 'Profile' },
  { id: 'workspace', icon: Building2, label: 'Workspace' },
  { id: 'team', icon: Users, label: 'Team' },
  { id: 'billing', icon: CreditCard, label: 'Billing' },
  { id: 'preferences', icon: SlidersHorizontal, label: 'Preferences' },
]

const STUBS = {
  workspace: ['Workspace', 'Workspace name, domain and default sharing.'],
  team: ['Team', 'Invite teammates and manage roles.'],
  billing: ['Billing', 'Plan, invoices and payment method.'],
  preferences: ['Preferences', 'Notifications, language and accessibility.'],
}

const Field = ({ label, hint, children }) => (
  <div className="grid grid-cols-[240px_1fr] items-start gap-6">
    <div>
      <div className="text-[13px] font-semibold tracking-tight">{label}</div>
      {hint && <div className="mt-0.5 text-xs text-black/45">{hint}</div>}
    </div>
    <div>{children}</div>
  </div>
)

const inputCls =
  'h-9 w-full rounded-lg border border-black/[0.1] bg-white px-3 text-[13px] outline-none transition-shadow focus:ring-2 focus:ring-black/15'
const selectCls = cn(inputCls, 'appearance-none bg-[url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23777%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E)] bg-[position:right_10px_center] bg-no-repeat pr-8')

export default function ProfileDialog({ onClose, initialPage = 'profile' }) {
  const [profile, setProfile] = useProfile()
  const [page, setPage] = useState(initialPage)
  const [form, setForm] = useState(profile)
  const [saved, setSaved] = useState(false)
  const fileRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const set = (patch) => setForm((f) => ({ ...f, ...patch }))

  const upload = (file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setForm((f) => ({ ...f, avatar: reader.result }))
      setProfile(saveProfile({ avatar: reader.result }))
    }
    reader.readAsDataURL(file)
  }

  const save = () => {
    setProfile(saveProfile(form))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const stub = STUBS[page]

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/[0.18] backdrop-blur-[2px]"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="grid h-[640px] w-[920px] max-w-[94vw] grid-cols-[200px_1fr] overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-2xl">
        {/* 左导航 */}
        <aside className="space-y-0.5 border-r border-black/[0.06] p-3">
          {NAV.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setPage(id)}
              className={cn(
                'flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[13px] text-black/60 transition-colors hover:bg-black/[0.04] hover:text-ink',
                page === id && 'bg-black/[0.06] font-semibold text-ink hover:bg-black/[0.06]',
              )}
            >
              <Icon className="size-3.5" /> {label}
            </button>
          ))}
        </aside>

        {/* 内容 */}
        <div className="flex min-h-0 flex-col">
          <header className="flex items-center justify-between px-6 pt-5">
            <div>
              <h2 className="text-[15px] font-semibold tracking-tight">{stub ? stub[0] : 'Profile'}</h2>
              <p className="mt-0.5 text-[13px] text-black/50">{stub ? stub[1] : 'How you appear to teammates.'}</p>
            </div>
            <button onClick={onClose} className="grid size-7 place-items-center rounded-lg text-black/50 hover:bg-black/[0.05] hover:text-ink">
              <X className="size-4" />
            </button>
          </header>

          {page === 'profile' ? (
            <div className="scroll-slim grid flex-1 gap-6 overflow-auto px-6 py-6">
              <Field label="Profile Photo" hint="Shown on boards and docs.">
                <div className="flex items-center gap-2.5">
                  <img src={form.avatar} alt="" className="size-10 rounded-full object-cover" />
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="flex items-center gap-1.5 rounded-lg border border-black/[0.12] px-2.5 py-1.5 text-xs font-medium hover:bg-black/[0.04]"
                  >
                    <Upload className="size-3" /> Change
                  </button>
                  <button
                    onClick={() => { set({ avatar: DEFAULT_PROFILE.avatar }); setProfile(saveProfile({ avatar: DEFAULT_PROFILE.avatar })) }}
                    className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-black/55 hover:bg-black/[0.04]"
                  >
                    Remove
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => upload(e.target.files?.[0])} />
                </div>
              </Field>

              <Field label="Full Name" hint="What teammates see in @mentions.">
                <input value={form.name} onChange={(e) => set({ name: e.target.value })} className={inputCls} />
              </Field>

              <Field
                label={<span className="flex items-center gap-1.5">Email Address <span className="rounded-full bg-[#e6f6ec] px-1.5 py-px text-[10px] font-semibold text-[#15803d]">Verified</span></span>}
                hint="Used for sign-in and your summary."
              >
                <input value={form.email} onChange={(e) => set({ email: e.target.value })} className={inputCls} />
              </Field>

              <Field label="Username" hint="Used in your email and links.">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-black/35">@</span>
                  <input value={form.username} onChange={(e) => set({ username: e.target.value })} className={cn(inputCls, 'pl-7')} />
                </div>
              </Field>

              <Field label={<span className="flex items-center gap-1">Public Details</span>} hint="Shown with your name.">
                <div className="grid gap-4">
                  <div>
                    <div className="mb-1.5 text-xs font-medium text-black/60">Role</div>
                    <select value={form.role} onChange={(e) => set({ role: e.target.value })} className={selectCls}>
                      {['Head of product design', 'Product designer', 'Engineer', 'Product manager', 'Founder'].map((r) => <option key={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <div className="mb-1.5 text-xs font-medium text-black/60">Time zone</div>
                    <select value={form.timezone} onChange={(e) => set({ timezone: e.target.value })} className={selectCls}>
                      {['UTC', 'Asia/Shanghai', 'Europe/London', 'America/New_York', 'America/Los_Angeles'].map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <div className="mb-1.5 text-xs font-medium text-black/60">Website</div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-black/35">https://</span>
                      <input value={form.website} onChange={(e) => set({ website: e.target.value })} className={cn(inputCls, 'pl-14')} />
                    </div>
                  </div>
                </div>
              </Field>

              <Field label="Bio" hint="Short profile summary.">
                <textarea
                  value={form.bio}
                  onChange={(e) => set({ bio: e.target.value })}
                  rows={4}
                  className="w-full resize-y rounded-lg border border-black/[0.1] bg-white px-3 py-2 text-[13px] leading-relaxed outline-none transition-shadow focus:ring-2 focus:ring-black/15"
                />
              </Field>
            </div>
          ) : (
            <div className="grid flex-1 place-items-center px-6 py-16 text-[13px] text-black/40">
              {stub[0]} settings go here.
            </div>
          )}

          <footer className="flex items-center justify-end gap-2 border-t border-black/[0.06] px-6 py-3.5">
            <button
              onClick={() => { setForm(profile); onClose() }}
              className="rounded-lg border border-black/[0.1] px-3.5 py-1.5 text-[13px] font-medium text-black/70 hover:bg-black/[0.04]"
            >
              Cancel
            </button>
            <button
              onClick={save}
              className={cn(
                'rounded-lg px-3.5 py-1.5 text-[13px] font-medium text-white transition-colors',
                saved ? 'bg-[#12b76a]' : 'bg-ink hover:bg-black/85',
              )}
            >
              {saved ? '已保存' : 'Save changes'}
            </button>
          </footer>
        </div>
      </div>
    </div>
  )
}
