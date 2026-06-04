'use client'
import Image from 'next/image'
import { useState } from 'react'
import styles from './page.module.css'

export default function Page() {
  const [videoLoaded, setVideoLoaded] = useState(false)

  return (
    <div className={styles.card}>
      <Image src="/logo.webp" alt="Dicas em Dobro" width={72} height={72} priority className={styles.logo} />

      <div className={styles.avail}>
        <span className={styles.dot} />
        Primeiro lote disponível — R$99,90. Pode subir a qualquer momento.
      </div>

      <p className={styles.proof}>Mais de <strong>500 Rio Pretenses</strong> já aproveitando<br />benefícios em +60 restaurantes.</p>

      {/* Vídeo — clique abre direto no Vimeo com som */}
      <div className={styles.videoWrap}>
        {!videoLoaded ? (
          <div className={styles.videoThumb} onClick={() => setVideoLoaded(true)}>
            <Image
              src="/thumb.webp"
              alt="Como funciona o Dicas em Dobro"
              fill
              style={{ objectFit: 'cover' }}
            />
            <div className={styles.playOverlay}>
              <div className={styles.playBtn}>▶</div>
            </div>
          </div>
        ) : (
          <iframe
            src="https://player.vimeo.com/video/1196995723?autoplay=1&muted=0&playsinline=1"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; web-share"
            allowFullScreen
            className={styles.videoFrame}
          />
        )}
      </div>

      <div className={styles.badgeVermelho}>⚠️ Últimas unidades do primeiro lote disponíveis</div>

      <div className={styles.btns}>
        <a href="/baixar/ios" className={styles.btn}>
          <span className={styles.bicon}>🍎</span>
          <div className={styles.btxt}><span className={styles.bsm}>Baixar na</span><span className={styles.bbg}>App Store</span></div>
        </a>
        <a href="/baixar/android" className={`${styles.btn} ${styles.btn2}`}>
          <span className={styles.bicon}>▶</span>
          <div className={styles.btxt}><span className={styles.bsm}>Disponível no</span><span className={styles.bbg}>Google Play</span></div>
        </a>
      </div>

      <div className={styles.badgeVerde}>🎁 Concorra a um iPhone 17e</div>

      <Image src="/banner.webp" alt="Compre 1 prato ganhe outro de graça" width={480} height={270} className={styles.banner} />

      <p className={styles.note}>Download gratuito · iPhone e Android</p>
    </div>
  )
}
