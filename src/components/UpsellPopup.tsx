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
        
        <div className={styles.badge}>🎁 OFERTA EXCLUSIVA DE CHECKOUT</div>
        
        <h2 className={styles.title}>Combo Mestre da Obra</h2>
        <p className={styles.subtitle}>Adicione os dois treinamentos complementares com desconto especial!</p>
        
        <div className={styles.checklist}>
          <div className={styles.checkItem}>
            <span className={styles.checkIcon}>✅</span>
            <div>
              <strong>Guia de Elétrica Residencial Completo</strong>
              <p>Do conceito atômico às ligações práticas de disjuntores, tomadas e chuveiro elétrico.</p>
            </div>
          </div>
          <div className={styles.checkItem}>
            <span className={styles.checkIcon}>✅</span>
            <div>
              <strong>Guia de Hidráulica Residencial Completo</strong>
              <p>Aprenda a dimensionar caixa d&apos;água, bombas de pressão e ligações de esgoto.</p>
            </div>
          </div>
        </div>

        <div className={styles.priceContainer}>
          <span className={styles.oldPrice}>De R$ 79,80</span>
          <span className={styles.priceLabel}>Por apenas adicionais de:</span>
          <span className={styles.newPrice}>R$ 19,80</span>
          <span className={styles.priceSub}>Sendo R$ 9,90 cada curso bônus!</span>
        </div>

        <button className={styles.acceptBtn} onClick={onAccept}>
          SIM, QUERO ADICIONAR AO MEU PEDIDO
        </button>
        
        <button className={styles.declineBtn} onClick={onDecline}>
          Não, obrigado. Quero apenas o produto principal
        </button>
      </div>
    </div>
  );
}
