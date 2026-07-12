'use client';

import React from 'react';
import styles from './UpsellPopup.module.css';

interface UpsellPopupProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export default function UpsellPopup({ isOpen, onAccept, onDecline }: UpsellPopupProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onDecline} aria-label="Fechar">
          &times;
        </button>
        
        <div className={styles.badge}>⚠️ OPORTUNIDADE ÚNICA E IMEDIATA</div>
        
        <h2 className={styles.title}>Leve Mais por Menos!</h2>
        <p className={styles.subtitle}>Esta oferta só aparece uma vez. Aproveite para garantir o conhecimento completo de obras.</p>
        
        <div className={styles.checklist}>
          <div className={styles.checkItem}>
            <span className={styles.checkIcon}>⚡</span>
            <div>
              <strong>Instalações de Elétrica Residencial</strong>
              <p>Evite curtos-circuitos e aprenda a ligar fiação e disjuntores com segurança.</p>
            </div>
          </div>
          <div className={styles.checkItem}>
            <span className={styles.checkIcon}>💧</span>
            <div>
              <strong>Instalações de Hidráulica Residencial</strong>
              <p>Evite infiltrações e domine o encanamento de caixa d&apos;água e esgoto de banheiro.</p>
            </div>
          </div>
        </div>

        <div className={styles.priceContainer}>
          <span className={styles.priceLabel}>Valor normal de cada bônus: ~~R$ 39,90~~</span>
          <span className={styles.urgencyText}>Adicione os dois bônus ao seu pedido por apenas R$ 19,80 adicionais:</span>
          
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            <span className={styles.totalLabel}>VALOR TOTAL DO COMBO (Curso Principal + Bônus):</span>
            <span className={styles.newPrice}>R$ 29,70</span>
            <span className={styles.priceSub}>Parabéns! Você economizou R$ 69,90 nesta compra.</span>
          </div>
        </div>

        <button className={styles.acceptBtn} onClick={onAccept}>
          ⚡ ADICIONAR COMBO AO MEU PEDIDO — R$ 29,70
        </button>
        
        <button className={styles.declineBtn} onClick={onDecline}>
          Não quero o desconto. Seguir apenas com o Principal por R$ 9,90
        </button>
      </div>
    </div>
  );
}
