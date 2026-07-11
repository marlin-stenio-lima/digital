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
      
      <main className={styles.container} style={{ backgroundColor: '#070a13', color: '#f1f5f9' }}>
        
        {/* ===== HERO SECTION (Fundo Escuro Premium com Laranja e Branco) ===== */}
        <section className={styles.heroPedreiro} style={{ 
          background: 'radial-gradient(circle at center, #0f172a 0%, #070a13 100%)', 
          borderBottom: '1px solid #1e293b', 
          padding: '7rem 1.5rem' 
        }}>
          <div className={styles.heroContent}>
            <div className={styles.badge} style={{ 
              backgroundColor: '#ea580c', 
              borderColor: '#f97316', 
              color: '#fff', 
              boxShadow: '0 0 15px rgba(234, 88, 12, 0.4)' 
            }}>
              🔥 ACESSO VITALÍCIO & PAGAMENTO ÚNICO
            </div>
            
            <h1 className={styles.headline} style={{ color: '#ffffff', textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
              Aprenda a construir e reformar do absoluto zero e <span className={styles.highlight} style={{ color: '#f97316' }}>economize milhares de reais</span> em mão de obra!
            </h1>
            
            <p className={styles.subheadline} style={{ color: '#94a3b8' }}>
              O método passo a passo em vídeo mais completo do Brasil. Domine Alvenaria, Massa, Reboco, Piso, Contrapiso, além de bônus exclusivos de Elétrica e Hidráulica. 
            </p>

            <div className={styles.heroPriceTag}>
              <span className={styles.heroPriceFrom} style={{ color: '#64748b' }}>De <del style={{ color: '#ef4444' }}>R$ 39,90</del> por apenas</span>
              <span className={styles.heroPriceBig} style={{ color: '#f97316', textShadow: '0 0 20px rgba(249, 115, 22, 0.3)' }}>R$ 9,90</span>
            </div>

            <Link href={`/checkout?p=${pId}`} className={styles.ctaButtonPulse} style={{ 
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              boxShadow: '0 8px 25px rgba(234, 88, 12, 0.4)'
            }}>
              QUERO ME TORNAR UM MESTRE DA OBRA AGORA
            </Link>
            
            <div className={styles.trustIndicators} style={{ color: '#64748b' }}>
              <span>🔒 Pagamento Seguro</span>
              <span>⚡ Acesso Instantâneo</span>
              <span>📱 Entrega pelo WhatsApp</span>
            </div>
          </div>
        </section>

        {/* ===== SEÇÃO: DOR vs SOLUÇÃO (Benefícios de Alto Impacto) ===== */}
        <section style={{ padding: '5rem 1.5rem', background: '#090f1d' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#f97316', textTransform: 'uppercase', letterSpacing: '2px' }}>SUA INDEPENDÊNCIA COMEÇA AQUI</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginTop: '0.5rem', color: '#fff' }}>
                Construir e Reformar Não Precisa Ser uma Dor de Cabeça
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '650px', margin: '0.5rem auto 0' }}>
                Compare como a maioria das pessoas sofre em uma obra com a facilidade que o treinamento Mestre da Obra traz para sua vida.
              </p>
            </div>

            {/* Grid de Dor vs Solução */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
              
              {/* Lado da Dor (O Problema) */}
              <div style={{ 
                background: 'rgba(239, 68, 68, 0.03)', 
                border: '1.5px solid rgba(239, 68, 68, 0.2)', 
                borderRadius: '16px', 
                padding: '2.5rem 2rem' 
              }}>
                <h3 style={{ color: '#ef4444', fontSize: '1.3rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                  ❌ O sofrimento comum em obras:
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem', color: '#94a3b8', fontSize: '0.95rem' }}>
                  <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#ef4444', fontSize: '1.1rem', fontWeight: 'bold' }}>✕</span>
                    <div>
                      <strong style={{ color: '#e2e8f0' }}>Pedreiros cobrando fortunas:</strong>
                      <p style={{ margin: '0.2rem 0 0' }}>Ficar refém de orçamentos inflacionados e mão de obra desqualificada que some no meio do serviço.</p>
                    </div>
                  </li>
                  <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#ef4444', fontSize: '1.1rem', fontWeight: 'bold' }}>✕</span>
                    <div>
                      <strong style={{ color: '#e2e8f0' }}>Desperdício de material caro:</strong>
                      <p style={{ margin: '0.2rem 0 0' }}>Errar no cálculo do traço da massa ou do contrapiso e ver centenas de reais irem direto pro lixo.</p>
                    </div>
                  </li>
                  <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#ef4444', fontSize: '1.1rem', fontWeight: 'bold' }}>✕</span>
                    <div>
                      <strong style={{ color: '#e2e8f0' }}>Medo de trincas e infiltrações:</strong>
                      <p style={{ margin: '0.2rem 0 0' }}>Não saber verificar o prumo ou o esquadro e terminar com uma parede torta que vai rachar depois de meses.</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Lado da Solução (O que você ganha com o Curso) */}
              <div style={{ 
                background: 'rgba(16, 185, 129, 0.03)', 
                border: '1.5px solid rgba(16, 185, 129, 0.25)', 
                borderRadius: '16px', 
                padding: '2.5rem 2rem',
                boxShadow: '0 10px 30px -10px rgba(16, 185, 129, 0.1)'
              }}>
                <h3 style={{ color: '#10b981', fontSize: '1.3rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                  ✅ A solução com o Mestre da Obra:
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem', color: '#94a3b8', fontSize: '0.95rem' }}>
                  <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#10b981', fontSize: '1.1rem', fontWeight: 'bold' }}>✓</span>
                    <div>
                      <strong style={{ color: '#e2e8f0' }}>Economia Brutal:</strong>
                      <p style={{ margin: '0.2rem 0 0' }}>Faça você mesmo pequenas reformas e consertos ou fiscalize contratados sabendo exatamente como cobrar o trabalho correto.</p>
                    </div>
                  </li>
                  <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#10b981', fontSize: '1.1rem', fontWeight: 'bold' }}>✓</span>
                    <div>
                      <strong style={{ color: '#e2e8f0' }}>Traço e Dosagem Perfeita:</strong>
                      <p style={{ margin: '0.2rem 0 0' }}>Aprenda as medidas exatas de cimento, areia e brita para fundações, reboco e pisos sem desperdiçar um saco de cimento sequer.</p>
                    </div>
                  </li>
                  <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#10b981', fontSize: '1.1rem', fontWeight: 'bold' }}>✓</span>
                    <div>
                      <strong style={{ color: '#e2e8f0' }}>Parede e Piso Perfeitamente Alinhados:</strong>
                      <p style={{ margin: '0.2rem 0 0' }}>Guia visual prático de como utilizar o prumo, a mangueira de nível e o esquadro para construir estruturas duradouras.</p>
                    </div>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        </section>

        {/* ===== SEÇÃO: CONTEÚDO DO CURSO (Grid 2x2 Premium Orange) ===== */}
        <section style={{ backgroundColor: '#070a13', padding: '5rem 1.5rem', color: '#fff', borderTop: '1px solid #1e293b' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#f97316', textTransform: 'uppercase', letterSpacing: '2px' }}>CONTEÚDO DO CURSO</span>
              <h2 style={{ fontSize: '2.4rem', fontWeight: 900, marginTop: '0.5rem', color: '#fff', letterSpacing: '-0.5px' }}>
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
                background: '#0d1322', 
                border: '1px solid #1e293b', 
                borderRadius: '16px', 
                padding: '2.2rem 2rem',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
                  <span style={{ fontSize: '2rem' }}>🧱</span>
                  <div>
                    <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Alvenaria do Zero</h3>
                    <span style={{ fontSize: '0.72rem', color: '#f97316', fontWeight: 700, textTransform: 'uppercase' }}>Módulo 1</span>
                  </div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', color: '#94a3b8', fontSize: '0.92rem' }}>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#f97316' }}>✓</span> Aprenda do zero: paredes, tijolos, argamassa e ferramentas</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#f97316' }}>✓</span> Nível, prumo, alinhamento e esquadro na prática</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#f97316' }}>✓</span> Vergas, contravergas, cintas e reforços estruturais</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#f97316' }}>✓</span> Fechamento de vãos e principais erros para você evitar</li>
                </ul>
              </div>

              {/* Card 2: Massa e Reboco */}
              <div style={{ 
                background: '#0d1322', 
                border: '1px solid #1e293b', 
                borderRadius: '16px', 
                padding: '2.2rem 2rem',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
                  <span style={{ fontSize: '2rem' }}>📐</span>
                  <div>
                    <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Massa e Reboco</h3>
                    <span style={{ fontSize: '0.72rem', color: '#f97316', fontWeight: 700, textTransform: 'uppercase' }}>Módulo 2</span>
                  </div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', color: '#94a3b8', fontSize: '0.92rem' }}>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#f97316' }}>✓</span> Chapisco, emboço e reboco passo a passo ilustrado</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#f97316' }}>✓</span> Como fazer massa com a dosagem e liga correta</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#f97316' }}>✓</span> Técnicas avançadas para parede lisa e sem trincas</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#f97316' }}>✓</span> Segredos de cura, tempo de secagem e acabamentos finos</li>
                </ul>
              </div>

              {/* Card 3: Piso e Contrapiso */}
              <div style={{ 
                background: '#0d1322', 
                border: '1px solid #1e293b', 
                borderRadius: '16px', 
                padding: '2.2rem 2rem',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
                  <span style={{ fontSize: '2rem' }}>🔲</span>
                  <div>
                    <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Piso e Contrapiso</h3>
                    <span style={{ fontSize: '0.72rem', color: '#f97316', fontWeight: 700, textTransform: 'uppercase' }}>Módulo 3</span>
                  </div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', color: '#94a3b8', fontSize: '0.92rem' }}>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#f97316' }}>✓</span> Preparação, nivelamento e traço perfeito do contrapiso</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#f97316' }}>✓</span> Assentamento de pisos e cerâmicas do jeito certo</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#f97316' }}>✓</span> Cortes perfeitos, arremates de ralos e aplicação de rejunte</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#f97316' }}>✓</span> Dicas exclusivas para o revestimento durar muito mais tempo</li>
                </ul>
              </div>

              {/* Card 4: Bônus VIP */}
              <div style={{ 
                background: 'linear-gradient(135deg, #111827 0%, #0d1322 100%)', 
                border: '1.5px dashed #f97316', 
                borderRadius: '16px', 
                padding: '2.2rem 2rem',
                boxShadow: '0 15px 35px -10px rgba(249, 115, 22, 0.15)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
                  <span style={{ fontSize: '2rem' }}>🎁</span>
                  <div>
                    <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Bônus Exclusivos</h3>
                    <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700, textTransform: 'uppercase' }}>Liberado Imediatamente</span>
                  </div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', color: '#e2e8f0', fontSize: '0.92rem' }}>
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
        <section className={styles.socialProof} style={{ background: '#090f1d' }}>
          <h2 className={styles.sectionTitle} style={{ color: '#fff' }}>Quem já faz parte do Mestre da Obra:</h2>
          <div className={styles.testimonialsGrid}>
            <div className={styles.testimonialCard} style={{ background: '#0d1322', border: '1px solid #1e293b' }}>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.testimonialText} style={{ color: '#cbd5e1' }}>
                &quot;O treinamento me poupou mais de 5 mil reais em mão de obra! Eu mesmo fiz o reboco e assentei o piso da minha garagem seguindo os vídeos.&quot;
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar} style={{ backgroundColor: '#ea580c', color: '#fff' }}>F</div>
                <div className={styles.authorInfo}>
                  <h4 style={{ color: '#fff' }}>Fernando Almeida</h4>
                  <p>Dono de Casa / Autoconstrutor</p>
                </div>
              </div>
            </div>

            <div className={styles.testimonialCard} style={{ background: '#0d1322', border: '1px solid #1e293b' }}>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.testimonialText} style={{ color: '#cbd5e1' }}>
                &quot;Trabalho como ajudante e os módulos de reboco e contrapiso me ajudaram a pegar serviços de pedreiro oficial. Mudou minha renda mensal.&quot;
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar} style={{ backgroundColor: '#ea580c', color: '#fff' }}>A</div>
                <div className={styles.authorInfo}>
                  <h4 style={{ color: '#fff' }}>Adriano Silva</h4>
                  <p>Pedreiro Profissional</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== AÇÃO FINAL ===== */}
        <section className={styles.finalCta} style={{ background: '#070a13' }}>
          <div className={styles.finalBox} style={{ 
            borderTopColor: '#ea580c', 
            background: 'linear-gradient(180deg, #0d1322 0%, #070a13 100%)', 
            border: '1px solid #1e293b' 
          }}>
            <div className={styles.urgentBadge} style={{ backgroundColor: '#ea580c' }}>⏳ OFERTA PROMOCIONAL VITALÍCIA</div>
            <h2>Torne-se um Mestre da Obra</h2>
            
            <div className={styles.scarcityText}>
              <p style={{ color: '#94a3b8' }}>🚨 <strong>Atenção:</strong> Não desperdice mais materiais de construção nem pague fortunas por serviços mal feitos. Tenha acesso a todas as videoaulas do curso de pedreiro por apenas R$ 9,90 hoje.</p>
            </div>

            <div className={styles.priceTag}>
              Acesso Completo por apenas<br/>
              <span className={styles.priceHighlight} style={{ color: '#f97316' }}>R$ 9,90</span>
            </div>
            
            <Link href={`/checkout?p=${pId}`} className={styles.ctaButtonPulse} style={{ 
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              boxShadow: '0 8px 25px rgba(234, 88, 12, 0.4)'
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
