'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './PixDisplay.module.css';

interface PixDisplayProps {
  billingId: string;
  brCode: string;
  qrCodeBase64: string;
  amount: number;
  customerName: string;
  customerPhone: string;
  productsBought: string[];
}

export default function PixDisplay({ billingId, brCode, qrCodeBase64, amount, customerName, customerPhone, productsBought }: PixDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (timeLeft <= 0 || isPaid) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, isPaid]);

  useEffect(() => {
    if (!billingId || isPaid || timeLeft <= 0) return;

    const pollInterval = setInterval(async () => {
      try {
        const res = await fetch(`/api/checkout/status?id=${billingId}&phone=${encodeURIComponent(customerPhone)}`);
        const data = await res.json();
        
        const currentStatus = data.status ? String(data.status).toUpperCase() : '';
        if (currentStatus === 'PAID' || currentStatus === 'COMPLETED') {
          setIsPaid(true);
          clearInterval(pollInterval);
          window.location.href = `/obrigado?v=${amount}`;
        }
      } catch (err) {
        console.error('Erro ao verificar status:', err);
      }
    }, 3000);

    return () => clearInterval(pollInterval);
  }, [billingId, isPaid, timeLeft]);

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const formatCurrency = useCallback((value: number): string => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(brCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
      const textarea = document.createElement('textarea');
      textarea.value = brCode;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr);
      }
      document.body.removeChild(textarea);
    }
  }

  const isExpired = timeLeft <= 0;

  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.pixLogoWrapper}>
            <svg viewBox="0 0 512 512" width="24" height="24" fill="#32bcad">
              <path d="M125.8 286.7L213 374c23.6 23.6 61.9 23.6 85.5 0l87.2-87.3c23.6-23.6 23.6-61.9 0-85.5l-87.2-87.3c-23.6-23.6-61.9-23.6-85.5 0l-87.2 87.3c-23.6 23.6-23.6 62 0 85.5zm111.4-152.1c8.4-8.4 22.1-8.4 30.5 0l87.2 87.3c8.4 8.4 8.4 22.1 0 30.5l-87.2 87.3c-8.4 8.4-22.1 8.4-30.5 0l-87.2-87.3c-8.4-8.4-8.4-22.1 0-30.5l87.2-87.3z"/>
              <path d="M375.4 125.8c-23.6-23.6-61.9-23.6-85.5 0l-14.8 14.8 30.5 30.5 14.8-14.8c8.4-8.4 22.1-8.4 30.5 0l87.2 87.3c8.4 8.4 8.4 22.1 0 30.5l-14.8 14.8 30.5 30.5 14.8-14.8c23.6-23.6 23.6-61.9 0-85.5l-87.2-87.3z"/>
              <path d="M136.6 386.2c23.6 23.6 61.9 23.6 85.5 0l14.8-14.8-30.5-30.5-14.8 14.8c-8.4 8.4-22.1 8.4-30.5 0l-87.2-87.3c-8.4-8.4-8.4-22.1 0-30.5l14.8-14.8-30.5-30.5-14.8 14.8c-23.6 23.6-23.6 61.9 0 85.5l87.2 87.3z"/>
            </svg>
            <h2 className={styles.headerTitle}>Pague com PIX</h2>
          </div>
          <p className={styles.headerSubtitle}>Escaneie o QR Code ou copie a chave</p>
        </div>

        <div className={styles.body}>
          <div className={styles.amountSection}>
            <p className={styles.amountValue}>{formatCurrency(amount)}</p>
          </div>

          <div className={`${styles.timerPill} ${isExpired ? styles.timerExpired : ''}`}>
            {isExpired ? (
              <span className={styles.timerText}>⚠️ Código expirado</span>
            ) : (
              <>
                <svg className={styles.timerIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <span className={styles.timerText}>Expira em {formatTime(timeLeft)}</span>
              </>
            )}
          </div>

          <div className={styles.qrCodeContainer}>
            <div className={styles.qrCodeWrapper}>
              <img
                src={qrCodeBase64}
                alt="QR Code PIX"
                className={styles.qrCodeImage}
              />
            </div>
          </div>

          <div className={styles.copySection}>
            <div className={styles.codeBox} onClick={handleCopy}>
              <span className={styles.codePreview}>
                {brCode.substring(0, 30)}...
              </span>
              <button
                className={`${styles.copyButtonIcon} ${copied ? styles.copiedIcon : ''}`}
                type="button"
                disabled={isExpired}
              >
                {copied ? (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                )}
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>

          <div className={styles.instructionsPanel}>
            <div className={styles.instructionItem}>
              <div className={styles.instructionCircle}>1</div>
              <p>Abra o app do seu banco na opção <strong>PIX Copia e Cola</strong></p>
            </div>
            <div className={styles.instructionItem}>
              <div className={styles.instructionCircle}>2</div>
              <p>Cole o código copiado e confirme o pagamento de <strong>{formatCurrency(amount)}</strong></p>
            </div>
            <div className={styles.instructionItem}>
              <div className={styles.instructionCircle}>3</div>
              <p>O material será enviado para seu WhatsApp <strong>automaticamente</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
