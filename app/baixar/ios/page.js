'use client'
import { useEffect } from 'react'

const DEST = 'https://apps.apple.com/br/app/dicas-em-dobro/id6759847346'
const PIXEL_ID = '1127780420422737'

export default function BaixarIos() {
  useEffect(() => {
    const redireciona = () => { window.location.href = DEST }

    // Seguro absoluto: redireciona em 2s de qualquer jeito
    const fallback = setTimeout(redireciona, 2000)

    function dispara() {
      try {
        fbq('track', 'InitiateCheckout', 
          { content_name: 'ios-redirect' },
          // eventID para deduplicação
          { eventID: 'ios-' + Date.now() }
        )
        // Meta chama esse callback quando confirma o envio
        fbq('onEvent', 'InitiateCheckout', () => {
          clearTimeout(fallback)
          redireciona()
        })
        // Fallback se o callback não vier em 1s
        setTimeout(() => {
          clearTimeout(fallback)
          redireciona()
        }, 1000)
      } catch (e) {
        clearTimeout(fallback)
        redireciona()
      }
    }

    if (typeof fbq !== 'undefined') {
      dispara()
    } else {
      // Pixel ainda não carregou — injeta e espera
      const script = document.createElement('script')
      script.src = 'https://connect.facebook.net/en_US/fbevents.js'
      script.async = true
      script.onload = () => {
        fbq('init', PIXEL_ID)
        fbq('track', 'PageView')
        dispara()
      }
      // Se o script em si não carregar (bloqueador de anúncios, etc)
      script.onerror = () => {
        clearTimeout(fallback)
        redireciona()
      }
      document.head.appendChild(script)
    }
  }, [])

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#07182a', gap:'16px', fontFamily:'Inter,system-ui,sans-serif' }}>
      <img src="/logo.webp" alt="Dicas em Dobro" style={{ width:72, height:72, borderRadius:'50%', background:'white', padding:5 }} />
      <p style={{ color:'rgba(255,255,255,0.5)', fontSize:'0.9rem' }}>Abrindo a App Store…</p>
      <div style={{ width:32, height:32, border:'3px solid rgba(29,185,84,0.3)', borderTop:'3px solid #1DB954', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <a href={DEST} style={{ color:'#1DB954', fontSize:'0.8rem', marginTop:8 }}>Toque aqui se não redirecionar</a>
    </div>
  )
}
