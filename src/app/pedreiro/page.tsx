import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../fabrica-de-bones/page.module.css';
import FacebookPixel from '@/components/FacebookPixel';

export default function ProjetosPedreiroLP() {
  const pId = "pedreiro";
  const pName = "Curso Mestre da Obra & Pedreiro Profissional";
  const pDesc = "Aprenda alvenaria, reboco, piso, contrapiso e tenha acesso a cursos bônus de elétrica e hidráulica do absoluto zero.";
  
  return (
    <>
      <Head>
        <title>{pName} | Escola da Construção</title>
        <meta name="description" content={pDesc} />
      </Head>
      <FacebookPixel />
      
      <main className={styles.container}>
        {/* ===== A — ATENÇÃO (Hero com copy muito mais forte) ===== */}
        <section className={styles.heroPedreiro}>
          <div className={styles.heroContent}>
            <div className={styles.badge} style={{ backgroundColor: '#ea580c' }}>🔥 ACESSO VITALÍCIO & PAGAMENTO ÚNICO</div>
            <h1 className={styles.headline}>
              Aprenda a construir e reformar do absoluto zero e <span className={styles.highlight} style={{ color: '#ea580c' }}>economize milhares de reais</span> em mão de obra!
            </h1>
            <p className={styles.subheadline}>
              O método passo a passo em vídeo mais completo do Brasil. Domine Alvenaria, Massa, Reboco, Piso, Contrapiso, além de bônus exclusivos de Elétrica e Hidráulica. 
            </p>

            <div className={styles.heroPriceTag}>
              <span className={styles.heroPriceFrom}>De <del>R$ 39,90</del> por apenas</span>
              <span className={styles.heroPriceBig} style={{ color: '#ea580c' }}>R$ 9,90</span>
            </div>

            <Link href={`/checkout?p=${pId}`} className={styles.ctaButtonPulse} style={{ backgroundColor: '#ea580c' }}>
              QUERO ME TORNAR UM MESTRE DA OBRA AGORA
            </Link>
            
            <div className={styles.trustIndicators}>
              <span>🔒 Pagamento Seguro</span>
              <span>⚡ Acesso Instantâneo</span>
              <span>📱 Entrega pelo WhatsApp</span>
            </div>
          </div>
        </section>

        {/* ===== I — INTERESSE (Gatilhos mentais de Dor e Ambição) ===== */}
        <section className={styles.storySection}>
          <div className={styles.storyContainer}>
            <h2 className={styles.sectionTitle}>Por que este método é diferente de tudo?</h2>
            <div className={styles.storyText}>
              <p>Contratar pedreiros hoje em dia está cada vez mais caro e arriscado. Quantas vezes você já ouviu falar de obras que atrasaram, desperdiçaram material ou apresentaram rachaduras e infiltrações meses depois?</p>
              
              <div className={styles.highlightBox} style={{ borderLeftColor: '#ea580c' }}>
                <h3>Domine o Canteiro de Obras 🛠️</h3>
                <p>Mesmo que você nunca tenha pegado em uma colher de pedreiro, nosso treinamento em vídeo vai te dar o mapa exato. Você aprenderá o traço correto de massas, o prumo exato e a colocação perfeita de pisos para fazer você mesmo ou fiscalizar sua obra com autoridade!</p>
                <p><strong>Evite prejuízos gigantescos e tenha o conhecimento prático dos maiores profissionais por apenas R$ 9,90.</strong></p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== D — DESEJO (O que você vai aprender - Alinhado à imagem do curso) ===== */}
        <section className={styles.offerSection} style={{ backgroundColor: '#0f172a', padding: '3rem 1.5rem' }}>
          <div className={styles.offerContainer} style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className={styles.sectionTitle} style={{ color: '#fff', marginBottom: '2.5rem' }}>Tudo o que você vai receber por apenas R$ 9,90:</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Card 1: Alvenaria */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1.8rem' }}>
                <h3 style={{ color: '#ea580c', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 1rem 0', fontSize: '1.3rem' }}>
                  🧱 Alvenaria do Zero
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.95rem' }}>
                  <li>✓ Aprenda do zero: paredes, tijolos, argamassa e ferramentas</li>
                  <li>✓ Nível, prumo, alinhamento e esquadro na prática</li>
                  <li>✓ Vergas, contravergas, cintas e reforços estruturais</li>
                  <li>✓ Fechamento de vãos e principais erros para você evitar</li>
                </ul>
              </div>

              {/* Card 2: Massa e Reboco */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1.8rem' }}>
                <h3 style={{ color: '#ea580c', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 1rem 0', fontSize: '1.3rem' }}>
                  📐 Massa e Reboco
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.95rem' }}>
                  <li>✓ Chapisco, emboço e reboco passo a passo ilustrado</li>
                  <li>✓ Como fazer massa com a dosagem e liga correta</li>
                  <li>✓ Técnicas avançadas para parede lisa e sem trincas</li>
                  <li>✓ Segredos de cura, tempo de secagem e acabamentos finos</li>
                </ul>
              </div>

              {/* Card 3: Piso e Contrapiso */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1.8rem' }}>
                <h3 style={{ color: '#ea580c', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 1rem 0', fontSize: '1.3rem' }}>
                  🔲 Piso e Contrapiso
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.95rem' }}>
                  <li>✓ Preparação, nivelamento e traço perfeito do contrapiso</li>
                  <li>✓ Assentamento de pisos e cerâmicas do jeito certo</li>
                  <li>✓ Cortes perfeitos, arremates de ralos e aplicação de rejunte</li>
                  <li>✓ Dicas exclusivas para o revestimento durar muito mais tempo</li>
                </ul>
              </div>

              {/* Card 4: Bônus Exclusivos */}
              <div style={{ background: 'rgba(234, 88, 12, 0.05)', border: '1px dashed #ea580c', borderRadius: '12px', padding: '1.8rem' }}>
                <h3 style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 1rem 0', fontSize: '1.3rem' }}>
                  🎁 Bônus Exclusivos inclusos após a confirmação:
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', color: '#e2e8f0', fontSize: '0.95rem' }}>
                  <li>⭐ <strong>Curso Completo de Elétrica & Hidráulica Residencial</strong> (38 videoaulas nativas)</li>
                  <li>⭐ <strong>Acesso Vitalício</strong> ao conteúdo da plataforma</li>
                  <li>⭐ <strong>Pagamento Único:</strong> Compre uma vez, assista para sempre</li>
                  <li>⭐ Suporte personalizado no WhatsApp para tirar dúvidas</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ===== D — DESEJO (Prova Social) ===== */}
        <section className={styles.socialProof}>
          <h2 className={styles.sectionTitle}>Quem já faz parte do Mestre da Obra:</h2>
          <div className={styles.testimonialsGrid}>
            <div className={styles.testimonialCard}>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.testimonialText}>
                &quot;O treinamento me poupou mais de 5 mil reais em mão de obra! Eu mesmo fiz o reboco e assentei o piso da minha garagem seguindo os vídeos.&quot;
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>F</div>
                <div className={styles.authorInfo}>
                  <h4>Fernando Almeida</h4>
                  <p>Dono de Casa / Autoconstrutor</p>
                </div>
              </div>
            </div>

            <div className={styles.testimonialCard}>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.testimonialText}>
                &quot;Trabalho como ajudante e os módulos de reboco e contrapiso me ajudaram a pegar serviços de pedreiro oficial. Mudou minha renda mensal.&quot;
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>A</div>
                <div className={styles.authorInfo}>
                  <h4>Adriano Silva</h4>
                  <p>Pedreiro Profissional</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== A — AÇÃO ===== */}
        <section className={styles.finalCta}>
          <div className={styles.finalBox} style={{ borderTopColor: '#ea580c' }}>
            <div className={styles.urgentBadge} style={{ backgroundColor: '#ea580c' }}>⏳ OFERTA PROMOCIONAL VITALÍCIA</div>
            <h2>Torne-se um Mestre da Obra</h2>
            
            <div className={styles.scarcityText}>
              <p>🚨 <strong>Atenção:</strong> Não desperdice mais materiais de construção nem pague fortunas por serviços mal feitos. Tenha acesso a todas as videoaulas do curso de pedreiro por apenas R$ 9,90 hoje.</p>
            </div>

            <div className={styles.priceTag}>
              Acesso Completo por apenas<br/>
              <span className={styles.priceHighlight} style={{ color: '#ea580c' }}>R$ 9,90</span>
            </div>
            
            <Link href={`/checkout?p=${pId}`} className={styles.ctaButtonPulse} style={{ backgroundColor: '#ea580c' }}>
              QUERO ACESSAR O TREINAMENTO AGORA
            </Link>
          </div>
        </section>

        {/* STICKY MOBILE CTA */}
        <div className={styles.stickyMobileCta}>
          <Link href={`/checkout?p=${pId}`} className={styles.stickyButton} style={{ backgroundColor: '#ea580c' }}>
            ACESSO IMEDIATO POR R$ 9,90
          </Link>
        </div>
      </main>
    </>
  );
}
