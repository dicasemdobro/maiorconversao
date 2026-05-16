'use client'
import { useEffect, useState, useRef } from 'react'

const WPP = 'https://chat.whatsapp.com/IzPtz8dqp5IBlFDjaqG4NT?mode=gi_t'

function track(event, params = {}) {
  if (typeof window !== 'undefined' && window.fbq) window.fbq('track', event, params)
}
function go(label) {
  track('Lead', { content_name: 'Grupo VIP', content_category: label })
  track('WhatsApp_Click', { button: label })
}

function WppIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

function Countdown() {
  const TOTAL = 15 * 60
  const [secs, setSecs] = useState(TOTAL)
  const ref = useRef(null)
  useEffect(() => {
    ref.current = setInterval(() => setSecs(p => p > 0 ? p - 1 : 0), 1000)
    return () => clearInterval(ref.current)
  }, [])
  const m = String(Math.floor(secs / 60)).padStart(2, '0')
  const s = String(secs % 60).padStart(2, '0')
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
      {[m, ':', s].map((v, i) => (
        <span key={i} style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: v === ':' ? '1.6rem' : 'clamp(2rem, 8vw, 2.8rem)',
          color: secs < 120 ? '#ff6b6b' : '#FFD700',
          lineHeight: 1,
          opacity: v === ':' ? 0.5 : 1,
        }}>{v}</span>
      ))}
    </div>
  )
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', background: 'none', border: 'none', color: 'white', fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', fontWeight: 600, padding: '16px 0', textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <span>{q}</span>
        <span style={{ flexShrink: 0, fontSize: '1.2rem', color: 'rgba(255,255,255,0.3)', transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 0.25s' }}>+</span>
      </button>
      <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.88rem', lineHeight: 1.65, overflow: 'hidden', maxHeight: open ? 300 : 0, transition: 'max-height 0.3s ease', paddingBottom: open ? 16 : 0 }}>{a}</div>
    </div>
  )
}

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

