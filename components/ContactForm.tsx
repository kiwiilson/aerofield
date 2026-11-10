'use client'

import { useEffect, useState } from 'react'
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

const validatedFields: Field[] = ['name', 'email', 'whatsapp', 'state', 'city', 'message']
const whatsappUrl = 'https://wa.me/5511927297968'

// Compara cidades sem depender de acento ou caixa: "sao paulo" encontra "São Paulo".
const normalize = (value: string) => value.normalize('NFD').replace(/[̀-ͯ]/g, '').trim().toLowerCase()

function validate(field: Field, value: string, cities: string[]): string {
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
      if (!trimmed) return 'Informe a cidade.'
      if (cities.length && !cities.some((city) => normalize(city) === normalize(trimmed))) return 'Não encontramos essa cidade neste estado. Escolha uma opção da lista.'
      return ''
    case 'message':
      return trimmed.length > 2000 ? 'Use até 2000 caracteres.' : ''
    default:
      return ''
  }
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<Errors>({})
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
    if (field === 'state') setErrors((current) => ({ ...current, state: validate('state', value, []), city: undefined }))
    else if (errors[field]) setErrors((current) => ({ ...current, [field]: validate(field, value, cities) }))
  }

  function blur(field: Field) {
    // Ao sair do campo de cidade, troca o que foi digitado pelo nome oficial da lista (com acento e caixa corretos).
    if (field === 'city') {
      const match = cities.find((city) => normalize(city) === normalize(form.city))
      if (match && match !== form.city) {
        setForm((current) => ({ ...current, city: match }))
        setErrors((current) => ({ ...current, city: undefined }))
        return
      }
    }
    setErrors((current) => ({ ...current, [field]: validate(field, form[field], cities) }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const city = cities.find((item) => normalize(item) === normalize(form.city)) ?? form.city.trim()
    const values = { ...form, city }

    const found: Errors = {}
    validatedFields.forEach((field) => {
      const message = validate(field, values[field], cities)
      if (message) found[field] = message
    })
    setErrors(found)
    const firstInvalid = validatedFields.find((field) => found[field])
    if (firstInvalid) {
      document.getElementById(`field-${firstInvalid}`)?.focus()
      return
    }

    setStatus('sending')
    setSubmitError('')

    try {
      const response = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          state_name: states.find(([abbreviation]) => abbreviation === values.state)?.[1] ?? '',
          website: honeypot,
        }),
      })
      const data = (await response.json().catch(() => ({}))) as { error?: string }
      if (!response.ok) throw new Error(data.error || 'Não conseguimos enviar agora.')
      setStatus('success')
      setForm(initialState)
      setErrors({})
      setCities([])
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
      <input className="hp-field" tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} />

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
          <input
            {...fieldProps('city')}
            list={citiesFailed ? undefined : 'city-options'}
            autoComplete="off"
            required
            disabled={!form.state}
            placeholder={!form.state ? 'Selecione o estado primeiro' : isLoadingCities ? 'Carregando cidades...' : 'Digite ou escolha a cidade'}
            value={form.city}
            onChange={(event) => update('city', event.target.value)}
            onBlur={() => blur('city')}
          />
          <datalist id="city-options">
            {cities.map((city) => <option key={city} value={city} />)}
          </datalist>
          {citiesFailed && <small>Não carregamos a lista de cidades. Digite o nome da sua cidade.</small>}
          {error('city')}
        </label>

        <label className="form-wide">
          Interesse
          <select id="field-interest" value={form.interest} onChange={(event) => update('interest', event.target.value)}>
            {interests.map((interest) => <option key={interest}>{interest}</option>)}
          </select>
        </label>

        <label className="form-wide">
          <span>Mensagem <small>(opcional)</small></span>
          <textarea {...fieldProps('message')} rows={4} value={form.message} onChange={(event) => update('message', event.target.value)} placeholder="Conte rapidamente o que você busca." />
          {error('message')}
        </label>
      </div>

      <button type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando...' : 'Enviar contato'}</button>

      {status === 'error' && <p className="form-error" role="alert">{submitError} <a href={whatsappUrl} target="_blank" rel="noreferrer">Falar pelo WhatsApp</a></p>}
    </form>
  )
}
