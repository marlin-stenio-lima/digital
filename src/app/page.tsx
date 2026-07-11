import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from './fabrica-de-bones/page.module.css';
import FacebookPixel from '@/components/FacebookPixel';

export default function FabricaDeBonesLP() {
  return (
    <>
      <Head>
        <title>Marca de Bonés | Ricardo Castro</title>
        <meta name="description" content="Aprenda a montar sua primeira empresa no ramo de bonés e gere uma renda de mais de 15 mil mensais." />
      </Head>
      <FacebookPixel />
      
      <main className={styles.container}>
        {/* HERO SECTION - PROMESSA FORTE */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>O SEGREDO REVELADO</div>
            <h1 className={styles.headline}>
              Como um simples "pedaço de tecido" me fez sair do zero e construir um negócio de <span className={styles.highlight}>R$ 15.000 mensais</span> (Trabalhando no meu próprio quarto).
            </h1>
            <p className={styles.subheadline}>
              Você não precisa de máquinas caras, não precisa de galpão e nem de experiência. Se você me der 2 minutos, vou te mostrar como eu "hackeei" o mercado de Marcas de Bonés Premium.
            </p>

            <Link href="/fabrica-de-bones/checkout" className={styles.ctaButtonPulse}>
              QUERO CRIAR MINHA MARCA AGORA
              <span className={styles.ctaSub}>Por apenas R$ 13,90</span>
            </Link>
            
            <div className={styles.trustIndicators}>
              <span>🔒 Compra 100% Segura</span>
              <span>⚡ Acesso Imediato</span>
            </div>
          </div>
        </section>

        {/* THE REVELATION & PAIN */}
        <section className={styles.storySection}>
          <div className={styles.storyContainer}>
            <h2 className={styles.sectionTitle}>A Realidade que Ninguém te Conta</h2>
            <div className={styles.storyText}>
              <p>Talvez você trabalhe o mês inteiro, bata ponto, pegue trânsito e quando chega o dia 5, o seu salário já acabou. Você sabe que precisa empreender, mas morre de medo de perder o pouco dinheiro que juntou.</p>
              <p>Você pensa: <em>"Como vou abrir um negócio se não tenho R$ 50 mil para investir em maquinário?"</em></p>
              <p>Foi exatamente o que eu pensei. E foi aí que eu descobri o <strong>Método da Terceirização Inteligente</strong>.</p>
              
              <div className={styles.highlightBox}>
                <h3>A Grande Sacada 💡</h3>
                <p>Eu descobri que as maiores marcas do Brasil <strong>NÃO</strong> fabricam os próprios bonés. Elas usam fábricas secretas. Eu encontrei essas fábricas. Elas pegam a sua logo, colocam no boné mais premium do mercado, embalam e entregam pronto.</p>
                <p>O custo? Quase nada. O valor de venda? O quão forte for a sua marca. Eu transformei R$ 30 de custo em R$ 120, R$ 150 de faturamento por peça. Todos os dias.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF SECTION */}
        <section className={styles.socialProof}>
          <h2 className={styles.sectionTitle}>Quem aplica o método, tem resultados:</h2>
          <div className={styles.testimonialsGrid}>
            
            <div className={styles.testimonialCard}>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.testimonialText}>
                "Eu nunca tinha empreendido na vida. Segui o passo a passo dos fornecedores e a forma de vender. Em 15 dias fiz meus primeiros R$ 3.500 de lucro limpo no bolso."
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>M</div>
                <div className={styles.authorInfo}>
                  <h4>Marcos Paulo</h4>
                  <p>Lucrou R$ 3.500 no 1º mês</p>
                </div>
              </div>
            </div>

            <div className={styles.testimonialCard}>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.testimonialText}>
                "O que o Ricardo ensina sobre posicionamento de marca é surreal. Meus bonés parecem de marca gringa e eu consigo cobrar muito mais caro por eles. Vale cada centavo!"
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>T</div>
                <div className={styles.authorInfo}>
                  <h4>Thiago Silva</h4>
                  <p>Lucra +R$ 10.000/mês</p>
                </div>
              </div>
            </div>

            <div className={styles.testimonialCard}>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.testimonialText}>
                "Eu trabalhava de CLT ganhando 2 mil reais e sem tempo pra nada. Comecei a marca no quarto de casa e hoje minha renda extra já virou minha fonte de renda principal."
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>J</div>
                <div className={styles.authorInfo}>
                  <h4>João Victor</h4>
                  <p>Largou o CLT</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* THE OFFER */}
        <section className={styles.offerSection}>
          <div className={styles.offerContainer}>
            <h2 className={styles.sectionTitle}>Eu decidi abrir a "caixa preta"</h2>
            <p className={styles.paragraphCenter}>
              Peguei minha lista de fornecedores secretos (aquela que as marcas grandes rezam para você nunca descobrir), o meu método de criação de marca, e o meu script exato de vendas no Instagram.
            </p>
            <div className={styles.valueComparison}>
              <p>Tudo isso poderia facilmente ser vendido por <strong>R$ 997</strong>.</p>
              <p>Mas hoje, você não vai pagar R$ 997, nem R$ 497, e nem mesmo R$ 97.</p>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className={styles.finalCta}>
          <div className={styles.finalBox}>
            <div className={styles.urgentBadge}>⏳ APENAS 50 VAGAS DISPONÍVEIS</div>
            <h2>Leve o Método + Lista de Fornecedores</h2>
            
            <div className={styles.scarcityText}>
              <p>🚨 <strong>Atenção:</strong> Por motivos óbvios, as fábricas parceiras não dão conta de milhares de pessoas fazendo pedidos. Para manter a qualidade, limitei o acesso a essa turma. Assim que as vagas baterem, o preço volta para R$ 297.</p>
            </div>

            <div className={styles.priceAnchoring}>
              <ul className={styles.anchorList}>
                <li><span>Curso Marca de Bonés:</span> <del>R$ 497,00</del></li>
                <li><span>Bônus Planilha:</span> <del>R$ 97,00</del></li>
                <li><span>Bônus Lista Fornecedores:</span> <del>R$ 197,00</del></li>
              </ul>
              <div className={styles.totalAnchor}>
                Valor Total: <del>R$ 791,00</del>
              </div>
            </div>

            <div className={styles.priceTag}>
              Hoje para você: Apenas<br/>
              <span className={styles.priceHighlight}>R$ 13,90</span>
              <span className={styles.installments}>(ou 12x de R$ 1,52)</span>
            </div>
            
            <Link href="/fabrica-de-bones/checkout" className={styles.ctaButtonPulse}>
              QUERO CRIAR MINHA MARCA AGORA
            </Link>
          </div>
        </section>

        {/* STICKY MOBILE CTA */}
        <div className={styles.stickyMobileCta}>
          <Link href="/fabrica-de-bones/checkout" className={styles.stickyButton}>
            COMEÇAR POR R$ 13,90
          </Link>
        </div>
      </main>
    </>
  );
}
