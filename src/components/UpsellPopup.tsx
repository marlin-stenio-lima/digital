'use client';

import { useEffect } from 'react';
import styles from './UpsellPopup.module.css';

interface UpsellPopupProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export default function UpsellPopup({ isOpen, onAccept, onDecline }: UpsellPopupProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onDecline();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onDecline]);

  if (!isOpen) {
    return null;
  }

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      onDecline();
    }
  }

  return (
    <div className={styles.overlay} onClick={handleOverlayClick} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={onDecline}
          aria-label="Fechar"
          type="button"
        >
          ✕
        </button>

        <span className={styles.topBadge}>🎁 Oferta válida apenas nesta página</span>

        <span className={styles.giftIcon}>🎁</span>

        <h2 className={styles.title}>Oferta Especial</h2>

        <p className={styles.originalPrice}>De R$ 29,70</p>

        <p className={styles.priceLabel}>Por apenas</p>

        <p className={styles.salePrice}>R$ 19,90</p>

        <p className={styles.perProject}>apenas R$ 6,63 por projeto!</p>

        <ul className={styles.checklist}>
          <li className={styles.checklistItem}>
            <span className={styles.checkIcon}>✅</span>
            <span>Carretinha de Carga</span>
          </li>
          <li className={styles.checklistItem}>
            <span className={styles.checkIcon}>✅</span>
            <span>Máquinas de Academia</span>
          </li>
          <li className={styles.checklistItem}>
            <span className={styles.checkIcon}>✅</span>
            <span>Perfuratriz de Poços</span>
          </li>
        </ul>

        <div className={styles.savingsBadge}>
          💰 Pacote: Você economiza R$ 9,80 (33% OFF)
        </div>

        <p className={styles.warningText}>⚠️ Esta oferta não aparecerá novamente</p>

        <button
          className={styles.acceptButton}
          onClick={onAccept}
          type="button"
        >
          Sim, quero aproveitar
        </button>

        <button
          className={styles.declineLink}
          onClick={onDecline}
          type="button"
        >
          Não, obrigado
        </button>
      </div>
    </div>
  );
}
