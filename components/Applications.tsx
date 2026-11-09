'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'

const applications = [
  { title: 'Inspeção', image: '/media/matrice400.webp', text: 'Rotinas para ativos, estruturas, áreas remotas e ambientes com necessidade de evidência visual.' },
  { title: 'Mapeamento', image: '/media/software.webp', text: 'Fluxos com captura, processamento e leitura dos dados para apoiar decisões técnicas.' },
  { title: 'Segurança patrimonial', image: '/media/matrice4t.webp', text: 'Monitoramento aéreo, resposta visual e apoio a perímetros extensos ou pontos cegos.' },
  { title: 'Infraestrutura', image: '/media/matrice4e.webp', text: 'Acompanhamento de obras, ativos, vias, redes, plantas e áreas operacionais críticas.' },
  { title: 'Indústria', image: '/media/dock3.webp', text: 'Aplicações para operação, segurança, inspeção, documentação e melhoria de processos.' },
  { title: 'Agronegócio', image: '/media/mavic3m.webp', text: 'Uso de drones e sensores para leitura de áreas, produtividade e acompanhamento técnico.' },
]

export function Applications() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = applications.length - 1
    let next = index
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = index === last ? 0 : index + 1
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = index === 0 ? last : index - 1
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = last
    else return
    event.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  const current = applications[active]

  return (
    <section id="aplicacoes" className="applications-section section-pad">
      <div className="applications-intro">
        <p className="eyebrow">Aplicações</p>
        <h2>Onde drone vira resultado operacional.</h2>
        <p>As aplicações mudam por setor, mas a lógica é a mesma: entender a dor, escolher a tecnologia certa, capacitar a equipe e criar processo.</p>
        <div className="app-tabs" role="tablist" aria-label="Aplicações" aria-orientation="vertical">
          {applications.map((item, index) => (
            <button
              key={item.title}
              ref={(element) => { tabRefs.current[index] = element }}
              type="button"
              role="tab"
              id={`app-tab-${index}`}
              aria-selected={index === active}
              aria-controls="app-panel"
              tabIndex={index === active ? 0 : -1}
              className={index === active ? 'app-tab is-active' : 'app-tab'}
              onClick={() => setActive(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>{item.title}
            </button>
          ))}
        </div>
      </div>

      <div className="app-stage" id="app-panel" role="tabpanel" aria-labelledby={`app-tab-${active}`}>
        <div className="app-visual">
          {applications.map((item, index) => (
            <Image key={item.title} src={item.image} alt={index === active ? item.title : ''} aria-hidden={index !== active} fill sizes="(max-width: 980px) 100vw, 640px" className={index === active ? 'is-active' : ''} />
          ))}
        </div>
        <div className="app-caption" key={current.title}>
          <h3>{current.title}</h3>
          <p>{current.text}</p>
        </div>
      </div>
    </section>
  )
}
