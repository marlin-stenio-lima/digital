import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../fabrica-de-bones/page.module.css';
import FacebookPixel from '@/components/FacebookPixel';

export default function ProjetosPedreiroLP() {
  const pId = "pedreiro";
  const pName = "Projetos de Pedreiro e Construção Civil";
  const pDesc = "Aprenda a planejar fundações, pilares, vigas e alvenarias de forma profissional. Projetos estruturais práticos e de fácil leitura.";
  
  return (
    <>
      <Head>
        <title>{pName} | Ricardo Castro</title>
        <meta name="description" content={pDesc} />
      </Head>
      <FacebookPixel />
      
      <main className={styles.container}>
        {/* ===== A — ATENÇÃO ===== */}
        <section className={styles.heroPedreiro}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>GUIA PRÁTICO DE EXECUÇÃO</div>
            <h1 className={styles.headline}>
              Projetos Estruturais Descomplicados para Obras — <span className={styles.highlight}>Evite rachaduras</span> e economize cimento.
            </h1>
            <p className={styles.subheadline}>
              Medidas de ferragens, dosagem correta de concreto (traço) e guias detalhados de fundações, sapatas e lajes prontos para aplicar.
            </p>

            <div className={styles.heroPriceTag}>
              <span className={styles.heroPriceFrom}>De <del>R$ 39,90</del> por apenas</span>
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
            <h2 className={styles.sectionTitle}>A importância de construir com quem sabe</h2>
            <div className={styles.storyText}>
              <p>O maior erro na construção civil é fazer o dimensionamento de vigas e sapatas &quot;de cabeça&quot;. Isso causa patologias graves na obra como trincas, umidade estrutural e até desabamentos.</p>
              
              <div className={styles.highlightBox}>
                <h3>Segurança Máxima e Menos Desperdício 💡</h3>
                <p>Nossos projetos e guias detalham a distribuição de carga correta, amarrações de ferro (estribos) e o traço ideal para cada etapa (fundações, contrapiso e reboco). Tudo isso reunido em um único material de fácil leitura.</p>
                <p><strong>Mais de R$ 200 em informações técnicas convertidas em guias práticos por R$ 9,90.</strong></p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== D — DESEJO (Prova Social) ===== */}
        <section className={styles.socialProof}>
          <h2 className={styles.sectionTitle}>Quem utilizou nossos guias:</h2>
          <div className={styles.testimonialsGrid}>
            
            <div className={styles.testimonialCard}>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.testimonialText}>
                &quot;Material excelente. Eu construía de forma empírica, mas ler esse guia clareou muito sobre a dosagem de concreto para vigas aéreas.&quot;
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>J</div>
                <div className={styles.authorInfo}>
                  <h4>Jonas Barbosa</h4>
                  <p>Mestre de Obras</p>
                </div>
              </div>
            </div>

            <div className={styles.testimonialCard}>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.testimonialText}>
                &quot;Muito ilustrativo. Facilita muito na hora de explicar pro servente ou pro cliente o porquê de usar a sapata daquele tamanho.&quot;
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>H</div>
                <div className={styles.authorInfo}>
                  <h4>Humberto Costa</h4>
                  <p>Pedreiro Autônomo</p>
                </div>
              </div>
            </div>

            <div className={styles.testimonialCard}>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.testimonialText}>
                &quot;Comprei pra fazer o puxadinho na minha chácara. Deu super certo a armação das colunas, a laje ficou firme e sem nenhuma trinca.&quot;
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>C</div>
                <div className={styles.authorInfo}>
                  <h4>Carlos Eduardo</h4>
                  <p>Autoconstrutor</p>
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
                <li><span>✅ Guias de Sapatas, Pilares e Vigas de Sustentação</span> <del>R$ 39,90</del></li>
                <li><span>✅ Tabela de Dosagem Exata de Concreto (Traços)</span> <del>R$ 47,00</del></li>
                <li><span>✅ Manual contra infiltração e trincas estruturais</span> <del>R$ 37,00</del></li>
              </ul>
              <div className={styles.totalAnchor}>
                Total: <del>R$ 123,90</del>
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
              <p>🚨 <strong>Atenção:</strong> Evite erros estruturais irreparáveis na sua construção. Tenha o guia técnico por apenas R$ 9,90 enquanto a promoção está ativa.</p>
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
