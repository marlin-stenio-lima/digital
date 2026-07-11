import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../fabrica-de-bones/page.module.css';
import FacebookPixel from '@/components/FacebookPixel';

export default function ProjetosCurraisLP() {
  const pId = "currais";
  const pName = "Projetos de Currais";
  const pDesc = "Aprenda a construir currais modernos, seguros e altamente eficientes. Guia prático com projetos detalhados prontos para executar.";
  
  return (
    <>
      <Head>
        <title>{pName} | Ricardo Castro</title>
        <meta name="description" content={pDesc} />
      </Head>
      <FacebookPixel />
      
      <main className={styles.container}>
        {/* ===== A — ATENÇÃO ===== */}
        <section className={styles.heroCurrais}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>PROJETOS PRONTOS E DETALHADOS</div>
            <h1 className={styles.headline}>
              Construa Currais Modernos e Lucrativos — <span className={styles.highlight}>Economize tempo e material</span> com projetos prontos.
            </h1>
            <p className={styles.subheadline}>
              Projetos completos com medidas exatas, lista de materiais e o passo a passo para construir ou vender currais profissionais.
            </p>

            <div className={styles.heroPriceTag}>
              <span className={styles.heroPriceFrom}>De <del>R$ 97,00</del> por apenas</span>
              <span className={styles.heroPriceBig}>R$ 9,90</span>
            </div>

            <Link href={`/checkout?p=${pId}`} className={styles.ctaButtonPulse}>
              QUERO ACESSAR OS PROJETOS AGORA
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
            <h2 className={styles.sectionTitle}>Por que usar nossos projetos estruturados?</h2>
            <div className={styles.storyText}>
              <p>Construir sem planejamento gera desperdício de madeira, metal e concreto. Um curral mal projetado pode estressar o gado e até causar acidentes. Nossos projetos eliminam o erro humano.</p>
              
              <div className={styles.highlightBox}>
                <h3>Economia Inteligente de até 40% 💡</h3>
                <p>Nossos projetos foram desenhados por profissionais para maximizar o fluxo do rebanho e reduzir os custos de construção ao mínimo. Você recebe o PDF completo com listas de materiais detalhadas.</p>
                <p><strong>Custo benefício imbatível: Um projeto que vale mais de R$ 300 por apenas R$ 9,90.</strong></p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== D — DESEJO (Prova Social) ===== */}
        <section className={styles.socialProof}>
          <h2 className={styles.sectionTitle}>Quem utilizou nossos projetos:</h2>
          <div className={styles.testimonialsGrid}>
            
            <div className={styles.testimonialCard}>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.testimonialText}>
                &quot;Economizei mais de R$ 2.000 em madeira só seguindo a lista de corte exata do projeto do curral.&quot;
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>A</div>
                <div className={styles.authorInfo}>
                  <h4>Antônio Ramos</h4>
                  <p>Produtor Rural</p>
                </div>
              </div>
            </div>

            <div className={styles.testimonialCard}>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.testimonialText}>
                &quot;Excelente detalhamento. Sou serralheiro e vendi a construção do curral pro cliente usando o PDF como guia.&quot;
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>R</div>
                <div className={styles.authorInfo}>
                  <h4>Reginaldo Dias</h4>
                  <p>Serralheiro e Construtor</p>
                </div>
              </div>
            </div>

            <div className={styles.testimonialCard}>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.testimonialText}>
                &quot;Muito prático. A entrada e saída dos animais ficou excelente, sem gargalos. Recomendo muito!&quot;
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>F</div>
                <div className={styles.authorInfo}>
                  <h4>Felipe Souza</h4>
                  <p>Pecuarista</p>
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
                <li><span>✅ Projetos de Currais em PDF com Medidas</span> <del>R$ 97,00</del></li>
                <li><span>✅ Lista completa de materiais recomendados</span> <del>R$ 47,00</del></li>
                <li><span>✅ Modelos de fluxo anti-estresse para o gado</span> <del>R$ 37,00</del></li>
              </ul>
              <div className={styles.totalAnchor}>
                Total: <del>R$ 181,00</del>
              </div>
            </div>
          </div>
        </section>

        {/* ===== A — AÇÃO ===== */}
        <section className={styles.finalCta}>
          <div className={styles.finalBox}>
            <div className={styles.urgentBadge}>⏳ OFERTA POR TEMPO LIMITADO</div>
            <h2>Garanta o Acesso Completo</h2>
            
            <div className={styles.scarcityText}>
              <p>🚨 <strong>Atenção:</strong> Esta oferta de lançamento por apenas R$ 9,90 ficará disponível por poucos dias. Garanta o material antes do reajuste para R$ 47,00.</p>
            </div>

            <div className={styles.priceTag}>
              Tudo isso por apenas<br/>
              <span className={styles.priceHighlight}>R$ 9,90</span>
            </div>
            
            <Link href={`/checkout?p=${pId}`} className={styles.ctaButtonPulse}>
              QUERO ACESSAR OS PROJETOS AGORA
            </Link>
          </div>
        </section>

        {/* STICKY MOBILE CTA */}
        <div className={styles.stickyMobileCta}>
          <Link href={`/checkout?p=${pId}`} className={styles.stickyButton}>
            COMEÇAR POR R$ 9,90
          </Link>
        </div>
      </main>
    </>
  );
}
