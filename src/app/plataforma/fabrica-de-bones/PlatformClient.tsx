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
              <span className={styles.videoTitle}>{index + 1}. {vid.name}</span>
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
          <p className={styles.currentDesc}>Assista à aula completa acima. Não se esqueça de anotar os pontos principais!</p>
        </div>
      </main>
    </div>
  );
}
