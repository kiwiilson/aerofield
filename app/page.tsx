import { BookOpenCheck, NotebookPen, MonitorCloud, ChartNoAxesCombined } from 'lucide-react'
import { ContactForm } from '../components/ContactForm'

const navItems = [
  ['O que fazemos', '#o-que-fazemos'],
  ['Nossos produtos', '#produtos'],
  ['Quem somos', '#quem-somos'],
  ['Entrar em contato', '#contato'],
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
          <h1>Mais preparo para vender, implantar e dominar soluções enterprise.</h1>
          <p className="lead">Ajudamos equipes a estruturarem operação comercial e técnica, e também atendemos clientes finais que precisam extrair mais valor das soluções que já implementaram.</p>
          <div className="hero-actions"><a className="primary" href="#contato">Quero conversar</a><a className="secondary" href="#o-que-fazemos">Ver atuação</a></div>
        </div>
        <div className="hero-card" aria-label="Placeholder visual">
          <div className="drone-placeholder"><img src="/dock3.jpg" alt="Imagem/hero DJI Enterprise" width={540} height={390} /></div>

        </div>
      </section>

      <section id="o-que-fazemos" className="section split warm">
        <div><p className="eyebrow">O que fazemos</p><h2>Entendemos seu mercado, seu time, sua operação e desenhamos o melhor caminho.</h2></div>
        <div className="cards">
          <article><h3>Você pede, a gente atende!</h3>
            <p>Estamos aqui para ajudar sua equipe a alcançar os objetivos com soluções personalizadas. Desde treinamentos a visitas técnicas e reuniões estratégicas para fechamento de negócios. Nosso foco é agilizar suas operações e entregar tudo o que as soluções enterprise podem oferecer.</p>
            </article>
        </div>
      </section>

      <section id="produtos" className="section dark products">
        <div className="section-heading"><p className="eyebrow">Nossos produtos</p><h2>Ecossistema DJI Enterprise completo, e muito mais.</h2></div>
        <div className="product-grid">
        <article><BookOpenCheck /><h3>Capacitação e implantação</h3><p>Treinamentos, workshops e acompanhamento técnico para equipes que querem operar com mais segurança, autonomia e eficiência, aproveitando ao máximo seus equipamentos e soluções.</p></article>
        <article><NotebookPen /><h3>Consultoria Estratégica</h3><p>Orientação estratégica e comercial para empresas que querem entender melhor o mercado, identificar oportunidades, abordar potenciais clientes e transformar conhecimento técnico em novos negócios.</p></article>
        <article><MonitorCloud /><h3>Software e Integrações</h3><p>Implantação, configuração e capacitação em softwares e plataformas para integrar tecnologias, otimizar processos e extrair o máximo valor das ferramentas disponíveis.</p></article>
        <article><ChartNoAxesCombined /><h3>Drone Business Accelerator</h3><p>Atuação estratégica ao lado da sua empresa para acelerar a entrada no mercado, identificar oportunidades, gerar potenciais negócios e estruturar uma operação comercial capaz de seguir de forma independente.</p></article>
        </div>
      </section>


      <section id="quem-somos" className="section split about">
        <div className="about-copy"><p className="eyebrow">Quem somos</p><h2>Um time próximo do campo, da venda e da operação.</h2></div>
        <div className="cards">
          <article><h3></h3>
            <p>Somos uma equipe com conhecimento amplo do ecossistema DJI Enterprise no Brasil. Atuamos entre o comercial e o técnico: traduzimos produto em aplicação, aplicação em projeto e projeto em uma operação viável. Acompanhamos cada etapa para gerar resultados melhores, tanto para clientes finais quanto para equipes internas. Tanto nosso time comercial quanto o time técnico trabalham há anos com os equipamentos DJI e são capacitados pela própria DJI. Nascemos em setembro de 2026 com o intuito de trazer inovação e excelência para o mercado brasileiro nesse setor de drones que tanto cresce.</p>
            </article>
        </div>
      </section>

      <section id="contato" className="section contact">
        <div className="contact-copy"><p className="eyebrow">Entrar em contato</p><h2>Conte onde você quer chegar.</h2><p>Preencha o formulário e vamos conversar. Estamos à disposição para apoiar suas demandas e dar o pontapé inicial nessa parceria.</p></div>
        <ContactForm />
      </section>
    </main>
  )
}
