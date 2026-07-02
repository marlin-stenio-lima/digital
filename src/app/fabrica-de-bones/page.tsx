import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from './page.module.css';
import FacebookPixel from '@/components/FacebookPixel';

export default function FabricaDeBonesLP() {
  return (
    <>
      <Head>
        <title>Fábrica de Bonés | Ricardo Castro</title>
        <meta name="description" content="Aprenda a montar sua primeira empresa no ramo de bonés e gere uma renda de mais de 15 mil mensais." />
      </Head>
      <FacebookPixel />
      
      <main className={styles.container}>
        {/* HERO SECTION */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>MÉTODO COMPROVADO</div>
            <h1 className={styles.headline}>
              Crie Sua Própria Fábrica de Bonés e Fature <span className={styles.highlight}>R$ 15.000+ Por Mês</span> Começando do Zero
            </h1>
            <p className={styles.subheadline}>
              O mapa definitivo para quem quer criar a sua primeira empresa lucrativa no mercado de bonés. Descubra o método exato que o Ricardo Castro usa para lucrar todos os meses.
            </p>
            
            <Link href="/fabrica-de-bones/checkout" className={styles.ctaButton}>
              QUERO CRIAR MINHA FÁBRICA AGORA
              <span className={styles.ctaSub}>Por apenas R$ 89,90</span>
            </Link>
            
            <div className={styles.trustIndicators}>
              <span>🔒 Compra 100% Segura</span>
              <span>⚡ Acesso Imediato</span>
              <span>⭐ Satisfação Garantida</span>
            </div>
          </div>
        </section>

        {/* PAIN SECTION */}
        <section className={styles.painSection}>
          <h2 className={styles.sectionTitle}>Você está cansado de...</h2>
          <div className={styles.painCards}>
            <div className={styles.painCard}>
              <div className={styles.painIcon}>💸</div>
              <h3>Falta de Dinheiro</h3>
              <p>Trabalhar o mês inteiro e ver o salário acabar na primeira semana, sem conseguir guardar nada ou fazer uma renda extra.</p>
            </div>
            <div className={styles.painCard}>
              <div className={styles.painIcon}>⏰</div>
              <h3>Falta de Tempo</h3>
              <p>Ser refém de um emprego que suga suas energias e não te dá liberdade para aproveitar a vida e a família.</p>
            </div>
            <div className={styles.painCard}>
              <div className={styles.painIcon}>📉</div>
              <h3>Medo de Empreender</h3>
              <p>Querer montar um negócio, mas não saber por onde começar, com medo de falhar e perder suas economias.</p>
            </div>
          </div>
        </section>

        {/* SOLUTION & AUTHORITY SECTION */}
        <section className={styles.solutionSection}>
          <div className={styles.solutionContent}>
            <h2 className={styles.sectionTitle}>A Solução: O Mercado de Bonés</h2>
            <p className={styles.paragraph}>
              O mercado de bonés é um dos mais lucrativos e menos explorados de forma profissional no Brasil. A margem de lucro é gigantesca e a demanda é constante.
            </p>
            <p className={styles.paragraph}>
              <strong>Ricardo Castro</strong> já bateu cabeça, cometeu erros e perdeu dinheiro. Mas após anos de validação, ele desenvolveu um modelo de negócios enxuto e escalável que hoje gera mais de <strong>R$ 15.000 mensais de lucro líquido</strong>.
            </p>
            <p className={styles.paragraph}>
              E agora, ele decidiu abrir a "caixa preta" da operação e te entregar o caminho das pedras para você replicar esse sucesso e construir a sua primeira empresa sólida e rentável.
            </p>
            
            <Link href="/fabrica-de-bones/checkout" className={styles.ctaButtonSec}>
              SIM, EU QUERO APRENDER O MÉTODO
            </Link>
          </div>
        </section>

        {/* WHAT YOU GET SECTION */}
        <section className={styles.whatYouGet}>
          <h2 className={styles.sectionTitle}>O que você vai descobrir:</h2>
          <ul className={styles.benefitsList}>
            <li>✅ <strong>Fornecedores Secretos:</strong> Onde comprar matéria-prima com qualidade premium e preço de atacado.</li>
            <li>✅ <strong>Modelagem de Negócio:</strong> Como estruturar sua marca para parecer gigante desde o dia 1.</li>
            <li>✅ <strong>Estratégia de Vendas:</strong> Como atrair clientes todos os dias e vender sem precisar implorar.</li>
            <li>✅ <strong>Gestão Simplificada:</strong> Como administrar a produção e o caixa para garantir lucros de R$ 15.000+.</li>
          </ul>
        </section>

        {/* FINAL CTA */}
        <section className={styles.finalCta}>
          <div className={styles.finalBox}>
            <h2>Não perca mais tempo!</h2>
            <p>Oportunidades como essa não duram para sempre. Dê o primeiro passo para a sua independência financeira hoje mesmo.</p>
            <div className={styles.priceTag}>
              De <del>R$ 297,00</del> por apenas<br/>
              <span className={styles.priceHighlight}>R$ 89,90</span>
            </div>
            <Link href="/fabrica-de-bones/checkout" className={styles.ctaButtonPulse}>
              GARANTIR MEU ACESSO AGORA
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
