'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'

const interests = ['Revenda / integração', 'Compra de solução', 'Treinamento', 'Suporte / consultoria', 'Outro']

type FormState = {
  name: string
  company: string
  email: string
  whatsapp: string
  location: string
  interest: string
  message: string
}

const initialState: FormState = {
  name: '', company: '', email: '', whatsapp: '', location: '', interest: interests[0], message: ''
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setError('')

    if (!supabase) {
      setError('O Supabase não está configurado. Confira as variáveis no arquivo .env.local e reinicie o servidor.')
      setStatus('error')
      return
    }

    const { error: insertError } = await supabase.from('contatos').insert({
      name: form.name,
      company: form.company,
      email: form.email,
      whatsapp: form.whatsapp,
      location: form.location,
      interest: form.interest,
      message: form.message,
    })

    if (insertError) {
      console.error('Erro ao salvar contato no Supabase:', insertError)
      setError(`Não conseguimos enviar agora: ${insertError.message}`)
      setStatus('error')
      return
    }

    setStatus('success')
    setForm(initialState)
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>Nome<input required value={form.name} onChange={(e) => updateField('name', e.target.value)} /></label>
        <label>Empresa<input value={form.company} onChange={(e) => updateField('company', e.target.value)} /></label>
        <label>E-mail<input required type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)} /></label>
        <label>WhatsApp<input value={form.whatsapp} onChange={(e) => updateField('whatsapp', e.target.value)} /></label>
        <label>Cidade/Estado<input value={form.location} onChange={(e) => updateField('location', e.target.value)} /></label>
        <label>Interesse<select value={form.interest} onChange={(e) => updateField('interest', e.target.value)}>{interests.map((interest) => <option key={interest}>{interest}</option>)}</select></label>
      </div>
      <label>Mensagem<textarea rows={5} value={form.message} onChange={(e) => updateField('message', e.target.value)} placeholder="Conte rapidamente o que você busca." /></label>
      <button type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando...' : 'Enviar contato'}</button>
      {status === 'success' && <p className="form-success">Contato recebido. Vamos retornar em breve.</p>}
      {status === 'error' && <p className="form-error">{error}</p>}
    </form>
  )
}
