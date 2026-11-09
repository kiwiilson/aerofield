import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { interests } from '../../../lib/contact'

export const runtime = 'nodejs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Limite simples por IP, em memória. Em ambiente serverless cada instância tem o seu contador,
// então isto freia abuso casual, não um ataque distribuído.
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function isLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 500) {
    for (const [key, times] of hits) if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(key)
  }
  return recent.length > MAX_PER_WINDOW
}

const text = (value: unknown, max: number) => (typeof value === 'string' ? value.trim().slice(0, max) : '')
const oneLine = (value: string) => value.replace(/[\r\n]+/g, ' ')

async function notifyByEmail(lead: Record<string, string | null>) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.LEAD_NOTIFY_TO
  if (!apiKey || !to) return

  const digits = (lead.whatsapp ?? '').replace(/\D/g, '')
  const whatsappLink = digits ? `https://wa.me/${digits.startsWith('55') ? digits : `55${digits}`}` : 'não informado'

  const body = [
    `Nome: ${lead.name}`,
    `Empresa: ${lead.company ?? 'não informada'}`,
    `E-mail: ${lead.email}`,
    `WhatsApp: ${lead.whatsapp ?? 'não informado'} (${whatsappLink})`,
    `Local: ${lead.city} - ${lead.state}`,
    `Interesse: ${lead.interest}`,
    '',
    'Mensagem:',
    lead.message ?? '(sem mensagem)',
  ].join('\n')

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.LEAD_EMAIL_FROM || 'AirNex Site <onboarding@resend.dev>',
        to: to.split(',').map((address) => address.trim()).filter(Boolean),
        reply_to: lead.email,
        subject: oneLine(`Novo contato: ${lead.name} — ${lead.interest}`),
        text: body,
      }),
    })
    if (!response.ok) console.error('Resend:', response.status, await response.text())
  } catch (error) {
    console.error('Resend falhou:', error)
  }
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local'
  if (isLimited(ip)) {
    return NextResponse.json({ error: 'Muitas tentativas. Aguarde alguns minutos e tente de novo.' }, { status: 429 })
  }

  let payload: Record<string, unknown>
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Requisição inválida.' }, { status: 400 })
  }

  // Campo-isca: pessoas não o veem, robôs costumam preencher. Responde "ok" sem gravar nada.
  if (text(payload.website, 200)) return NextResponse.json({ ok: true })

  const lead = {
    name: text(payload.name, 120),
    company: text(payload.company, 120) || null,
    email: text(payload.email, 160).toLowerCase(),
    whatsapp: text(payload.whatsapp, 30) || null,
    state: text(payload.state, 2).toUpperCase(),
    state_name: text(payload.state_name, 60),
    city: text(payload.city, 120),
    interest: text(payload.interest, 80),
    message: text(payload.message, 2000) || null,
  }

  const whatsappDigits = (lead.whatsapp ?? '').replace(/\D/g, '')
  const problems: string[] = []
  if (lead.name.length < 2) problems.push('nome')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) problems.push('e-mail')
  if (lead.whatsapp && (whatsappDigits.length < 10 || whatsappDigits.length > 13)) problems.push('WhatsApp')
  if (!/^[A-Z]{2}$/.test(lead.state)) problems.push('estado')
  if (lead.city.length < 2) problems.push('cidade')
  if (!(interests as readonly string[]).includes(lead.interest)) problems.push('interesse')
  if (problems.length) {
    return NextResponse.json({ error: `Confira os campos: ${problems.join(', ')}.` }, { status: 422 })
  }

  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase não configurado no servidor.')
    return NextResponse.json({ error: 'Não conseguimos enviar agora. Use o WhatsApp, por favor.' }, { status: 500 })
  }

  const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } })
  const { error } = await supabase.from('contatos').insert(lead)
  if (error) {
    console.error('Erro ao salvar contato no Supabase:', error)
    return NextResponse.json({ error: 'Não conseguimos enviar agora. Tente de novo ou use o WhatsApp.' }, { status: 500 })
  }

  await notifyByEmail(lead)
  return NextResponse.json({ ok: true })
}
