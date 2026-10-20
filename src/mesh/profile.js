import { useEffect, useState } from 'react'

const KEY = 'mesh-profile'
export const DEFAULT_PROFILE = {
  name: 'Sienna Wells',
  username: 'sienna',
  email: 'sienna@nimbusfleet.io',
  avatar: 'https://i.pravatar.cc/112?img=47',
  role: 'Head of product design',
  timezone: 'UTC',
  website: 'nimbusfleet.example/sienna',
  bio: 'Leads design for the driver app, Route Planner included, and owns the Launch Map board. Find me in #product-launch.',
}

export function loadProfile() {
  try {
    return { ...DEFAULT_PROFILE, ...JSON.parse(localStorage.getItem(KEY) || '{}') }
  } catch {
    return DEFAULT_PROFILE
  }
}

export function saveProfile(patch) {
  const next = { ...loadProfile(), ...patch }
  localStorage.setItem(KEY, JSON.stringify(next))
  window.dispatchEvent(new CustomEvent('mesh:profile', { detail: next }))
  return next
}

/** 跨组件同步的当前用户资料(含 Rail 头像) */
export function useProfile() {
  const [profile, setProfile] = useState(loadProfile)
  useEffect(() => {
    const onCustom = (e) => setProfile(e.detail)
    const onStorage = () => setProfile(loadProfile())
    window.addEventListener('mesh:profile', onCustom)
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener('mesh:profile', onCustom)
      window.removeEventListener('storage', onStorage)
    }
  }, [])
  return [profile, saveProfile]
}

/** 预设头像库(pravatar) */
export const AVATAR_PRESETS = [47, 12, 32, 5, 45, 68, 9, 15, 25, 8, 38, 56].map(
  (id) => `https://i.pravatar.cc/112?img=${id}`,
)
