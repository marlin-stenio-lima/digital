import React from 'react';
import styles from './UpsellPopup.module.css';

interface Currais2UpsellPopupProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export default function Currais2UpsellPopup({ isOpen, onAccept, onDecline }: Currais2UpsellPopupProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onDecline} aria-label="Fechar">
          &times;
        </button>
        
        <div className={styles.badge}>⚠️ OPORTUNIDADE ÚNICA E IMEDIATA</div>
        
        <h2 className={styles.title}>Leve o Pacote Rural Completo!</h2>
        <p className={styles.subtitle}>Esta oferta só aparece uma vez. Garanta toda a documentação e controle de custos de obra.</p>
        
        <div className={styles.checklist}>
          <div className={styles.checkItem}>
            <span className={styles.checkIcon}>📜</span>
            <div>
              <strong>Contrato de Arrendamento Rural Profissional</strong>
              <p>Modelo profissional pronto para uso jurídico e proteção legal de ambas as partes.</p>
            </div>
          </div>
          <div className={styles.checkItem}>
            <span className={styles.checkIcon}>📊</span>
            <div>
              <strong>Planilha de Orçamento e Custos Agro</strong>
              <p>Controle financeiro de materiais, insumos, mourões, tábuas e mão de obra.</p>
            </div>
          </div>
        </div>

        <div className={styles.priceContainer}>
          <span className={styles.priceLabel}>Valor normal de cada arquivo: ~~R$ 39,90~~</span>
          <span className={styles.urgencyText}>Adicione os dois adicionais ao seu pedido por apenas R$ 19,80 adicionais:</span>
          
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            <span className={styles.totalLabel}>VALOR TOTAL DO COMBO (75 Projetos + Extras):</span>
            <span className={styles.newPrice}>R$ 39,70</span>
            <span className={styles.priceSub}>Parabéns! Você economizou R$ 50,10 nesta compra.</span>
          </div>
        </div>

        <button className={styles.acceptBtn} onClick={onAccept}>
          ⚡ ADICIONAR EXTRAS AO MEU PEDIDO — R$ 39,70
        </button>
        
        <button className={styles.declineBtn} onClick={onDecline}>
          Não quero o desconto. Seguir apenas com os 75 Projetos por R$ 19,90
        </button>
      </div>
    </div>
  );
}
