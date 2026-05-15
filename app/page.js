'use client'
import { useEffect, useState, useRef } from 'react'

const WPP = 'https://chat.whatsapp.com/IzPtz8dqp5IBlFDjaqG4NT?mode=gi_t'

function track(event, params = {}) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', event, params)
  }
}
function handleWppClick(label) {
  track('Lead', { content_name: 'Grupo VIP WhatsApp', content_category: label })
  track('WhatsApp_Click', { button: label })
}

function WppIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

function ChevronIcon({ open }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', color: 'var(--cinza)' }}>
      <path d="M6 9l6 6 6-6"/>
    </svg>
  )
}

function Torn({ color, flip }) {
  return (
    <div style={{ position: 'absolute', [flip ? 'top' : 'bottom']: -1, left: 0, width: '100%', overflow: 'hidden', lineHeight: 0, zIndex: 2, pointerEvents: 'none', transform: flip ? 'rotate(180deg)' : 'none' }}>
      <svg viewBox="0 0 1200 48" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 48 }}>
        <path d="M0,0 L0,24 C40,42 75,10 110,28 C145,46 175,14 215,26 C255,38 280,8 320,20 C360,32 390,4 430,16 C470,28 500,2 540,14 C580,26 610,0 650,12 C690,24 720,0 760,14 C800,28 830,6 870,18 C910,30 940,8 980,20 C1020,32 1050,10 1090,22 C1130,34 1160,12 1200,24 L1200,0 Z" fill={color}/>
      </svg>
    </div>
  )
}

