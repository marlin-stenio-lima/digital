'use client';

import { useState, useEffect, useCallback, FormEvent, ChangeEvent } from 'react';
import Image from 'next/image';
import styles from '@/app/checkout/checkout.module.css';
import UpsellPopupBones from '@/components/UpsellPopupBones';
import PixDisplay from '@/components/PixDisplay';

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

interface OrderBumpProduct {
  id: string;
  name: string;
  initials: string;
  color: string;
  originalPrice: number;
  salePrice: number;
  savings: number;
  discount: string;
  image: string;
  description?: string;
}

const ORDER_BUMPS: OrderBumpProduct[] = [
  {
    id: 'mentoria-ads',
    name: 'Acompanhamento Meta Ads',
    initials: 'MA',
    color: '#ea580c',
    originalPrice: 197.00,
    salePrice: 99.00,
    savings: 98.00,
    discount: 'OFERTA ÚNICA',
    image: '/images/upsell_mentoria.png', // Reusing placeholder, user can swap later
    description: 'Vou fazer uma call de acompanhamento individual com você para te ensinar a subir o seu primeiro anúncio no Instagram e Facebook, atraindo clientes interessados todos os dias.',
  }
];

const BASE_PRICE = 89.90;
const COMBO_PRICE = 99.00; // Value of the single bump

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

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function trackFBEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  }
}

