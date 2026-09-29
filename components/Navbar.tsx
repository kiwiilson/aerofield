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

  useEffect(() => {
    document.body.classList.toggle('nav-open', isOpen)
    return () => document.body.classList.remove('nav-open')
  }, [isOpen])

  function closeMenu() {
    setIsOpen(false)
  }

  return (
    <header className="site-header">
      <a href="#inicio" className="brand" aria-label="Início" onClick={closeMenu}><span className="brand-mark">AF</span><span>Aero Field</span></a>
      <button type="button" className="menu-toggle" aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={isOpen} aria-controls="site-navigation" onClick={() => setIsOpen((current) => !current)}><span /><span /><span /></button>
      <nav id="site-navigation" className={isOpen ? 'site-nav is-open' : 'site-nav'} aria-label="Menu principal">
        {navItems.map(([label, href]) => <a key={href} href={href} onClick={closeMenu}>{label}</a>)}
        <a className="nav-action" href="https://wa.me/5511991908358" target="_blank" rel="noreferrer" onClick={closeMenu}>Fale conosco</a>
      </nav>
    </header>
  )
}
