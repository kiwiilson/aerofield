import { FaWhatsapp } from 'react-icons/fa'

export function WhatsAppButton() {
  return (
    <a className="whatsapp-float" href="https://wa.me/5511927297968" target="_blank" rel="noreferrer" aria-label="Falar com a AirNex pelo WhatsApp">
      <FaWhatsapp size={22} aria-hidden="true" />
      <span>WhatsApp</span>
    </a>
  )
}
