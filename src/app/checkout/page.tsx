'use client';

import { useState, useEffect, useCallback, FormEvent, ChangeEvent } from 'react';
import Image from 'next/image';
import styles from './checkout.module.css';
import UpsellPopup from '@/components/UpsellPopup';
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
}

const ORDER_BUMPS: OrderBumpProduct[] = [
  {
    id: 'carretinha',
    name: 'Projeto Carretinha de Carga',
    initials: 'CC',
    color: '#3498db',
    originalPrice: 29.70,
    salePrice: 9.90,
    savings: 19.80,
    discount: '67% OFF',
    image: '/images/upsell_carretinha.png',
  },
  {
    id: 'academia',
    name: 'Máquinas de Academia Profissional',
    initials: 'MA',
    color: '#e74c3c',
    originalPrice: 29.70,
    salePrice: 9.90,
    savings: 19.80,
    discount: '67% OFF',
    image: '/images/upsell_academia.png',
  },
  {
    id: 'perfuratriz',
    name: 'Perfuratriz de Poços Artesianos',
    initials: 'PA',
    color: '#9b59b6',
    originalPrice: 29.70,
    salePrice: 9.90,
    savings: 19.80,
    discount: '67% OFF',
    image: '/images/upsell_perfuratriz.png',
  },
];

const BASE_PRICE = 15.90;
const COMBO_PRICE = 19.90;

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '');
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

  if (limited.length <= 3) {
    return limited;
  }
  if (limited.length <= 6) {
    return `${limited.slice(0, 3)}.${limited.slice(3)}`;
  }
  if (limited.length <= 9) {
    return `${limited.slice(0, 3)}.${limited.slice(3, 6)}.${limited.slice(6)}`;
  }
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

