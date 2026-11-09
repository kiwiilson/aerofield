'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { formatWhatsapp, interests, states } from '../lib/contact'

type FormState = {
  name: string
  company: string
  email: string
  whatsapp: string
  state: string
  city: string
  interest: string
  message: string
}

type Field = keyof FormState
type Errors = Partial<Record<Field, string>>

const initialState: FormState = {
  name: '',
  company: '',
  email: '',
  whatsapp: '',
  state: '',
  city: '',
  interest: interests[0],
  message: '',
}

const stepFields: Field[][] = [
  ['name', 'email', 'whatsapp'],
  ['state', 'city', 'message'],
]

const whatsappUrl = 'https://wa.me/5511991908358'

function validate(field: Field, value: string): string {
  const trimmed = value.trim()
  switch (field) {
    case 'name':
      return trimmed.length < 2 ? 'Informe seu nome.' : ''
    case 'email':
      if (!trimmed) return 'Informe seu e-mail.'
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed) ? '' : 'Esse e-mail parece incompleto. Exemplo: nome@empresa.com.br'
    case 'whatsapp': {
      if (!trimmed) return ''
      const digits = trimmed.replace(/\D/g, '')
      return digits.length >= 10 && digits.length <= 11 ? '' : 'Use o DDD e o número. Exemplo: (11) 99999-9999'
    }
    case 'state':
      return trimmed ? '' : 'Selecione o estado.'
    case 'city':
      return trimmed ? '' : 'Informe a cidade.'
    case 'message':
      return trimmed.length > 2000 ? 'Use até 2000 caracteres.' : ''
    default:
      return ''
  }
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<Errors>({})
  const [step, setStep] = useState(0)
  const [cities, setCities] = useState<string[]>([])
  const [isLoadingCities, setIsLoadingCities] = useState(false)
  const [citiesFailed, setCitiesFailed] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [submitError, setSubmitError] = useState('')
  const [honeypot, setHoneypot] = useState('')

  useEffect(() => {
    if (!form.state) {
      setCities([])
      setCitiesFailed(false)
      return
    }

    const controller = new AbortController()
    setIsLoadingCities(true)
    setCitiesFailed(false)

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${form.state}/municipios?orderBy=nome`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('IBGE indisponível')
        return response.json() as Promise<{ nome: string }[]>
      })
      .then((data) => setCities(data.map((city) => city.nome)))
      .catch((error) => {
        if (error.name === 'AbortError') return
        setCities([])
        setCitiesFailed(true)
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoadingCities(false)
      })

    return () => controller.abort()
  }, [form.state])

  function update(field: Field, value: string) {
    setForm((current) => (field === 'state' ? { ...current, state: value, city: '' } : { ...current, [field]: value }))
    if (errors[field]) setErrors((current) => ({ ...current, [field]: validate(field, value) }))
  }

  function blur(field: Field) {
    setErrors((current) => ({ ...current, [field]: validate(field, form[field]) }))
  }

  function focusField(field: Field) {
    window.setTimeout(() => document.getElementById(`field-${field}`)?.focus(), 0)
  }

  function goNext() {
    const found: Errors = {}
    stepFields[0].forEach((field) => {
      const message = validate(field, form[field])
      if (message) found[field] = message
    })
    setErrors((current) => ({ ...current, ...found }))
    const firstInvalid = stepFields[0].find((field) => found[field])
    if (firstInvalid) {
      focusField(firstInvalid)
      return
    }
    setStep(1)
    focusField('state')
  }

  function goBack() {
    setStep(0)
    focusField('name')
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (step === 0) {
      goNext()
      return
    }

    const found: Errors = {}
    ;(['name', 'email', 'whatsapp', 'state', 'city', 'message'] as Field[]).forEach((field) => {
      const message = validate(field, form[field])
      if (message) found[field] = message
    })
    setErrors(found)
    const firstInvalid = (Object.keys(found) as Field[])[0]
    if (firstInvalid) {
      if (stepFields[0].includes(firstInvalid)) setStep(0)
      focusField(firstInvalid)
      return
    }

    setStatus('sending')
    setSubmitError('')

    try {
      const response = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          state_name: states.find(([abbreviation]) => abbreviation === form.state)?.[1] ?? '',
          website: honeypot,
        }),
      })
      const data = (await response.json().catch(() => ({}))) as { error?: string }
      if (!response.ok) throw new Error(data.error || 'Não conseguimos enviar agora.')
      setStatus('success')
      setForm(initialState)
      setStep(0)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Não conseguimos enviar agora.')
      setStatus('error')
    }
  }

  function fieldProps(field: Field) {
    return {
      id: `field-${field}`,
      'aria-invalid': errors[field] ? (true as const) : undefined,
      'aria-describedby': errors[field] ? `error-${field}` : undefined,
    }
  }

  const error = (field: Field) => (errors[field] ? <span className="field-error" id={`error-${field}`}>{errors[field]}</span> : null)

  if (status === 'success') {
    return (
      <div className="contact-form form-done" role="status">
        <svg viewBox="0 0 52 52" width="56" height="56" aria-hidden="true">
          <circle cx="26" cy="26" r="24" fill="none" stroke="currentColor" strokeWidth="2.5" className="done-ring" />
          <path d="M15 27l8 8 14-16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="done-check" />
        </svg>
        <h3>Contato recebido.</h3>
        <p>Vamos analisar seu cenário e retornar em breve. Se preferir adiantar a conversa, chame no WhatsApp.</p>
        <div className="done-actions">
          <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">Conversar no WhatsApp</a>
          <button type="button" className="button-ghost" onClick={() => setStatus('idle')}>Enviar outro contato</button>
        </div>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-steps" aria-hidden="true">
        <span className="is-on" /><span className={step === 1 ? 'is-on' : ''} />
      </div>
      <p className="form-step-label" aria-live="polite">Etapa {step + 1} de 2 · {step === 0 ? 'Como falar com você' : 'Sobre o seu projeto'}</p>

      <input className="hp-field" tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} />

      {step === 0 && (
        <div className="form-panel" key="step-1">
          <div className="form-grid">
            <label>
              Nome
              <input {...fieldProps('name')} autoComplete="name" required value={form.name} onChange={(event) => update('name', event.target.value)} onBlur={() => blur('name')} />
              {error('name')}
            </label>

            <label>
              <span>Empresa <small>(opcional)</small></span>
              <input id="field-company" autoComplete="organization" value={form.company} onChange={(event) => update('company', event.target.value)} />
            </label>

            <label>
              E-mail
              <input {...fieldProps('email')} type="email" inputMode="email" autoComplete="email" required value={form.email} onChange={(event) => update('email', event.target.value)} onBlur={() => blur('email')} />
              {error('email')}
            </label>

            <label>
              <span>WhatsApp <small>(opcional)</small></span>
              <input {...fieldProps('whatsapp')} type="tel" inputMode="tel" autoComplete="tel-national" placeholder="(11) 99999-9999" value={form.whatsapp} onChange={(event) => update('whatsapp', formatWhatsapp(event.target.value))} onBlur={() => blur('whatsapp')} />
              {error('whatsapp')}
            </label>
          </div>
          <button type="button" onClick={goNext}>Continuar <ArrowRight size={18} aria-hidden="true" /></button>
        </div>
      )}

      {step === 1 && (
        <div className="form-panel" key="step-2">
          <div className="form-grid">
            <label>
              Estado
              <select {...fieldProps('state')} required value={form.state} onChange={(event) => update('state', event.target.value)} onBlur={() => blur('state')}>
                <option value="">Selecione o estado</option>
                {states.map(([abbreviation, name]) => <option key={abbreviation} value={abbreviation}>{name}</option>)}
              </select>
              {error('state')}
            </label>

            <label>
              Cidade
              {citiesFailed ? (
                <input {...fieldProps('city')} autoComplete="address-level2" required placeholder="Digite sua cidade" value={form.city} onChange={(event) => update('city', event.target.value)} onBlur={() => blur('city')} />
              ) : (
                <select {...fieldProps('city')} required value={form.city} onChange={(event) => update('city', event.target.value)} onBlur={() => blur('city')} disabled={!form.state || isLoadingCities}>
                  <option value="">{!form.state ? 'Selecione o estado primeiro' : isLoadingCities ? 'Carregando cidades...' : 'Selecione a cidade'}</option>
                  {cities.map((city) => <option key={city} value={city}>{city}</option>)}
                </select>
              )}
              {citiesFailed && <small>Não carregamos a lista de cidades. Digite o nome da sua cidade.</small>}
              {error('city')}
            </label>

            <label className="form-wide">
              Interesse
              <select id="field-interest" value={form.interest} onChange={(event) => update('interest', event.target.value)}>
                {interests.map((interest) => <option key={interest}>{interest}</option>)}
              </select>
            </label>
          </div>

          <label>
            <span>Mensagem <small>(opcional)</small></span>
            <textarea {...fieldProps('message')} rows={4} value={form.message} onChange={(event) => update('message', event.target.value)} placeholder="Conte rapidamente o que você busca." />
            {error('message')}
          </label>

          <div className="form-actions">
            <button type="button" className="button-ghost" onClick={goBack}><ArrowLeft size={18} aria-hidden="true" /> Voltar</button>
            <button type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando...' : 'Enviar contato'}</button>
          </div>
        </div>
      )}

      {status === 'error' && <p className="form-error" role="alert">{submitError} <a href={whatsappUrl} target="_blank" rel="noreferrer">Falar pelo WhatsApp</a></p>}
    </form>
  )
}
