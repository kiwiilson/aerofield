import { ArrowRight, BadgeCheck, BookOpenCheck, Building2, ChartNoAxesCombined, ClipboardCheck, MonitorCloud, RadioTower, ShieldCheck, Wrench } from 'lucide-react'
import { ContactForm } from '../components/ContactForm'
import { Navbar } from '../components/Navbar'
import { WhatsAppButton } from '../components/WhatsAppButton'

const whatsappUrl = 'https://wa.me/5511991908358'

const services = [
  {
    icon: Building2,
    name: 'Aero Field Deploy',
    title: 'Implantação completa de soluções DJI Dock.',
    text: 'Planejamento, configuração, instalação assistida, testes, documentação e treinamento inicial para colocar operações com DJI Dock em funcionamento com segurança e clareza.',
    detail: 'Para empresas que precisam sair da compra do equipamento e chegar a uma rotina operacional real.',
  },
  {
    icon: Wrench,
    name: 'Aero Field Care',
    title: 'Suporte, manutenção e continuidade operacional.',
    text: 'Acompanhamento técnico para reduzir paradas, organizar rotinas, orientar manutenção, apoiar seguros e manter equipamentos, softwares e equipes prontos para operar.',
    detail: 'Para operações que não podem depender de improviso quando surge uma dúvida, falha ou mudança de processo.',
  },
  {
    icon: BookOpenCheck,
    name: 'Aero Field Academy',
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

const applications = [
  ['Inspeção', 'Rotinas para ativos, estruturas, áreas remotas e ambientes com necessidade de evidência visual.'],
  ['Mapeamento', 'Fluxos com captura, processamento e leitura dos dados para apoiar decisões técnicas.'],
  ['Segurança patrimonial', 'Monitoramento aéreo, resposta visual e apoio a perímetros extensos ou pontos cegos.'],
  ['Infraestrutura', 'Acompanhamento de obras, ativos, vias, redes, plantas e áreas operacionais críticas.'],
  ['Indústria', 'Aplicações para operação, segurança, inspeção, documentação e melhoria de processos.'],
  ['Agronegócio', 'Uso de drones e sensores para leitura de áreas, produtividade e acompanhamento técnico.'],
]

const products = [
  {
    name: 'DJI Dock 3',
    category: 'Operação remota',
    image: '/media/dock3.jpg',
    text: 'Base para operações automatizadas e recorrentes, com foco em monitoramento, inspeção e resposta remota.',
  },
  {
    name: 'Matrice 4E',
    category: 'Mapeamento e inspeção',
    image: '/media/matrice4e.jpg',
    text: 'Plataforma compacta para captura técnica, inspeções e aplicações que exigem precisão em campo.',
  },
  {
    name: 'Matrice 4T',
    category: 'Termal e segurança',
    image: '/media/matrice4t.png',
    text: 'Solução versátil para segurança, busca, inspeção e cenários que combinam visão visual e termal.',
  },
  {
    name: 'Matrice 400',
    category: 'Operações complexas',
    image: '/media/matrice400.jpg',
    text: 'Equipamento para missões robustas, payloads avançados e operações de maior complexidades e exigência nos resultados.',
  },
  {
    name: 'Mavic 3M',
    category: 'Agronegócio',
    image: '/media/mavic3m.jpg',
    text: 'Drone multispectral para leitura de áreas, acompanhamento agrícola e tomada de decisão baseada em dados.',
  },
  {
    name: 'Software e integrações',
    category: 'FlightHub 2 & DJI Terra',
    image: '/media/software.jpg',
    text: 'Configuração, treinamento e integração de softwares para transformar voo, dados e gestão em rotina operacional.',
  },
]

const steps = [
  ['01', 'Diagnóstico', 'Entendemos objetivo, cenário, equipe, risco e maturidade atual.'],
  ['02', 'Desenho da solução', 'Definimos tecnologia, processo, responsáveis e critérios de sucesso.'],
  ['03', 'Implantação', 'Apoiamos configuração, instalação, testes e documentação.'],
  ['04', 'Capacitação', 'Treinamos equipe técnica, comercial ou operacional conforme o projeto.'],
  ['05', 'Acompanhamento', 'Ajustamos a operação, resolvemos dúvidas e indicamos próximos passos.'],
]

const proofNumbers = [
  ['5+', 'anos de experiência acumulada'],
  ['100+', 'treinamentos realizados'],
  ['300+', 'pessoas capacitadas'],
  ['30+', 'projetos privados implantados'],
  ['10+', 'editais públicos escritos'],
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
    <main>
      <Navbar />

      <section id="inicio" className="hero-shell">
        <div className="hero-copy">
          <p className="eyebrow">Aero Field • DJI Enterprise na prática</p>
          <h1>Do drone à operação.</h1>
          <p className="hero-lead">Implantamos, capacitamos e apoiamos empresas que querem transformar drones, Dock e softwares DJI Enterprise em operação real, equipe preparada e oportunidade de negócio.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contato">Entre em contato <ArrowRight size={18} /></a>
            <a className="button button-secondary" href="#servicos">Ver serviços</a>
          </div>
        </div>

        <div className="hero-visual" aria-label="Vídeo de operação com DJI Dock">
          <video src="/media/hero-dock.mp4" poster="/media/hero-poster.jpg" autoPlay muted loop playsInline />
          <div className="hero-visual-panel">
            <span>Operação assistida</span>
            <strong>Implantação, treinamento e suporte para sair do equipamento e chegar ao processo.</strong>
          </div>
        </div>
      </section>

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
            <article className="product-card" key={product.name}>
              <div className="product-image"><img src={product.image} alt={product.name} /></div>
              <div className="product-content"><span>{product.category}</span><h3>{product.name}</h3><p>{product.text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section id="aplicacoes" className="applications-section section-pad">
        <div className="applications-intro">
          <p className="eyebrow">Aplicações</p>
          <h2>Onde drone vira resultado operacional.</h2>
          <p>As aplicações mudam por setor, mas a lógica é a mesma: entender a dor, escolher a tecnologia certa, capacitar a equipe e criar processo.</p>
        </div>
        <div className="applications-grid">
          {applications.map(([title, text]) => (
            <article key={title}><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section id="o-que-fazemos" className="process-section section-pad">
        <div className="section-heading compact">
          <p className="eyebrow">O que fazemos</p>
          <h2>Um método simples para tirar a solução do papel.</h2>
        </div>
        <div className="process-rail">
          {steps.map(([number, title, text]) => (
            <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section id="experiencia" className="proof-section section-pad">
        <div className="proof-head"><p className="eyebrow">Experiência</p><h2>Vivência real em treinamento, implantação e projetos.</h2></div>
        <div className="metrics-grid">
          {proofNumbers.map(([number, label]) => <article className="metric-card" key={label}><strong>{number}</strong><span>{label}</span></article>)}
        </div>
        <div className="project-grid">
          {projects.map((project) => <article key={project.title}><BadgeCheck size={24} /><h3>{project.title}</h3><p>{project.text}</p></article>)}
        </div>
      </section>

      <section id="quem-somos" className="team-section section-pad">
        <div className="team-copy">
          <p className="eyebrow">Quem somos</p>
          <h2>Visão comercial com proximidade técnica.</h2>
          <p>A Aero Field nasce para apoiar empresas que querem aplicar soluções DJI Enterprise com menos incerteza. Atuamos entre campo, software, treinamento e estratégia para transformar tecnologia em operação.</p>
        </div>
        <article className="founder-card">
          <div className="founder-photo"><img src="/team/camila.jpg" alt="Camila Freitas, CEO da Aero Field" /></div>
          <div><span>CEO</span><h3>Camila Freitas</h3><p>À frente da estratégia comercial e do relacionamento com clientes, conectando necessidade, proposta de valor e oportunidade.</p></div>
        </article>
      </section>

      <section id="contato" className="contact-section section-pad">
        <div className="contact-copy">
          <p className="eyebrow">Contato</p>
          <h2>Conte onde você quer chegar.</h2>
          <p>Preencha o formulário ou chame pelo WhatsApp. Vamos entender seu cenário e indicar se faz sentido seguir por implantação, suporte, capacitação ou desenvolvimento de mercado.</p>
          <a className="button button-secondary" href={whatsappUrl} target="_blank" rel="noreferrer">Fale conosco pelo WhatsApp</a>
        </div>
        <ContactForm />
      </section>

      <footer className="footer">
        <div><strong>Aero Field</strong><p>Soluções DJI Enterprise que chegam à operação.</p></div>
        <nav aria-label="Links do rodapé"><a href="#servicos">Serviços</a><a href="#produtos">Produtos</a><a href="#aplicacoes">Aplicações</a><a href="#como-funciona">O Que Fazemos</a><a href="#quem-somos">Quem Somos</a><a href="#contato">Contato</a></nav>
      </footer>

      <WhatsAppButton />
    </main>
  )
}
