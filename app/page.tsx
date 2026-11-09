import { BadgeCheck, BookOpenCheck, Building2, ChartNoAxesCombined, ClipboardCheck, MonitorCloud, RadioTower, ShieldCheck, Wrench } from 'lucide-react'
import Image from 'next/image'
import { Applications } from '../components/Applications'
import { ContactForm } from '../components/ContactForm'
import { CountUp } from '../components/CountUp'
import { Faq } from '../components/Faq'
import { Hero } from '../components/Hero'
import { Navbar } from '../components/Navbar'
import { ProcessRail } from '../components/ProcessRail'
import { Reveal } from '../components/Reveal'
import { ScrollProgress } from '../components/ScrollProgress'
import { SpotlightCard } from '../components/SpotlightCard'
import { WhatsAppButton } from '../components/WhatsAppButton'
import { FaInstagram } from 'react-icons/fa';


const whatsappUrl = 'https://wa.me/5511991908358'

const services = [
  {
    icon: Building2,
    name: 'AirNex Deploy',
    title: 'Implantação completa de soluções DJI Dock.',
    text: 'Planejamento, configuração, instalação assistida, testes, documentação e treinamento inicial para colocar operações com DJI Dock em funcionamento com segurança e clareza.',
    detail: 'Para empresas que precisam sair da compra do equipamento e chegar a uma rotina operacional real.',
  },
  {
    icon: Wrench,
    name: 'AirNex Care',
    title: 'Suporte, manutenção e continuidade operacional.',
    text: 'Acompanhamento técnico para reduzir paradas, organizar rotinas, orientar manutenção, apoiar seguros e manter equipamentos, softwares e equipes prontos para operar.',
    detail: 'Para operações que não podem depender de improviso quando surge uma dúvida, falha ou mudança de processo.',
  },
  {
    icon: BookOpenCheck,
    name: 'AirNex Academy',
    title: 'Capacitação técnica e comercial.',
    text: 'Treinamentos online e presenciais para operação, software, vendas consultivas, pré-venda técnica e uso prático das soluções DJI Enterprise.',
    detail: 'Para times que precisam entender o produto, explicar valor e usar a tecnologia com domínio.',
  },
  {
    icon: ChartNoAxesCombined,
    name: 'Drone Business Accelerator',
    title: 'Desenvolvimento da vertical de drones para empresas.',
    text: 'Pesquisa de mercado, mapeamento de oportunidades, definição de segmentos, abordagem comercial, lista de contas-alvo e plano de ação para criar ou acelerar uma operação de drones.',
    detail: 'Para empresas que querem entrar no mercado, abrir uma nova frente ou transformar conhecimento técnico em negócio.',
  },
]

const products = [
  {
    name: 'DJI Dock 3',
    category: 'Operação remota',
    image: '/media/dock3.webp',
    text: 'Base para operações automatizadas e recorrentes, com foco em monitoramento, inspeção e resposta remota.',
  },
  {
    name: 'Matrice 4E',
    category: 'Mapeamento e inspeção',
    image: '/media/matrice4e.webp',
    text: 'Plataforma compacta para captura técnica, inspeções e aplicações que exigem precisão em campo.',
  },
  {
    name: 'Matrice 4T',
    category: 'Termal e segurança',
    image: '/media/matrice4t.webp',
    text: 'Solução versátil para segurança, busca, inspeção e cenários que combinam visão visual e termal.',
  },
  {
    name: 'Matrice 400',
    category: 'Operações complexas',
    image: '/media/matrice400.webp',
    text: 'Equipamento para missões robustas, payloads avançados e operações de maior complexidade e exigência nos resultados.',
  },
  {
    name: 'Mavic 3M',
    category: 'Agronegócio',
    image: '/media/mavic3m.webp',
    text: 'Drone multispectral para leitura de áreas, acompanhamento agrícola e tomada de decisão baseada em dados.',
  },
  {
    name: 'Software e integrações',
    category: 'FlightHub 2 & DJI Terra',
    image: '/media/software.webp',
    text: 'Configuração, treinamento e integração de softwares para transformar voo, dados e gestão em rotina operacional.',
  },
]

const steps: readonly (readonly [string, string, string])[] = [
  ['01', 'Diagnóstico', 'Entendemos objetivo, cenário, equipe, risco e maturidade atual.'],
  ['02', 'Desenho da solução', 'Definimos tecnologia, processo, responsáveis e critérios de sucesso.'],
  ['03', 'Implantação', 'Apoiamos configuração, instalação, testes e documentação.'],
  ['04', 'Capacitação', 'Treinamos equipe técnica, comercial ou operacional conforme o projeto.'],
  ['05', 'Acompanhamento', 'Ajustamos a operação, resolvemos dúvidas e indicamos próximos passos.'],
]

const proofNumbers: readonly (readonly [number, string])[] = [
  [5, 'anos de experiência acumulada'],
  [100, 'treinamentos realizados'],
  [300, 'pessoas capacitadas'],
  [30, 'projetos privados implantados'],
  [10, 'editais públicos escritos'],
]

