'use client'

import { useEffect, useRef, useState } from 'react'

type Step = readonly [string, string, string]

const WIDTH = 1000
const HEIGHT = 100

function pathY(x: number) {
  return HEIGHT / 2 + 26 * Math.sin((x / WIDTH) * Math.PI * 5)
}

const pathD = Array.from({ length: 101 }, (_, index) => {
  const x = (index / 100) * WIDTH
  return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)} ${pathY(x).toFixed(1)}`
}).join(' ')

export function ProcessRail({ steps }: { steps: readonly Step[] }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const clipRef = useRef<SVGRectElement>(null)
  const droneRef = useRef<HTMLSpanElement>(null)
  const [lit, setLit] = useState(steps.length)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let current = -1

    function apply(progress: number) {
      const x = progress * WIDTH
      clipRef.current?.setAttribute('width', x.toFixed(1))
      const drone = droneRef.current
      if (drone) {
        const slope = (pathY(Math.min(WIDTH, x + 4)) - pathY(Math.max(0, x - 4))) / 8
        drone.style.left = `${(x / WIDTH) * 100}%`
        drone.style.top = `${(pathY(x) / HEIGHT) * 100}%`
        drone.style.transform = `translate(-50%, -50%) rotate(${(slope * 8).toFixed(1)}deg)`
      }
      const count = steps.filter((_, index) => x >= ((index + 0.5) / steps.length) * WIDTH - 18).length
      if (count !== current) {
        current = count
        setLit(count)
      }
    }

    function update() {
      frame = 0
      const box = wrap!.getBoundingClientRect()
      const viewport = window.innerHeight
      const progress = (viewport * 0.85 - box.top) / (box.height + viewport * 0.3)
      apply(Math.min(1, Math.max(0, progress)))
    }

    function onScroll() {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    if (reduced) {
      apply(1)
      return
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [steps])

  return (
    <div className="process-flight" ref={wrapRef}>
      <div className="flight-track" aria-hidden="true">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="none">
          <defs>
            <clipPath id="flight-clip"><rect ref={clipRef} x="0" y="0" width="0" height={HEIGHT} /></clipPath>
          </defs>
          <path className="flight-base" d={pathD} vectorEffect="non-scaling-stroke" />
          <path className="flight-lit" d={pathD} vectorEffect="non-scaling-stroke" clipPath="url(#flight-clip)" />
        </svg>
        {steps.map(([number], index) => {
          const x = ((index + 0.5) / steps.length) * WIDTH
          return <i key={number} className={index < lit ? 'flight-node is-lit' : 'flight-node'} style={{ left: `${(x / WIDTH) * 100}%`, top: `${(pathY(x) / HEIGHT) * 100}%` }} />
        })}
        <span className="flight-drone" ref={droneRef}>
          <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="12" cy="12" r="2.6" fill="currentColor" />
            <path d="M10 10 5.5 5.5M14 10l4.5-4.5M10 14l-4.5 4.5M14 14l4.5 4.5" />
            <circle cx="5" cy="5" r="2.2" /><circle cx="19" cy="5" r="2.2" /><circle cx="5" cy="19" r="2.2" /><circle cx="19" cy="19" r="2.2" />
          </svg>
        </span>
      </div>

      <div className="process-rail">
        {steps.map(([number, title, text], index) => (
          <article key={number} className={index < lit ? 'is-lit' : ''}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
        ))}
      </div>
    </div>
  )
}
