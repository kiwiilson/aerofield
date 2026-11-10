const faqs = [
  {
    question: 'O que acontece no diagnóstico?',
    answer: 'É a primeira conversa. Entendemos seu objetivo, o cenário de operação, a equipe, os riscos e o nível de maturidade atual. Com isso, conseguimos indicar o melhor caminho para sua empresa, seja iniciar no mundo dos drones, aprimorar uma operação já existente ou apoiar em vendas, entre outras frentes que temos dentro da AirNex.',
  },
  {
    question: 'Como funciona a implantação de uma solução com DJI Dock?',
    answer: 'O AirNex Deploy cobre planejamento, configuração, instalação assistida, testes, documentação e treinamento inicial, para que a operação saia do papel e chegue a uma rotina real e segura.',
  },
  {
    question: 'Vocês oferecem treinamento?',
    answer: 'Sim. O AirNex Academy reúne treinamentos online e presenciais, técnicos e comerciais: operação, software, vendas consultivas, pré-venda técnica e uso prático das soluções DJI Enterprise.',
  },
  {
    question: 'E depois da implantação, há suporte?',
    answer: 'O AirNex Care acompanha a operação para reduzir paradas, organizar rotinas, orientar manutenção, acompanhar apólices de seguro e manter equipamentos, softwares e equipes sempre prontos para operar.',
  },
  {
    question: 'Para quais setores a AirNex atua?',
    answer: 'Inspeção, mapeamento, segurança patrimonial, infraestrutura, indústria e agronegócio, seja integrador, distribuidor ou cliente final. A lógica é a mesma em todos: entender a dor, escolher o caminho certo, capacitar e criar processo.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
}

export function Faq() {
  return (
    <section id="faq" className="faq-section section-pad">
      <div className="section-heading compact">
        <p className="eyebrow">Perguntas frequentes</p>
        <h2>O que costumam perguntar antes de começar.</h2>
      </div>
      <div className="faq-list">
        {faqs.map(({ question, answer }) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  )
}
