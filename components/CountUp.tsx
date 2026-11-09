'use client'

import { useEffect, useRef, useState } from 'react'

type CountUpProps = { value: number; suffix?: string; duration?: number }

export function CountUp({ value, suffix = '', duration = 1200 }: CountUpProps) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(value)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    setShown(0)
    let frame = 0

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - t, 3)
          setShown(Math.round(value * eased))
          if (t < 1) frame = window.requestAnimationFrame(tick)
        }
        frame = window.requestAnimationFrame(tick)
      },
      { threshold: 0.6 },
    )

    observer.observe(element)
    return () => {
      observer.disconnect()
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [value, duration])

  return <strong ref={ref} aria-label={`${value}${suffix}`}><span aria-hidden="true">{shown}{suffix}</span></strong>
}
