import { BadgeCheck, BookOpenCheck, Building2, GraduationCap, Handshake, RadioTower } from 'lucide-react'
import { ContactForm } from '../components/ContactForm'
import { GoogleReviews } from '../components/GoogleReviews'

const navItems = [
  ['O que fazemos', '#o-que-fazemos'],
  ['Nossos produtos', '#produtos'],
  ['O que falam de nós', '#prova'],
  ['Quem somos', '#quem-somos'],
  ['Entrar em contato', '#contato'],
]

const team = [
  { name: 'Camila Freitas', role: 'Gerente comercial', image: '/team/camila.jpg' },
  { name: 'Alex Alves', role: 'Piloto / Analista técnico comercial', image: '/team/alex.jpg' },
  { name: 'Victor Blanco', role: 'Piloto / Analista técnico comercial', image: '/team/victor.jpg' },
  { name: 'Caio de Lima', role: 'Piloto / Analista técnico comercial', image: '/team/caio.jpg' },
]

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <a href="#inicio" className="brand" aria-label="Início"><span className="brand-mark">AF</span><span>Aero Field</span></a>
        <nav aria-label="Menu principal">{navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
      </header>

      <section id="inicio" className="section hero">
        <div className="hero-copy">
          <p className="eyebrow">DJI Enterprise • canais • treinamento • projetos</p>
          <h1>Mais preparo para vender, implantar e dominar soluções enterprise.</h1>
          <p className="lead">Ajudamos revendas e integradores a estruturarem operação comercial, técnica e de capacitação em produtos DJI Enterprise. Também apoiamos clientes finais que precisam extrair mais valor das soluções que já compraram.</p>
          <div className="hero-actions"><a className="primary" href="#contato">Quero conversar</a><a className="secondary" href="#o-que-fazemos">Ver atuação</a></div>
        </div>
        <div className="hero-card" aria-label="Placeholder visual">
          <div className="drone-placeholder"><RadioTower size={52} /><span>Imagem/hero DJI Enterprise</span></div>
          <div className="metric-row"><strong>Revendas</strong><span>go-to-market, pré-vendas e pós-vendas</span></div>
          <div className="metric-row"><strong>Clientes finais</strong><span>treinamento, operação e maestria</span></div>
        </div>
      </section>

      <section id="o-que-fazemos" className="section split warm">
        <div><p className="eyebrow">O que fazemos</p><h2>Duas frentes, uma operação mais madura.</h2><p>O foco principal é apoiar empresas que querem vender, integrar ou desenvolver negócios com DJI Enterprise. Em paralelo, atendemos clientes finais que precisam treinar equipes, entender aplicações e operar com mais segurança.</p></div>
        <div className="cards two"><article><Handshake /><h3>Para revendas e integradores</h3><p>Estruturação de portfólio, posicionamento, capacitação comercial, suporte técnico de pré-vendas e apoio em oportunidades complexas, desde reuniões remotas até viagens para instalação e validação da solução.</p></article><article><GraduationCap /><h3>Para clientes finais</h3><p>Treinamentos, workshops e consultoria para equipes que querem sair do uso básico e chegar a uma operação consistente e confiável, utilizando 100% de todos os equipamentos e softwares disponíveis para se destacar ainda mais no mercado.</p></article></div>
      </section>

      <section id="produtos" className="section dark products">
        <div className="section-heading"><p className="eyebrow">Nossos produtos</p><h2>Ecossistema DJI Enterprise, software e serviços ao redor.</h2></div>
        <div className="product-grid"><article><Building2 /><h3>Drones enterprise</h3><p>Matrice 4E/4T, Mavic 3 Multispectral, Matrice 400 e todos os payloads compatíveis.</p></article><article><RadioTower /><h3>Docks e operação remota</h3><p>Projetos com Dock 2 e Dock 3, tanto para monitoramento quanto para inspeções.</p></article><article><BookOpenCheck /><h3>Software e gestão</h3><p>FlightHub 2, DJI Terra, e também fora do universo de drones como sistemas de gestão e monitoramento.</p></article><article><BadgeCheck /><h3>Capacitação</h3><p>Treinamentos comerciais, técnicos e operacionais para times internos e parceiros. Atendendo desde a revenda até o cliente final.</p></article></div>
      </section>

      <section id="prova" className="section reviews-section">
        <div className="reviews-heading">
          <p className="eyebrow">Avaliações no Google</p>
          <h2>O que falam de nós.</h2>
          <p>Feedbacks publicados por clientes no Google. As avaliações são atualizadas automaticamente.</p>
        </div>
        <GoogleReviews />
      </section>

      <section id="quem-somos" className="section split about">
        <div className="about-copy"><p className="eyebrow">Quem somos</p><h2>Um time próximo do campo, da venda e da operação.</h2><p>Somos uma equipe com conhecimento amplo do ecossistema DJI Enterprise no Brasil. Atuamos entre o comercial e o técnico: traduzimos produto em aplicação, aplicação em projeto e projeto em uma operação viável. Acompanhamos cada etapa para gerar resultados melhores, tanto para clientes finais quanto para equipes internas.</p></div>
        <div className="team-grid" aria-label="Equipe Aero Field">
          {team.map((member) => (
            <article className="team-card" key={member.name}>
              <div className="team-photo">
                <img src={member.image} alt={`Foto de ${member.name}`} />
              </div>
              <div className="team-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contato" className="section contact">
        <div className="contact-copy"><p className="eyebrow">Entrar em contato</p><h2>Conte onde você quer chegar.</h2><p>Se você é revenda, integrador ou cliente final, preencha o formulário ao lado. Estamos à disposição para apoiar suas demandas e dar o pontapé inicial nessa parceria.</p></div>
        <ContactForm />
      </section>
    </main>
  )
}
