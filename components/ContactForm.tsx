'use client'

import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

type BrazilianState = {
  id: number
  sigla: string
  nome: string
}

type BrazilianCity = {
  id: number
  nome: string
}

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

const interests = [
  'Revenda / integração',
  'Compra de solução',
  'Treinamento',
  'Suporte / consultoria',
  'Seguro / manutenção',
  'Drone Business Accelerator',
  'Outro',
]

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

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [states, setStates] = useState<BrazilianState[]>([])
  const [cities, setCities] = useState<BrazilianCity[]>([])
  const [isLoadingStates, setIsLoadingStates] = useState(true)
  const [isLoadingCities, setIsLoadingCities] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const selectedStateName = useMemo(() => {
    return states.find((state) => state.sigla === form.state)?.nome ?? ''
  }, [form.state, states])

  useEffect(() => {
    async function loadStates() {
      try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
        if (!response.ok) throw new Error('Não foi possível carregar os estados.')
        const data = (await response.json()) as BrazilianState[]
        setStates(data)
      } catch (loadError) {
        console.error(loadError)
        setError('Não conseguimos carregar a lista de estados. Recarregue a página e tente novamente.')
        setStatus('error')
      } finally {
        setIsLoadingStates(false)
      }
    }

    loadStates()
  }, [])

  useEffect(() => {
    async function loadCities() {
      if (!form.state) {
        setCities([])
        return
      }

      setIsLoadingCities(true)

      try {
        const response = await fetch(
          'https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + form.state + '/municipios?orderBy=nome',
        )
        if (!response.ok) throw new Error('Não foi possível carregar as cidades.')
        const data = (await response.json()) as BrazilianCity[]
        setCities(data)
      } catch (loadError) {
        console.error(loadError)
        setError('Não conseguimos carregar a lista de cidades. Escolha o estado novamente ou recarregue a página.')
        setStatus('error')
      } finally {
        setIsLoadingCities(false)
      }
    }

    loadCities()
  }, [form.state])

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => {
      if (field === 'state') {
        return { ...current, state: value, city: '' }
      }

      return { ...current, [field]: value }
    })
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setError('')

    if (!supabase) {
      console.error('Supabase não configurado. Variáveis encontradas:', {
        hasUrl: Boolean(supabaseUrl),
        hasPublishableKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY),
        hasAnonKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      })
      setError('O Supabase não está configurado. Confira NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY no .env.local e reinicie o servidor.')
      setStatus('error')
      return
    }

    const { error: insertError } = await supabase.from('contatos').insert({
      name: form.name,
      company: form.company || null,
      email: form.email,
      whatsapp: form.whatsapp || null,
      state: form.state,
      state_name: selectedStateName,
      city: form.city,
      interest: form.interest,
      message: form.message || null,
    })

    if (insertError) {
      console.error('Erro ao salvar contato no Supabase:', insertError)
      setError(`Não conseguimos enviar agora: ${insertError.message}`)
      setStatus('error')
      return
    }

    setStatus('success')
    setForm(initialState)
    setCities([])
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Nome
          <input required value={form.name} onChange={(event) => updateField('name', event.target.value)} />
        </label>

        <label>
          Empresa
          <input value={form.company} onChange={(event) => updateField('company', event.target.value)} />
        </label>

        <label>
          E-mail
          <input required type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} />
        </label>

        <label>
          WhatsApp
          <input value={form.whatsapp} onChange={(event) => updateField('whatsapp', event.target.value)} />
        </label>

        <label>
          Estado
          <select required value={form.state} onChange={(event) => updateField('state', event.target.value)} disabled={isLoadingStates}>
            <option value="">{isLoadingStates ? 'Carregando estados...' : 'Selecione o estado'}</option>
            {states.map((state) => (
              <option key={state.id} value={state.sigla}>
                {state.nome}
              </option>
            ))}
          </select>
        </label>

        <label>
          Cidade
          <select required value={form.city} onChange={(event) => updateField('city', event.target.value)} disabled={!form.state || isLoadingCities}>
            <option value="">
              {!form.state ? 'Selecione o estado primeiro' : isLoadingCities ? 'Carregando cidades...' : 'Selecione a cidade'}
            </option>
            {cities.map((city) => (
              <option key={city.id} value={city.nome}>
                {city.nome}
              </option>
            ))}
          </select>
        </label>

        <label>
          Interesse
          <select value={form.interest} onChange={(event) => updateField('interest', event.target.value)}>
            {interests.map((interest) => (
              <option key={interest}>{interest}</option>
            ))}
          </select>
        </label>
      </div>

      <label>
        Mensagem
        <textarea rows={5} value={form.message} onChange={(event) => updateField('message', event.target.value)} placeholder="Conte rapidamente o que você busca." />
      </label>

      <button type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Enviando...' : 'Enviar contato'}
      </button>

      {status === 'success' && <p className="form-success">Contato recebido. Vamos retornar em breve.</p>}
      {status === 'error' && <p className="form-error">{error}</p>}
    </form>
  )
}
