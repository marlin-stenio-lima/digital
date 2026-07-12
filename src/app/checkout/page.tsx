'use client';

import React, { useState, useEffect, useCallback, ChangeEvent, FormEvent, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './checkout.module.css';
import PixDisplay from '@/components/PixDisplay';
import UpsellPopup from '@/components/UpsellPopup';
import CurraisUpsellPopup from '@/components/CurraisUpsellPopup';

interface FormData {
  name: string;
  phone: string;
  email: string;
  cpf: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  cpf?: string;
}

interface PixData {
  billingId: string;
  brCode: string;
  qrCodeBase64: string;
  customerName: string;
  customerPhone: string;
  productsBought: string[];
}

interface ProductDetails {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  salePrice: number;
}

const PRODUCTS_MAP: Record<string, ProductDetails> = {
  currais: {
    id: 'currais',
    name: 'Pacote 75 Projetos de Currais',
    description: 'Desenhos técnicos estruturados e prontos para construir',
    originalPrice: 97.00,
    salePrice: 9.90,
  },
  acm: {
    id: 'acm',
    name: 'Projetos de ACM',
    description: 'Manual prático e projetos com placas de ACM',
    originalPrice: 97.00,
    salePrice: 9.90,
  },
  pedreiro: {
    id: 'pedreiro',
    name: 'Curso Mestre da Obra & Pedreiro Profissional',
    description: 'Mapeamentos práticos estruturados em videoaulas completas',
    originalPrice: 39.90,
    salePrice: 9.90,
  },
  eletrica_hidraulica: {
    id: 'eletrica_hidraulica',
    name: 'Upgrade - Treinamento de Elétrica & Hidráulica',
    description: 'Aulas complementares práticas de instalações residenciais',
    originalPrice: 97.00,
    salePrice: 19.90,
  },
  porcelanato: {
    id: 'porcelanato',
    name: 'Upgrade - Projetos de Porcelanato',
    description: 'Apostilas completas com detalhamento técnico de bancadas e nichos',
    originalPrice: 47.00,
    salePrice: 19.90,
  },
  cubas: {
    id: 'cubas',
    name: 'Upgrade - Fabricação de Cubas de Concreto',
    description: 'Guias práticos de moldagem e efeitos rústicos de alto padrão',
    originalPrice: 29.90,
    salePrice: 19.90,
  },
};

function formatPhone(value: string): string {
  if (value.trim().startsWith('+55')) {
    value = value.replace('+55', '');
  }
  let digits = value.replace(/\D/g, '');
  if (digits.startsWith('55') && digits.length >= 12) {
    digits = digits.slice(2);
  }
  const limited = digits.slice(0, 11);
  if (limited.length <= 2) {
    return limited.length > 0 ? `(${limited}` : '';
  }
  if (limited.length <= 7) {
    return `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
  }
  return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`;
}

function formatCpf(value: string): string {
  const digits = value.replace(/\D/g, '');
  const limited = digits.slice(0, 11);
  if (limited.length <= 3) return limited;
  if (limited.length <= 6) return `${limited.slice(0, 3)}.${limited.slice(3)}`;
  if (limited.length <= 9) return `${limited.slice(0, 3)}.${limited.slice(3, 6)}.${limited.slice(6)}`;
  return `${limited.slice(0, 3)}.${limited.slice(3, 6)}.${limited.slice(6, 9)}-${limited.slice(9)}`;
}

function getPhoneDigits(phone: string): string {
  return phone.replace(/\D/g, '');
}

function getCpfDigits(cpf: string): string {
  return cpf.replace(/\D/g, '');
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function CheckoutForm() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('p') || 'currais';
  const product = PRODUCTS_MAP[productId] || PRODUCTS_MAP.currais;

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    cpf: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [showPixDisplay, setShowPixDisplay] = useState(false);
  const [pixData, setPixData] = useState<PixData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // States de Order Bumps e Upsells (PEDREIRO)
  const [eletricaSelected, setEletricaSelected] = useState(false);
  const [hidraulicaSelected, setHidraulicaSelected] = useState(false);
  const [porcelanatoSelected, setPorcelanatoSelected] = useState(false);
  const [cubasSelected, setCubasSelected] = useState(false);

  // States de Order Bumps e Upsells (CURRAIS)
  const [arrendamentoSelected, setArrendamentoSelected] = useState(false);
  const [planilhaSelected, setPlanilhaSelected] = useState(false);
  
  // Controle de Upsell Popup
  const [showUpsellPopup, setShowUpsellPopup] = useState(false);
  const [showCurraisUpsellPopup, setShowCurraisUpsellPopup] = useState(false);
  const [hasShownUpsell, setHasShownUpsell] = useState(false);

  // Preço estático de upsell avulso
  const upsellAvulsoPrice = 13.90; // Para pedreiro (ou 9.90 combo)
  const curraisAvulsoPrice = 13.90; // Para currais conforme novas regras de R$ 13,90 avulso

  // Calculo de Total do Pedido
  let computedTotal = product.salePrice;

  if (product.id === 'pedreiro') {
    // Pedreiro agora possui 4 opcionais de R$ 13,90 avulso. Se ele fechar o popup, saem todos a R$ 9,90.
    if (eletricaSelected) computedTotal += upsellAvulsoPrice;
    if (hidraulicaSelected) computedTotal += upsellAvulsoPrice;
    if (porcelanatoSelected) computedTotal += upsellAvulsoPrice;
    if (cubasSelected) computedTotal += upsellAvulsoPrice;
  } else if (product.id === 'currais') {
    // Para currais, cada upsell custa R$ 13,90 avulso
    if (arrendamentoSelected) computedTotal += curraisAvulsoPrice;
    if (planilhaSelected) computedTotal += curraisAvulsoPrice;
  }

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === 'phone') formattedValue = formatPhone(value);
    else if (name === 'cpf') formattedValue = formatCpf(value);

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    setFormErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name as keyof FormErrors];
      return newErrors;
    });
  }, []);

  function validateForm(): FormErrors {
    const errors: FormErrors = {};
    if (!formData.name.trim()) errors.name = 'Nome completo é obrigatório';
    else if (formData.name.trim().length < 3) errors.name = 'Nome deve ter pelo menos 3 caracteres';

    const phoneDigits = getPhoneDigits(formData.phone);
    if (!phoneDigits) errors.phone = 'Telefone é obrigatório';
    else if (phoneDigits.length < 10 || phoneDigits.length > 11) errors.phone = 'Telefone inválido';

    if (!formData.email.trim()) errors.email = 'E-mail é obrigatório';
    else if (!isValidEmail(formData.email)) errors.email = 'E-mail inválido';

    const cpfDigits = getCpfDigits(formData.cpf);
    if (!cpfDigits) errors.cpf = 'CPF é obrigatório';
    else if (cpfDigits.length !== 11) errors.cpf = 'CPF deve conter 11 dígitos';

    return errors;
  }

  const generatePix = useCallback(async (finalTotal: number, finalProducts: string[]) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone,
          email: formData.email.trim(),
          cpf: formData.cpf,
          products: finalProducts,
          totalAmount: finalTotal,
          course_id: product.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao gerar pagamento');
      }

      const result = data.data || data;

      setPixData({
        billingId: result.billingId,
        brCode: result.brCode,
        qrCodeBase64: result.qrCodeBase64,
        customerName: formData.name.trim(),
        customerPhone: formData.phone,
        productsBought: finalProducts,
      });

      setShowPixDisplay(true);
    } catch (error) {
      console.error('Checkout error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Erro ao gerar pagamento. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }, [formData, product]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    if (product.id === 'pedreiro' && !eletricaSelected && !hidraulicaSelected && !porcelanatoSelected && !cubasSelected && !hasShownUpsell) {
      setShowUpsellPopup(true);
      setHasShownUpsell(true);
    } else if (product.id === 'currais' && !arrendamentoSelected && !planilhaSelected && !hasShownUpsell) {
      setShowCurraisUpsellPopup(true);
      setHasShownUpsell(true);
    } else {
      const buyList = [product.id];
      if (product.id === 'pedreiro') {
        if (eletricaSelected) buyList.push('eletrica');
        if (hidraulicaSelected) buyList.push('hidraulica');
        if (porcelanatoSelected) buyList.push('porcelanato');
        if (cubasSelected) buyList.push('cubas');
      } else if (product.id === 'currais') {
        if (arrendamentoSelected) buyList.push('arrendamento');
        if (planilhaSelected) buyList.push('planilha');
      }
      generatePix(computedTotal, buyList);
    }
  };

  const handleAcceptUpsell = () => {
    setShowUpsellPopup(false);
    setEletricaSelected(true);
    setHidraulicaSelected(true);
    setPorcelanatoSelected(true);
    setCubasSelected(true);
    
    // Todos os 4 upsells por R$ 9,90 cada = R$ 39,60 adicionais (Total: R$ 49,50)
    const buyList = [product.id, 'eletrica', 'hidraulica', 'porcelanato', 'cubas'];
    generatePix(product.salePrice + 39.60, buyList);
  };

  const handleDeclineUpsell = () => {
    setShowUpsellPopup(false);
    generatePix(product.salePrice, [product.id]);
  };

  const handleAcceptCurraisUpsell = () => {
    setShowCurraisUpsellPopup(false);
    setArrendamentoSelected(true);
    setPlanilhaSelected(true);
    
    // 2 upsells por R$ 9,90 cada = R$ 19,80 adicionais (Total: R$ 29,70)
    const buyList = [product.id, 'arrendamento', 'planilha'];
    generatePix(product.salePrice + 19.80, buyList);
  };

  const handleDeclineCurraisUpsell = () => {
    setShowCurraisUpsellPopup(false);
    generatePix(product.salePrice, [product.id]);
  };

  return (
    <div className={styles.checkoutPage}>
      <div className={styles.container}>
        {/* ============ ORDER SUMMARY ============ */}
        <div className={styles.orderSummary}>
          <h1 className={styles.productTitle}>{product.name}</h1>
          <p className={styles.productSubtitle}>{product.description}</p>
          <hr className={styles.divider} />
          
          <div className={styles.summaryList}>
            <div className={styles.summaryRow}>
              <span>{product.name}</span>
              <span>R$ {product.salePrice.toFixed(2).replace('.', ',')}</span>
            </div>
            
            {product.id === 'pedreiro' && eletricaSelected && (
              <div className={styles.summaryRow}>
                <span>💡 Guia de Elétrica Residencial</span>
                <span>R$ {upsellAvulsoPrice.toFixed(2).replace('.', ',')}</span>
              </div>
            )}

            {product.id === 'pedreiro' && hidraulicaSelected && (
              <div className={styles.summaryRow}>
                <span>💧 Guia de Hidráulica Residencial</span>
                <span>R$ {upsellAvulsoPrice.toFixed(2).replace('.', ',')}</span>
              </div>
            )}

            {product.id === 'pedreiro' && porcelanatoSelected && (
              <div className={styles.summaryRow}>
                <span>📐 Projetos de Porcelanato</span>
                <span>R$ {upsellAvulsoPrice.toFixed(2).replace('.', ',')}</span>
              </div>
            )}

            {product.id === 'pedreiro' && cubasSelected && (
              <div className={styles.summaryRow}>
                <span>🏺 Fabricação de Cubas de Concreto</span>
                <span>R$ {upsellAvulsoPrice.toFixed(2).replace('.', ',')}</span>
              </div>
            )}

            {product.id === 'currais' && arrendamentoSelected && (
              <div className={styles.summaryRow}>
                <span>📜 Contrato de Arrendamento Rural</span>
                <span>R$ {curraisAvulsoPrice.toFixed(2).replace('.', ',')}</span>
              </div>
            )}

            {product.id === 'currais' && planilhaSelected && (
              <div className={styles.summaryRow}>
                <span>📊 Planilha de Orçamento Agro</span>
                <span>R$ {curraisAvulsoPrice.toFixed(2).replace('.', ',')}</span>
              </div>
            )}
          </div>

          <hr className={styles.divider} />

          <p className={styles.originalPrice}>
            Valor normal: <span className={styles.originalPriceStrike}>R$ {product.originalPrice.toFixed(2).replace('.', ',')}</span>
          </p>
          <p className={styles.finalPriceRow}>
            <span className={styles.finalPriceLabel}>Você paga:</span>
            <span className={styles.finalPrice}>R$ {computedTotal.toFixed(2).replace('.', ',')}</span>
          </p>
        </div>

        {/* ============ CHECKOUT FORM ============ */}
        <form className={styles.formSection} onSubmit={handleSubmit} noValidate>
          <h2 className={styles.formTitle}>Finalizar Pedido</h2>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="name">Nome Completo <span className={styles.required}>*</span></label>
            <input
              id="name" name="name" type="text"
              className={`${styles.formInput} ${formErrors.name ? styles.inputError : ''}`}
              placeholder="Seu nome completo"
              value={formData.name} onChange={handleInputChange}
              autoComplete="name"
            />
            {formErrors.name && <span className={styles.errorText}>{formErrors.name}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="phone">Telefone (WhatsApp) <span className={styles.required}>*</span></label>
            <div className={styles.phoneInputWrapper}>
              <span className={styles.phonePrefix}>🇧🇷 +55</span>
              <input
                id="phone" name="phone" type="tel"
                className={`${styles.formInput} ${styles.phoneInputWithPrefix} ${formErrors.phone ? styles.inputError : ''}`}
                placeholder="(11) 99999-9999"
                value={formData.phone} onChange={handleInputChange}
                autoComplete="tel"
              />
            </div>
            {formErrors.phone && <span className={styles.errorText}>{formErrors.phone}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="email">E-mail <span className={styles.required}>*</span></label>
            <input
              id="email" name="email" type="email"
              className={`${styles.formInput} ${formErrors.email ? styles.inputError : ''}`}
              placeholder="seuemail@exemplo.com"
              value={formData.email} onChange={handleInputChange}
              autoComplete="email"
            />
            {formErrors.email && <span className={styles.errorText}>{formErrors.email}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="cpf">CPF <span className={styles.required}>*</span></label>
            <input
              id="cpf" name="cpf" type="text" inputMode="numeric"
              className={`${styles.formInput} ${formErrors.cpf ? styles.inputError : ''}`}
              placeholder="000.000.000-00"
              value={formData.cpf} onChange={handleInputChange}
            />
            {formErrors.cpf && <span className={styles.errorText}>{formErrors.cpf}</span>}
          </div>

          {/* ============ ORDER BUMPS (EXCLUSIVOS DE PEDREIRO) ============ */}
          {product.id === 'pedreiro' && (
            <div className={styles.orderBumpsSection}>
              <h3 className={styles.bumpsTitle}>Adicione ao seu pedido:</h3>
              
              {/* BUMP 1: ELÉTRICA */}
              <label className={`${styles.bumpCard} ${eletricaSelected ? styles.bumpSelected : ''}`}>
                <input 
                  type="checkbox" 
                  checked={eletricaSelected}
                  onChange={(e) => setEletricaSelected(e.target.checked)}
                  className={styles.bumpCheckbox}
                />
                <div className={styles.bumpInfo}>
                  <div className={styles.bumpHeader}>
                    <span className={styles.bumpName}>💡 Guia de Elétrica Residencial</span>
                    <span className={styles.bumpPrice}>+ R$ {upsellAvulsoPrice.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <p className={styles.bumpDesc}>
                    Aprenda a fazer dimensionamento de disjuntores, cabos e fiação de tomadas, interruptores e chuveiro de forma prática.
                  </p>
                </div>
              </label>

              {/* BUMP 2: HIDRÁULICA */}
              <label className={`${styles.bumpCard} ${hidraulicaSelected ? styles.bumpSelected : ''}`}>
                <input 
                  type="checkbox" 
                  checked={hidraulicaSelected}
                  onChange={(e) => setHidraulicaSelected(e.target.checked)}
                  className={styles.bumpCheckbox}
                />
                <div className={styles.bumpInfo}>
                  <div className={styles.bumpHeader}>
                    <span className={styles.bumpName}>💧 Guia de Hidráulica Residencial</span>
                    <span className={styles.bumpPrice}>+ R$ {upsellAvulsoPrice.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <p className={styles.bumpDesc}>
                    Domine a instalação de caixas d&apos;água, pressurizadores de banheiros e redes prediais de esgoto doméstico sem erros.
                  </p>
                </div>
              </label>

              {/* BUMP 3: PORCELANATO */}
              <label className={`${styles.bumpCard} ${porcelanatoSelected ? styles.bumpSelected : ''}`}>
                <input 
                  type="checkbox" 
                  checked={porcelanatoSelected}
                  onChange={(e) => setPorcelanatoSelected(e.target.checked)}
                  className={styles.bumpCheckbox}
                />
                <div className={styles.bumpInfo}>
                  <div className={styles.bumpHeader}>
                    <span className={styles.bumpName}>📐 Projetos de Porcelanato</span>
                    <span className={styles.bumpPrice}>+ R$ {upsellAvulsoPrice.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <p className={styles.bumpDesc}>
                    Coleção com 8 manuais práticos e medidas de ilhas, bancadas, nichos embutidos e áreas gourmet em porcelanato.
                  </p>
                </div>
              </label>

              {/* BUMP 4: CUBAS */}
              <label className={`${styles.bumpCard} ${cubasSelected ? styles.bumpSelected : ''}`}>
                <input 
                  type="checkbox" 
                  checked={cubasSelected}
                  onChange={(e) => setCubasSelected(e.target.checked)}
                  className={styles.bumpCheckbox}
                />
                <div className={styles.bumpInfo}>
                  <div className={styles.bumpHeader}>
                    <span className={styles.bumpName}>🏺 Fabricação de Cubas de Concreto</span>
                    <span className={styles.bumpPrice}>+ R$ {upsellAvulsoPrice.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <p className={styles.bumpDesc}>
                    Guia passo a passo de dosagem, moldes e acabamentos com efeito granito, mármore e rústicos para cubas de alto padrão.
                  </p>
                </div>
              </label>
            </div>
          )}

          {/* ============ ORDER BUMPS (EXCLUSIVOS DE CURRAIS) ============ */}
          {product.id === 'currais' && (
            <div className={styles.orderBumpsSection}>
              <h3 className={styles.bumpsTitle}>Adicione ao seu pedido:</h3>
              
              {/* BUMP 1: CONTRATO DE ARRENDAMENTO */}
              <label className={`${styles.bumpCard} ${arrendamentoSelected ? styles.bumpSelected : ''}`}>
                <input 
                  type="checkbox" 
                  checked={arrendamentoSelected}
                  onChange={(e) => setArrendamentoSelected(e.target.checked)}
                  className={styles.bumpCheckbox}
                />
                <div className={styles.bumpInfo}>
                  <div className={styles.bumpHeader}>
                    <span className={styles.bumpName}>📜 Contrato de Arrendamento Rural</span>
                    <span className={styles.bumpPrice}>+ R$ {curraisAvulsoPrice.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <p className={styles.bumpDesc}>
                    Modelo profissional de contrato em formato pronto pronto para uso legal e proteção jurídica de arrendador e arrendatário.
                  </p>
                </div>
              </label>

              {/* BUMP 2: PLANILHA DE ORÇAMENTO */}
              <label className={`${styles.bumpCard} ${planilhaSelected ? styles.bumpSelected : ''}`}>
                <input 
                  type="checkbox" 
                  checked={planilhaSelected}
                  onChange={(e) => setPlanilhaSelected(e.target.checked)}
                  className={styles.bumpCheckbox}
                />
                <div className={styles.bumpInfo}>
                  <div className={styles.bumpHeader}>
                    <span className={styles.bumpName}>📊 Planilha de Orçamento Agro</span>
                    <span className={styles.bumpPrice}>+ R$ {curraisAvulsoPrice.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <p className={styles.bumpDesc}>
                    Planilha completa para planejar custos de obra, mão de obra e insumos de construções rurais sem perder o controle do caixa.
                  </p>
                </div>
              </label>
            </div>
          )}

          <button type="submit" className={styles.submitButton} disabled={isLoading}>
            {isLoading ? (
              <>
                <span className={styles.spinner}></span>
                Gerando PIX...
              </>
            ) : (
              <>
                <svg viewBox="0 0 512 512" width="20" height="20" fill="currentColor">
                  <path d="M125.8 286.7L213 374c23.6 23.6 61.9 23.6 85.5 0l87.2-87.3c23.6-23.6 23.6-61.9 0-85.5l-87.2-87.3c-23.6-23.6-61.9-23.6-85.5 0l-87.2 87.3c-23.6 23.6-23.6 62 0 85.5zm111.4-152.1c8.4-8.4 22.1-8.4 30.5 0l87.2 87.3c8.4 8.4 8.4 22.1 0 30.5l-87.2 87.3c-8.4 8.4-22.1 8.4-30.5 0l-87.2-87.3c-8.4-8.4-8.4-22.1 0-30.5l87.2-87.3z"/>
                  <path d="M375.4 125.8c-23.6-23.6-61.9-23.6-85.5 0l-14.8 14.8 30.5 30.5 14.8-14.8c8.4-8.4 22.1-8.4 30.5 0l87.2 87.3c8.4 8.4 8.4 22.1 0 30.5l-14.8 14.8 30.5 30.5 14.8-14.8c23.6-23.6 23.6-61.9 0-85.5l-87.2-87.3z"/>
                  <path d="M136.6 386.2c23.6 23.6 61.9 23.6 85.5 0l14.8-14.8-30.5-30.5-14.8 14.8c-8.4 8.4-22.1 8.4-30.5 0l-87.2-87.3c-8.4-8.4-8.4-22.1 0-30.5l14.8-14.8-30.5-30.5-14.8 14.8c-23.6 23.6-23.6 61.9 0 85.5l87.2 87.3z"/>
                </svg>
                Gerar QR Code PIX
              </>
            )}
          </button>
        </form>

        {/* ============ TRUST FOOTER ============ */}
        <div className={styles.trustFooter}>
          <div className={styles.trustBadges}>
            <span className={styles.trustBadge}><span className={styles.trustBadgeIcon}>🔒</span> Pagamento Seguro</span>
            <span className={styles.trustBadge}><span className={styles.trustBadgeIcon}>⚡</span> Entrega Imediata</span>
          </div>
        </div>
      </div>

      {showPixDisplay && pixData && (
        <PixDisplay
          billingId={pixData.billingId}
          brCode={pixData.brCode}
          qrCodeBase64={pixData.qrCodeBase64}
          amount={computedTotal}
          customerName={pixData.customerName}
          customerPhone={pixData.customerPhone}
          productsBought={pixData.productsBought}
        />
      )}

      {product.id === 'pedreiro' && (
        <UpsellPopup
          isOpen={showUpsellPopup}
          onAccept={handleAcceptUpsell}
          onDecline={handleDeclineUpsell}
        />
      )}

      {product.id === 'currais' && (
        <CurraisUpsellPopup
          isOpen={showCurraisUpsellPopup}
          onAccept={handleAcceptCurraisUpsell}
          onDecline={handleDeclineCurraisUpsell}
        />
      )}

      {errorMessage && (
        <div className={styles.errorModalOverlay}>
          <div className={styles.errorModalContent}>
            <div className={styles.errorIconWrapper}>
              <span className={styles.errorIcon}>⚠️</span>
            </div>
            <h3 className={styles.errorModalTitle}>Atenção</h3>
            <p className={styles.errorModalText}>{errorMessage}</p>
            <button className={styles.errorModalButton} onClick={() => setErrorMessage(null)}>
              Corrigir Dados
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function GenericCheckoutPage() {
  return (
    <Suspense fallback={<div className={styles.checkoutPage}><div className={styles.container}>Carregando...</div></div>}>
      <CheckoutForm />
    </Suspense>
  );
}
