'use client'
import Image from 'next/image'
import styles from './page.module.css'

export default function Page() {
  return (
    <div className={styles.card}>
      <Image src="/logo.webp" alt="Dicas em Dobro" width={72} height={72} priority className={styles.logo} />
      <div className={styles.avail}><span className={styles.dot} />Já disponível para download</div>
      <p className={styles.proof}>Mais de <strong>500 Rio Pretenses</strong> já aproveitando<br />benefícios em +60 restaurantes.</p>
      <Image src="/banner.webp" alt="Compre 1 prato ganhe outro de graça" width={480} height={270} priority className={styles.banner} />
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
      <p className={styles.note}>Download gratuito · iPhone e Android</p>
    </div>
  )
}