function Countdown() {
  const TOTAL = 15 * 60
  const [secs, setSecs] = useState(TOTAL)
  const ref = useRef(null)
  useEffect(() => {
    setSecs(TOTAL)
    ref.current = setInterval(() => setSecs(p => p > 0 ? p - 1 : 0), 1000)
    return () => clearInterval(ref.current)
  }, [])
  const m = String(Math.floor(secs / 60)).padStart(2, '0')
  const s = String(secs % 60).padStart(2, '0')
  const urgent = secs < 120
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--vermelho)', color: 'white', borderRadius: 100, padding: '7px 16px', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14, animation: 'urgency-blink 2s ease infinite' }}>
        Vagas limitadas para o sorteio
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, alignItems: 'center' }}>
        {[m, s].map((val, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ background: 'rgba(255,255,255,0.08)', border: `1px solid ${urgent ? 'var(--vermelho)' : 'rgba(255,255,255,0.12)'}`, borderRadius: 12, padding: '10px 18px', fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2rem, 8vw, 2.8rem)', color: urgent ? '#ff6b6b' : 'white', minWidth: 72, textAlign: 'center' }}>{val}</span>
            {i === 0 && <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.8rem', fontWeight: 800 }}>:</span>}
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 56, marginTop: 6 }}>
        {['min', 'seg'].map(l => <span key={l} style={{ fontSize: '0.68rem', color: 'var(--cinza)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{l}</span>)}
      </div>
    </div>
  )
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <button style={{ width: '100%', background: 'none', border: 'none', color: 'white', fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', fontWeight: 600, padding: '18px 0', textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }} onClick={() => setOpen(o => !o)}>
        <span>{q}</span><ChevronIcon open={open} />
      </button>
      <div style={{ color: 'var(--cinza)', fontSize: '0.88rem', lineHeight: 1.65, maxHeight: open ? 300 : 0, overflow: 'hidden', transition: 'max-height 0.35s ease, padding 0.35s ease', paddingBottom: open ? 16 : 0 }}>{a}</div>
    </div>
  )
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

function useScrollTracking() {
  const fired = useRef({})
  useEffect(() => {
    const handler = () => {
      const pct = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
      ;[25, 50, 75, 90].forEach(d => {
        if (pct >= d && !fired.current[d]) { fired.current[d] = true; track('ScrollDepth', { depth: d }) }
      })
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
}

const PARTNERS = [
  { img: '/images/rest-cocobambu.webp',  name: 'Coco Bambu',                    cat: 'Frutos do mar',             alt: 'Camarao empanado crocante do Coco Bambu parceiro do Dicas em Dobro' },
  { img: '/images/rest-borelli.webp',    name: 'Borelli',                        cat: 'Gelato e sobremesas',       alt: 'Gelato cremoso da Borelli parceiro do Dicas em Dobro' },
  { img: '/images/rest-bbonca.webp',     name: "BB Onca Burguer's",              cat: 'Hamburguer artesanal',      alt: "Hamburguer artesanal do BB Onca Burguers parceiro do Dicas em Dobro" },
  { img: '/images/rest-harushi.webp',    name: 'Harushi Oriental Food',          cat: 'Comida japonesa',           alt: 'Sushi premium do Harushi Oriental Food parceiro do Dicas em Dobro' },
  { img: '/images/rest-jazz.webp',       name: 'Jazz Cozinha Contemporanea',     cat: 'Gastronomia contemporanea', alt: 'Prato contemporaneo do Jazz Cozinha parceiro do Dicas em Dobro' },
]

const FAQS = [
  { q: 'Como funciona o Dicas em Dobro?', a: 'Simples: voce baixa o app, escolhe um restaurante parceiro, vai la, pede seu prato e ganha o segundo de graca. Tudo pelo aplicativo, sem cupons fisicos e sem complicacao.' },
  { q: 'Precisa pagar alguma coisa para entrar no grupo?', a: 'O grupo VIP e gratuito. Voce entra, recebe as novidades em primeira mao e acompanha o lancamento. O app tera um valor de assinatura divulgado exclusivamente para membros VIP antes de todo mundo.' },
  { q: 'Como funciona o sorteio do iPhone 17e?', a: 'Apenas membros do Grupo VIP que adquirirem o app no pre-lancamento participam do sorteio. As instrucoes completas serao enviadas dentro do grupo nos proximos dias.' },
  { q: 'Quais restaurantes participam?', a: 'Sao mais de 60 restaurantes em Rio Preto incluindo Coco Bambu, Harushi, Jazz Cozinha, BB Onca Burguers, Borelli e muito mais. A lista completa sera divulgada no lancamento.' },
  { q: 'Como recebo as promocoes?', a: 'Tudo pelo app Dicas em Dobro. Voce ve quais restaurantes estao disponiveis, ativa o beneficio e vai. E so mostrar o app na hora de pedir.' },
  { q: 'O grupo VIP tem limite de vagas?', a: 'Sim. O grupo tem capacidade limitada e pode ser encerrado a qualquer momento. Entre agora para garantir sua vaga.' },
]

/* ─── CARD STYLE ─── */
const card = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 20 }
const sectionDark = { width: '100%', padding: '72px 20px', position: 'relative', overflow: 'hidden', background: 'var(--azul)' }
const sectionMid  = { width: '100%', padding: '72px 20px', position: 'relative', overflow: 'hidden', background: 'var(--azul-mid)' }
const container   = { maxWidth: 560, margin: '0 auto' }

export default function Home() {
  useReveal()
  useScrollTracking()

  return (
    <main style={{ paddingBottom: 80 }}>

      {/* ── STICKY CTA ── */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999, padding: '10px 16px 14px', background: 'linear-gradient(to top, rgba(6,22,32,0.98), rgba(6,22,32,0.85))', backdropFilter: 'blur(10px)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <a href={WPP} target="_blank" rel="noopener noreferrer" className="btn-wpp" onClick={() => handleWppClick('sticky')} style={{ maxWidth: 520, margin: '0 auto', fontSize: '0.95rem', padding: '14px 24px' }}>
          <WppIcon size={20} /> ENTRAR NO GRUPO VIP — GRATIS
        </a>
      </div>


      {/* ── S1 HERO ── */}
      <section style={{ minHeight: '100svh', background: 'linear-gradient(170deg,#061620 0%,#0f2a3d 50%,#1a3f5c 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 20px 96px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "radial-gradient(circle, rgba(29,82,109,0.3) 1px, transparent 1px)", backgroundSize: '32px 32px', zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 520, textAlign: 'center' }}>

          <div style={{ marginBottom: 24 }}>
            <img src="/images/logo.png" alt="Dicas em Dobro" width="80" height="80" style={{ width: 80, height: 80, objectFit: 'contain', background: 'white', borderRadius: '50%', padding: 5, boxShadow: '0 0 0 3px rgba(255,255,255,0.1), 0 12px 40px rgba(0,0,0,0.4)' }} />
          </div>

          <div style={{ marginBottom: 18, display: 'flex', justifyContent: 'center' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(227,62,51,0.15)', border: '1px solid rgba(227,62,51,0.4)', color: '#ff7a72', borderRadius: 100, padding: '6px 14px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', animation: 'urgency-blink 2s ease infinite' }}>
              Vagas limitadas no Grupo VIP
            </span>
          </div>

          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.6rem, 11vw, 4.2rem)', lineHeight: 1.05, letterSpacing: '0.02em', color: 'white', marginBottom: 16 }}>
            COMPRE 1 E GANHE <span style={{ color: 'var(--dourado)' }}>OUTRO</span> NOS MELHORES RESTAURANTES DA CIDADE
          </h1>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, background: 'rgba(255,215,0,0.1)', border: '1.5px solid rgba(255,215,0,0.3)', borderRadius: 12, padding: '10px 16px', marginBottom: 18, width: '100%' }}>
            <span style={{ flexShrink: 0, fontSize: '1.2rem' }}>🏆</span>
            <p style={{ color: 'var(--dourado)', fontWeight: 700, fontSize: 'clamp(0.9rem, 3.2vw, 1rem)', textAlign: 'left', lineHeight: 1.35 }}>
              Concorra a um <strong>iPhone 17e</strong> comprando no pre-lancamento
            </p>
          </div>

          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(0.88rem, 3.2vw, 0.98rem)', lineHeight: 1.65, marginBottom: 24 }}>
            Entre agora no Grupo VIP e tenha acesso antecipado aos restaurantes participantes, promocoes exclusivas e ao sorteio oficial do iPhone 17e.
          </p>

          <div style={{ borderRadius: 20, overflow: 'hidden', marginBottom: 22, border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 24px 60px rgba(0,0,0,0.5)', position: 'relative' }}>
            <img src="/images/hero.jpg" alt="Experiencias gastronomicas em Rio Preto" style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: 340 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,22,32,0.6) 0%, transparent 50%)' }} />
          </div>

          <a href={WPP} target="_blank" rel="noopener noreferrer" className="btn-wpp" onClick={() => handleWppClick('hero')} style={{ marginBottom: 10 }}>
            <WppIcon size={24} /> ENTRAR NO GRUPO VIP
          </a>
          <p style={{ color: 'var(--cinza)', fontSize: '0.78rem', marginTop: 8 }}>Grupo gratuito. Milhares de pessoas ja estao entrando.</p>
        </div>
        <Torn color="var(--azul-mid)" />
      </section>


      {/* ── S2 COMO FUNCIONA ── */}
      <section style={{ ...sectionMid, paddingTop: 80 }}>
        <Torn color="var(--azul-mid)" flip />
        <div style={{ ...container, position: 'relative', zIndex: 1 }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ color: 'var(--cinza)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>SUPER SIMPLES</p>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2rem, 8vw, 3rem)', letterSpacing: '0.03em' }}>Como funciona?</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { n: '01', t: 'Entre no Grupo VIP', s: 'Clique no botao e entre agora no grupo exclusivo do WhatsApp' },
              { n: '02', t: 'Receba acesso aos restaurantes', s: 'Descubra todos os parceiros antes do lancamento oficial' },
              { n: '03', t: 'Compre 1 prato, ganhe outro', s: 'Va ao restaurante, mostre o app e ganhe o segundo prato de graca' },
            ].map((step, i) => (
              <div key={i} className="reveal" style={{ ...card, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ minWidth: 44, height: 44, borderRadius: '50%', background: i === 2 ? 'var(--vermelho)' : 'rgba(29,82,109,0.5)', border: `1px solid ${i === 2 ? 'var(--vermelho)' : 'rgba(29,82,109,0.8)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bebas Neue', sans-serif", fontSize: '1rem', color: 'white', flexShrink: 0 }}>{step.n}</div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 4 }}>{step.t}</p>
                  <p style={{ color: 'var(--cinza)', fontSize: '0.86rem', lineHeight: 1.5 }}>{step.s}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="reveal" style={{ marginTop: 36 }}>
            <a href={WPP} target="_blank" rel="noopener noreferrer" className="btn-wpp" onClick={() => handleWppClick('como-funciona')}>
              <WppIcon /> ENTRAR NO GRUPO VIP
            </a>
          </div>
        </div>
        <Torn color="var(--azul)" />
      </section>


      {/* ── S3 PARCEIROS SELECIONADOS ── */}
      <section style={{ ...sectionDark, paddingBottom: 60 }}>
        <Torn color="var(--azul)" flip />
        <div style={{ position: 'relative', zIndex: 1 }}>

          <div className="reveal" style={{ ...container, textAlign: 'center', marginBottom: 28 }}>
            <p style={{ color: 'var(--cinza)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>JA CONFIRMADOS</p>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2rem, 8vw, 3rem)', letterSpacing: '0.03em', marginBottom: 10 }}>
              Parceiros selecionados
            </h2>
            <p style={{ color: 'var(--cinza)', fontSize: '0.88rem', lineHeight: 1.55 }}>
              Restaurantes reais, experiencias reais e beneficios exclusivos para membros do Grupo VIP.
            </p>
          </div>

          {/* CAROUSEL */}
          <div style={{ display: 'flex', overflowX: 'auto', gap: 14, paddingLeft: 20, paddingRight: 20, paddingBottom: 4, scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

            {PARTNERS.map((r, i) => (
              <div key={i} style={{ flex: '0 0 74vw', maxWidth: 300, scrollSnapAlign: 'start', borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 8px 32px rgba(0,0,0,0.45)', background: '#0a1e2d' }}>
                <div style={{ position: 'relative', paddingBottom: '66%' }}>
                  <img src={r.img} alt={r.alt} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 100%)' }} />
                  <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,215,0,0.4)', borderRadius: 100, padding: '3px 10px', fontSize: '0.6rem', fontWeight: 800, color: 'var(--dourado)', letterSpacing: '0.12em' }}>VIP</div>
                </div>
                <div style={{ padding: '12px 14px 14px' }}>
                  <p style={{ fontWeight: 700, fontSize: '0.92rem', color: 'white', marginBottom: 3 }}>{r.name}</p>
                  <p style={{ fontSize: '0.72rem', color: 'var(--cinza)', fontWeight: 500 }}>{r.cat}</p>
                </div>
              </div>
            ))}

            {/* Last card */}
            <div style={{ flex: '0 0 68vw', maxWidth: 260, scrollSnapAlign: 'start', borderRadius: 18, border: '1px solid rgba(255,215,0,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.45)', background: 'linear-gradient(135deg, #0a1e2d 0%, #1a3f5c 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 220, padding: '28px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '80%', height: '80%', background: 'radial-gradient(ellipse, rgba(255,215,0,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
              <div style={{ fontSize: '2rem', marginBottom: 10, position: 'relative' }}>+</div>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(1.5rem, 5vw, 1.9rem)', color: 'var(--dourado)', letterSpacing: '0.04em', lineHeight: 1.1, marginBottom: 8, position: 'relative' }}>E muitooo mais</p>
              <p style={{ color: 'var(--cinza)', fontSize: '0.78rem', lineHeight: 1.5, position: 'relative' }}>Novos restaurantes confirmados toda semana.</p>
            </div>
          </div>

          <p style={{ textAlign: 'center', color: 'var(--cinza)', fontSize: '0.7rem', margin: '10px 0 28px', opacity: 0.7 }}>arraste para ver mais</p>

          <div style={container}>
            <a href={WPP} target="_blank" rel="noopener noreferrer" className="btn-wpp" onClick={() => handleWppClick('parceiros')}>
              <WppIcon /> ENTRAR NO GRUPO VIP
            </a>
          </div>
        </div>
        <Torn color="var(--azul-mid)" />
      </section>


      {/* ── S4 BENEFICIOS ── */}
      <section style={sectionMid}>
        <Torn color="var(--azul-mid)" flip />
        <div style={{ ...container, position: 'relative', zIndex: 1 }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 36 }}>
            <p style={{ color: 'var(--cinza)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>POR QUE ENTRAR?</p>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2rem, 8vw, 3rem)', letterSpacing: '0.03em' }}>
              Seus beneficios no <span style={{ color: 'var(--dourado)' }}>Grupo VIP</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              ['💰', '+R$4.000 em economia', 'Pague 1, leve 2 em cada visita'],
              ['🍽️', '+60 restaurantes', 'Os melhores de Rio Preto'],
              ['⚡', 'Acesso antecipado', 'Antes do lancamento oficial'],
              ['🏆', 'Sorteio iPhone 17e', 'Exclusivo para membros VIP'],
              ['🔒', 'Grupo exclusivo', 'Vagas limitadas'],
              ['⭐', 'Experiencias unicas', 'Lugares escolhidos a dedo'],
            ].map(([e, t, s], i) => (
              <div key={i} className="reveal" style={{ ...card, textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>{e}</div>
                <p style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: 4 }}>{t}</p>
                <p style={{ color: 'var(--cinza)', fontSize: '0.75rem', lineHeight: 1.4 }}>{s}</p>
              </div>
            ))}
          </div>
          <div className="reveal" style={{ marginTop: 36 }}>
            <a href={WPP} target="_blank" rel="noopener noreferrer" className="btn-wpp" onClick={() => handleWppClick('beneficios')}>
              <WppIcon /> GARANTIR MINHA VAGA VIP
            </a>
          </div>
        </div>
        <Torn color="var(--azul)" />
      </section>


      {/* ── S5 VIDEO / RESTAURANTES ── */}
      <section style={sectionDark}>
        <Torn color="var(--azul)" flip />
        <div style={{ ...container, position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div className="reveal" style={{ marginBottom: 28 }}>
            <p style={{ color: 'var(--cinza)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>GASTRONOMIA EM DOBRO</p>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2rem, 8vw, 3rem)', letterSpacing: '0.03em', marginBottom: 10 }}>
              Os restaurantes mais desejados da cidade
            </h2>
            <p style={{ color: 'var(--cinza)', fontSize: '0.88rem' }}>Novos parceiros toda semana.</p>
          </div>
          <div className="reveal" style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 20, border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 16px 50px rgba(0,0,0,0.4)', position: 'relative', paddingBottom: '56.25%', height: 0 }}>
            <iframe src="https://player.vimeo.com/video/1190999200?autoplay=1&loop=1&muted=1&background=1" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
          </div>
          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 28 }}>
            {['🍔 Hamburguer','🍣 Sushi','🍕 Pizza','🥩 Churrasco','🍝 Italiana','🎂 Sobremesas','🐟 Frutos do Mar','🥗 Saudavel'].map(t => (
              <span key={t} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 100, padding: '6px 14px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{t}</span>
            ))}
          </div>
          <div className="reveal">
            <a href={WPP} target="_blank" rel="noopener noreferrer" className="btn-wpp" onClick={() => handleWppClick('restaurantes')}>
              <WppIcon /> ENTRAR NO GRUPO VIP
            </a>
          </div>
        </div>
        <Torn color="var(--azul-mid)" />
      </section>


      {/* ── S6 PROVA SOCIAL ── */}
      <section style={sectionMid}>
        <Torn color="var(--azul-mid)" flip />
        <div style={{ ...container, position: 'relative', zIndex: 1 }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 36 }}>
            <p style={{ color: 'var(--cinza)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>COMUNIDADE VIP</p>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2rem, 8vw, 3rem)', letterSpacing: '0.03em' }}>
              Ja somos mais de <span style={{ color: 'var(--dourado)' }}>700 pessoas</span>
            </h2>
          </div>
          <div className="reveal" style={{ ...card, textAlign: 'center', padding: '32px 24px', marginBottom: 16, background: 'rgba(255,215,0,0.05)', border: '1px solid rgba(255,215,0,0.2)' }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(4rem, 18vw, 6rem)', color: 'var(--dourado)', lineHeight: 1, letterSpacing: '0.03em' }}>700+</div>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600, marginTop: 8 }}>pessoas no Grupo VIP</p>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 14 }}>
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} style={{ width: 30, height: 30, borderRadius: '50%', background: `hsl(${i * 35 + 180},35%,${32 + (i % 3) * 7}%)`, border: '2px solid var(--azul-mid)', marginLeft: i > 0 ? -9 : 0 }} />
              ))}
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--vermelho)', border: '2px solid var(--azul-mid)', marginLeft: -9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem', fontWeight: 800 }}>+700</div>
            </div>
          </div>
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 32 }}>
            {[['+60','Restaurantes parceiros'],['R$4k+','Em economia por ano'],['100%','Gratuito para entrar']].map(([n, l], i) => (
              <div key={i} style={{ ...card, textAlign: 'center', padding: '14px 8px' }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(1.3rem, 5vw, 1.8rem)', color: 'var(--dourado)' }}>{n}</div>
                <p style={{ color: 'var(--cinza)', fontSize: '0.68rem', lineHeight: 1.3, marginTop: 4 }}>{l}</p>
              </div>
            ))}
          </div>
          <div className="reveal">
            <a href={WPP} target="_blank" rel="noopener noreferrer" className="btn-wpp" onClick={() => handleWppClick('prova-social')}>
              <WppIcon /> ENTRAR NO GRUPO VIP
            </a>
          </div>
        </div>
        <Torn color="var(--azul)" />
      </section>


      {/* ── S7 SORTEIO IPHONE ── */}
      <section style={{ ...sectionDark }} id="sorteio">
        <Torn color="var(--azul)" flip />
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: '100vw', maxWidth: 600, height: 400, background: 'radial-gradient(ellipse, rgba(255,215,0,0.07) 0%, transparent 70%)', borderRadius: '50%', zIndex: 0, pointerEvents: 'none' }} />
        <div style={{ ...container, position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div className="reveal" style={{ marginBottom: 24 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,215,0,0.12)', border: '1px solid rgba(255,215,0,0.35)', color: 'var(--dourado)', borderRadius: 100, padding: '6px 14px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>EXCLUSIVO PARA MEMBROS VIP</span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.2rem, 9vw, 3.5rem)', letterSpacing: '0.03em', lineHeight: 1.05, marginBottom: 8 }}>
              Voce ainda concorre a um<br/><span style={{ color: 'var(--dourado)', fontSize: 'clamp(2.8rem, 12vw, 4.5rem)' }}>iPhone 17e</span>
            </h2>
            <p style={{ color: 'var(--cinza)', fontSize: '0.9rem', lineHeight: 1.6 }}>Apenas participantes do Grupo VIP estarao no sorteio oficial.</p>
          </div>
          <div className="reveal" style={{ maxWidth: 400, margin: '0 auto 28px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '90%', height: '60%', background: 'radial-gradient(ellipse, rgba(255,215,0,0.2) 0%, transparent 70%)', borderRadius: '50%', zIndex: 0 }} />
            <img src="/images/iphone-sorteio.jpg" alt="iPhone 17e sorteio Dicas em Dobro" style={{ width: '100%', borderRadius: 16, position: 'relative', zIndex: 1, filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.6))' }} loading="lazy" />
          </div>
          <div className="reveal" style={{ ...card, marginBottom: 24, padding: '28px 20px' }}>
            <Countdown />
          </div>
          <div className="reveal">
            <p style={{ color: 'var(--cinza)', fontSize: '0.82rem', marginBottom: 16 }}>Entre no Grupo VIP para receber as instrucoes do sorteio nos proximos dias.</p>
            <a href={WPP} target="_blank" rel="noopener noreferrer" className="btn-wpp" onClick={() => handleWppClick('sorteio')}>
              <WppIcon /> QUERO CONCORRER AO IPHONE
            </a>
          </div>
        </div>
        <Torn color="var(--azul-mid)" />
      </section>


      {/* ── S8 URGENCIA ── */}
      <section style={{ ...sectionMid, padding: '56px 20px' }}>
        <Torn color="var(--azul-mid)" flip />
        <div style={{ ...container, position: 'relative', zIndex: 1 }} className="reveal">
          <div style={{ background: 'rgba(227,62,51,0.08)', border: '1px solid rgba(227,62,51,0.25)', borderRadius: 20, padding: '28px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: 8 }}>⚠️</div>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(1.6rem, 7vw, 2.4rem)', letterSpacing: '0.03em', marginBottom: 10 }}>As vagas podem ser encerradas a qualquer momento</h3>
            <p style={{ color: 'var(--cinza)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: 24 }}>O grupo VIP tem capacidade limitada. Quando esgotar, voce ficara de fora do lancamento e do sorteio do iPhone 17e.</p>
            <a href={WPP} target="_blank" rel="noopener noreferrer" className="btn-wpp" onClick={() => handleWppClick('urgencia')}>
              <WppIcon /> GARANTIR MINHA VAGA AGORA
            </a>
          </div>
        </div>
        <Torn color="var(--azul)" />
      </section>


      {/* ── S9 FAQ ── */}
      <section style={sectionDark}>
        <Torn color="var(--azul)" flip />
        <div style={{ ...container, position: 'relative', zIndex: 1 }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 36 }}>
            <p style={{ color: 'var(--cinza)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>DUVIDAS?</p>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2rem, 8vw, 3rem)', letterSpacing: '0.03em' }}>Perguntas frequentes</h2>
          </div>
          <div className="reveal" style={{ marginBottom: 36 }}>
            {FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
          </div>
          <div className="reveal">
            <a href={WPP} target="_blank" rel="noopener noreferrer" className="btn-wpp" onClick={() => handleWppClick('faq')}>
              <WppIcon /> ENTRAR NO GRUPO VIP
            </a>
          </div>
        </div>
        <Torn color="var(--azul-mid)" />
      </section>


      {/* ── S10 CTA FINAL ── */}
      <section style={{ ...sectionMid, paddingBottom: 100 }}>
        <Torn color="var(--azul-mid)" flip />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '90vw', maxWidth: 500, height: 500, background: 'radial-gradient(ellipse, rgba(37,211,102,0.06) 0%, transparent 70%)', borderRadius: '50%', zIndex: 0 }} />
        <div style={{ ...container, position: 'relative', zIndex: 1, textAlign: 'center' }} className="reveal">
          <img src="/images/logo.png" alt="Dicas em Dobro" style={{ width: 72, height: 72, objectFit: 'contain', background: 'white', borderRadius: '50%', padding: 4, boxShadow: '0 8px 30px rgba(0,0,0,0.3)', marginBottom: 24 }} />
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.2rem, 9vw, 3.6rem)', letterSpacing: '0.03em', lineHeight: 1.05, marginBottom: 16 }}>
            ENTRE AGORA PARA O GRUPO VIP DO DICAS EM DOBRO
          </h2>
          <p style={{ color: 'var(--cinza)', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: 32 }}>
            Garanta acesso antecipado, promocoes exclusivas e participe do sorteio do iPhone 17e. Vagas limitadas.
          </p>
          <a href={WPP} target="_blank" rel="noopener noreferrer" className="btn-wpp" style={{ fontSize: 'clamp(1rem, 4vw, 1.15rem)', padding: '20px 32px', marginBottom: 10 }} onClick={() => handleWppClick('cta-final')}>
            <WppIcon size={24} /> ENTRAR NO GRUPO VIP AGORA
          </a>
          <p style={{ color: 'var(--cinza)', fontSize: '0.75rem', marginTop: 8 }}>Gratuito. Sem spam. Pode sair quando quiser.</p>
        </div>
      </section>


      {/* ── FOOTER ── */}
      <footer style={{ background: '#061620', padding: '32px 20px 100px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <img src="/images/logo.png" alt="Dicas em Dobro" style={{ width: 48, height: 48, objectFit: 'contain', background: 'white', borderRadius: '50%', padding: 3, marginBottom: 16 }} />
        <div style={{ marginBottom: 16 }}>
          <a href="https://www.instagram.com/dicasemdobro.rp" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cinza)', fontSize: '0.82rem', textDecoration: 'none' }}>@dicasemdobro.rp</a>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 16 }}>
          {['Politica de Privacidade','Termos de Uso'].map(l => <a key={l} href="#" style={{ color: 'var(--cinza)', fontSize: '0.72rem', textDecoration: 'none' }}>{l}</a>)}
        </div>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem' }}>2025 Dicas em Dobro. Sao Jose do Rio Preto.</p>
      </footer>

    </main>
  )
}
