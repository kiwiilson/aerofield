'use client'

import { useEffect, useState } from 'react'

const navItems = [
  ['O que fazemos', '#o-que-fazemos'],
  ['Nossos produtos', '#produtos'],
  ['Quem somos', '#quem-somos'],
  ['Entrar em contato', '#contato'],
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('nav-open', isOpen)

    return () => {
      document.body.classList.remove('nav-open')
    }
  }, [isOpen])

  function closeMenu() {
    setIsOpen(false)
  }

  return (
    <header className="topbar">
      <a href="#inicio" className="brand" aria-label="Início" onClick={closeMenu}>
        <span className="brand-mark">AF</span>
        <span>Aero Field</span>
      </a>

      <button
        type="button"
        className="menu-toggle"
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={isOpen}
        aria-controls="main-navigation"
        onClick={() => setIsOpen((current) => !current)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav id="main-navigation" className={isOpen ? 'nav-menu is-open' : 'nav-menu'} aria-label="Menu principal">
        {navItems.map(([label, href]) => (
          <a key={href} href={href} onClick={closeMenu}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  )
}
