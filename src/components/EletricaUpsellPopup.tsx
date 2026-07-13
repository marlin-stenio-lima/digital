import React from 'react';
import styles from './UpsellPopup.module.css';

interface EletricaUpsellPopupProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export default function EletricaUpsellPopup({ isOpen, onAccept, onDecline }: EletricaUpsellPopupProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onDecline} aria-label="Fechar">
          &times;
        </button>
        
        <div className={styles.badge}>⚠️ OPORTUNIDADE ÚNICA E IMEDIATA</div>
        
        <h2 className={styles.title}>Complete Sua Obra com Desconto!</h2>
        <p className={styles.subtitle}>Esta oferta só aparece uma vez. Garanta o conhecimento completo de alvenaria e acabamentos com desconto exclusivo.</p>
        
        <div className={styles.checklist}>
          <div className={styles.checkItem}>
            <span className={styles.checkIcon}>🏗️</span>
            <div>
              <strong>Curso Mestre de Obra & Pedreiro</strong>
              <p>Passo a passo completo de fundações, alvenaria, reboco e contra-piso em vídeo.</p>
            </div>
          </div>
          <div className={styles.checkItem}>
            <span className={styles.checkIcon}>📐</span>
            <div>
              <strong>Projetos de Porcelanato</strong>
              <p>Manuais detalhados de ilhas gourmet, bancadas e nichos em porcelanato.</p>
            </div>
          </div>
          <div className={styles.checkItem}>
            <span className={styles.checkIcon}>🏺</span>
            <div>
              <strong>Fabricação de Cubas de Concreto</strong>
              <p>Guias práticos de dosagem, moldes e acabamentos marmorizados e rústicos.</p>
            </div>
          </div>
        </div>

        <div className={styles.priceContainer}>
          <span className={styles.priceLabel}>Valor normal dos treinamentos adicionados: ~~R$ 77,00~~</span>
          <span className={styles.urgencyText}>Adicione todos os 3 cursos extras ao seu pedido por apenas R$ 29,80 adicionais:</span>
          
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            <span className={styles.totalLabel}>VALOR TOTAL DO COMBO (Curso de Elétrica + Extras):</span>
            <span className={styles.newPrice}>R$ 39,70</span>
            <span className={styles.priceSub}>Parabéns! Você economizou R$ 47,20 nesta compra.</span>
          </div>
        </div>

        <button className={styles.acceptBtn} onClick={onAccept}>
          ⚡ ADICIONAR COMBO AO MEU PEDIDO — R$ 39,70
        </button>
        
        <button className={styles.declineBtn} onClick={onDecline}>
          Não quero o desconto. Seguir apenas com o Curso de Elétrica por R$ 9,90
        </button>
      </div>
    </div>
  );
}
