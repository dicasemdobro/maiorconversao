'use client'
import { useEffect } from 'react'

const DEST = 'https://play.google.com/store/apps/details?id=com.dicasemdobro.app'
const PIXEL_ID = '1127780420422737'

export default function BaixarAndroid() {
  useEffect(() => {
    if (typeof fbq !== 'undefined') {
      try { fbq('track', 'Lead', { content_name: 'android-redirect' }) } catch (e) {}
      setTimeout(() => { window.location.href = DEST }, 500)
    } else {
      const script = document.createElement('script')
      script.src = 'https://connect.facebook.net/en_US/fbevents.js'
      script.async = true
      script.onload = () => {
        fbq('init', PIXEL_ID)
        fbq('track', 'PageView')
        fbq('track', 'Lead', { content_name: 'android-redirect' })
        setTimeout(() => { window.location.href = DEST }, 500)
      }
      document.head.appendChild(script)
      setTimeout(() => { window.location.href = DEST }, 1500)
    }
  }, [])

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#07182a', gap:'16px', fontFamily:'Inter,system-ui,sans-serif' }}>
      <img src="/logo.webp" alt="Dicas em Dobro" style={{ width:72, height:72, borderRadius:'50%', background:'white', padding:5 }} />
      <p style={{ color:'rgba(255,255,255,0.5)', fontSize:'0.9rem' }}>Abrindo o Google Play…</p>
      <div style={{ width:32, height:32, border:'3px solid rgba(29,185,84,0.3)', borderTop:'3px solid #1DB954', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <a href={DEST} style={{ color:'#1DB954', fontSize:'0.8rem', marginTop:8 }}>Toque aqui se não redirecionar</a>
    </div>
  )
}