export default function CheckoutPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    cpf: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [selectedBumps, setSelectedBumps] = useState<boolean[]>([false, false, false]);
  const [showUpsellPopup, setShowUpsellPopup] = useState(false);
  const [showPixDisplay, setShowPixDisplay] = useState(false);
  const [pixData, setPixData] = useState<PixData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedCombo, setAcceptedCombo] = useState(false);
  const [totalAmount, setTotalAmount] = useState(BASE_PRICE);

  useEffect(() => {
    trackFBEvent('InitiateCheckout', {
      content_name: '600 Projetos Móveis Industriais',
      content_category: 'Checkout',
      value: BASE_PRICE,
      currency: 'BRL',
    });
  }, []);

  useEffect(() => {
    if (acceptedCombo) {
      setTotalAmount(BASE_PRICE + COMBO_PRICE);
    } else {
      const bumpsTotal = selectedBumps.reduce((sum, selected, index) => {
        return selected ? sum + ORDER_BUMPS[index].salePrice : sum;
      }, 0);
      setTotalAmount(parseFloat((BASE_PRICE + bumpsTotal).toFixed(2)));
    }
  }, [selectedBumps, acceptedCombo]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (name === 'phone') {
      formattedValue = formatPhone(value);
    } else if (name === 'cpf') {
      formattedValue = formatCpf(value);
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));

    setFormErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name as keyof FormErrors];
      return newErrors;
    });
  }, []);

  const toggleBump = useCallback((index: number) => {
    if (acceptedCombo) return;

    setSelectedBumps((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  }, [acceptedCombo]);

  function validateForm(): FormErrors {
    const errors: FormErrors = {};

    if (!formData.name.trim()) {
      errors.name = 'Nome completo é obrigatório';
    } else if (formData.name.trim().length < 3) {
      errors.name = 'Nome deve ter pelo menos 3 caracteres';
    }

    const phoneDigits = getPhoneDigits(formData.phone);
    if (!phoneDigits) {
      errors.phone = 'Telefone é obrigatório';
    } else if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      errors.phone = 'Telefone inválido';
    }

    if (!formData.email.trim()) {
      errors.email = 'E-mail é obrigatório';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'E-mail inválido';
    }

    const cpfDigits = getCpfDigits(formData.cpf);
    if (!cpfDigits) {
      errors.cpf = 'CPF é obrigatório';
    } else if (cpfDigits.length !== 11) {
      errors.cpf = 'CPF deve conter 11 dígitos';
    }

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
      alert(error instanceof Error ? error.message : 'Erro ao gerar pagamento. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  function getSelectedProducts(): string[] {
    const products: string[] = ['serralheiro-pack'];
    selectedBumps.forEach((selected, index) => {
      if (selected) {
        products.push(ORDER_BUMPS[index].id);
      }
    });
    return products;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const anyBumpSelected = selectedBumps.some((s) => s);

    if (!anyBumpSelected && !acceptedCombo) {
      setShowUpsellPopup(true);
      return;
    }

    const products = getSelectedProducts();
    generatePix(totalAmount, products);
  }

  function handleUpsellAccept() {
    setShowUpsellPopup(false);
    setAcceptedCombo(true);
    setSelectedBumps([true, true, true]);

    const comboTotal = BASE_PRICE + COMBO_PRICE;
    const allProducts = ['serralheiro-pack', ...ORDER_BUMPS.map((b) => b.id)];

    generatePix(comboTotal, allProducts);
  }

  function handleUpsellDecline() {
    setShowUpsellPopup(false);

    const products = getSelectedProducts();
    generatePix(totalAmount, products);
  }

  const hasSelectedBumps = selectedBumps.some((s) => s);

  return (
    <div className={styles.checkoutPage}>
      <div className={styles.container}>
        {/* ============ ORDER SUMMARY ============ */}
        <div className={styles.orderSummary}>
          <h1 className={styles.productTitle}>600 Projetos Móveis Industriais</h1>
          <p className={styles.productSubtitle}>Projetos prontos para construir</p>

          <hr className={styles.divider} />

          <p className={styles.originalPrice}>
            Valor normal: <span className={styles.originalPriceStrike}>R$ 89,90</span>
          </p>

          <p className={styles.finalPriceRow}>
            <span className={styles.finalPriceLabel}>Você paga:</span>
            <span className={styles.finalPrice}>R$ 15,90</span>
          </p>
        </div>

        {/* ============ CHECKOUT FORM ============ */}
        <form className={styles.formSection} onSubmit={handleSubmit} noValidate>
          <h2 className={styles.formTitle}>Finalizar Pedido</h2>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="name">
              Nome Completo <span className={styles.required}>*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className={`${styles.formInput} ${formErrors.name ? styles.inputError : ''}`}
              placeholder="Seu nome completo"
              value={formData.name}
              onChange={handleInputChange}
              autoComplete="name"
            />
            {formErrors.name && <span className={styles.errorText}>{formErrors.name}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="phone">
              Telefone <span className={styles.required}>*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className={`${styles.formInput} ${formErrors.phone ? styles.inputError : ''}`}
              placeholder="(11) 99999-9999"
              value={formData.phone}
              onChange={handleInputChange}
              autoComplete="tel"
            />
            {formErrors.phone && <span className={styles.errorText}>{formErrors.phone}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="email">
              E-mail <span className={styles.required}>*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={`${styles.formInput} ${formErrors.email ? styles.inputError : ''}`}
              placeholder="seuemail@exemplo.com"
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="email"
            />
            {formErrors.email && <span className={styles.errorText}>{formErrors.email}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="cpf">
              CPF <span className={styles.required}>*</span>
            </label>
            <input
              id="cpf"
              name="cpf"
              type="text"
              inputMode="numeric"
              className={`${styles.formInput} ${formErrors.cpf ? styles.inputError : ''}`}
              placeholder="000.000.000-00"
              value={formData.cpf}
              onChange={handleInputChange}
            />
            {formErrors.cpf && <span className={styles.errorText}>{formErrors.cpf}</span>}
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className={styles.spinner}></span>
                Gerando PIX...
              </>
            ) : (
              '🔒 Gerar QR Code PIX'
            )}
          </button>

          {(hasSelectedBumps || acceptedCombo) && (
            <div className={styles.totalDisplay}>
              <p className={styles.totalLabel}>Total do seu pedido:</p>
              <p className={styles.totalAmount}>
                R$ {totalAmount.toFixed(2).replace('.', ',')}
              </p>
            </div>
          )}
        </form>

        {/* ============ ORDER BUMPS ============ */}
        <div className={styles.orderBumpsSection}>
          <h2 className={styles.orderBumpsTitle}>Aproveite e adicione:</h2>

          {ORDER_BUMPS.map((bump, index) => {
            const isSelected = selectedBumps[index] || acceptedCombo;

            return (
              <div
                key={bump.id}
                className={`${styles.bumpCard} ${isSelected ? styles.bumpCardSelected : ''}`}
                onClick={() => toggleBump(index)}
                role="checkbox"
                aria-checked={isSelected}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleBump(index);
                  }
                }}
              >
                <div className={`${styles.bumpCheckbox} ${isSelected ? styles.bumpCheckboxChecked : ''}`}>
                  {isSelected && <span className={styles.bumpCheckmark}>✓</span>}
                </div>

                <div className={styles.bumpImageWrapper}>
                  <Image src={bump.image} alt={bump.name} width={70} height={70} className={styles.bumpImage} />
                </div>

                <div className={styles.bumpContent}>
                  <span className={styles.bumpBadge}>{bump.discount}</span>
                  <p className={styles.bumpName}>{bump.name}</p>
                  <p className={styles.bumpSavings}>Economize R$ {bump.savings.toFixed(2).replace('.', ',')}</p>
                  <p className={styles.bumpUrgency}>🔥 Apenas nesta compra</p>
                  <div className={styles.bumpPricing}>
                    <span className={styles.bumpOriginalPrice}>
                      R$ {bump.originalPrice.toFixed(2).replace('.', ',')}
                    </span>
                    <span className={styles.bumpSalePrice}>
                      R$ {bump.salePrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ============ TRUST FOOTER ============ */}
        <div className={styles.trustFooter}>
          <div className={styles.trustBadges}>
            <span className={styles.trustBadge}>
              <span className={styles.trustBadgeIcon}>🔒</span> Pagamento Seguro
            </span>
            <span className={styles.trustBadge}>
              <span className={styles.trustBadgeIcon}>⚡</span> Entrega Imediata
            </span>
          </div>
        </div>
      </div>

      {/* ============ MODALS ============ */}
      <UpsellPopup
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
    </div>
  );
}
