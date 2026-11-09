'use client'

export function SpotlightCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (event.pointerType !== 'mouse') return
    const element = event.currentTarget
    const box = element.getBoundingClientRect()
    element.style.setProperty('--mx', `${event.clientX - box.left}px`)
    element.style.setProperty('--my', `${event.clientY - box.top}px`)
  }

  return <article className={`spotlight ${className}`} onPointerMove={handlePointerMove}>{children}</article>
}
