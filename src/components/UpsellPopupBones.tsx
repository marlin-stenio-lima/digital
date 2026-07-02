import React from 'react';
import Image from 'next/image';

interface UpsellPopupBonesProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export default function UpsellPopupBones({ isOpen, onAccept, onDecline }: UpsellPopupBonesProps) {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <div style={styles.header}>
          <span style={styles.alertIcon}>⚠️</span>
          <h2 style={styles.title}>ESPERE! NÃO FECHE ESTA PÁGINA AINDA...</h2>
        </div>
        
        <div style={styles.content}>
          <p style={styles.subtitle}>
            Você está prestes a finalizar sua inscrição na Fábrica de Bonés. Mas antes...
          </p>
          
          <div style={styles.offerBox}>
            <h3 style={styles.offerTitle}>ACOMPANHAMENTO INDIVIDUAL META ADS</h3>
            <p style={styles.offerText}>
              De nada adianta ter o melhor boné do mundo se ninguém souber que ele existe. Por isso, eu quero pegar na sua mão e te ajudar a subir as suas <strong>primeiras campanhas de anúncios no Instagram e Facebook</strong>.
            </p>
            <p style={styles.offerText}>
              Eu vou fazer uma call com você para configurar seus anúncios para atrair clientes interessados <strong>todos os dias</strong>.
            </p>
            
            <div style={styles.priceTag}>
              Por apenas <span style={styles.priceValue}>R$ 99,00</span>
            </div>
          </div>

          <button onClick={onAccept} style={styles.acceptBtn}>
            SIM! QUERO ADICIONAR AO MEU PEDIDO
          </button>
          
          <button onClick={onDecline} style={styles.declineBtn}>
            Não, obrigado. Vou tentar vender sem anúncios por enquanto.
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: '20px',
  },
  popup: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    maxWidth: '500px',
    width: '100%',
    overflow: 'hidden',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    animation: 'slideUp 0.3s ease-out forwards',
  },
  header: {
    backgroundColor: '#dc2626',
    color: '#fff',
    padding: '20px',
    textAlign: 'center' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '10px',
  },
  alertIcon: {
    fontSize: '32px',
  },
  title: {
    margin: 0,
    fontSize: '20px',
    fontWeight: 900,
    letterSpacing: '0.5px',
  },
  content: {
    padding: '30px 24px',
    textAlign: 'center' as const,
  },
  subtitle: {
    fontSize: '16px',
    color: '#4b5563',
    marginBottom: '20px',
    fontWeight: 500,
  },
  offerBox: {
    backgroundColor: '#fef2f2',
    border: '2px dashed #ef4444',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '24px',
  },
  offerTitle: {
    color: '#b91c1c',
    fontSize: '18px',
    fontWeight: 800,
    margin: '0 0 12px 0',
  },
  offerText: {
    color: '#374151',
    fontSize: '15px',
    lineHeight: 1.5,
    margin: '0 0 12px 0',
  },
  priceTag: {
    fontSize: '16px',
    color: '#1f2937',
    fontWeight: 500,
    marginTop: '16px',
  },
  priceValue: {
    fontSize: '24px',
    fontWeight: 800,
    color: '#16a34a',
    display: 'block',
  },
  acceptBtn: {
    width: '100%',
    backgroundColor: '#16a34a',
    color: '#fff',
    border: 'none',
    padding: '16px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 700,
    cursor: 'pointer',
    marginBottom: '16px',
    boxShadow: '0 4px 6px -1px rgba(22, 163, 74, 0.4)',
    transition: 'transform 0.1s',
  },
  declineBtn: {
    width: '100%',
    backgroundColor: 'transparent',
    color: '#6b7280',
    border: 'none',
    fontSize: '14px',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
};
