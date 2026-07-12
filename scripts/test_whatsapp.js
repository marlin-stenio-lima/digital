const cleanPhone = '5586995485600';
const customerName = 'Marlin Estênio';
const downloadLink = 'https://drive.google.com/file/d/1-pedreiro-mock-download-link';
const plataformaLink = 'https://digital-beryl-five.vercel.app/plataforma/login?course=pedreiro';

const message = '🎉 *Pagamento confirmado!* 🎉\n\n' +
  'Olá, ' + customerName.split(' ')[0] + '! Seu pagamento dos *Projetos Estruturais de Pedreiro* foi aprovado com sucesso.\n\n' +
  '📥 *Baixe seu material com guias de ferragens e concreto no link abaixo:*\n' +
  downloadLink + '\n\n' +
  '🖥️ *Acesso Liberado para os Cursos Bônus (Elétrica & Hidráulica):*\n' +
  'Como você garantiu nossos guias práticos em vídeo de Instalações, liberamos sua área de membros premium!\n\n' +
  '👉 *Acesse agora:* ' + plataformaLink + '\n' +
  '🔑 *Seu Login e Senha:* É o seu próprio WhatsApp: ' + cleanPhone + '\n\n' +
  '📌 Lembre-se de salvar esta mensagem para olhar as informações e projetos sempre que precisar!\n\n' +
  'Bons projetos! 🏗️🧱';

console.log('Enviando notificação de teste para:', cleanPhone);

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
