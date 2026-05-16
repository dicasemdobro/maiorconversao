'use client'
import { useEffect, useRef } from 'react'

const WPP = 'https://chat.whatsapp.com/IzPtz8dqp5IBlFDjaqG4NT?mode=gi_t'

function fbq(event, params) {
  if (typeof window !== 'undefined' && window.fbq) window.fbq('track', event, params || {})
}

function WppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

/* ─── THE ONE BUTTON ─── */
function CTAButton({ label, text = 'ENTRAR NO GRUPO VIP — GRÁTIS' }) {
  function click() {
    fbq('Lead', { content_name: 'Grupo VIP', content_category: label })
    fbq('WhatsApp_Click', { button: label })
  }
  return (
    <a
      href={WPP}
      target="_blank"
      rel="noopener noreferrer"
      onClick={click}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        background: '#25D366', color: '#fff',
        fontFamily: 'Inter, sans-serif', fontWeight: 800,
        fontSize: 'clamp(1rem, 4vw, 1.1rem)',
        padding: '18px 24px', borderRadius: 100,
        textDecoration: 'none', width: '100%',
        animation: 'pulse 2s ease infinite',
        letterSpacing: '0.01em',
      }}
    >
      <WppIcon /> {text}
    </a>
  )
}

function useScrollTracking() {
  const fired = useRef({})
  useEffect(() => {
    const h = () => {
      const pct = Math.round(window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100)
      ;[25,50,75,90].forEach(d => {
        if (pct >= d && !fired.current[d]) { fired.current[d] = true; fbq('ScrollDepth', { depth: d }) }
      })
    }
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
}

const PARTNERS = [
  { img: '/images/rest-cocobambu.webp',  name: 'Coco Bambu',           cat: 'Frutos do mar' },
  { img: '/images/rest-borelli.webp',    name: 'Borelli',              cat: 'Gelato & Sobremesas' },
  { img: '/images/rest-bbonca.webp',     name: "BB Onça Burguer's",    cat: 'Hambúrguer artesanal' },
  { img: '/images/rest-harushi.webp',    name: 'Harushi Oriental Food', cat: 'Comida japonesa' },
  { img: '/images/rest-jazz.webp',       name: 'Jazz Cozinha',         cat: 'Gastronomia contemporânea' },
]

export default function Home() {
  useScrollTracking()

  return (
    <main style={{ maxWidth: 480, margin: '0 auto' }}>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO — acima da dobra, decisão aqui
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section style={{ padding: '36px 20px 32px', background: '#07182a' }}>

        {/* Linha de credibilidade — pequena, acima de tudo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
          <img src="/images/logo.webp" alt="Dicas em Dobro" style={{ width: 32, height: 32, borderRadius: '50%', background: 'white', padding: 2 }} />
          <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem', fontWeight: 600 }}>Dicas em Dobro · Rio Preto</span>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#25D366', animation: 'blink 1.5s ease infinite' }} />
          <span style={{ color: '#25D366', fontSize: '0.72rem', fontWeight: 700 }}>700+ no grupo</span>
        </div>

        {/* HEADLINE — a única coisa que importa */}
        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(3rem, 13vw, 5rem)',
          lineHeight: 0.95,
          letterSpacing: '0.01em',
          color: 'white',
          textAlign: 'center',
          marginBottom: 12,
        }}>
          COMPRE 1<br/>
          <span style={{ color: '#FFD700' }}>GANHE OUTRO</span><br/>
          DE GRAÇA
        </h1>

        {/* Sub — uma linha, concreto */}
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '0.92rem', marginBottom: 20, lineHeight: 1.5 }}>
          +60 restaurantes em Rio Preto. Todo dia. Sem limite.
        </p>

        {/* CTA — dominante, sem competição */}
        <CTAButton label="hero" />
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '0.65rem', marginTop: 8 }}>
          Gratuito · Sem spam · Saia quando quiser
        </p>

        {/* Foto — prova visual, depois do botão */}
        <div style={{ marginTop: 20, borderRadius: 16, overflow: 'hidden', position: 'relative', boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}>
          <img
            src="/images/hero.webp"
            alt="Experiências gastronômicas em Rio Preto"
            style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: 360 }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,24,42,0.6) 0%, transparent 40%)' }} />
          {/* iPhone — aparece dentro da foto, discreto mas presente */}
          <div style={{
            position: 'absolute', bottom: 14, left: 14, right: 14,
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(12px)',
            borderRadius: 12, padding: '9px 14px',
            border: '1px solid rgba(255,215,0,0.25)',
          }}>
            <span style={{ fontSize: '1.1rem' }}>🏆</span>
            <div>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.95rem', color: '#FFD700', letterSpacing: '0.04em', lineHeight: 1 }}>CONCORRA A UM iPHONE 17e</p>
              <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>Exclusivo para membros do Grupo VIP</p>
            </div>
          </div>
        </div>

      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PARCEIROS — quem ainda não clicou
          precisa ver que é real
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section style={{ padding: '40px 0 32px', background: '#061220' }}>

        <div style={{ padding: '0 20px', marginBottom: 20 }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6, textAlign: 'center' }}>Parceiros confirmados</p>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(1.8rem, 7vw, 2.6rem)', letterSpacing: '0.02em', textAlign: 'center', lineHeight: 1.05 }}>
            Restaurantes reais.<br/><span style={{ color: '#FFD700' }}>Economia real.</span>
          </h2>
        </div>

        {/* Carrossel — arraste */}
        <div style={{ display: 'flex', overflowX: 'auto', gap: 10, paddingLeft: 20, paddingRight: 20, scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
          {PARTNERS.map((r, i) => (
            <div key={i} style={{ flex: '0 0 68vw', maxWidth: 260, scrollSnapAlign: 'start', borderRadius: 14, overflow: 'hidden', position: 'relative', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>
              <div style={{ paddingBottom: '70%', position: 'relative' }}>
                <img src={r.img} alt={r.name} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)' }} />
                <div style={{ position: 'absolute', bottom: 10, left: 12 }}>
                  <p style={{ fontWeight: 700, fontSize: '0.88rem', color: 'white', lineHeight: 1.2 }}>{r.name}</p>
                  <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{r.cat}</p>
                </div>
                <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(255,215,0,0.15)', border: '1px solid rgba(255,215,0,0.4)', borderRadius: 100, padding: '2px 8px', fontSize: '0.58rem', fontWeight: 800, color: '#FFD700' }}>VIP</div>
              </div>
            </div>
          ))}
          {/* Mais parceiros */}
          <div style={{ flex: '0 0 52vw', maxWidth: 200, scrollSnapAlign: 'start', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20, textAlign: 'center', minHeight: 160 }}>
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.4rem', color: '#FFD700', lineHeight: 1.1, marginBottom: 6 }}>+55<br/>outros</p>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem' }}>Novos toda semana</p>
          </div>
        </div>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.15)', fontSize: '0.65rem', marginTop: 10, marginBottom: 24 }}>← arraste →</p>

        <div style={{ padding: '0 20px' }}>
          <CTAButton label="parceiros" />
        </div>
      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SORTEIO — FOMO máximo
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="sorteio" style={{ padding: '40px 20px 36px', background: '#07182a' }}>

        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <span style={{ display: 'inline-block', background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.3)', borderRadius: 100, padding: '4px 14px', fontSize: '0.68rem', fontWeight: 700, color: '#FFD700', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>
            EXCLUSIVO PARA MEMBROS VIP
          </span>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.4rem, 10vw, 3.6rem)', letterSpacing: '0.02em', lineHeight: 0.95, marginBottom: 10 }}>
            VOCÊ CONCORRE<br/>A UM <span style={{ color: '#FFD700' }}>iPHONE 17e</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', lineHeight: 1.55 }}>
            Quem estiver no Grupo VIP recebe as instruções do sorteio nos próximos dias.
          </p>
        </div>

        <div style={{ maxWidth: 360, margin: '0 auto 24px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '80%', height: '50%', background: 'radial-gradient(ellipse, rgba(255,215,0,0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
          <img src="/images/iphone-sorteio.webp" alt="iPhone 17e sorteio Dicas em Dobro" style={{ width: '100%', borderRadius: 14, position: 'relative', zIndex: 1, filter: 'drop-shadow(0 12px 36px rgba(0,0,0,0.6))' }} loading="lazy" />
        </div>

        <CTAButton label="sorteio" text="QUERO CONCORRER AO iPHONE" />
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '0.65rem', marginTop: 8 }}>
          Entre no grupo VIP para participar
        </p>

      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CTA FINAL — última chance
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section style={{ padding: '40px 20px 48px', background: '#061220' }}>

        {/* Banner identidade visual */}
        <div style={{ borderRadius: 14, overflow: 'hidden', marginBottom: 24 }}>
          <img src="/images/banner-final.webp" alt="Dicas em Dobro" style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: 160 }} loading="lazy" />
        </div>

        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2rem, 8vw, 3rem)', letterSpacing: '0.02em', lineHeight: 1.0, textAlign: 'center', marginBottom: 10 }}>
          NÃO FIQUE<br/>DE FORA
        </h2>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', lineHeight: 1.55, marginBottom: 24 }}>
          O grupo pode fechar a qualquer momento.<br/>700+ pessoas já garantiram a vaga.
        </p>

        <CTAButton label="final" text="GARANTIR MINHA VAGA AGORA" />
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '0.65rem', marginTop: 8 }}>
          Gratuito · Sem spam · Saia quando quiser
        </p>

      </section>


      {/* FOOTER */}
      <footer style={{ padding: '20px', background: '#040d18', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <a href="https://www.instagram.com/dicasemdobro.rp" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem', textDecoration: 'none' }}>
          @dicasemdobro.rp
        </a>
        <p style={{ color: 'rgba(255,255,255,0.1)', fontSize: '0.62rem', marginTop: 6 }}>© 2025 Dicas em Dobro · São José do Rio Preto</p>
      </footer>

    </main>
  )
}
