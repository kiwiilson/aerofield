'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Pause, Play } from 'lucide-react'

const rotatingWords = ['inspeção', 'segurança patrimonial', 'mapeamento', 'infraestrutura', 'agronegócio']
const headlineWords = ['Do', 'drone', 'à', 'operação.']

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(query.matches)
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return reduced
}

function RotatingWord({ paused }: { paused: boolean }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (paused) return
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % rotatingWords.length), 2600)
    return () => window.clearInterval(timer)
  }, [paused])

  const past = (index - 1 + rotatingWords.length) % rotatingWords.length

  return (
    <p className="hero-rotator">
      <span>Operações de</span>
      <span className="rot-viewport" aria-hidden="true">
        {rotatingWords.map((word, position) => (
          <span key={word} className={position === index ? 'rot-word is-active' : position === past ? 'rot-word is-past' : 'rot-word'}>{word}</span>
        ))}
      </span>
      <span className="sr-only">inspeção, segurança patrimonial, mapeamento, infraestrutura e agronegócio.</span>
    </p>
  )
}

function Telemetry({ paused }: { paused: boolean }) {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (paused) return
    const timer = window.setInterval(() => setTick((current) => current + 1), 1400)
    return () => window.clearInterval(timer)
  }, [paused])

  const altitude = 118 + Math.round(Math.sin(tick / 2.2) * 4)
  const battery = Math.max(31, 94 - Math.floor(tick / 3))
  const speed = 9 + Math.round(Math.cos(tick / 1.7) * 2)
  const link = 96 + Math.round(Math.sin(tick / 3) * 2)

  const rows: [string, string][] = [
    ['Altitude', `${altitude} m`],
    ['Velocidade', `${speed} m/s`],
    ['Bateria', `${battery}%`],
    ['Conexão', `${link}%`],
  ]

  return (
    <aside className="hero-hud" aria-hidden="true">
      <div className="hud-head"><i /><span>Missão automática</span></div>
      <dl>
        {rows.map(([label, value]) => (
          <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
        ))}
      </dl>
      <small>Exemplo da telemetria durante operação</small>
    </aside>
  )
}

export function Hero() {
  const reduced = useReducedMotion()
  const [userPaused, setUserPaused] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const paused = reduced || userPaused

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (paused) {
      video.pause()
    } else {
      video.play().catch(() => undefined)
    }
  }, [paused])

  function handlePointerMove(event: React.PointerEvent<HTMLAnchorElement>) {
    const element = ctaRef.current
    if (!element || reduced || event.pointerType !== 'mouse') return
    const box = element.getBoundingClientRect()
    const dx = (event.clientX - (box.left + box.width / 2)) / box.width
    const dy = (event.clientY - (box.top + box.height / 2)) / box.height
    element.style.transform = `translate(${(dx * 10).toFixed(1)}px, ${(dy * 8).toFixed(1)}px)`
  }

  function handlePointerLeave() {
    if (ctaRef.current) ctaRef.current.style.transform = ''
  }

  return (
    <section id="inicio" className="hero-shell">
      <div className="hero-media" aria-hidden="true">
        <video ref={videoRef} src="/media/hero-dock.mp4" poster="/media/hero-poster.webp" autoPlay muted loop playsInline preload="metadata" />
      </div>

      <div className="hero-copy">
        <p className="eyebrow hero-in" style={{ '--d': '0ms' } as React.CSSProperties}>AirNex • DJI Enterprise na prática</p>
        <h1 aria-label="Do drone à operação.">
          {headlineWords.map((word, position) => (
            <span key={word}>
              <span className="word-mask" aria-hidden="true">
                <span className="word" style={{ '--i': position } as React.CSSProperties}>{word}</span>
              </span>
              {position < headlineWords.length - 1 ? ' ' : null}
            </span>
          ))}
        </h1>
        <div className="hero-in" style={{ '--d': '520ms' } as React.CSSProperties}>
          <RotatingWord paused={paused} />
          <p className="hero-lead">Implantamos, capacitamos e apoiamos empresas que querem transformar drones, Dock e softwares DJI Enterprise em operação real, equipe preparada e oportunidade de negócio.</p>
          <div className="hero-actions">
            <a ref={ctaRef} className="button button-primary" href="#contato" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>Entrar em Contato <ArrowRight size={18} aria-hidden="true" /></a>
            <a className="button button-secondary" href="#servicos">Ver serviços</a>
          </div>
        </div>
      </div>

      <Telemetry paused={paused} />

      <button type="button" className="hero-pause" onClick={() => setUserPaused((current) => !current)} aria-pressed={paused} aria-label={paused ? 'Reproduzir animações do topo' : 'Pausar animações do topo'}>
        {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
        <span>{paused ? 'Reproduzir' : 'Pausar'}</span>
      </button>
    </section>
  )
}
