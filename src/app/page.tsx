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
        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>MÉTODO TESTADO POR +500 ALUNOS</div>
            <h1 className={styles.headline}>
              Crie sua marca de bonés premium e fature <span className={styles.highlight}>R$ 15.000/mês</span> — sem fábrica, sem experiência.
            </h1>
            <p className={styles.subheadline}>
              Eu te entrego os fornecedores, o método e o passo a passo. Você só precisa começar.
            </p>

            <Link href="/fabrica-de-bones/checkout" className={styles.ctaButtonPulse}>
              QUERO CRIAR MINHA MARCA
              <span className={styles.ctaSub}>Por apenas R$ 13,90</span>
            </Link>
            
            <div className={styles.trustIndicators}>
              <span>🔒 Compra 100% Segura</span>
              <span>⚡ Acesso Imediato</span>
            </div>
          </div>
        </section>

        {/* COMO FUNCIONA - Simples e direto */}
        <section className={styles.storySection}>
          <div className={styles.storyContainer}>
            <h2 className={styles.sectionTitle}>Como funciona?</h2>
            <div className={styles.storyText}>
              <div className={styles.highlightBox}>
                <h3>Você NÃO precisa fabricar nada 💡</h3>
                <p>As maiores marcas do Brasil <strong>não</strong> fabricam os próprios bonés. Elas terceirizam. Eu encontrei essas fábricas — elas colocam sua logo, embalam e entregam pronto.</p>
                <p><strong>Custo: ~R$ 30 por boné → Venda: R$ 120 a R$ 150.</strong></p>
              </div>
            </div>
          </div>
        </section>

        {/* DEPOIMENTOS - Mais curtos */}
        <section className={styles.socialProof}>
          <h2 className={styles.sectionTitle}>Resultados reais:</h2>
          <div className={styles.testimonialsGrid}>
            
            <div className={styles.testimonialCard}>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.testimonialText}>
                &quot;Segui o passo a passo e em 15 dias fiz R$ 3.500 de lucro limpo.&quot;
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
                &quot;Meus bonés parecem de marca gringa e consigo cobrar muito mais caro.&quot;
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
                &quot;Comecei no quarto de casa. Hoje a renda extra virou minha renda principal.&quot;
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

        {/* OFERTA FINAL - Direto ao ponto */}
        <section className={styles.finalCta}>
          <div className={styles.finalBox}>
            <div className={styles.urgentBadge}>⏳ OFERTA POR TEMPO LIMITADO</div>
            <h2>Tudo que você recebe:</h2>
            
            <div className={styles.priceAnchoring}>
              <ul className={styles.anchorList}>
                <li><span>✅ Curso completo Marca de Bonés</span> <del>R$ 497</del></li>
                <li><span>✅ Lista de fornecedores secretos</span> <del>R$ 197</del></li>
                <li><span>✅ Planilha de precificação</span> <del>R$ 97</del></li>
              </ul>
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