const projects = [
  {
    title: 'DJI Dock 2 em haras no RJ',
    text: 'Implantação com treinamento operacional para 7 pessoas da equipe, focada em rotina prática e uso seguro.',
  },
  {
    title: 'Treinamento DJI Terra para CPFL',
    text: 'Capacitação de software com foco em usabilidade, fluxo de dados e aplicação prática na operação.',
  },
]

export default function Home() {
  return (
    <main id="conteudo">
      <ScrollProgress />
      <Navbar />

      <Hero />

      <section id="servicos" className="services-section section-pad">
        <div className="section-heading compact">
          <p className="eyebrow">Serviços</p>
          <h2>Quatro frentes para transformar tecnologia em operação e negócio.</h2>
        </div>
        <div className="services-grid">
          {services.map(({ icon: Icon, name, title, text, detail }) => (
            <article className="service-card" key={name}>
              <div className="service-label"><Icon size={24} /><span>{name}</span></div>
              <h3>{title}</h3>
              <p>{text}</p>
              <small>{detail}</small>
            </article>
          ))}
        </div>
      </section>

      <section id="produtos" className="products-section section-pad">
        <div className="section-heading">
          <p className="eyebrow">Produtos e ecossistema</p>
          <h2>Conhecimento aplicado ao portfólio DJI Enterprise.</h2>
          <p className="section-copy">Não tratamos produto como catálogo. Organizamos drones, Dock, payloads e softwares em função da aplicação, da equipe e do processo que precisam existir ao redor.</p>
        </div>
        <div className="products-grid">
          {products.map((product) => (
            <SpotlightCard className="product-card" key={product.name}>
              <div className="product-image"><Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 380px" /></div>
              <div className="product-content"><span>{product.category}</span><h3>{product.name}</h3><p>{product.text}</p></div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      <Applications />

      <section id="o-que-fazemos" className="process-section section-pad">
        <div className="section-heading compact">
          <p className="eyebrow">O que fazemos</p>
          <h2>Um método simples para tirar a solução do papel.</h2>
        </div>
        <ProcessRail steps={steps} />
      </section>

      <section id="experiencia" className="proof-section section-pad">
        <div className="proof-head"><p className="eyebrow">Experiência</p><h2>Vivência real em treinamento, implantação e projetos.</h2></div>
        <div className="metrics-grid">
          {proofNumbers.map(([number, label]) => <article className="metric-card" key={label}><CountUp value={number} suffix="+" /><span>{label}</span></article>)}
        </div>
        <div className="project-grid">
          {projects.map((project) => <article key={project.title}><BadgeCheck size={24} /><h3>{project.title}</h3><p>{project.text}</p></article>)}
        </div>
      </section>

      <section id="quem-somos" className="team-section section-pad">
        <div className="team-copy">
          <p className="eyebrow">Quem somos</p>
          <h2>Visão comercial com proximidade técnica.</h2>
          <p>A AirNex nasce para apoiar empresas que querem aplicar soluções DJI Enterprise com menos incerteza. Atuamos entre campo, software, treinamento e estratégia para transformar tecnologia em operação.</p>
        </div>
        <article className="founder-card">
          <Reveal className="founder-photo"><Image src="/team/camila.webp" alt="Camila Freitas, CEO da AirNex" fill sizes="(max-width: 640px) 260px, 230px" /></Reveal>
          <div><span>CEO</span><h3>Camila Freitas</h3><p>À frente da estratégia comercial e do relacionamento com clientes, conectando necessidade, proposta de valor e oportunidade.</p></div>
        </article>
      </section>

      <Faq />

      <section id="contato" className="contact-section section-pad">
        <div className="contact-copy">
          <p className="eyebrow">Contato</p>
          <h2>Conte onde você quer chegar.</h2>
          <p>Preencha o formulário ou chame pelo WhatsApp. Vamos entender seu cenário e indicar se faz sentido seguir por implantação, suporte, capacitação ou desenvolvimento de mercado.</p>
          <div className="contact-actions">
          <a className="button button-secondary" href={whatsappUrl} target="_blank" rel="noreferrer">Fale conosco pelo WhatsApp</a>
          <a className="button button-instagram" href="https://www.instagram.com/airnexsolutions/" target="_blank" rel="noopener noreferrer"><FaInstagram size={20} aria-hidden="true" /> Siga @airnexsolutions</a>
          </div>
        </div>
        <ContactForm />
      </section>

      <footer className="footer">
        <div><strong>AirNex</strong><p>Soluções DJI Enterprise que chegam à operação.</p></div>
        <nav aria-label="Links do rodapé"><a href="#servicos">Serviços</a><a href="#produtos">Produtos</a><a href="#aplicacoes">Aplicações</a><a href="#o-que-fazemos">O Que Fazemos</a><a href="#quem-somos">Quem Somos</a><a href="#faq">FAQ</a><a href="#contato">Contato</a></nav>
      </footer>

      <WhatsAppButton />
    </main>
  )
}
