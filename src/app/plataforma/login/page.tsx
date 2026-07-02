'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './page.module.css';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checkingToken, setCheckingToken] = useState(true);

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      // Automatic login via magic link
      handleLogin(null, token);
    } else {
      setCheckingToken(false);
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent | null, token: string | null = null) => {
    if (e) e.preventDefault();
    
    setLoading(true);
    setError('');

    try {
      const payload = token ? { token } : { phone };
      
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.success) {
        router.push('/plataforma/fabrica-de-bones');
      } else {
        setError(data.error || 'Erro ao fazer login.');
        setCheckingToken(false);
      }
    } catch (err) {
      setError('Erro de conexão. Tente novamente.');
      setCheckingToken(false);
    } finally {
      setLoading(false);
    }
  };

  if (checkingToken) {
    return (
      <div className={styles.container}>
        <div className={styles.loginBox}>
          <div className={styles.logo}>FÁBRICA DE BONÉS</div>
          <p className={styles.loading}>Validando acesso seguro...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.logo}>FÁBRICA DE BONÉS</div>
        <h1 className={styles.title}>Área de Membros</h1>
        <p className={styles.subtitle}>Digite o número de WhatsApp usado na compra para acessar.</p>
        
        <form onSubmit={handleLogin} className={styles.form}>
          <input 
            type="tel" 
            placeholder="Ex: 11999999999" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={styles.input}
            required
            disabled={loading}
          />
          <button type="submit" className={styles.button} disabled={loading || !phone}>
            {loading ? 'Acessando...' : 'ENTRAR'}
          </button>
        </form>
        
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
}
