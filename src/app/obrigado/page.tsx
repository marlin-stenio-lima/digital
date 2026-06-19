import styles from './obrigado.module.css';

export default function ObrigadoPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <span className={styles.icon}>✅</span>
        </div>
        <h1 className={styles.title}>Pagamento Aprovado!</h1>
        <p className={styles.subtitle}>
          Tudo certo com o seu pedido. O seu material completo já foi enviado automaticamente para o seu WhatsApp!
        </p>
        
        <div className={styles.instructions}>
          <h2 className={styles.instructionsTitle}>Próximos passos:</h2>
          <ul className={styles.list}>
            <li>Abra o seu WhatsApp.</li>
            <li>Procure pela mensagem do nosso robô.</li>
            <li>Acesse os links e baixe os PDFs no seu computador.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
