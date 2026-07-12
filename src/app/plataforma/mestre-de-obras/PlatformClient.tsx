'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PEDREIRO_COURSE_DATA, Module, Lesson } from '@/lib/pedreiroData';
import styles from './page.module.css';

interface PlatformClientProps {
  customerName: string;
  hasBonusAccess: boolean;
  hasPorcelanatoAccess: boolean;
  hasCubasAccess: boolean;
}

export default function PlatformClient({ customerName, hasBonusAccess, hasPorcelanatoAccess, hasCubasAccess }: PlatformClientProps) {
  const router = useRouter();
  
  // Buscar primeira aula disponível
  const firstModule = PEDREIRO_COURSE_DATA.modules[0];
  const firstLesson = firstModule.lessons ? firstModule.lessons[0] : null;

  const [activeModule, setActiveModule] = useState<Module>(firstModule);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(firstLesson);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [showUpsellBlocker, setShowUpsellBlocker] = useState(false);
  const [blockerType, setBlockerType] = useState<'eletrica_hidraulica' | 'porcelanato' | 'cubas'>('eletrica_hidraulica');

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
    const isPorcelanato = mod.id === 6;
    const isCubas = mod.id === 7;
    
    let hasAccess = hasBonusAccess;
    if (isPorcelanato) hasAccess = hasPorcelanatoAccess;
    else if (isCubas) hasAccess = hasCubasAccess;

    if (!hasAccess) {
      setActiveLesson(null);
      setActiveModule(mod);
      
      let type: 'eletrica_hidraulica' | 'porcelanato' | 'cubas' = 'eletrica_hidraulica';
      if (isPorcelanato) type = 'porcelanato';
      else if (isCubas) type = 'cubas';
      
      setBlockerType(type);
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
    .filter(m => {
      if (m.id === 6) return hasPorcelanatoAccess;
      if (m.id === 7) return hasCubasAccess;
      if (m.isBonus) return hasBonusAccess;
      return true;
    })
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
            
            // Checar acesso do módulo específico
            const isPorcelanato = mod.id === 6;
            const isCubas = mod.id === 7;
            
            let hasAccess = true;
            if (isPorcelanato) hasAccess = hasPorcelanatoAccess;
            else if (isCubas) hasAccess = hasCubasAccess;
            else if (isBonusModule) hasAccess = hasBonusAccess;

            // Se for módulo bônus e o usuário NÃO tiver acesso, mostra ele bloqueado com cadeado
            if (isBonusModule && !hasAccess) {
              return (
                <div key={mod.id} className={styles.moduleWrapper}>
                  <div 
                    className={`${styles.moduleHeader} ${isCurrentModule ? styles.moduleHeaderActive : ''}`}
                    onClick={() => handleBonusModuleClick(mod)}
                    style={{ marginTop: '0.3rem', border: '1px dashed #ea580c' }}
                  >
                    <div className={styles.moduleMeta}>
                      <span className={styles.moduleNumber} style={{ color: '#ea580c' }}>BLOQUEADO 🔒</span>
                      <span className={styles.moduleTitle}>{mod.title}</span>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={mod.id} className={styles.moduleWrapper}>
                <div 
                  className={`${styles.moduleHeader} ${isCurrentModule ? styles.moduleHeaderActive : ''}`}
                  onClick={() => {
                    if (isBonusModule) {
                      handleBonusModuleClick(mod);
                    } else {
                      handleLessonClick(mod, mod.lessons ? mod.lessons[0] : undefined);
                    }
                  }}
                >
                  <div className={styles.moduleMeta}>
                    <span className={styles.moduleNumber}>{isBonusModule ? 'TREINAMENTO EXTRA' : `Módulo ${mod.id}`}</span>
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
              
              {blockerType === 'eletrica_hidraulica' && (
                <>
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
                </>
              )}

              {blockerType === 'porcelanato' && (
                <>
                  <p className={styles.blockDesc}>
                    O pacote completo de **Projetos de Porcelanato** é um treinamento extra de upsell.
                  </p>
                  
                  <div className={styles.upsellBenefits}>
                    <h3>O que você vai receber:</h3>
                    <ul>
                      <li>📐 Detalhamento e medidas de Ilhas e Bancadas Gourmet</li>
                      <li>📐 Projetos prontos para Nichos Embutidos de banheiro</li>
                      <li>📐 Painéis e detalhes decorativos modernos de sala e cozinha</li>
                      <li>📐 Projetos de cozinhas e banheiros modernos em porcelanato</li>
                    </ul>
                  </div>
                </>
              )}

              {blockerType === 'cubas' && (
                <>
                  <p className={styles.blockDesc}>
                    O manual profissional de **Fabricação de Cubas de Concreto** é um treinamento extra de upsell.
                  </p>
                  
                  <div className={styles.upsellBenefits}>
                    <h3>O que você vai receber:</h3>
                    <ul>
                      <li>🏺 Passo a passo de dosagem e moldagem de Cubas de Alto Padrão</li>
                      <li>🏺 Formulação de concreto HPC (High Performance Concrete)</li>
                      <li>🏺 Guias visuais de acabamento rústico Efeito Mármore</li>
                      <li>🏺 Técnicas avançadas de acabamento Efeito Granito e Efeito Paris</li>
                    </ul>
                  </div>
                </>
              )}

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
            <div className={styles.playerView}>
              
              {/* SE FOR PDF: RENDERIZA PAINEL DE DOWNLOAD ELEGANTE COM CAPA E BOTÃO */}
              {activeLesson.videoId === 'pdf' ? (
                <div style={{
                  background: '#0d1222',
                  border: '2px solid #1e293b',
                  borderRadius: '16px',
                  padding: '3rem 2rem',
                  textAlign: 'center',
                  boxShadow: '0 20px 45px rgba(0,0,0,0.5)',
                  marginBottom: '2rem'
                }}>
                  <div style={{ fontSize: '4.5rem', marginBottom: '1.5rem' }}>📄</div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', marginBottom: '0.8rem' }}>
                    {activeLesson.title}
                  </h2>
                  <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.5 }}>
                    {activeLesson.description}
                  </p>
                  <a 
                    href={activeLesson.videoUrl} 
                    download
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.8rem',
                      background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                      color: '#fff',
                      padding: '1.1rem 2.5rem',
                      borderRadius: '8px',
                      fontSize: '1.05rem',
                      fontWeight: 800,
                      textDecoration: 'none',
                      boxShadow: '0 10px 20px rgba(234, 88, 12, 0.3)',
                      transition: 'transform 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    📥 BAIXAR PROJETO EM PDF
                  </a>
                </div>
              ) : (
                /* SE FOR VÍDEO MP4 OU YOUTUBE */
                <div className={styles.playerWrapper}>
                  {activeLesson.videoUrl ? (
                    <video 
                      src={activeLesson.videoUrl} 
                      controls 
                      controlsList="nodownload"
                      className={styles.iframePlayer}
                      autoPlay
                      key={activeLesson.id}
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
              )}

              <div className={styles.metaInfo}>
                <h1 className={styles.lessonMainTitle}>{activeLesson.title}</h1>
                <button 
                  onClick={() => toggleLessonComplete(activeLesson.id)}
                  className={`${styles.btnMarkComplete} ${completedLessons.includes(activeLesson.id) ? styles.btnCompleteDone : ''}`}
                >
                  {completedLessons.includes(activeLesson.id) ? '✓ Concluído' : 'Marcar como Concluído'}
                </button>
              </div>

              {activeLesson.videoId !== 'pdf' && (
                <div className={styles.descriptionCard}>
                  <h3>Descrição da Aula</h3>
                  <p>{activeLesson.description}</p>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.emptyView}>
              <h2>Selecione um módulo ou projeto no menu lateral para iniciar!</h2>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
