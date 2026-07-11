'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PEDREIRO_COURSE_DATA, Module, Lesson } from '@/lib/pedreiroData';
import styles from './page.module.css';

interface PlatformClientProps {
  customerName: string;
  hasBonusAccess: boolean;
}

export default function PlatformClient({ customerName, hasBonusAccess }: PlatformClientProps) {
  const router = useRouter();
  
  // Buscar primeira aula disponível
  const firstModule = PEDREIRO_COURSE_DATA.modules[0];
  const firstLesson = firstModule.lessons ? firstModule.lessons[0] : null;

  const [activeModule, setActiveModule] = useState<Module>(firstModule);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(firstLesson);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [showUpsellBlocker, setShowUpsellBlocker] = useState(false);

  const handleLogout = () => {
    document.cookie = 'bones_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/plataforma/login?course=pedreiro');
  };

  const toggleLessonComplete = (lessonId: string) => {
    setCompletedLessons(prev => 
      prev.includes(lessonId) 
        ? prev.filter(id => id !== lessonId) 
        : [...prev, lessonId]
    );
  };

  const handleLessonClick = (module: Module, lesson: Lesson | undefined) => {
    setActiveModule(module);
    setActiveLesson(lesson || null);
    setShowUpsellBlocker(false);
  };

  const handleBonusModuleClick = (mod: Module) => {
    if (!hasBonusAccess) {
      setActiveLesson(null);
      setActiveModule(mod);
      setShowUpsellBlocker(true);
    } else {
      setActiveModule(mod);
      if (mod.lessons && mod.lessons.length > 0) {
        setActiveLesson(mod.lessons[0]);
      }
      setShowUpsellBlocker(false);
    }
  };

  // Contagem de progresso geral
  const totalRegularLessons = PEDREIRO_COURSE_DATA.modules
    .filter(m => !m.isBonus || hasBonusAccess)
    .reduce((sum, m) => sum + (m.lessons ? m.lessons.length : 0), 0);
  const completedCount = completedLessons.length;
  const progressPercent = totalRegularLessons > 0 ? Math.round((completedCount / totalRegularLessons) * 100) : 0;

  return (
    <div className={styles.container}>
      {/* BARRA LATERAL */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Mestre da Obra</h2>
          <span className={styles.userLabel}>Acesso: {customerName}</span>
        </div>

        {/* Barra de Progresso */}
        <div className={styles.progressSection}>
          <div className={styles.progressInfo}>
            <span>Progresso Geral</span>
            <span>{progressPercent}%</span>
          </div>
          <div className={styles.progressBarBg}>
            <div className={styles.progressBarFill} style={{ width: `${progressPercent}%` }} />
          </div>
          <span className={styles.progressStats}>{completedCount} de {totalRegularLessons} concluídas</span>
        </div>

        {/* Menu de Módulos */}
        <div className={styles.navigation}>
          {PEDREIRO_COURSE_DATA.modules.map(mod => {
            const isBonusModule = mod.isBonus;
            const isCurrentModule = activeModule.id === mod.id;

            // Se for módulo bônus e o usuário NÃO tiver acesso, mostra ele bloqueado com cadeado
            if (isBonusModule && !hasBonusAccess) {
              return (
                <div key={mod.id} className={styles.moduleWrapper}>
                  <div 
                    className={`${styles.moduleHeader} ${isCurrentModule ? styles.moduleHeaderActive : ''}`}
                    onClick={() => handleBonusModuleClick(mod)}
                    style={{ marginTop: '0.3rem', border: '1px dashed #ea580c' }}
                  >
                    <div className={styles.moduleMeta}>
                      <span className={styles.moduleNumber} style={{ color: '#ea580c' }}>BÔNUS BLOQUEADO</span>
                      <span className={styles.moduleTitle}>{mod.title}</span>
                    </div>
                    <span className={styles.lockIcon}>🔒</span>
                  </div>
                </div>
              );
            }

            return (
              <div key={mod.id} className={styles.moduleWrapper}>
                <div 
                  className={`${styles.moduleHeader} ${isCurrentModule ? styles.moduleHeaderActive : ''}`}
                  onClick={() => handleLessonClick(mod, mod.lessons ? mod.lessons[0] : undefined)}
                >
                  <div className={styles.moduleMeta}>
                    <span className={styles.moduleNumber}>{isBonusModule ? 'BÔNUS' : `Módulo ${mod.id}`}</span>
                    <span className={styles.moduleTitle}>{mod.title}</span>
                  </div>
                </div>

                {isCurrentModule && mod.lessons && (
                  <ul className={styles.lessonList}>
                    {mod.lessons.map(les => {
                      const isCurrentLesson = activeLesson?.id === les.id;
                      const isDone = completedLessons.includes(les.id);

                      return (
                        <li 
                          key={les.id}
                          className={`${styles.lessonItem} ${isCurrentLesson ? styles.lessonActive : ''}`}
                          onClick={() => handleLessonClick(mod, les)}
                        >
                          <div className={styles.lessonLeft}>
                            <input 
                              type="checkbox" 
                              checked={isDone} 
                              onChange={() => toggleLessonComplete(les.id)}
                              onClick={(e) => e.stopPropagation()} 
                              className={styles.lessonCheckbox}
                            />
                            <span className={styles.lessonTitle}>{les.title}</span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* TELA PRINCIPAL */}
      <main className={styles.main}>
        <header className={styles.topBar}>
          <button className={styles.logoutBtn} onClick={handleLogout}>Sair da Conta</button>
        </header>

        <div className={styles.contentContainer}>
          {showUpsellBlocker ? (
            /* BLOQUEADOR UPSELL */
            <div className={styles.upsellBlocker}>
              <div className={styles.lockGraphic}>🔒</div>
              <h2 className={styles.blockTitle}>Acesso Bloqueado</h2>
              <p className={styles.blockDesc}>
                O curso complementar de **Instalações de Elétrica & Hidráulica Residencial** é um treinamento premium de upsell.
              </p>
              
              <div className={styles.upsellBenefits}>
                <h3>O que você vai aprender:</h3>
                <ul>
                  <li>⚡ Dimensionamento de disjuntores e fiação da casa</li>
                  <li>⚡ Instalação de tomadas, interruptores e chuveiro elétrico</li>
                  <li>💧 Encanamento de água fria, esgoto e caixa d&apos;água</li>
                  <li>💧 Como evitar vazamentos e problemas de pressão na tubulação</li>
                </ul>
              </div>

              <div className={styles.priceContainer}>
                <span className={styles.priceLabel}>Valor Promocional Exclusivo:</span>
                <span className={styles.price}>Apenas R$ 19,90</span>
              </div>

              <a 
                href={PEDREIRO_COURSE_DATA.bonusRedirectUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.upsellBtn}
              >
                ADQUIRIR ACESSO IMEDIATO
              </a>
              <p className={styles.guaranteeText}>⚡ Liberação instantânea no seu WhatsApp após a confirmação do pagamento.</p>
            </div>
          ) : activeLesson ? (
            /* PLAYER DE VÍDEO COMPATÍVEL COM YOUTUBE E MP4 DIRETO */
            <div className={styles.playerView}>
              <div className={styles.playerWrapper}>
                {activeLesson.videoUrl ? (
                  <video 
                    src={activeLesson.videoUrl} 
                    controls 
                    controlsList="nodownload"
                    className={styles.iframePlayer}
                    autoPlay
                    key={activeLesson.id} // Forçar recarregamento do player ao trocar de aula
                  >
                    Seu navegador não suporta a exibição de vídeos.
                  </video>
                ) : (
                  <iframe 
                    src={`https://www.youtube.com/embed/${activeLesson.videoId}`}
                    title={activeLesson.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className={styles.iframePlayer}
                    key={activeLesson.id}
                  />
                )}
              </div>

              <div className={styles.metaInfo}>
                <h1 className={styles.lessonMainTitle}>{activeLesson.title}</h1>
                <button 
                  onClick={() => toggleLessonComplete(activeLesson.id)}
                  className={`${styles.btnMarkComplete} ${completedLessons.includes(activeLesson.id) ? styles.btnCompleteDone : ''}`}
                >
                  {completedLessons.includes(activeLesson.id) ? '✓ Aula Concluída' : 'Marcar como Concluída'}
                </button>
              </div>

              <div className={styles.descriptionCard}>
                <h3>Descrição da Aula</h3>
                <p>{activeLesson.description}</p>
              </div>
            </div>
          ) : (
            <div className={styles.emptyView}>
              <h2>Selecione uma aula no menu lateral para começar a assistir!</h2>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
