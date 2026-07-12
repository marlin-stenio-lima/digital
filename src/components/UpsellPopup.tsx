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
        
        <h2 className={styles.title}>Leve a Coleção Completa!</h2>
        <p className={styles.subtitle}>Esta oferta só aparece agora. Garanta todo o conhecimento e modelagem para a sua construção.</p>
        
        <div className={styles.checklist}>
          <div className={styles.checkItem}>
            <span className={styles.checkIcon}>💡</span>
            <div>
              <strong>Elétrica & Hidráulica Residencial</strong>
              <p>Evite curtos e infiltrações. Monte disjuntores e encanamentos sem erros.</p>
            </div>
          </div>
          <div className={styles.checkItem}>
            <span className={styles.checkIcon}>📐</span>
            <div>
              <strong>Projetos de Porcelanato</strong>
              <p>Bancadas, ilhas gourmet e nichos modernos com detalhamento técnico.</p>
            </div>
          </div>
          <div className={styles.checkItem}>
            <span className={styles.checkIcon}>🏺</span>
            <div>
              <strong>Fabricação de Cubas de Concreto</strong>
              <p>Passo a passo de dosagem, moldes e acabamentos rústicos finos.</p>
            </div>
          </div>
        </div>

        <div className={styles.priceContainer}>
          <span className={styles.priceLabel}>Valor normal de cada treinamento: ~~R$ 39,90~~</span>
          <span className={styles.urgencyText}>Adicione todos os 4 complementos por apenas R$ 39,60 adicionais (R$ 9,90 cada):</span>
          
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            <span className={styles.totalLabel}>VALOR TOTAL DO COMBO (Curso Principal + Extras):</span>
            <span className={styles.newPrice}>R$ 49,50</span>
            <span className={styles.priceSub}>Parabéns! Você economizou R$ 110,10 nesta compra.</span>
          </div>
        </div>

        <button className={styles.acceptBtn} onClick={onAccept}>
          ⚡ ADICIONAR TUDO AO MEU PEDIDO — R$ 49,50
        </button>
        
        <button className={styles.declineBtn} onClick={onDecline}>
          Não quero o desconto. Seguir apenas com o Curso Principal por R$ 9,90
        </button>
      </div>
    </div>
  );
}
