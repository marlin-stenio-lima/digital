'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../page.module.css';

export default function Home() {
  const [showFloating, setShowFloating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowFloating(true);
      } else {
        setShowFloating(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const productImages = [
    { src: '/images/movel5.png', alt: 'Beliche Industrial' },
    { src: '/images/movel3.png', alt: 'Estante industrial' },
    { src: '/images/movel6.png', alt: 'Desenho Técnico' },
    { src: '/images/movel4.png', alt: 'Banqueta' },
    { src: '/images/movel1.png', alt: 'Mesa de área externa' },
    { src: '/images/movel2.png', alt: 'Mesa de escritório' },
  ];

  const testimonials = [
    {
      name: 'Carlos Silva',
      role: 'Serralheiro há 15 anos • SP',
      text: 'Antes, só fazia portão. Com os projetos, fechei 3 vendas de mesas na primeira semana. Faturei R$2.400 em 7 dias!',
      img: '/images/movel1.png'
    },
    {
      name: 'Roberto Machado',
      role: 'Dono de serralheria • MG',
      text: 'Faturamento aumentou R$3.200/mês em 2 meses só com móveis. Seguir as medidas exatas do projeto mudou o jogo da minha oficina!',
      img: '/images/movel2.png'
    },
    {
      name: 'Anderson Lima',
      role: 'Ferreiro autônomo • PR',
      text: 'Só na última semana, salvei 5 vendas que iriam para a concorrência. O investimento se pagou no primeiro dia!',
      img: '/images/movel4.png'
    }
  ];

  return (
    <main className={styles.main}>
      {/* ===== HERO SECTION ===== */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            
            <h1 className={styles.heroTitle}>
              <span className={styles.orangeText}>Domine o Mercado de Móveis Industriais Hoje,</span> Mesmo que Você Nunca Tenha Feito um Projeto
            </h1>
            
            <p className={styles.heroSubtitle}>
              Receba 600 projetos &quot;mastigados&quot;, com lista de material e plano de cortes. O atalho perfeito para você parar de depender apenas de portões e grades.
            </p>
            <p className={styles.heroSubtitleSmall}>
              O orgulho da sua oficina começa aqui.
            </p>

            <div className={styles.ctaWrapper}>
              <Link href="/checkout" className={styles.ctaButtonOrange}>
                QUERO ACESSO IMEDIATO - R$ 13,90
              </Link>
            </div>

            <div className={styles.socialProofHero}>
              🔥 59 serralheiros já garantiram seu acesso nas últimas horas!
            </div>

            <div className={styles.trustBadges}>
              <span>⚡ Acesso imediato</span>
              <span>✅ Compra 100% segura</span>
            </div>

            <div className={styles.heroBenefitsContainer}>
              <div className={styles.heroBenefitCard}>
                <h3>✔️ Se você está começando:</h3>
                <ul>
                  <li><span className={styles.checkIcon}>✓</span> Não precisa saber desenhar projetos.</li>
                  <li><span className={styles.checkIcon}>✓</span> Siga medidas e cortes prontos.</li>
                  <li><span className={styles.checkIcon}>✓</span> Monte um portfólio profissional rapidamente.</li>
                  <li><span className={styles.checkIcon}>✓</span> Comece a vender móveis com mais confiança.</li>
                </ul>
              </div>
              <div className={styles.heroBenefitCard}>
                <h3>✔️ Se você já é serralheiro experiente:</h3>
                <ul>
                  <li><span className={styles.checkIcon}>✓</span> Pare de depender só de portão e grade.</li>
                  <li><span className={styles.checkIcon}>✓</span> Produza móveis que vendem mais caro.</li>
                  <li><span className={styles.checkIcon}>✓</span> Economize tempo com projetos prontos.</li>
                  <li><span className={styles.checkIcon}>✓</span> Feche vendas mostrando o desenho na hora.</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== IMAGES / GALLERY SECTION ===== */}
      <section className={styles.gallery}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Projetos com medidas exatas</h2>
            <p className={styles.sectionSubtitle}>Cada projeto vem com desenho técnico detalhado, lista de corte e todas as medidas que você precisa</p>
          </div>
          <div className={styles.imageGrid}>
            {productImages.map((img, i) => (
              <div key={i} className={styles.imageCard}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={300}
                  height={300}
                  className={styles.productImg}
                  priority={i < 2}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COPY / BENEFITS SECTION ===== */}
      <section className={styles.copySection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            Tudo o que você precisa para <span className={styles.orangeText}>escalar sua produção</span>
          </h2>
          <p className={styles.copyText}>
            Seja você um serralheiro iniciante ou experiente, os móveis industriais são a tendência mais lucrativa do mercado atual. Com este pacote, você elimina o trabalho duro do planejamento e vai direto para a fabricação e o lucro.
          </p>

          <div className={styles.benefitsGrid}>
            <div className={styles.benefitBox}>
              <div className={styles.iconWrapper}>📐</div>
              <h3>Medidas Exatas</h3>
              <p>Projetos detalhados em PDF. Basta seguir o mapa, cortar e soldar. Sem margem para erros ou desperdício de material.</p>
            </div>
            
            <div className={styles.benefitBox}>
              <div className={styles.iconWrapper}>💰</div>
              <h3>Gerador de Orçamentos</h3>
              <p>Não perca mais horas fazendo contas. Nossa ferramenta automática calcula seus custos e a margem de lucro ideal na hora.</p>
            </div>
            
            <div className={styles.benefitBox}>
              <div className={styles.iconWrapper}>🎁</div>
              <h3>Bônus Exclusivos</h3>
              <p>Receba de bônus projetos completos de Carretinhas, Aparelhos de Academia e Portões para diversificar suas vendas.</p>
            </div>
          </div>

          <div className={styles.ctaWrapper}>
             <Link href="/checkout" className={styles.ctaButtonOrange}>
              SIM, QUERO GARANTIR MEU ACESSO
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS (PROVAS SOCIAIS) ===== */}
      <section className={styles.testimonials}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Serralheiros que Decidiram Vencer</h2>
            <p className={styles.sectionSubtitle}>Resultados reais de quem cansou de ser mediano</p>
          </div>
          
          <div className={styles.testimonialsGrid}>
            {testimonials.map((t, i) => (
              <div key={i} className={styles.testimonialCard}>
                <div className={styles.testimonialImgWrapper}>
                  <Image src={t.img} alt={`Móvel feito por ${t.name}`} width={400} height={250} className={styles.testimonialImg} />
                </div>
                <div className={styles.testimonialContent}>
                  <div className={styles.stars}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#FBBF24" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#FBBF24" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#FBBF24" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#FBBF24" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#FBBF24" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  </div>
                  <p className={styles.testimonialText}>&ldquo;{t.text}&rdquo;</p>
                  <div className={styles.testimonialAuthor}>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA / OFERTA ===== */}
      <section className={styles.finalCta}>
        <div className={styles.container}>
          <h2 className={styles.finalTitleOrange}>
            SUA SERRALHERIA NO PRÓXIMO NÍVEL<br/>
            <span className={styles.orangeText}>COMEÇA AGORA!</span>
          </h2>
          
          <p className={styles.finalSubtitle}>
            Garanta seus projetos e o acesso EXCLUSIVO à Plataforma de Orçamentos. Comece a produzir e lucrar com móveis industriais hoje!
          </p>

          <div className={styles.finalPriceBox}>
            <span className={styles.finalOldPrice}>R$ 47,00</span>
            <span className={styles.finalNewPrice}>R$ 13,90</span>
          </div>
          <p className={styles.finalPriceSub}>Pagamento único • Acesso vitalício</p>

          <div className={styles.ctaWrapper}>
            <Link href="/checkout" className={styles.ctaButtonOrange}>
               QUERO ACESSO IMEDIATO - R$ 13,90
            </Link>
          </div>

          <div className={styles.trustBadges}>
            <span>⚡ Acesso imediato</span>
            <span>✅ Compra 100% segura</span>
          </div>

          <div className={styles.supportLinkWrapper}>
            <a href="https://wa.me/5586995485600" target="_blank" rel="noreferrer" className={styles.supportLink}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              Entrar em contato com o suporte
            </a>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>© {new Date().getFullYear()} Arsenal do Serralheiro Mestre. Todos os direitos reservados.</p>
          <p className={styles.disclaimer}>Este produto não garante a obtenção de resultados financeiros. Os resultados dependem de dedicação individual.</p>
        </div>
      </footer>

      {/* ===== FLOATING CTA MOBILE ===== */}
      <div className={`${styles.floatingCta} ${showFloating ? styles.floatingVisible : ''}`}>
        <Link href="/checkout" className={styles.ctaButtonOrange}>
          QUERO MEUS PROJETOS AGORA
        </Link>
      </div>
    </main>
  );
}
