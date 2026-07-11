import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../fabrica-de-bones/page.module.css';
import FacebookPixel from '@/components/FacebookPixel';

export default function ProjetosACMLP() {
  const pId = "acm";
  const pName = "Projetos de ACM (Fachadas e Revestimentos)";
  const pDesc = "Aprenda a trabalhar e projetar com chapas de ACM. Guia prático de corte, usinagem e estruturação para criar fachadas premium.";
  
  return (
    <>
      <Head>
        <title>{pName} | Ricardo Castro</title>
        <meta name="description" content={pDesc} />
      </Head>
      <FacebookPixel />
      
      <main className={styles.container}>
        {/* ===== A — ATENÇÃO ===== */}
        <section className={styles.heroACM}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>MÉTODO PRÁTICO DE FABRICAÇÃO</div>
            <h1 className={styles.headline}>
              Projete e Fabrique Fachadas de ACM Modernas — <span className={styles.highlight}>Aprenda a faturar alto</span> no mercado premium.
            </h1>
            <p className={styles.subheadline}>
              O guia passo a passo definitivo de corte, dobra, fixação e usinagem de chapas de ACM para comunicação visual e fachadas.
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
            <h2 className={styles.sectionTitle}>Por que o ACM é a sua melhor oportunidade?</h2>
            <div className={styles.storyText}>
              <p>O revestimento em ACM (Aluminium Composite Material) é o mais requisitado para fachadas comerciais devido à sua beleza e durabilidade. Profissionais que dominam essa técnica cobram alto por cada serviço.</p>
              
              <div className={styles.highlightBox}>
                <h3>Usinagem e Estrutura Sem Segredos 💡</h3>
                <p>Muitos erram na hora do fresado ou na escolha da subestrutura metálica. Nosso material ensina os macetes de dobra, uso correto de fitas VHB, silicone estrutural, e como planejar a estrutura por apenas R$ 9,90.</p>
                <p><strong>Evite erros caros de chapas perdidas. Tenha o guia de referência no seu celular.</strong></p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== D — DESEJO (Prova Social) ===== */}
        <section className={styles.socialProof}>
          <h2 className={styles.sectionTitle}>Quem comprou e aprovou:</h2>
          <div className={styles.testimonialsGrid}>
            
            <div className={styles.testimonialCard}>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.testimonialText}>
                &quot;Eu tinha muito receio de fresar a chapa e passar do limite. O guia me deu as medidas exatas e as ferramentas corretas para fazer a dobra perfeita.&quot;
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>L</div>
                <div className={styles.authorInfo}>
                  <h4>Lucas Nogueira</h4>
                  <p>Comunicação Visual</p>
                </div>
              </div>
            </div>

            <div className={styles.testimonialCard}>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.testimonialText}>
                &quot;Material muito direto ao ponto. Explica a diferença da estrutura de alumínio e de ferro e o espaçamento correto dos fixadores.&quot;
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>M</div>
                <div className={styles.authorInfo}>
                  <h4>Murilo Borges</h4>
                  <p>Serralheiro</p>
                </div>
              </div>
            </div>

            <div className={styles.testimonialCard}>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.testimonialText}>
                &quot;Ótimo guia de consulta rápida. Deixo na oficina e os ajudantes sempre olham quando têm dúvida sobre a usinagem das bandejas.&quot;
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>W</div>
                <div className={styles.authorInfo}>
                  <h4>Washington Silva</h4>
                  <p>Dono de Metalúrgica</p>
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
                <li><span>✅ Guia Passo a Passo de Usinagem e Dobra</span> <del>R$ 97,00</del></li>
                <li><span>✅ Detalhamento de subestrutura (Aço e Alumínio)</span> <del>R$ 47,00</del></li>
                <li><span>✅ Projetos de fixação hermética contra infiltrações</span> <del>R$ 37,00</del></li>
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
              <p>🚨 <strong>Atenção:</strong> Domine o mercado de alto padrão em comunicação visual e fachadas. Adquira o guia agora antes que o preço suba.</p>
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
