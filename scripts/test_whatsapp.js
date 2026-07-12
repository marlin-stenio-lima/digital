const cleanPhone = '5586995485600';
const customerName = 'Marlin Estênio';

const link75Projetos = 'https://digital-beryl-five.vercel.app/Entregavel%2075%20projetos%20de%20currais_compressed%202.pdf';
const link150Projetos = 'https://drive.google.com/drive/folders/1etvQfBKgRxYHehlXXEXIUom7HHfTkKrC?usp=sharing';
const linkContrato = 'https://digital-beryl-five.vercel.app/CONTRATO%20DE%20ARRENDAMENTO%20RURAL.pdf';
const linkPlanilha = 'https://docs.google.com/spreadsheets/d/1D7rM7g2iAuL9GegEGRNYubQeruFreEwU/edit?usp=sharing';

// Testando cenário COM TODOS OS EXTRAS/UPSELLS
const comprouArrendamento = true;
const comprouPlanilha = true;

let message = `🎉 *Pagamento confirmado!* 🎉\n\n` +
  `Olá, ${customerName.split(' ')[0]}! Seu acesso ao pacote de *Projetos de Currais & Manejo Inteligente* foi liberado com sucesso.\n\n` +
  `📥 *Aqui estão os seus links de acesso:*\n\n` +
  `🐂 *75 Projetos de Currais (PDF Principal):*\n` +
  `${link75Projetos}\n\n` +
  `📈 *150 Projetos Adicionais de Currais (Drive):*\n` +
  `${link150Projetos}\n\n`;

if (comprouArrendamento) {
  message += `📜 *Contrato de Arrendamento Rural (Modelo de Contrato):*\n` +
    `${linkContrato}\n\n`;
}

if (comprouPlanilha) {
  message += `📊 *Planilha de Orçamento Agro (Excel/Sheets):*\n` +
    `${linkPlanilha}\n\n`;
}

if (!comprouArrendamento || !comprouPlanilha) {
  message += `💡 *Oportunidade:* `;
  const itensFaltantes = [];
  if (!comprouArrendamento) itensFaltantes.push('Contrato de Arrendamento');
  if (!comprouPlanilha) itensFaltantes.push('Planilha de Orçamento Agro');
  
  message += `Caso queira adquirir o ${itensFaltantes.join(' e o ')} posteriormente por apenas R$ 9,90 cada, basta nos responder aqui no WhatsApp.\n\n`;
}

message += `📌 Salve esta mensagem para não perder os seus links de estudo e trabalho!`;

console.log('Enviando notificação de teste de Currais com Upsells para:', cleanPhone);

const evolutionApiUrl = 'https://evo-evolution-api.ouiyj2.easypanel.host';
const evolutionInstance = 'STENIO 1';
const evolutionApiKey = '429683C4C977415CAAFCCE10F7D57E11';

const url = `${evolutionApiUrl}/message/sendText/${evolutionInstance}`;

fetch(url, {
  method: 'POST',
  headers: { 
    'apikey': evolutionApiKey, 
    'Content-Type': 'application/json' 
  },
  body: JSON.stringify({
    number: cleanPhone,
    text: message
  })
})
.then(res => res.json())
.then(data => console.log('Evolution API Response:', JSON.stringify(data, null, 2)))
.catch(err => console.error('Error:', err));
