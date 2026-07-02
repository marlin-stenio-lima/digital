'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

interface Video {
  id: string;
  name: string;
  url: string;
}

export default function PlatformClient({ videos }: { videos: Video[] }) {
  const [activeVideo, setActiveVideo] = useState<Video>(videos[0]);
  const router = useRouter();

  const handleLogout = () => {
    // Apaga o cookie chamando uma api de logout ou apenas expirando (mais simples via JS)
    document.cookie = 'bones_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/plataforma/login');
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Fábrica de Bonés</h2>
        </div>
        <ul className={styles.videoList}>
          {videos.map((vid, index) => (
            <li 
              key={vid.id} 
              className={`${styles.videoItem} ${activeVideo?.id === vid.id ? styles.active : ''}`}
              onClick={() => setActiveVideo(vid)}
            >
              <span className={styles.videoTitle}>
                Aula {String(index + 1).padStart(2, '0')} - {vid.name}
              </span>
            </li>
          ))}
        </ul>
      </aside>

      <main className={styles.main}>
        <header className={styles.topBar}>
          <button className={styles.logoutBtn} onClick={handleLogout}>Sair</button>
        </header>

        <div className={styles.videoContainer}>
          <div className={styles.playerWrapper}>
            {activeVideo?.url ? (
              <video 
                src={activeVideo.url} 
                controls 
                controlsList="nodownload"
                className={styles.videoElement}
                autoPlay
              >
                Seu navegador não suporta vídeos.
              </video>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#666' }}>
                Vídeo não disponível ou em processamento.
              </div>
            )}
          </div>
          <h1 className={styles.currentTitle}>{activeVideo?.name}</h1>
          
          {activeVideo?.name.includes('Encontrando Fornecedores') ? (
            <div className={styles.currentDesc}>
              <p>Nesta aula, eu te mostro como conseguir os melhores preços direto da fonte. Quer ter acesso imediato aos nossos bonés com qualidade premium e margem altíssima?</p>
              
              <div style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
                <a 
                  href="https://wa.me/558698114403?text=olá, vim pelo ricardo e quero saber mais!" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: '#25D366',
                    color: '#fff',
                    padding: '1rem 1.5rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    boxShadow: '0 4px 6px -1px rgba(37, 211, 102, 0.4)'
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.082 21.378c-1.637 0-3.232-.423-4.639-1.221l-5.111 1.341 1.366-4.981c-.888-1.464-1.356-3.155-1.356-4.887 0-5.26 4.279-9.538 9.539-9.538 5.259 0 9.539 4.279 9.539 9.539 0 5.259-4.28 9.539-9.539 9.539z" fill-rule="evenodd" clip-rule="evenodd"/>
                  </svg>
                  Falar com o Fornecedor de Bonés
                </a>
              </div>
            </div>
          ) : activeVideo?.name.includes('Técnicas de Vendas') ? (
            <div className={styles.currentDesc}>
              <p>Nesta aula, você aprenderá as estratégias mais eficientes para fechar vendas no 1 a 1. Abaixo, deixamos um script pronto para você usar no seu WhatsApp:</p>
              
              <div style={{ backgroundColor: '#f1f5f9', padding: '1rem', borderRadius: '8px', marginTop: '1rem', border: '1px solid #e2e8f0', color: '#334155' }}>
                <p><strong>1. Saudação (Rápida e direta):</strong></p>
                <p><em>"Olá, [Nome]! Tudo bem? Vi que você curtiu nossos bonés premium lá no Instagram. Muito obrigado pelo interesse!"</em></p>
                
                <p style={{ marginTop: '0.8rem' }}><strong>2. Qualificação (Descobrir o objetivo):</strong></p>
                <p><em>"Me diz uma coisa, você está procurando bonés para uso próprio, para a sua marca ou para revender?"</em></p>
                
                <p style={{ marginTop: '0.8rem' }}><strong>3. Apresentação (Gerar Desejo):</strong></p>
                <p><em>"Perfeito! Nós trabalhamos com o padrão original (tecido premium, costura reforçada e modelagem gringa). É o mesmo fornecedor das grandes marcas. O melhor é que você consegue uma margem de lucro excelente em cima deles."</em></p>
                
                <p style={{ marginTop: '0.8rem' }}><strong>4. Chamada para Ação (Fechamento):</strong></p>
                <p><em>"Posso te mandar o nosso catálogo em PDF aqui mesmo no WhatsApp para você dar uma olhada nas opções a pronta entrega?"</em></p>
              </div>
            </div>
          ) : (
            <p className={styles.currentDesc}>Assista à aula completa acima. Não se esqueça de anotar os pontos principais para aplicar no seu negócio!</p>
          )}
        </div>
      </main>
    </div>
  );
}
