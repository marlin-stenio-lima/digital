import React from 'react';
import Link from 'next/link';
import styles from '../fabrica-de-bones/page.module.css';

export const metadata = {
  title: '500 Projetos Prontos de Elétrica & Comandos Elétricos | ElectroPro',
  description: 'Guia completo de comandos elétricos com 500 esquemas de ligações e projetos profissionais prontos para executar.',
};

export default function CursoEletricaLP() {
  const pId = "eletrica_completa";
  
  return (
    <>
      <main className={styles.container} style={{ backgroundColor: '#0f172a', color: '#f8fafc' }}>
        
        {/* ===== HERO SECTION ===== */}
        <section style={{ 
          backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.98)), url("/acm_background_1783791906895.png")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderBottom: '1px solid #1e293b', 
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
              backgroundColor: '#1e293b', 
              border: '1px solid #334155', 
              color: '#38bdf8', 
              padding: '0.5rem 1.2rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              marginBottom: '1.5rem',
              textTransform: 'uppercase'
            }}>
              ⚡ ARQUIVOS E ESQUEMAS EM PDF DE ENTREGA IMEDIATA
            </div>
            
            <h1 style={{ 
              fontSize: '2.5rem',
              fontWeight: 900, 
              color: '#ffffff', 
              lineHeight: 1.2,
              marginBottom: '1.2rem' 
            }}>
              Domine Comandos Elétricos e Tenha Acesso a <span style={{ color: '#38bdf8' }}>500 Projetos Prontos</span> Para Executar!
            </h1>
            
            <p style={{ 
              fontSize: '1.1rem', 
              color: '#94a3b8', 
              marginBottom: '2rem', 
              lineHeight: 1.6 
            }}>
              Esquemas detalhados de ligações, diagramas de força e comando para motores, partidas, automação residencial e industrial. O material definitivo do eletricista profissional.
            </p>

            <div style={{ marginBottom: '2.2rem' }}>
              <span style={{ display: 'block', fontSize: '1.1rem', color: '#64748b', marginBottom: '0.3rem' }}>
                De <del style={{ color: '#ef4444' }}>R$ 97,00</del> por apenas
              </span>
              <span style={{ display: 'block', fontSize: '4.2rem', fontWeight: 950, color: '#38bdf8', lineHeight: 1 }}>
                R$ 9,90
              </span>
            </div>

            <Link href={`/checkout-eletrica?p=${pId}`} className={styles.ctaButtonPulse} style={{ 
              background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
              boxShadow: '0 8px 30px rgba(14, 165, 233, 0.4)',
              color: '#ffffff',
              display: 'inline-flex',
              padding: '1.3rem 2.5rem',
              fontSize: '1.1rem',
              fontWeight: 800,
              borderRadius: '9999px',
              textDecoration: 'none'
            }}>
              QUERO RECEBER OS PROJETOS E MANUAL NO WHATSAPP
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

        {/* ===== SEÇÃO: POR QUE COMPRAR ===== */}
        <section style={{ padding: '5rem 1.5rem', background: '#0b1329', borderBottom: '1px solid #1e293b' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '2px' }}>CONTEÚDO RÁPIDO E PRÁTICO</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginTop: '0.5rem', color: '#ffffff' }}>
                Pare de Perder Tempo Procurando Esquemas Na Internet
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '650px', margin: '0.5rem auto 0' }}>
                Tenha em mãos o acervo com comandos clássicos e modernos prontos para aplicar no trabalho no dia a dia.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
              
              <div style={{ 
                background: '#1e293b', 
                border: '1px solid #334155', 
                borderRadius: '16px', 
                padding: '2.5rem 2rem' 
              }}>
                <h3 style={{ color: '#38bdf8', fontSize: '1.3rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                  📖 500 Projetos Prontos de Elétrica
                </h3>
                <p style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: '0.95rem', marginBottom: '1.2rem' }}>
                  Uma mega biblioteca contendo diagramas prontos estruturados para agilizar seus atendimentos técnicos.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', color: '#cbd5e1', fontSize: '0.9rem' }}>
                  <li>✅ Diagramas de Distribuição Monofásica, Bifásica e Trifásica</li>
                  <li>✅ Automação de portões, bombas d&apos;água e iluminação inteligente</li>
                  <li>✅ Fiação de quadros de distribuição residencial completos</li>
                </ul>
              </div>

              <div style={{ 
                background: '#1e293b', 
                border: '1px solid #334155', 
                borderRadius: '16px', 
                padding: '2.5rem 2rem' 
              }}>
                <h3 style={{ color: '#38bdf8', fontSize: '1.3rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                  🛠️ Guia de Comandos Elétricos
                </h3>
                <p style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: '0.95rem', marginBottom: '1.2rem' }}>
                  Manual detalhado explicando o funcionamento, parametrização e esquemas de comandos de potência e acionamento.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', color: '#cbd5e1', fontSize: '0.9rem' }}>
                  <li>✅ Partida Direta, Estrela-Triângulo e Compensada de Motores</li>
                  <li>✅ Funcionamento e dimensionamento de contatores e relés térmicos</li>
                  <li>✅ Chaves de partida automática e circuitos de intertravamento</li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* ===== DETALHAMENTO DO CONTEÚDO ===== */}
        <section style={{ backgroundColor: '#0f172a', padding: '5rem 1.5rem', color: '#f8fafc' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '2px' }}>CONTEÚDO COMPLETO</span>
              <h2 style={{ fontSize: '2.4rem', fontWeight: 900, marginTop: '0.5rem', color: '#ffffff', letterSpacing: '-0.5px' }}>
                O que você vai receber:
              </h2>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
              gap: '2rem'
            }}>
              
              <div style={{ 
                background: '#1e293b', 
                border: '1px solid #334155', 
                borderRadius: '16px', 
                padding: '2.2rem 2rem',
              }}>
                <h3 style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>⚡ Esquemas Práticos Residenciais</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', color: '#cbd5e1', fontSize: '0.92rem' }}>
                  <li>✓ Ligações de interruptores simples, paralelos (Three-Way) e intermediários</li>
                  <li>✓ Instalação de quadros com proteção DR (Diferencial Residual) e DPS</li>
                  <li>✓ Divisão de circuitos de tomadas de uso geral (TUG) e de uso específico (TUE)</li>
                </ul>
              </div>

              <div style={{ 
                background: '#1e293b', 
                border: '1px solid #334155', 
                borderRadius: '16px', 
                padding: '2.2rem 2rem',
              }}>
                <h3 style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>⚙️ Automação e Painéis</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', color: '#cbd5e1', fontSize: '0.92rem' }}>
                  <li>✓ Dimensionamento de contatores para cargas indutivas</li>
                  <li>✓ Esquemas de ligação para boias automáticas e sensores de presença</li>
                  <li>✓ Sinalizações luminosas e chaves de fim de curso para painéis de controle</li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* ===== AÇÃO FINAL ===== */}
        <section style={{ background: '#0b1329', padding: '5rem 1.5rem' }}>
          <div style={{ 
            maxWidth: '650px',
            margin: '0 auto',
            textAlign: 'center',
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            padding: '3rem 2rem',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            <span style={{ backgroundColor: '#0ea5e9', color: '#fff', fontSize: '0.8rem', fontWeight: 800, padding: '0.4rem 1rem', borderRadius: '9999px' }}>📦 ENVIO RÁPIDO</span>
            <h2 style={{ color: '#ffffff', marginTop: '1.5rem' }}>Acesso Vitalício no Seu WhatsApp</h2>
            <p style={{ color: '#94a3b8', margin: '1rem 0 2rem' }}>Aprenda de forma visual com diagramas claros e explicativos. Ideal para quem quer trabalhar com segurança.</p>
            
            <div style={{ marginBottom: '2rem' }}>
              <span style={{ fontSize: '3rem', fontWeight: 900, color: '#38bdf8' }}>R$ 9,90</span>
            </div>
            
            <Link href={`/checkout-eletrica?p=${pId}`} className={styles.ctaButtonPulse} style={{ 
              background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
              boxShadow: '0 8px 25px rgba(14, 165, 233, 0.3)',
              color: '#ffffff',
              display: 'inline-flex',
              padding: '1.3rem 2.5rem',
              fontSize: '1.1rem',
              fontWeight: 800,
              borderRadius: '9999px',
              textDecoration: 'none'
            }}>
              COMPRAR CURSO DE ELÉTRICA AGORA
            </Link>
          </div>
        </section>

        {/* STICKY MOBILE CTA */}
        <div className={styles.stickyMobileCta}>
          <Link href={`/checkout-eletrica?p=${pId}`} className={styles.stickyButton} style={{ backgroundColor: '#0ea5e9' }}>
            RECEBER CURSO POR R$ 9,90
          </Link>
        </div>
      </main>
    </>
  );
}
