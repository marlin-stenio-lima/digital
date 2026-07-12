import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../fabrica-de-bones/page.module.css';
import FacebookPixel from '@/components/FacebookPixel';

export default function ProjetosCurraisLP() {
  const pId = "currais";
  const pName = "Projetos de Currais & Manejo Inteligente";
  const pDesc = "Aprenda a construir currais modernos, seguros e altamente eficientes. Guia prático com 75 projetos detalhados prontos para executar.";
  
  return (
    <>
      <Head>
        <title>{pName} | AgroProjetos</title>
        <meta name="description" content={pDesc} />
      </Head>
      <FacebookPixel />
      
      <main className={styles.container} style={{ backgroundColor: '#f8fafc', color: '#1e293b' }}>
        
        {/* ===== HERO SECTION ===== */}
        <section style={{ 
          backgroundImage: 'linear-gradient(rgba(248, 250, 252, 0.93), rgba(255, 255, 255, 0.98)), url("/curral_background_light.png")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderBottom: '1px solid #e2e8f0', 
          padding: '6.5rem 1.5rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative'
        }}>
          <div style={{ maxWidth: '850px', width: '100%' }}>
            <div style={{ 
              display: 'inline-block',
              backgroundColor: '#fff7ed', 
              border: '1px solid #ffedd5', 
              color: '#ea580c', 
              padding: '0.5rem 1.2rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              marginBottom: '1.5rem',
              textTransform: 'uppercase'
            }}>
              🐂 ARQUIVOS EM PDF PRONTOS PARA IMPRIMIR
            </div>
            
            <h1 style={{ 
              fontSize: '2.8rem', 
              fontWeight: 900, 
              color: '#0f172a', 
              lineHeight: 1.15,
              marginBottom: '1.5rem' 
            }}>
              Construa Currais Modernos e Seguros e <span style={{ color: '#ea580c' }}>Evite Desperdícios de Madeira e Concreto</span>!
            </h1>
            
            <p style={{ 
              fontSize: '1.2rem', 
              color: '#475569', 
              marginBottom: '2.5rem', 
              lineHeight: 1.5 
            }}>
              Economize milhares de reais em materiais sabendo a medida e a quantidade exata de mourões, tábuas e ferragens necessárias para a sua obra de manejo.
            </p>

            <div style={{ marginBottom: '2.2rem' }}>
              <span style={{ display: 'block', fontSize: '1.1rem', color: '#64748b', marginBottom: '0.3rem' }}>
                De <del style={{ color: '#ef4444' }}>R$ 97,00</del> por apenas
              </span>
              <span style={{ display: 'block', fontSize: '4.2rem', fontWeight: 950, color: '#ea580c', lineHeight: 1 }}>
                R$ 9,90
              </span>
            </div>

            <Link href={`/checkout?p=${pId}`} className={styles.ctaButtonPulse} style={{ 
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              boxShadow: '0 8px 30px rgba(234, 88, 12, 0.4)',
              color: '#ffffff',
              display: 'inline-flex',
              padding: '1.3rem 2.5rem',
              fontSize: '1.1rem',
              fontWeight: 800,
              borderRadius: '9999px',
              textDecoration: 'none'
            }}>
              QUERO RECEBER OS 75 PROJETOS NO WHATSAPP
            </Link>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '1.5rem', 
              color: '#64748b', 
              marginTop: '1.8rem',
              fontSize: '0.9rem',
              flexWrap: 'wrap'
            }}>
              <span>🔒 Compra 100% Segura</span>
              <span>⚡ Envio Instantâneo</span>
              <span>📱 Entrega pelo WhatsApp</span>
            </div>
          </div>
        </section>

        {/* ===== SEÇÃO: DOR vs SOLUÇÃO (Conversão de Alto Impacto para Produtor Rural) ===== */}
        <section style={{ padding: '5rem 1.5rem', background: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ea580c', textTransform: 'uppercase', letterSpacing: '2px' }}>CONSTRUÇÃO EFICIENTE</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginTop: '0.5rem', color: '#0f172a' }}>
                O Perigo de uma Construção Sem Planejamento
              </h2>
              <p style={{ color: '#475569', fontSize: '1.05rem', maxWidth: '650px', margin: '0.5rem auto 0' }}>
                Evite prejuízos e dores de cabeça na sua fazenda. Nossos projetos detalhados eliminam os erros comuns de obra.
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
                  ❌ O prejuízo de construir sem projeto:
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem', color: '#475569', fontSize: '0.95rem' }}>
                  <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#e53e3e', fontSize: '1.1rem', fontWeight: 'bold' }}>✕</span>
                    <div>
                      <strong style={{ color: '#2d3748' }}>Desperdício de madeira cara:</strong>
                      <p style={{ margin: '0.2rem 0 0' }}>Comprar madeira a mais (mourões e tábuas) ou errar nos cortes, jogando centenas de reais no lixo.</p>
                    </div>
                  </li>
                  <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#e53e3e', fontSize: '1.1rem', fontWeight: 'bold' }}>✕</span>
                    <div>
                      <strong style={{ color: '#2d3748' }}>Fluxo incorreto e estresse do gado:</strong>
                      <p style={{ margin: '0.2rem 0 0' }}>Currais mal desenhados que fazem os animais empacarem, gerando machucados e estresse no manejo.</p>
                    </div>
                  </li>
                  <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#e53e3e', fontSize: '1.1rem', fontWeight: 'bold' }}>✕</span>
                    <div>
                      <strong style={{ color: '#2d3748' }}>Estrutura fraca e acidentes:</strong>
                      <p style={{ margin: '0.2rem 0 0' }}>Utilizar espaçamento errado nas tábuas, facilitando acidentes com animais que quebram a cerca.</p>
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
                  ✅ A solução com nossos projetos:
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem', color: '#475569', fontSize: '0.95rem' }}>
                  <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#16a34a', fontSize: '1.1rem', fontWeight: 'bold' }}>✓</span>
                    <div>
                      <strong style={{ color: '#2d3748' }}>Economia Garantida de Material:</strong>
                      <p style={{ margin: '0.2rem 0 0' }}>Compre a quantidade exata recomendada na lista de corte de cada um dos projetos.</p>
                    </div>
                  </li>
                  <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#16a34a', fontSize: '1.1rem', fontWeight: 'bold' }}>✓</span>
                    <div>
                      <strong style={{ color: '#2d3748' }}>Currais Anti-estresse Modernos:</strong>
                      <p style={{ margin: '0.2rem 0 0' }}>Projetos que respeitam o comportamento bovino, garantindo facilidade, agilidade e segurança no manejo diário.</p>
                    </div>
                  </li>
                  <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#16a34a', fontSize: '1.1rem', fontWeight: 'bold' }}>✓</span>
                    <div>
                      <strong style={{ color: '#2d3748' }}>Estruturas Seguras e Fortes:</strong>
                      <p style={{ margin: '0.2rem 0 0' }}>Medidas exatas de pilares, bretes e troncos de contenção projetados para suportar forças intensas.</p>
                    </div>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        </section>

        {/* ===== CONTEÚDO DO PACOTE ===== */}
        <section style={{ backgroundColor: '#f1f5f9', padding: '5rem 1.5rem', color: '#1e293b' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ea580c', textTransform: 'uppercase', letterSpacing: '2px' }}>PACOTE PROFISSIONAL</span>
              <h2 style={{ fontSize: '2.4rem', fontWeight: 900, marginTop: '0.5rem', color: '#0f172a', letterSpacing: '-0.5px' }}>
                O que vem no pacote de 75 Projetos de Currais:
              </h2>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
              gap: '2rem'
            }}>
              
              {/* Card 1: Curral Pequeno e Médio Porte */}
              <div style={{ 
                background: '#ffffff', 
                border: '1px solid #e2e8f0', 
                borderRadius: '16px', 
                padding: '2.2rem 2rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
                  <span style={{ fontSize: '2rem' }}>🏡</span>
                  <div>
                    <h3 style={{ color: '#0f172a', fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Pequeno e Médio Porte</h3>
                    <span style={{ fontSize: '0.72rem', color: '#ea580c', fontWeight: 700, textTransform: 'uppercase' }}>Ideal para Chácaras e Sítios</span>
                  </div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', color: '#475569', fontSize: '0.92rem' }}>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#ea580c' }}>✓</span> Projetos para manejo de até 50 cabeças de gado</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#ea580c' }}>✓</span> Estruturas compactas e de baixo custo de implantação</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#ea580c' }}>✓</span> Listas de materiais para otimizar madeiramento básico</li>
                </ul>
              </div>

              {/* Card 2: Currais Profissionais de Grande Porte */}
              <div style={{ 
                background: '#ffffff', 
                border: '1px solid #e2e8f0', 
                borderRadius: '16px', 
                padding: '2.2rem 2rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
                  <span style={{ fontSize: '2rem' }}>🚜</span>
                  <div>
                    <h3 style={{ color: '#0f172a', fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Grande Porte e Confinamento</h3>
                    <span style={{ fontSize: '0.72rem', color: '#ea580c', fontWeight: 700, textTransform: 'uppercase' }}>Profissional</span>
                  </div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', color: '#475569', fontSize: '0.92rem' }}>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#ea580c' }}>✓</span> Estruturas completas para mais de 500 cabeças</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#ea580c' }}>✓</span> Planta baixa para brete, balança, embarcadouro e apartador</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#ea580c' }}>✓</span> Dimensionamentos de trânsito livre de animais</li>
                </ul>
              </div>

              {/* Card 3: Detalhamento Técnico de Cerca e Porteiras */}
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
                    <h3 style={{ color: '#0f172a', fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Cercas, Bretes e Porteiras</h3>
                    <span style={{ fontSize: '0.72rem', color: '#ea580c', fontWeight: 700, textTransform: 'uppercase' }}>Detalhes de Execução</span>
                  </div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', color: '#475569', fontSize: '0.92rem' }}>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#ea580c' }}>✓</span> Desenhos técnicos detalhando furações e travamentos</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#ea580c' }}>✓</span> Medidas de altura ideal de tábuas e espaçamento anti-coice</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#ea580c' }}>✓</span> Portões de apartação com travas rápidas e seguras</li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* ===== PROVA SOCIAL ===== */}
        <section className={styles.socialProof} style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
          <h2 className={styles.sectionTitle} style={{ color: '#0f172a' }}>O que dizem os produtores rurais:</h2>
          <div className={styles.testimonialsGrid}>
            <div className={styles.testimonialCard} style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <div className={styles.stars} style={{ color: '#ea580c' }}>★★★★★</div>
              <p className={styles.testimonialText} style={{ color: '#475569' }}>
                &quot;Segui o projeto de curral médio para 80 bois. A lista de materiais foi perfeita, evitou desperdício de madeira no meu sítio e o gado flui muito bem.&quot;
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar} style={{ backgroundColor: '#ea580c', color: '#fff' }}>A</div>
                <div className={styles.authorInfo}>
                  <h4 style={{ color: '#0f172a' }}>Antônio Ramos</h4>
                  <p style={{ color: '#64748b' }}>Produtor de Gado de Corte</p>
                </div>
              </div>
            </div>

            <div className={styles.testimonialCard} style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <div className={styles.stars} style={{ color: '#ea580c' }}>★★★★★</div>
              <p className={styles.testimonialText} style={{ color: '#475569' }}>
                &quot;Sou carpinteiro rural e esse pacote me ajudou a fechar 3 novos orçamentos de currais na região mostrando a planta na tela do celular.&quot;
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar} style={{ backgroundColor: '#ea580c', color: '#fff' }}>R</div>
                <div className={styles.authorInfo}>
                  <h4 style={{ color: '#0f172a' }}>Reginaldo Dias</h4>
                  <p style={{ color: '#64748b' }}>Carpinteiro / Construtor</p>
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
            <div className={styles.urgentBadge} style={{ backgroundColor: '#ea580c' }}>⏳ LIBERAÇÃO IMEDIATA</div>
            <h2 style={{ color: '#0f172a' }}>Construa Seu Curral do Jeito Certo</h2>
            
            <div className={styles.scarcityText}>
              <p style={{ color: '#475569' }}>🚨 <strong>Atenção:</strong> Evite o retrabalho de ter que consertar cercas caídas ou remendar corredores apertados. Tenha em mãos os projetos detalhados agora.</p>
            </div>

            <div className={styles.priceTag} style={{ color: '#475569' }}>
              Pacote Completo por apenas<br/>
              <span className={styles.priceHighlight} style={{ color: '#ea580c' }}>R$ 9,90</span>
            </div>
            
            <Link href={`/checkout?p=${pId}`} className={styles.ctaButtonPulse} style={{ 
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              boxShadow: '0 8px 25px rgba(234, 88, 12, 0.3)',
              color: '#ffffff',
              display: 'inline-flex',
              padding: '1.3rem 2.5rem',
              fontSize: '1.1rem',
              fontWeight: 800,
              borderRadius: '9999px',
              textDecoration: 'none'
            }}>
              QUERO COMPRAR OS PROJETOS AGORA
            </Link>
          </div>
        </section>

        {/* STICKY MOBILE CTA */}
        <div className={styles.stickyMobileCta}>
          <Link href={`/checkout?p=${pId}`} className={styles.stickyButton} style={{ backgroundColor: '#ea580c' }}>
            RECEBER PROJETOS POR R$ 9,90
          </Link>
        </div>
      </main>
    </>
  );
}
