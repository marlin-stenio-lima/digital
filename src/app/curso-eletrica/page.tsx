import React from 'react';
import Link from 'next/link';
import styles from '../fabrica-de-bones/page.module.css';

export const metadata = {
  title: '500 Projetos Prontos de Elétrica + Manual de Comandos | ElectroPro',
  description: 'Pare de improvisar e levar choque. Tenha em mãos 500 esquemas de ligações elétricas residenciais e industriais detalhados e prontos para executar.',
};

export default function CursoEletricaLP() {
  const pId = "eletrica_completa";
  
  return (
    <>
      <main className={styles.container} style={{ backgroundColor: '#090d1a', color: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
        
        {/* ===== HERO SECTION (Premium Dark Blue with Amber Yellow Highlight) ===== */}
        <section style={{ 
          backgroundImage: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(9, 13, 26, 0.99) 100%), url("/acm_background_1783791906895.png")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderBottom: '1px solid rgba(245, 158, 11, 0.15)', 
          padding: '6rem 1.5rem 5rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative'
        }}>
          
          {/* Amber Radial Glow Overlay */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'radial-gradient(circle at 50% 20%, rgba(245, 158, 11, 0.08) 0%, transparent 60%)',
            pointerEvents: 'none'
          }} />

          <div style={{ maxWidth: '850px', width: '100%', position: 'relative', zIndex: 1 }}>
            
            {/* Tag Badge */}
            <div style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'rgba(245, 158, 11, 0.1)', 
              border: '1px solid rgba(245, 158, 11, 0.3)', 
              color: '#f59e0b', 
              padding: '0.6rem 1.4rem',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 800,
              letterSpacing: '0.05em',
              marginBottom: '2rem',
              textTransform: 'uppercase',
              boxShadow: '0 0 20px rgba(245, 158, 11, 0.1)'
            }}>
              ⚡ DOWNLOAD IMEDIATO NO WHATSAPP E E-MAIL
            </div>
            
            {/* Headline Principal Agressiva */}
            <h1 style={{ 
              fontSize: '2.8rem',
              fontWeight: 900, 
              color: '#ffffff', 
              lineHeight: 1.15,
              marginBottom: '1.5rem',
              letterSpacing: '-1px'
            }}>
              Pare de Correr Riscos e Cometer Erros Bobos. Tenha <span style={{ color: '#f59e0b', textShadow: '0 0 25px rgba(245,158,11,0.25)' }}>500 Esquemas Elétricos Prontos</span> no Celular!
            </h1>
            
            {/* Subheadline Focada em Dor/Urgência */}
            <p style={{ 
              fontSize: '1.15rem', 
              color: '#cbd5e1', 
              marginBottom: '2.5rem', 
              lineHeight: 1.6,
              maxWidth: '750px',
              margin: '0 auto 2.5rem'
            }}>
              Chega de queimar componentes de clientes ou ficar na dúvida ao ligar um motor ou QDC completo. Acesse agora o maior acervo prático de diagramas elétricos residenciais, comerciais e industriais.
            </p>

            {/* Caixa de Oferta Única */}
            <div style={{ 
              background: 'rgba(30, 41, 59, 0.6)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '2rem 1.5rem',
              borderRadius: '16px',
              maxWidth: '480px',
              margin: '0 auto 2.5rem',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)'
            }}>
              <span style={{ display: 'block', fontSize: '0.95rem', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                🔥 OFERTA DE LANÇAMENTO EXCLUSIVA
              </span>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: '0.6rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.2rem', color: '#ef4444', textDecoration: 'line-through' }}>R$ 97,00</span>
                <span style={{ fontSize: '3.8rem', fontWeight: 950, color: '#f59e0b', lineHeight: 1 }}>R$ 9,90</span>
              </div>
              <span style={{ fontSize: '0.85rem', color: '#22c55e', fontWeight: 700 }}>✓ Pagamento único. Sem mensalidades ou taxas escondidas.</span>
            </div>

            {/* Botão de Compra Ultra Pulsante */}
            <Link href={`/checkout-eletrica?p=${pId}`} className={styles.ctaButtonPulse} style={{ 
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              boxShadow: '0 8px 35px rgba(245, 158, 11, 0.45)',
              color: '#ffffff',
              display: 'inline-flex',
              padding: '1.4rem 3rem',
              fontSize: '1.15rem',
              fontWeight: 900,
              borderRadius: '9999px',
              textDecoration: 'none',
              transition: 'all 0.2s',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              QUERO RECEBER OS 500 PROJETOS DE IMEDIATO
            </Link>
            
            {/* Badges de Segurança */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '2rem', 
              color: '#64748b', 
              marginTop: '2rem',
              fontSize: '0.88rem',
              flexWrap: 'wrap',
              fontWeight: 500
            }}>
              <span>🔒 Ambiente de Compra Criptografado</span>
              <span>⚡ Envio Automatizado via API</span>
              <span>🛡️ Satisfação 100% Garantida</span>
            </div>
          </div>
        </section>

        {/* ===== SEÇÃO: A DOR / MEDO DO PROFISSIONAL ===== */}
        <section style={{ padding: '5rem 1.5rem', background: '#0b0f19', borderBottom: '1px solid rgba(245, 158, 11, 0.05)' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '2px' }}>O CUSTO DO ERRO</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginTop: '0.5rem', color: '#ffffff', letterSpacing: '-0.5px' }}>
                O Erro de um Eletricista Custa Muito Caro
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '650px', margin: '0.5rem auto 0', lineHeight: 1.6 }}>
                Na eletricidade não existe meio-termo. Um fechamento de motor ou dimensionamento errado queima o equipamento e queima o seu nome no mercado.
              </p>
            </div>

            {/* Grid de Dor vs Solução */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
              
              {/* Lado da Dor */}
              <div style={{ 
                background: 'rgba(239, 68, 68, 0.03)', 
                border: '1.5px solid rgba(239, 68, 68, 0.15)', 
                borderRadius: '16px', 
                padding: '2.5rem 2rem' 
              }}>
                <h3 style={{ color: '#f87171', fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  ⚠️ O Perigo de Trabalhar no Improviso:
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem', color: '#94a3b8', fontSize: '0.95rem' }}>
                  <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#ef4444', fontWeight: 'bold' }}>✕</span>
                    <div>
                      <strong style={{ color: '#f8fafc' }}>Queimar Motores ou Placas de Comando:</strong>
                      <p style={{ margin: '0.2rem 0 0' }}>Não saber parametrizar contatores, relés ou chaves de partida e queimar instalações industriais caras.</p>
                    </div>
                  </li>
                  <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#ef4444', fontWeight: 'bold' }}>✕</span>
                    <div>
                      <strong style={{ color: '#f8fafc' }}>Perda de tempo procurando esquemas na internet:</strong>
                      <p style={{ margin: '0.2rem 0 0' }}>Ficar horas pesquisando no YouTube diagramas que muitas vezes vêm errados ou fora de normas.</p>
                    </div>
                  </li>
                  <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#ef4444', fontWeight: 'bold' }}>✕</span>
                    <div>
                      <strong style={{ color: '#f8fafc' }}>Dúvida na fiação e risco de curto-circuito:</strong>
                      <p style={{ margin: '0.2rem 0 0' }}>Falta de confiança ao passar cabos de comando ou fechar quadros elétricos residenciais complexos.</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Lado da Solução */}
              <div style={{ 
                background: 'rgba(34, 197, 94, 0.03)', 
                border: '1.5px solid rgba(34, 197, 94, 0.15)', 
                borderRadius: '16px', 
                padding: '2.5rem 2rem' 
              }}>
                <h3 style={{ color: '#4ade80', fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  ✅ A Segurança do Nosso Material:
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem', color: '#94a3b8', fontSize: '0.95rem' }}>
                  <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#22c55e', fontWeight: 'bold' }}>✓</span>
                    <div>
                      <strong style={{ color: '#f8fafc' }}>Esquemas Prontos de Partida de Motores:</strong>
                      <p style={{ margin: '0.2rem 0 0' }}>Estrela-triângulo, partidas diretas e circuitos de reversão com proteção térmica detalhada.</p>
                    </div>
                  </li>
                  <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#22c55e', fontWeight: 'bold' }}>✓</span>
                    <div>
                      <strong style={{ color: '#f8fafc' }}>Padrão Profissional Organizado:</strong>
                      <p style={{ margin: '0.2rem 0 0' }}>Tenha tudo salvo offline no celular. Consulte na obra sem depender de internet de dados móveis.</p>
                    </div>
                  </li>
                  <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#22c55e', fontWeight: 'bold' }}>✓</span>
                    <div>
                      <strong style={{ color: '#f8fafc' }}>Confiança e Velocidade no Serviço:</strong>
                      <p style={{ margin: '0.2rem 0 0' }}>Agilize suas entregas técnicas sabendo exatamente onde ligar cada fio do comando de controle.</p>
                    </div>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* ===== CONTEÚDO DETALHADO DO MATERIAL ===== */}
        <section style={{ backgroundColor: '#090d1a', padding: '5rem 1.5rem', color: '#f8fafc' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '2px' }}>CONTEÚDO PROGRAMÁTICO</span>
              <h2 style={{ fontSize: '2.4rem', fontWeight: 900, marginTop: '0.5rem', color: '#ffffff', letterSpacing: '-0.5px' }}>
                O que você leva no Pacote Eletricista Profissional:
              </h2>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
              gap: '2.5rem'
            }}>
              
              {/* Card 1: 500 Projetos */}
              <div style={{ 
                background: '#111827', 
                border: '1px solid rgba(255,255,255,0.06)', 
                borderRadius: '16px', 
                padding: '2.5rem 2rem',
                boxShadow: '0 4px 30px rgba(0,0,0,0.2)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '2.5rem' }}>📖</span>
                  <div>
                    <h3 style={{ color: '#ffffff', fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>500 Projetos Prontos</h3>
                    <span style={{ fontSize: '0.72rem', color: '#f59e0b', fontWeight: 700, textTransform: 'uppercase' }}>Biblioteca Completa em PDF</span>
                  </div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem', color: '#cbd5e1', fontSize: '0.92rem' }}>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#f59e0b' }}>✓</span> Instalação de sensores, fotocélulas e chaves magnéticas</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#f59e0b' }}>✓</span> Quadros de Distribuição (QDC) Monofásicos, Bifásicos e Trifásicos</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#f59e0b' }}>✓</span> Infraestrutura residencial e ligação de tomadas/iluminação sem erros</li>
                </ul>
              </div>

              {/* Card 2: Manual Comandos */}
              <div style={{ 
                background: '#111827', 
                border: '1px solid rgba(255,255,255,0.06)', 
                borderRadius: '16px', 
                padding: '2.5rem 2rem',
                boxShadow: '0 4px 30px rgba(0,0,0,0.2)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '2.5rem' }}>🛠️</span>
                  <div>
                    <h3 style={{ color: '#ffffff', fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>Guia Comandos Elétricos</h3>
                    <span style={{ fontSize: '0.72rem', color: '#f59e0b', fontWeight: 700, textTransform: 'uppercase' }}>Manual Prático e Potência</span>
                  </div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem', color: '#cbd5e1', fontSize: '0.92rem' }}>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#f59e0b' }}>✓</span> Partida de Motores: Direta, Estrela-Triângulo, Reversão e Proteção</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#f59e0b' }}>✓</span> Parametrização e funcionamento de contatores, relés térmicos e DPs</li>
                  <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#f59e0b' }}>✓</span> Selos de contato, lógica de botoeiras de comando e sinalização visual</li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* ===== AÇÃO FINAL (Caixa Focada em Urgência) ===== */}
        <section style={{ background: '#0b0f19', padding: '5rem 1.5rem' }}>
          <div style={{ 
            maxWidth: '650px',
            margin: '0 auto',
            textAlign: 'center',
            backgroundColor: '#111827',
            border: '1px solid rgba(245, 158, 11, 0.2)',
            padding: '3.5rem 2rem',
            borderRadius: '24px',
            boxShadow: '0 15px 45px rgba(0,0,0,0.4)',
            position: 'relative'
          }}>
            {/* Urgência Tag */}
            <div style={{
              position: 'absolute',
              top: '-15px', left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#ef4444',
              color: '#fff',
              fontSize: '0.78rem',
              fontWeight: 900,
              padding: '0.5rem 1.5rem',
              borderRadius: '9999px',
              boxShadow: '0 5px 15px rgba(239, 68, 68, 0.4)'
            }}>
              🚨 ESSA OFERTA PODE ACABAR A QUALQUER MOMENTO
            </div>

            <h2 style={{ color: '#ffffff', fontSize: '1.8rem', fontWeight: 900, marginBottom: '1rem' }}>Faça Seu Trabalho com Segurança</h2>
            <p style={{ color: '#94a3b8', margin: '0 auto 2rem', fontSize: '0.98rem', maxWidth: '450px', lineHeight: 1.5 }}>
              Não corra riscos desnecessários. Invista no seu conhecimento prático agora pelo preço de um cafezinho.
            </p>
            
            <div style={{ marginBottom: '2.5rem' }}>
              <span style={{ fontSize: '1.1rem', color: '#64748b', display: 'block', textDecoration: 'line-through', marginBottom: '0.3rem' }}>De R$ 97,00 por apenas</span>
              <span style={{ fontSize: '3.6rem', fontWeight: 950, color: '#f59e0b', lineHeight: 1 }}>R$ 9,90</span>
            </div>
            
            <Link href={`/checkout-eletrica?p=${pId}`} className={styles.ctaButtonPulse} style={{ 
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              boxShadow: '0 8px 30px rgba(245, 158, 11, 0.35)',
              color: '#ffffff',
              display: 'inline-flex',
              padding: '1.3rem 2.8rem',
              fontSize: '1.1rem',
              fontWeight: 900,
              borderRadius: '9999px',
              textDecoration: 'none'
            }}>
              QUERO OS PROJETOS E MANUAL AGORA
            </Link>
          </div>
        </section>

        {/* STICKY MOBILE CTA */}
        <div className={styles.stickyMobileCta}>
          <Link href={`/checkout-eletrica?p=${pId}`} className={styles.stickyButton} style={{ backgroundColor: '#d97706' }}>
            RECEBER PROJETOS POR R$ 9,90
          </Link>
        </div>
      </main>
    </>
  );
}
