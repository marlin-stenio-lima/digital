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
      
      <main className={styles.container} style={{ backgroundColor: '#f8fafc', color: '#1e293b' }}>
        
        {/* ===== HERO SECTION (Fundo Claro Tecnológico e Limpo) ===== */}
        <section className={styles.heroPedreiro} style={{ 
          background: 'radial-gradient(circle at top, #f1f5f9 0%, #f8fafc 100%)', 
          borderBottom: '1px solid #e2e8f0', 
          padding: '6rem 1.5rem',
          color: '#1e293b'
        }}>
          <div className={styles.heroContent} style={{ position: 'relative', zIndex: 2 }}>
            <div className={styles.badge} style={{ 
              backgroundColor: '#ea580c', 
              borderColor: '#f97316', 
              color: '#fff', 
              boxShadow: '0 4px 12px rgba(234, 88, 12, 0.2)' 
            }}>
              🔥 ACESSO VITALÍCIO & PAGAMENTO ÚNICO
            </div>
            
            <h1 className={styles.headline} style={{ color: '#0f172a', fontWeight: 900 }}>
              Aprenda a construir e reformar do absoluto zero e <span className={styles.highlight} style={{ color: '#ea580c' }}>economize milhares de reais</span> em mão de obra!
            </h1>
            
            <p className={styles.subheadline} style={{ color: '#475569' }}>
              O método passo a passo em vídeo mais completo do Brasil. Domine Alvenaria, Massa, Reboco, Piso, Contrapiso, além de bônus exclusivos de Elétrica e Hidráulica. 
            </p>

            <div className={styles.heroPriceTag} style={{ marginBottom: '2rem' }}>
              <span className={styles.heroPriceFrom} style={{ color: '#64748b' }}>De <del style={{ color: '#ef4444' }}>R$ 39,90</del> por apenas</span>
              <span className={styles.heroPriceBig} style={{ color: '#ea580c', fontWeight: 900 }}>R$ 9,90</span>
            </div>

            <Link href={`/checkout?p=${pId}`} className={styles.ctaButtonPulse} style={{ 
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              boxShadow: '0 6px 20px rgba(234, 88, 12, 0.3)',
              color: '#ffffff'
            }}>
              QUERO ME TORNAR UM MESTRE DA OBRA AGORA
            </Link>
            
            <div className={styles.trustIndicators} style={{ color: '#64748b', marginTop: '1.5rem' }}>
              <span>🔒 Pagamento Seguro</span>
              <span>⚡ Acesso Instantâneo</span>
              <span>📱 Entrega pelo WhatsApp</span>
            </div>
          </div>
        </section>

        {/* ===== SEÇÃO: DOR vs SOLUÇÃO (Clara, moderna e focada em conversão) ===== */}
        <section style={{ padding: '5rem 1.5rem', background: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ea580c', textTransform: 'uppercase', letterSpacing: '2px' }}>SUA INDEPENDÊNCIA COMEÇA AQUI</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginTop: '0.5rem', color: '#0f172a' }}>
                Construir e Reformar Não Precisa Ser uma Dor de Cabeça
              </h2>
              <p style={{ color: '#475569', fontSize: '1.05rem', maxWidth: '650px', margin: '0.5rem auto 0' }}>
                Compare como a maioria das pessoas sofre em uma obra com a facilidade que o treinamento Mestre da Obra traz para sua vida.
              </p>
            </div>

            {/* Grid de Dor vs Solução */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
              
              {/* Lado da Dor (O Problema) */}
              <div style={{ 
                background: '#fff5f5', 
                border: '1.5px solid #fed7d7', 
                borderRadius: '16px', 
                padding: '2.5rem 2rem' 
              }}>
                <h3 style={{ color: '#c53030', fontSize: '1.3rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                  ❌ O sofrimento comum em obras:
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem', color: '#475569', fontSize: '0.95rem' }}>
                  <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#e53e3e', fontSize: '1.1rem', fontWeight: 'bold' }}>✕</span>
                    <div>
                      <strong style={{ color: '#2d3748' }}>Pedreiros cobrando fortunas:</strong>
                      <p style={{ margin: '0.2rem 0 0' }}>Ficar refém de orçamentos inflacionados e mão de obra desqualificada que some no meio do serviço.</p>
                    </div>
                  </li>
                  <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#e53e3e', fontSize: '1.1rem', fontWeight: 'bold' }}>✕</span>
                    <div>
                      <strong style={{ color: '#2d3748' }}>Desperdício de material caro:</strong>
                      <p style={{ margin: '0.2rem 0 0' }}>Errar no cálculo do traço da massa ou do contrapiso e ver centenas de reais irem direto pro lixo.</p>
                    </div>
                  </li>
                  <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#e53e3e', fontSize: '1.1rem', fontWeight: 'bold' }}>✕</span>
                    <div>
                      <strong style={{ color: '#2d3748' }}>Medo de trincas e infiltrações:</strong>
                      <p style={{ margin: '0.2rem 0 0' }}>Não saber verificar o prumo ou o esquadro e terminar com uma parede torta que vai rachar depois de meses.</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Lado da Solução (O que você ganha com o Curso) */}
              <div style={{ 
                background: '#f0fdf4', 
                border: '1.5px solid #bbf7d0', 
                borderRadius: '16px', 
                padding: '2.5rem 2rem',
                boxShadow: '0 10px 25px rgba(22, 163, 74, 0.05)'
              }}>
                <h3 style={{ color: '#15803d', fontSize: '1.3rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                  ✅ A solução com o Mestre da Obra:
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem', color: '#475569', fontSize: '0.95rem' }}>
                  <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#16a34a', fontSize: '1.1rem', fontWeight: 'bold' }}>✓</span>
                    <div>
                      <strong style={{ color: '#2d3748' }}>Economia Brutal:</strong>
                      <p style={{ margin: '0.2rem 0 0' }}>Faça você mesmo pequenas reformas e consertos ou fiscalize contratados sabendo exatamente como cobrar o trabalho correto.</p>
                    </div>
                  </li>
                  <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#16a34a', fontSize: '1.1rem', fontWeight: 'bold' }}>✓</span>
                    <div>
                      <strong style={{ color: '#2d3748' }}>Traço e Dosagem Perfeita:</strong>
                      <p style={{ margin: '0.2rem 0 0' }}>Aprenda as medidas exatas de cimento, areia e brita para fundações, reboco e pisos sem desperdiçar um saco de cimento sequer.</p>
                    </div>
                  </li>
                  <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#16a34a', fontSize: '1.1rem', fontWeight: 'bold' }}>✓</span>
                    <div>
                      <strong style={{ color: '#2d3748' }}>Parede e Piso Alinhados:</strong>
                      <p style={{ margin: '0.2rem 0 0' }}>Guia visual prático de como utilizar o prumo, a mangueira de nível e o esquadro para construir estruturas duradouras.</p>
                    </div>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        </section>

        {/* ===== SEÇÃO: CONTEÚDO DO CURSO (Claro, com cartões modernos brancos/cinza-claro) ===== */}
        <section style={{ backgroundColor: '#f1f5f9', padding: '5rem 1.5rem', color: '#1e293b' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ea580c', textTransform: 'uppercase', letterSpacing: '2px' }}>CONTEÚDO DO CURSO</span>
              <h2 style={{ fontSize: '2.4rem', fontWeight: 900, marginTop: '0.5rem', color: '#0f172a', letterSpacing: '-0.5px' }}>
                Tudo o que você vai receber por apenas R$ 9,90:
              </h2>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '2rem', 
              marginBottom: '3rem' 
            }}>
              
              {/* Card 1: Alvenaria */}
              <div style={{ 
                background: '#ffffff', 
                border: '1px solid #e2e8f0', 
                borderRadius: '16px', 
                padding: '2.2rem 2rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
                  <span style={{ fontSize: '2rem' }}>🧱</span>
                  <div>
                    <h3 style={{ color: '#0f172a', fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Alvenaria do Zero</h3>
                    <span style={{ fontSize: '0.72rem', color: '#ea580c', fontWeight: 700, textTransform: 'uppercase' }}>Módulo 1</span>
                  </div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', color: '#475569', fontSize: '0.92rem' }}>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#ea580c' }}>✓</span> Aprenda do zero: paredes, tijolos, argamassa e ferramentas</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#ea580c' }}>✓</span> Nível, prumo, alinhamento e esquadro na prática</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#ea580c' }}>✓</span> Vergas, contravergas, cintas e reforços estruturais</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#ea580c' }}>✓</span> Fechamento de vãos e principais erros para você evitar</li>
                </ul>
              </div>

              {/* Card 2: Massa e Reboco */}
              <div style={{ 
                background: '#ffffff', 
                border: '1px solid #e2e8f0', 
                borderRadius: '16px', 
                padding: '2.2rem 2rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
                  <span style={{ fontSize: '2rem' }}>📐</span>
                  <div>
                    <h3 style={{ color: '#0f172a', fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Massa e Reboco</h3>
                    <span style={{ fontSize: '0.72rem', color: '#ea580c', fontWeight: 700, textTransform: 'uppercase' }}>Módulo 2</span>
                  </div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', color: '#475569', fontSize: '0.92rem' }}>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#ea580c' }}>✓</span> Chapisco, emboço e reboco passo a passo ilustrado</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#ea580c' }}>✓</span> Como fazer massa com a dosagem e liga correta</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#ea580c' }}>✓</span> Técnicas avançadas para parede lisa e sem trincas</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#ea580c' }}>✓</span> Segredos de cura, tempo de secagem e acabamentos finos</li>
                </ul>
              </div>

              {/* Card 3: Piso e Contrapiso */}
              <div style={{ 
                background: '#ffffff', 
                border: '1px solid #e2e8f0', 
                borderRadius: '16px', 
                padding: '2.2rem 2rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
                  <span style={{ fontSize: '2rem' }}>🔲</span>
                  <div>
                    <h3 style={{ color: '#0f172a', fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Piso e Contrapiso</h3>
                    <span style={{ fontSize: '0.72rem', color: '#ea580c', fontWeight: 700, textTransform: 'uppercase' }}>Módulo 3</span>
                  </div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', color: '#475569', fontSize: '0.92rem' }}>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#ea580c' }}>✓</span> Preparação, nivelamento e traço perfeito do contrapiso</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#ea580c' }}>✓</span> Assentamento de pisos e cerâmicas do jeito certo</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#ea580c' }}>✓</span> Cortes perfeitos, arremates de ralos e aplicação de rejunte</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#ea580c' }}>✓</span> Dicas exclusivas para o revestimento durar muito mais tempo</li>
                </ul>
              </div>

              {/* Card 4: Bônus VIP */}
              <div style={{ 
                background: '#ffffff', 
                border: '1px solid #e2e8f0', 
                borderRadius: '16px', 
                padding: '2.2rem 2rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
                  <span style={{ fontSize: '2rem' }}>🎁</span>
                  <div>
                    <h3 style={{ color: '#0f172a', fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Bônus Exclusivos</h3>
                    <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700, textTransform: 'uppercase' }}>Liberado Imediatamente</span>
                  </div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', color: '#475569', fontSize: '0.92rem' }}>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#10b981' }}>⭐</span> <strong>Elétrica & Hidráulica Residencial</strong> (38 videoaulas nativas)</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#10b981' }}>⭐</span> <strong>Acesso Vitalício:</strong> Assista de onde e quando quiser</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#10b981' }}>⭐</span> <strong>Grupo VIP de suporte</strong> direto no WhatsApp</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#10b981' }}>⭐</span> <strong>Calculadora de Orçamento</strong> automática inclusa</li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* ===== PROVA SOCIAL ===== */}
        <section className={styles.socialProof} style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
          <h2 className={styles.sectionTitle} style={{ color: '#0f172a' }}>Quem já faz parte do Mestre da Obra:</h2>
          <div className={styles.testimonialsGrid}>
            <div className={styles.testimonialCard} style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <div className={styles.stars} style={{ color: '#ea580c' }}>★★★★★</div>
              <p className={styles.testimonialText} style={{ color: '#475569' }}>
                &quot;O treinamento me poupou mais de 5 mil reais em mão de obra! Eu mesmo fiz o reboco e assentei o piso da minha garagem seguindo os vídeos.&quot;
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar} style={{ backgroundColor: '#ea580c', color: '#fff' }}>F</div>
                <div className={styles.authorInfo}>
                  <h4 style={{ color: '#0f172a' }}>Fernando Almeida</h4>
                  <p style={{ color: '#64748b' }}>Dono de Casa / Autoconstrutor</p>
                </div>
              </div>
            </div>

            <div className={styles.testimonialCard} style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <div className={styles.stars} style={{ color: '#ea580c' }}>★★★★★</div>
              <p className={styles.testimonialText} style={{ color: '#475569' }}>
                &quot;Trabalho como ajudante e os módulos de reboco e contrapiso me ajudaram a pegar serviços de pedreiro oficial. Mudou minha renda mensal.&quot;
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar} style={{ backgroundColor: '#ea580c', color: '#fff' }}>A</div>
                <div className={styles.authorInfo}>
                  <h4 style={{ color: '#0f172a' }}>Adriano Silva</h4>
                  <p style={{ color: '#64748b' }}>Pedreiro Profissional</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== AÇÃO FINAL ===== */}
        <section className={styles.finalCta} style={{ background: '#f1f5f9' }}>
          <div className={styles.finalBox} style={{ 
            borderTopColor: '#ea580c', 
            background: '#ffffff', 
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
          }}>
            <div className={styles.urgentBadge} style={{ backgroundColor: '#ea580c' }}>⏳ OFERTA PROMOCIONAL VITALÍCIA</div>
            <h2 style={{ color: '#0f172a' }}>Torne-se um Mestre da Obra</h2>
            
            <div className={styles.scarcityText}>
              <p style={{ color: '#475569' }}>🚨 <strong>Atenção:</strong> Não desperdice mais materiais de construção nem pague fortunas por serviços mal feitos. Tenha acesso a todas as videoaulas do curso de pedreiro por apenas R$ 9,90 hoje.</p>
            </div>

            <div className={styles.priceTag} style={{ color: '#475569' }}>
              Acesso Completo por apenas<br/>
              <span className={styles.priceHighlight} style={{ color: '#ea580c' }}>R$ 9,90</span>
            </div>
            
            <Link href={`/checkout?p=${pId}`} className={styles.ctaButtonPulse} style={{ 
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              boxShadow: '0 8px 25px rgba(234, 88, 12, 0.3)',
              color: '#ffffff'
            }}>
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