function useScrollTracking() {
  const fired = useRef({})
  useEffect(() => {
    const h = () => {
      const pct = Math.round(window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100)
      ;[25,50,75,90].forEach(d => { if (pct >= d && !fired.current[d]) { fired.current[d] = true; track('ScrollDepth', { depth: d }) } })
    }
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
}

const R = {
  opacity: 0,
  transform: 'translateY(20px)',
  transition: 'opacity 0.55s ease, transform 0.55s ease',
}

const PARTNERS = [
  { img: '/images/rest-cocobambu.webp',  name: 'Coco Bambu',              cat: 'Frutos do mar',              alt: 'Camarão empanado do Coco Bambu' },
  { img: '/images/rest-borelli.webp',    name: 'Borelli',                 cat: 'Gelato e sobremesas',         alt: 'Gelato da Borelli' },
  { img: '/images/rest-bbonca.webp',     name: "BB Onça Burguer's",       cat: 'Hambúrguer artesanal',        alt: "Hambúrguer do BB Onça Burguer's" },
  { img: '/images/rest-harushi.webp',    name: 'Harushi Oriental Food',   cat: 'Comida japonesa',             alt: 'Sushi do Harushi' },
  { img: '/images/rest-jazz.webp',       name: 'Jazz Cozinha',            cat: 'Gastronomia contemporânea',   alt: 'Prato do Jazz Cozinha' },
]

export default function Home() {
  useReveal()
  useScrollTracking()

  const btn = (label, text = 'ENTRAR NO GRUPO VIP', size = '1rem', pad = '17px 28px') => (
    <a href={WPP} target="_blank" rel="noopener noreferrer" onClick={() => go(label)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        background: '#25D366', color: 'white',
        fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: size,
        padding: pad, borderRadius: 100, textDecoration: 'none',
        width: '100%', maxWidth: 480, margin: '0 auto',
        boxShadow: '0 4px 32px rgba(37,211,102,0.35)',
        animation: 'pulse-wpp 2.2s ease infinite',
        letterSpacing: '0.01em',
      }}>
      <WppIcon size={20} /> {text}
    </a>
  )

  return (
    <main style={{ background: '#07182a', color: 'white', fontFamily: 'Inter, sans-serif' }}>

      {/* ══════════════════════════════════════════
          HERO — decisão acontece nos primeiros 4s
      ══════════════════════════════════════════ */}
      <section style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 20px 72px', position: 'relative', overflow: 'hidden', background: 'linear-gradient(160deg, #061220 0%, #0b2035 60%, #112d47 100%)' }}>

        {/* glow */}
        <div style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)', width: '120vw', maxWidth: 700, height: 500, background: 'radial-gradient(ellipse, rgba(29,82,109,0.28) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 500, textAlign: 'center' }}>

          {/* Logo */}
          <img src="/images/logo.png" alt="Dicas em Dobro" style={{ width: 76, height: 76, objectFit: 'contain', background: 'white', borderRadius: '50%', padding: 5, boxShadow: '0 8px 32px rgba(0,0,0,0.4)', marginBottom: 20 }} />

          {/* Urgência — primeira coisa que lê */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(227,62,51,0.15)', border: '1px solid rgba(227,62,51,0.4)', borderRadius: 100, padding: '6px 14px', marginBottom: 22, animation: 'urgency-blink 2s ease infinite' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#E33E33', animation: 'urgency-blink 1s ease infinite' }} />
            <span style={{ color: '#ff7a72', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>🔥 Vagas limitadas — grupo VIP</span>
          </div>

          {/* Headline — benefício CLARO e imediato */}
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.8rem, 12vw, 4.5rem)', lineHeight: 1.0, letterSpacing: '0.02em', color: 'white', marginBottom: 14 }}>
            COMPRE 1 PRATO<br/>
            <span style={{ color: '#FFD700' }}>GANHE OUTRO</span><br/>
            DE GRAÇA
          </h1>

          {/* Sub — específico, concreto, crível */}
          <p style={{ fontSize: 'clamp(0.95rem, 3.5vw, 1.05rem)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, marginBottom: 10, maxWidth: 400, margin: '0 auto 10px' }}>
            Mais de <strong style={{ color: 'white' }}>60 restaurantes</strong> em Rio Preto. Você paga um prato e leva dois — toda vez que for.
          </p>

          {/* iPhone teaser — bônus, não promessa */}
          <p style={{ fontSize: '0.82rem', color: '#FFD700', fontWeight: 600, marginBottom: 28, opacity: 0.9 }}>
            🏆 Membros VIP concorrem a um iPhone 17e
          </p>

          {/* Hero image */}
          <div style={{ borderRadius: 18, overflow: 'hidden', marginBottom: 24, border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 20px 60px rgba(0,0,0,0.55)', position: 'relative' }}>
            <img src="/images/hero.jpg" alt="Experiências gastronômicas em Rio Preto" style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: 320 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,18,32,0.7) 0%, transparent 50%)' }} />
            {/* Social proof dentro da imagem */}
            <div style={{ position: 'absolute', bottom: 14, left: 0, right: 0, textAlign: 'center' }}>
              <span style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', borderRadius: 100, padding: '6px 14px', fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
                700+ pessoas já estão no grupo VIP
              </span>
            </div>
          </div>

          {/* CTA PRINCIPAL */}
          {btn('hero', 'ENTRAR NO GRUPO VIP GRÁTIS', 'clamp(1rem, 4vw, 1.1rem)', '18px 28px')}
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.72rem', marginTop: 10 }}>Gratuito · Sem spam · Saia quando quiser</p>

        </div>
      </section>


      {/* ══════════════════════════════════════════
          SORTEIO — bônus que gera FOMO
      ══════════════════════════════════════════ */}
      <section id="sorteio" style={{ padding: '64px 20px', background: '#07182a', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translateX(-50%)', width: '100vw', height: 400, background: 'radial-gradient(ellipse, rgba(255,215,0,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 500, margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div data-reveal style={R}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.3)', borderRadius: 100, padding: '5px 14px', fontSize: '0.72rem', fontWeight: 700, color: '#FFD700', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 18 }}>
              EXCLUSIVO PARA MEMBROS VIP
            </span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.2rem, 9vw, 3.8rem)', letterSpacing: '0.03em', lineHeight: 1.0, marginBottom: 8 }}>
              VOCÊ CONCORRE A UM<br/><span style={{ color: '#FFD700' }}>iPHONE 17e</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.88rem', marginBottom: 24, lineHeight: 1.6 }}>
              Quem entrar no Grupo VIP e comprar no pré-lançamento concorre. As instruções chegam dentro do grupo.
            </p>
          </div>

          {/* Imagem do iPhone */}
          <div data-reveal style={{ ...R, maxWidth: 380, margin: '0 auto 28px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '90%', height: '60%', background: 'radial-gradient(ellipse, rgba(255,215,0,0.18) 0%, transparent 70%)', borderRadius: '50%', zIndex: 0 }} />
            <img src="/images/iphone-sorteio.jpg" alt="iPhone 17e — Sorteio exclusivo Dicas em Dobro" style={{ width: '100%', borderRadius: 16, position: 'relative', zIndex: 1, filter: 'drop-shadow(0 16px 48px rgba(0,0,0,0.65))' }} loading="lazy" />
          </div>

          {/* Countdown */}
          <div data-reveal style={{ ...R, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '20px', marginBottom: 24 }}>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10, animation: 'urgency-blink 2s ease infinite' }}>
              ⚠️ Vagas limitadas para o sorteio
            </p>
            <Countdown />
          </div>

          <div data-reveal style={R}>
            {btn('sorteio', 'QUERO CONCORRER AO iPHONE')}
          </div>
        </div>
      </section>



      {/* ══════════════════════════════════════════
          PARCEIROS — prova real ANTES da objeção
      ══════════════════════════════════════════ */}
      <section style={{ padding: '64px 0 56px', background: '#0b2035', position: 'relative', overflow: 'hidden' }}>

        <div data-reveal style={{ ...R, textAlign: 'center', padding: '0 20px', marginBottom: 24 }}>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>JÁ CONFIRMADOS</p>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(1.8rem, 7vw, 2.8rem)', letterSpacing: '0.03em' }}>
            Restaurantes reais.<br/><span style={{ color: '#FFD700' }}>Economia real.</span>
          </h2>
        </div>

        {/* Carrossel */}
        <div style={{ display: 'flex', overflowX: 'auto', gap: 12, paddingLeft: 20, paddingRight: 20, paddingBottom: 4, scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
          {PARTNERS.map((r, i) => (
            <div key={i} style={{ flex: '0 0 70vw', maxWidth: 280, scrollSnapAlign: 'start', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 8px 28px rgba(0,0,0,0.4)', background: '#071828' }}>
              <div style={{ position: 'relative', paddingBottom: '65%' }}>
                <img src={r.img} alt={r.alt} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.7) 100%)' }} />
                <div style={{ position: 'absolute', bottom: 10, left: 12 }}>
                  <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'white', marginBottom: 1 }}>{r.name}</p>
                  <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.55)' }}>{r.cat}</p>
                </div>
                <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,215,0,0.4)', borderRadius: 100, padding: '2px 9px', fontSize: '0.58rem', fontWeight: 800, color: '#FFD700', letterSpacing: '0.1em' }}>VIP</div>
              </div>
            </div>
          ))}
          {/* último card */}
          <div style={{ flex: '0 0 60vw', maxWidth: 230, scrollSnapAlign: 'start', borderRadius: 16, border: '1px solid rgba(255,215,0,0.15)', background: 'linear-gradient(135deg, #071828, #112d47)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 16px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(255,215,0,0.07) 0%, transparent 70%)' }} />
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.6rem', color: '#FFD700', lineHeight: 1.1, marginBottom: 6, position: 'relative' }}>E muitooo<br/>mais</p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem', position: 'relative' }}>Novos parceiros toda semana</p>
          </div>
        </div>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '0.68rem', marginTop: 10, marginBottom: 28 }}>← arraste para ver mais →</p>

        <div data-reveal style={{ ...R, padding: '0 20px' }}>
          {btn('parceiros')}
        </div>
      </section>



      {/* ══════════════════════════════════════════
          COMO FUNCIONA — 3 passos, zero ruído
      ══════════════════════════════════════════ */}
      <section style={{ padding: '64px 20px', background: '#07182a' }}>
        <div style={{ maxWidth: 500, margin: '0 auto' }}>
          <div data-reveal style={{ ...R, textAlign: 'center', marginBottom: 36 }}>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>SIMPLES ASSIM</p>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(1.8rem, 7vw, 2.8rem)', letterSpacing: '0.03em' }}>Como funciona?</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { n: 1, t: 'Entre no Grupo VIP', s: 'Grátis. Clique no botão e já está dentro.', c: '#25D366' },
              { n: 2, t: 'Escolha um restaurante', s: 'São mais de 60 parceiros no app, todos em Rio Preto.', c: '#1D526D' },
              { n: 3, t: 'Pague 1, leve 2', s: 'Mostre o app na hora de pedir. O segundo prato é por nossa conta.', c: '#E33E33' },
            ].map((step, i) => (
              <div key={i} data-reveal style={{ ...R, display: 'flex', gap: 18, alignItems: 'flex-start', padding: '22px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: step.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.1rem', color: 'white', flexShrink: 0 }}>{step.n}</div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 4 }}>{step.t}</p>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.86rem', lineHeight: 1.5 }}>{step.s}</p>
                </div>
              </div>
            ))}
          </div>
          <div data-reveal style={{ ...R, marginTop: 36 }}>
            {btn('como-funciona')}
          </div>
        </div>
      </section>



      {/* ══════════════════════════════════════════
          BENEFÍCIOS — números concretos vendem
      ══════════════════════════════════════════ */}
      <section style={{ padding: '56px 20px', background: '#0b2035' }}>
        <div style={{ maxWidth: 500, margin: '0 auto' }}>
          <div data-reveal style={{ ...R, textAlign: 'center', marginBottom: 28 }}>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(1.8rem, 7vw, 2.8rem)', letterSpacing: '0.03em' }}>
              O que você <span style={{ color: '#FFD700' }}>ganha</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              ['💰', 'Até R$4.000', 'de economia por ano'],
              ['🍽️', '+60 lugares', 'os melhores de Rio Preto'],
              ['⚡', 'Acesso VIP', 'antes do lançamento'],
              ['🏆', 'iPhone 17e', 'sorteio exclusivo VIP'],
            ].map(([e, n, d], i) => (
              <div key={i} data-reveal style={{ ...R, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '18px 14px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.6rem', marginBottom: 6 }}>{e}</div>
                <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.2rem', color: '#FFD700', letterSpacing: '0.03em', marginBottom: 3 }}>{n}</p>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem' }}>{d}</p>
              </div>
            ))}
          </div>
          <div data-reveal style={{ ...R, marginTop: 28 }}>
            {btn('beneficios')}
          </div>
        </div>
      </section>



      {/* ══════════════════════════════════════════
          URGÊNCIA — gatilho final antes do FAQ
      ══════════════════════════════════════════ */}
      <section style={{ padding: '48px 20px', background: 'linear-gradient(135deg, #1a0a08, #2a0f0c)' }}>
        <div data-reveal style={{ ...R, maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(1.6rem, 7vw, 2.4rem)', letterSpacing: '0.03em', marginBottom: 10 }}>
            ⚠️ O GRUPO PODE FECHAR A QUALQUER MOMENTO
          </p>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: 24 }}>
            Quando as vagas esgotarem, você fica de fora do lançamento, dos restaurantes e do sorteio do iPhone 17e. Sem segunda chance.
          </p>
          {btn('urgencia', 'GARANTIR MINHA VAGA AGORA')}
        </div>
      </section>



      {/* ══════════════════════════════════════════
          FAQ — elimina objeções que restam
      ══════════════════════════════════════════ */}
      <section style={{ padding: '64px 20px', background: '#0b2035' }}>
        <div style={{ maxWidth: 500, margin: '0 auto' }}>
          <div data-reveal style={{ ...R, textAlign: 'center', marginBottom: 32 }}>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(1.8rem, 7vw, 2.8rem)', letterSpacing: '0.03em' }}>Ficou alguma dúvida?</h2>
          </div>
          <div data-reveal style={R}>
            {[
              { q: 'O grupo VIP é gratuito?', a: 'Sim, totalmente gratuito. Você entra, acompanha o lançamento e recebe tudo em primeira mão sem pagar nada.' },
              { q: 'Como funciona o benefício de pagar 1 e ganhar outro?', a: 'Pelo app Dicas em Dobro, você escolhe um restaurante parceiro, ativa o benefício e vai ao local. Na hora de pedir, mostra o app e ganha o segundo prato de graça — sem cupom físico, sem complicação.' },
              { q: 'Quais restaurantes participam?', a: 'Mais de 60 restaurantes em Rio Preto, incluindo Coco Bambu, Harushi Oriental Food, Jazz Cozinha Contemporânea, BB Onça Burguer\'s, Borelli e muitos outros. A lista completa é divulgada no lançamento.' },
              { q: 'Como participo do sorteio do iPhone 17e?', a: 'Entrando no Grupo VIP e comprando o app no pré-lançamento, você já está automaticamente participando. As instruções completas são enviadas dentro do grupo.' },
              { q: 'O grupo tem limite de vagas?', a: 'Sim. Quando esgotar, não haverá como entrar. Entre agora enquanto ainda há vaga.' },
            ].map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
          </div>
          <div data-reveal style={{ ...R, marginTop: 36 }}>
            {btn('faq')}
          </div>
        </div>
      </section>



      {/* ══════════════════════════════════════════
          CTA FINAL — o mais forte de todos
      ══════════════════════════════════════════ */}
      <section style={{ padding: '72px 20px 96px', background: '#07182a', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '120vw', height: 500, background: 'radial-gradient(ellipse, rgba(37,211,102,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div data-reveal style={{ ...R, maxWidth: 500, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <img src="/images/logo.png" alt="Dicas em Dobro" style={{ width: 64, height: 64, objectFit: 'contain', background: 'white', borderRadius: '50%', padding: 4, marginBottom: 24, boxShadow: '0 8px 30px rgba(0,0,0,0.4)' }} />
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.2rem, 9vw, 3.8rem)', letterSpacing: '0.03em', lineHeight: 1.0, marginBottom: 14 }}>
            ENTRE AGORA E<br/><span style={{ color: '#FFD700' }}>COMECE A ECONOMIZAR</span><br/>NOS MELHORES RESTAURANTES
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: 32 }}>
            Mais de 700 pessoas já garantiram sua vaga. O grupo pode fechar a qualquer momento.
          </p>
          {btn('cta-final', 'ENTRAR NO GRUPO VIP AGORA', 'clamp(1rem, 4vw, 1.1rem)', '20px 28px')}
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem', marginTop: 12 }}>Gratuito · Sem spam · Saia quando quiser</p>
        </div>
      </section>



      {/* FOOTER */}
      <footer style={{ background: '#050f1a', padding: '28px 20px 32px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <a href="https://www.instagram.com/dicasemdobro.rp" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', textDecoration: 'none', display: 'inline-block', marginBottom: 12 }}>
          📸 @dicasemdobro.rp
        </a>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 12 }}>
          {['Política de Privacidade', 'Termos de Uso'].map(l => <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.68rem', textDecoration: 'none' }}>{l}</a>)}
        </div>
        <p style={{ color: 'rgba(255,255,255,0.12)', fontSize: '0.65rem' }}>© 2025 Dicas em Dobro · São José do Rio Preto</p>
      </footer>

    </main>
  )
}
