'use client'

import { useEffect, useState } from 'react'

const navItems = [
  ['Serviços', '#servicos'],
  ['Produtos', '#produtos'],
  ['Aplicações', '#aplicacoes'],
  ['O que Fazemos', '#o-que-fazemos'],
  ['Quem Somos', '#quem-somos'],
  ['Contato', '#contato'],
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const sections = navItems
      .map(([, href]) => document.getElementById(href.slice(1)))
      .filter((section): section is HTMLElement => Boolean(section))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    const hero = document.getElementById('inicio')
    const heroObserver = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setActiveId('') }, { rootMargin: '-45% 0px -50% 0px' })
    if (hero) heroObserver.observe(hero)
    return () => { observer.disconnect(); heroObserver.disconnect() }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('nav-open', isOpen)
    return () => document.body.classList.remove('nav-open')
  }, [isOpen])

  function closeMenu() {
    setIsOpen(false)
  }

  return (
    <header className="site-header">
      <a href="#inicio" className="brand" aria-label="Início" onClick={closeMenu}><span className="brand-mark"><img src='/brandmark.png' alt='AirNex' /></span><span>AirNex</span></a>
      <button type="button" className="menu-toggle" aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={isOpen} aria-controls="site-navigation" onClick={() => setIsOpen((current) => !current)}><span /><span /><span /></button>
      <nav id="site-navigation" className={isOpen ? 'site-nav is-open' : 'site-nav'} aria-label="Menu principal">
        {navItems.map(([label, href]) => <a key={href} href={href} onClick={closeMenu} aria-current={activeId === href.slice(1) ? 'true' : undefined}>{label}</a>)}
        <a className="nav-action" href="https://wa.me/5511991908358" target="_blank" rel="noreferrer" onClick={closeMenu}>Fale conosco</a>
      </nav>
    </header>
  )
}
