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
          
          {activeVideo?.name.includes('Técnicas de Vendas') ? (
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
