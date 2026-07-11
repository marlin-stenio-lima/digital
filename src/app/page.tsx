import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from './fabrica-de-bones/page.module.css';
import FacebookPixel from '@/components/FacebookPixel';

export default function FabricaDeBonesLP() {
  return (
    <>
      <Head>
        <title>Marca de Bonés | Ricardo Castro</title>
        <meta name="description" content="Crie sua marca de bonés premium do zero, sem fábrica e sem experiência. Método testado por +500 alunos." />
      </Head>
      <FacebookPixel />
      
      <main className={styles.container}>
        {/* ===== A — ATENÇÃO ===== */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>MÉTODO TESTADO POR +500 ALUNOS</div>
            <h1 className={styles.headline}>
              Crie sua marca de bonés premium e fature <span className={styles.highlight}>R$ 15.000/mês</span> — sem fábrica, sem experiência.
            </h1>
            <p className={styles.subheadline}>
              Eu te entrego os fornecedores, o método e o passo a passo completo. Você só precisa começar.
            </p>

            <div className={styles.heroPriceTag}>
              <span className={styles.heroPriceFrom}>De <del>R$ 297,00</del> por apenas</span>
              <span className={styles.heroPriceBig}>R$ 13,90</span>
            </div>

            <Link href="/fabrica-de-bones/checkout" className={styles.ctaButtonPulse}>
              QUERO CRIAR MINHA MARCA AGORA
            </Link>
            
            <div className={styles.trustIndicators}>
              <span>🔒 Compra 100% Segura</span>
              <span>⚡ Acesso Imediato</span>
              <span>📱 Receba no WhatsApp</span>
            </div>
          </div>
        </section>

        {/* ===== I — INTERESSE ===== */}
        <section className={styles.storySection}>
          <div className={styles.storyContainer}>
            <h2 className={styles.sectionTitle}>Como eu faturo R$ 15 mil por mês com bonés?</h2>
            <div className={styles.storyText}>
              <p>Eu não tenho fábrica. Não tenho galpão. Não tenho funcionários. E mesmo assim, construí uma marca de bonés que me gera mais de <strong>R$ 15.000 por mês</strong> — trabalhando do meu próprio quarto.</p>
              
              <div className={styles.highlightBox}>
                <h3>O segredo: Terceirização Inteligente 💡</h3>
                <p>As maiores marcas do Brasil <strong>não fabricam</strong> os próprios bonés. Elas usam fábricas parceiras que fazem tudo: colocam sua logo, bordam, embalam e entregam pronto pra você vender.</p>
                <p>Eu encontrei essas fábricas. E agora vou te dar o acesso direto a elas.</p>
                <p><strong>Seu custo: ~R$ 30 por boné → Venda: R$ 120 a R$ 150.</strong></p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== D — DESEJO (Prova Social) ===== */}
        <section className={styles.socialProof}>
          <h2 className={styles.sectionTitle}>Quem seguiu o método, já está lucrando:</h2>
          <div className={styles.testimonialsGrid}>
            
            <div className={styles.testimonialCard}>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.testimonialText}>
                &quot;Segui o passo a passo dos fornecedores e a forma de vender. Em 15 dias fiz R$ 3.500 de lucro limpo no bolso.&quot;
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>M</div>
                <div className={styles.authorInfo}>
                  <h4>Marcos Paulo</h4>
                  <p>R$ 3.500 no 1º mês</p>
                </div>
              </div>
            </div>

            <div className={styles.testimonialCard}>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.testimonialText}>
                &quot;O posicionamento de marca que o Ricardo ensina é surreal. Meus bonés parecem de marca gringa e consigo cobrar muito mais caro.&quot;
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>T</div>
                <div className={styles.authorInfo}>
                  <h4>Thiago Silva</h4>
                  <p>+R$ 10.000/mês</p>
                </div>
              </div>
            </div>

            <div className={styles.testimonialCard}>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.testimonialText}>
                &quot;Comecei no quarto de casa, sem experiência nenhuma. Hoje a renda extra já virou minha renda principal.&quot;
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>J</div>
                <div className={styles.authorInfo}>
                  <h4>João Victor</h4>
                  <p>Largou o CLT</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ===== D — DESEJO (O que você recebe) ===== */}
        <section className={styles.offerSection}>
          <div className={styles.offerContainer}>
            <h2 className={styles.sectionTitle}>O que você recebe hoje:</h2>
            <div className={styles.priceAnchoring}>
              <ul className={styles.anchorList}>
                <li><span>✅ Curso completo Marca de Bonés</span> <del>R$ 497</del></li>
                <li><span>✅ Lista de fornecedores exclusivos</span> <del>R$ 197</del></li>
                <li><span>✅ Planilha de precificação e lucro</span> <del>R$ 97</del></li>
              </ul>
              <div className={styles.totalAnchor}>
                Total: <del>R$ 791,00</del>
              </div>
            </div>
          </div>
        </section>

        {/* ===== A — AÇÃO ===== */}
        <section className={styles.finalCta}>
          <div className={styles.finalBox}>
            <div className={styles.urgentBadge}>⏳ OFERTA POR TEMPO LIMITADO</div>
            <h2>Comece sua marca hoje</h2>
            
            <div className={styles.scarcityText}>
              <p>🚨 <strong>Atenção:</strong> Para manter a qualidade do suporte e dos fornecedores parceiros, o número de vagas é limitado. Quando acabar, o preço volta para R$ 297.</p>
            </div>

            <div className={styles.priceTag}>
              Tudo isso por apenas<br/>
              <span className={styles.priceHighlight}>R$ 13,90</span>
            </div>
            
            <Link href="/fabrica-de-bones/checkout" className={styles.ctaButtonPulse}>
              QUERO CRIAR MINHA MARCA AGORA
            </Link>
          </div>
        </section>

        {/* STICKY MOBILE CTA */}
        <div className={styles.stickyMobileCta}>
          <Link href="/fabrica-de-bones/checkout" className={styles.stickyButton}>
            COMEÇAR POR R$ 13,90
          </Link>
        </div>
      </main>
    </>
  );
}
