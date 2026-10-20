import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * 顶部路由进度条(L1 视觉模拟 + hashchange 接线)
 * 三段式: 0→30 快冲 / 30→80 trickle 慢爬 / 80→100 加速冲完淡出
 */
export default function RouteProgress() {
  const [width, setWidth] = useState(0)
  const [visible, setVisible] = useState(false)
  const pct = useRef(0)
  const phase = useRef('idle')
  const timers = useRef([])

  useEffect(() => {
    const later = (fn, ms) => timers.current.push(setTimeout(fn, ms))
    const clearAll = () => { timers.current.forEach(clearTimeout); timers.current = [] }

    const tick = () => {
      if (phase.current !== 'run') return
      pct.current = Math.min(pct.current + 6 + Math.random() * 10, 80)
      setWidth(pct.current)
      later(tick, 160 + Math.random() * 160)
    }

    const start = () => {
      clearAll()
      phase.current = 'run'
      pct.current = 0
      setWidth(0)
      setVisible(true)
      later(() => {
        pct.current = 28 // 第一段:快冲
        setWidth(28)
        later(tick, 120)
      }, 30)
    }

    const done = () => {
      // 不取消进行中的 trickle;延迟收尾,让它露出来(L1 模拟页面工作)
      later(() => {
        if (phase.current !== 'run') return
        phase.current = 'done'
        setWidth(100) // 第三段:加速冲完
        later(() => setVisible(false), 250) // 淡出
        later(() => { setWidth(0); phase.current = 'idle' }, 500)
      }, 240)
    }

    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]')
      if (!a || !a.getAttribute('href')) return
      if (a.getAttribute('href') === window.location.hash) return
      start()
    }
    const onHash = () => done()

    document.addEventListener('click', onClick, true)
    window.addEventListener('hashchange', onHash)
    return () => {
      clearAll()
      document.removeEventListener('click', onClick, true)
      window.removeEventListener('hashchange', onHash)
    }
  }, [])

  return (
    <div
      aria-hidden
      className={cn(
        'fixed left-0 top-0 z-[999] h-[3px] rounded-r-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 shadow-[0_0_8px_rgba(99,102,241,0.55)] transition-[width,opacity] duration-300 ease-out',
        visible ? 'opacity-100' : 'opacity-0',
      )}
      style={{ width: `${width}%` }}
    />
  )
}
