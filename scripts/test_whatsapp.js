const cleanPhone = '5586995485600';
const customerName = 'Marlin Estênio';
const plataformaLink = 'https://digital-beryl-five.vercel.app/plataforma/login?course=pedreiro';

// Testando cenário SEM UPSELL
const testComUpsell = false;

let message = `🎉 *Pagamento confirmado!* 🎉\n\n` +
  `Olá, ${customerName.split(' ')[0]}! Seu acesso ao *Curso Mestre da Obra & Pedreiro Profissional* foi liberado com sucesso.\n\n` +
  `📺 *Seu curso é 100% em videoaulas completas!* Não precisa baixar nada, assista direto pela nossa plataforma exclusiva de membros.\n\n` +
  `👉 *Acesse a plataforma por aqui:* ${plataformaLink}\n` +
  `🔑 *Seu Login e Senha:* É o seu próprio WhatsApp: ${cleanPhone}\n\n`;

if (testComUpsell) {
  message += `⚡ *TREINAMENTOS INCLUSOS LIBERADOS:* Como você adicionou o Combo, as videoaulas práticas de *Elétrica & Hidráulica Residencial* também já estão 100% abertas dentro do seu painel!\n\n`;
} else {
  message += `💡 *Aviso sobre Elétrica & Hidráulica:* Notei que você não adicionou os treinamentos de Instalações Elétricas e Hidráulicas. Caso queira liberar essas aulas depois, poderá adquiri-las diretamente pelo painel da sua área de membros.\n\n`;
}

message += `📌 Salve esta mensagem para acessar a plataforma sempre que quiser assistir!`;

console.log('Enviando nova notificação de teste sem bônus e sem assinatura para:', cleanPhone);

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