export default function CheckoutPageBones() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    cpf: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [selectedBumps, setSelectedBumps] = useState<boolean[]>([false]);
  const [showUpsellPopup, setShowUpsellPopup] = useState(false);
  const [showPixDisplay, setShowPixDisplay] = useState(false);
  const [pixData, setPixData] = useState<PixData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [totalAmount, setTotalAmount] = useState(BASE_PRICE);

  useEffect(() => {
    trackFBEvent('InitiateCheckout', {
      content_name: 'Fabrica de Bones',
      content_category: 'Checkout',
      value: BASE_PRICE,
      currency: 'BRL',
    });
  }, []);

  useEffect(() => {
    const bumpsTotal = selectedBumps[0] ? ORDER_BUMPS[0].salePrice : 0;
    setTotalAmount(parseFloat((BASE_PRICE + bumpsTotal).toFixed(2)));
  }, [selectedBumps]);

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

  const toggleBump = useCallback((index: number) => {
    setSelectedBumps((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
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

  const generatePix = useCallback(async (finalTotal: number, products: string[]) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone,
          email: formData.email.trim(),
          cpf: formData.cpf,
          products: products,
          totalAmount: finalTotal,
          course_id: 'bones' // Important for webhook routing!
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
        productsBought: products,
      });

      setTotalAmount(finalTotal);
      setShowPixDisplay(true);
    } catch (error) {
      console.error('Checkout error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Erro ao gerar pagamento. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  function getSelectedProducts(): string[] {
    const products: string[] = ['fabrica-de-bones'];
    if (selectedBumps[0]) {
      products.push(ORDER_BUMPS[0].id);
    }
    return products;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    if (!selectedBumps[0]) {
      setShowUpsellPopup(true);
      return;
    }

    const products = getSelectedProducts();
    generatePix(totalAmount, products);
  }

  function handleUpsellAccept() {
    setShowUpsellPopup(false);
    setSelectedBumps([true]);
    const comboTotal = BASE_PRICE + COMBO_PRICE;
    const allProducts = ['fabrica-de-bones', 'mentoria-ads'];
    generatePix(comboTotal, allProducts);
  }

  function handleUpsellDecline() {
    setShowUpsellPopup(false);
    const products = getSelectedProducts(); // Only base product since it was false
    generatePix(BASE_PRICE, products);
  }

  return (
    <div className={styles.checkoutPage}>
      <div className={styles.container}>
        {/* ============ ORDER SUMMARY ============ */}
        <div className={styles.orderSummary}>
          <h1 className={styles.productTitle}>Mini-curso Fábrica de Bonés</h1>
          <p className={styles.productSubtitle}>por Ricardo Castro</p>

          <hr className={styles.divider} />

          <p className={styles.originalPrice}>
            Valor normal: <span className={styles.originalPriceStrike}>R$ 297,00</span>
          </p>

          <p className={styles.finalPriceRow}>
            <span className={styles.finalPriceLabel}>Você paga:</span>
            <span className={styles.finalPrice}>R$ 89,90</span>
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

          <button 
            type="button" 
            onClick={async () => {
              if (!formData.phone) return alert('Preencha o telefone para testar!');
              await fetch('/api/webhook', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  event: 'billing.paid',
                  data: {
                    pixQrCode: {
                      amount: totalAmount * 100,
                      status: 'PAID',
                      customer: {
                        metadata: {
                          name: formData.name || 'Teste Dev',
                          cellphone: formData.phone,
                          email: formData.email || 'teste@teste.com'
                        }
                      },
                      metadata: {
                        produtos: JSON.stringify(getSelectedProducts()),
                        curso: 'bones'
                      }
                    }
                  }
                })
              });
              alert('Simulação de compra enviada! Verifique seu WhatsApp.');
            }}
            style={{ marginTop: 10, background: '#333', color: 'white', padding: '10px', borderRadius: '5px', width: '100%', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
          >
            🧪 SIMULAR VENDA (TESTE WHATSAPP)
          </button>

          {totalAmount > 0 && (
            <div className={styles.totalDisplay}>
              <p className={styles.totalLabel}>Total do seu pedido:</p>
              <p className={styles.totalAmount}>R$ {totalAmount.toFixed(2).replace('.', ',')}</p>
            </div>
          )}
        </form>

        {/* ============ ORDER BUMPS ============ */}
        <div className={styles.orderBumpsSection}>
          <h2 className={styles.orderBumpsTitle}>Aproveite e adicione:</h2>
          {ORDER_BUMPS.map((bump, index) => {
            const isSelected = selectedBumps[index];
            return (
              <div
                key={bump.id}
                className={`${styles.bumpCard} ${isSelected ? styles.bumpCardSelected : ''}`}
                onClick={() => toggleBump(index)}
                role="checkbox"
                aria-checked={isSelected}
              >
                <div className={`${styles.bumpCheckbox} ${isSelected ? styles.bumpCheckboxChecked : ''}`}>
                  {isSelected && <span className={styles.bumpCheckmark}>✓</span>}
                </div>
                <div className={styles.bumpImageWrapper}>
                  <Image src={bump.image} alt={bump.name} width={70} height={70} className={styles.bumpImage} />
                </div>
                <div className={styles.bumpContent}>
                  <span className={styles.bumpBadge} style={{ backgroundColor: bump.color }}>{bump.discount}</span>
                  <p className={styles.bumpName}>{bump.name}</p>
                  {bump.description && <p className={styles.bumpDescription}>{bump.description}</p>}
                  <p className={styles.bumpSavings}>Economize R$ {bump.savings.toFixed(2).replace('.', ',')}</p>
                  <div className={styles.bumpPricing}>
                    <span className={styles.bumpOriginalPrice}>R$ {bump.originalPrice.toFixed(2).replace('.', ',')}</span>
                    <span className={styles.bumpSalePrice}>R$ {bump.salePrice.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ============ TRUST FOOTER ============ */}
        <div className={styles.trustFooter}>
          <div className={styles.trustBadges}>
            <span className={styles.trustBadge}><span className={styles.trustBadgeIcon}>🔒</span> Pagamento Seguro</span>
            <span className={styles.trustBadge}><span className={styles.trustBadgeIcon}>⚡</span> Entrega Imediata</span>
          </div>
        </div>
      </div>

      {/* ============ MODALS ============ */}
      <UpsellPopupBones
        isOpen={showUpsellPopup}
        onAccept={handleUpsellAccept}
        onDecline={handleUpsellDecline}
      />

      {showPixDisplay && pixData && (
        <PixDisplay
          billingId={pixData.billingId}
          brCode={pixData.brCode}
          qrCodeBase64={pixData.qrCodeBase64}
          amount={totalAmount}
          customerName={pixData.customerName}
          customerPhone={pixData.customerPhone}
          productsBought={pixData.productsBought}
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
