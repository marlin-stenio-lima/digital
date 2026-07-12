import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { Resend } from 'resend';
import { supabaseAdmin } from '@/lib/supabase';

// Keep track of recently processed Pix IDs to avoid duplicate handling
const recentPixIds = new Set<string>();

interface AbacatePayWebhookEvent {
  event?: string;
  data?: {
    pixQrCode?: {
      id?: string;
      amount?: number;
      status?: string;
      customer?: {
        metadata?: {
          name?: string;
          email?: string;
          cellphone?: string;
          taxId?: string;
        };
      };
      metadata?: {
        produtos?: string;
        telefone?: string;
        email?: string;
        nome?: string;
        curso?: string;
      };
    };
  };
}

function extractCustomerPhone(body: AbacatePayWebhookEvent): string | null {
  const pix = body.data?.pixQrCode;
  if (!pix) return null;
  const customerMeta = pix.customer?.metadata || {};
  const rootMeta = pix.metadata || {};
  return customerMeta.cellphone || rootMeta.telefone || null;
}

function extractCustomerName(body: AbacatePayWebhookEvent): string {
  const pix = body.data?.pixQrCode;
  if (!pix) return 'Cliente';
  const customerMeta = pix.customer?.metadata || {};
  const rootMeta = pix.metadata || {};
  return customerMeta.name || rootMeta.nome || 'Cliente';
}

function extractCustomerEmail(body: AbacatePayWebhookEvent): string {
  const pix = body.data?.pixQrCode;
  if (!pix) return '';
  const customerMeta = pix.customer?.metadata || {};
  const rootMeta = pix.metadata || {};
  return customerMeta.email || rootMeta.email || '';
}

function isPaymentConfirmed(body: AbacatePayWebhookEvent): boolean {
  return body.event === 'billing.paid' || body.data?.pixQrCode?.status === 'PAID';
}

async function sendWhatsAppMessage(toPhone: string, text: string, senderOverride?: string) {
  const evolutionUrl = process.env.EVOLUTION_API_URL || 'https://evolution.marlonstenio.online';
  const instance = process.env.EVOLUTION_INSTANCE || 'Marlon';
  const apikey = process.env.EVOLUTION_API_KEY || '55a5b5143a50ca7b4946399120ff9d0c';

  let cleanedPhone = toPhone.replace(/\D/g, '');
  if (!cleanedPhone.startsWith('55') && cleanedPhone.length >= 10) {
    cleanedPhone = '55' + cleanedPhone;
  }

  const endpoint = `${evolutionUrl}/message/sendText/${instance}`;
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': apikey
      },
      body: JSON.stringify({
        number: cleanedPhone,
        text: text,
        delay: 1200,
        linkPreview: true
      })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('[Evolution API Error] Payload:', data);
    }
  } catch (error) {
    console.error('[Evolution Exception] failed to send text message:', error);
  }
}

async function sendFacebookCapiPurchase(phone: string, email: string, amount: number) {
  const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '1493630651343714';
  const accessToken = process.env.FB_CAPI_TOKEN;

  if (!accessToken) {
    console.warn('[CAPI] Token not configured. Skipping CAPI purchase event.');
    return;
  }

  const hash = (val: string) => {
    if (!val) return '';
    return crypto.createHash('sha256').update(val.trim().toLowerCase()).digest('hex');
  };

  const cleanPhone = phone.replace(/\D/g, '');
  const hashedPhone = hash(cleanPhone.startsWith('55') ? cleanPhone : '55' + cleanPhone);
  const hashedEmail = hash(email);

  const eventData = {
    data: [
      {
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        user_data: {
          ph: [hashedPhone],
          em: hashedEmail ? [hashedEmail] : []
        },
        custom_data: {
          currency: 'BRL',
          value: amount
        }
      }
    ]
  };

  try {
    const response = await fetch(`https://graph.facebook.com/v17.0/${pixelId}/events?access_token=${accessToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData)
    });
    const resJson = await response.json();
    console.log('[CAPI] Purchase event sent successfully:', resJson);
  } catch (err) {
    console.error('[CAPI] Failed to dispatch purchase event:', err);
  }
}

function buildMessage(customerName: string, productsBought: string[]): string {
  const downloadLink = process.env.PDF_LINK || 'https://drive.google.com/file/d/1B7Bw2qA6N_U4cO23iB5tYh7ZzG5P6jX3/view?usp=sharing';
  const hasCarretinha = productsBought.includes('carretinha');
  const hasAcademia = productsBought.includes('academia');
  const hasPortao = productsBought.includes('portao');
  const hasPerfuratriz = productsBought.includes('perfuratriz');

  let text = `🎉 *Pagamento confirmado!* 🎉\n\n` +
    `Olá, ${customerName.split(' ')[0]}! Seu pagamento do *Arsenal do Serralheiro Mestre* foi aprovado com sucesso.\n\n` +
    `📥 *Baixe seu material principal no link abaixo:*\n` +
    `${downloadLink}\n\n`;

  if (hasCarretinha || hasAcademia || hasPortao || hasPerfuratriz) {
    text += `⚡ *BÔNUS INCLUSOS LIBERADOS:*\n`;
    if (hasCarretinha) {
      text += `🚗 *Carretinha de Carga:* ${process.env.PDF_LINK_CARRETINHA || 'https://drive.google.com/file/d/1-carretinha-mock'}\n`;
    }
    if (hasAcademia) {
      text += `💪 *Máquinas de Academia:* ${process.env.PDF_LINK_ACADEMIA || 'https://drive.google.com/file/d/1-academia-mock'}\n`;
    }
    if (hasPortao) {
      text += `🚪 *Projeto de Portões:* ${process.env.PDF_LINK_PORTAO || 'https://drive.google.com/file/d/1-portao-mock'}\n`;
    }
    if (hasPerfuratriz) {
      text += `🕳️ *Perfuratriz de Poços:* ${process.env.PDF_LINK_PERFURATRIZ || 'https://drive.google.com/file/d/1-perfuratriz-mock'}\n`;
    }
    text += `\n`;
  } else {
    text += `💡 *Oportunidade:* Vi que você não adicionou os projetos opcionais com desconto especial. Se quiser adquirir o projeto da *Carretinha*, *Academia*, *Portões* ou *Perfuratriz* depois por apenas R$ 9,90 cada, me responda aqui!\n\n`;
  }

  text += `📌 Salve esta mensagem para olhar as informações e projetos sempre que precisar!\n\n` +
    `Bons projetos! ⚙️🛠️`;

  return text;
}

async function sendDeliveryEmail(email: string, customerName: string, productsBought: string[]) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[Webhook] Resend API Key is missing. Email skipping.');
    return;
  }

  if (!email || !email.includes('@')) {
    console.warn('[Webhook] Invalid customer email. Skipping email sending.', email);
    return;
  }

  const resend = new Resend(apiKey);
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  const firstName = customerName.split(' ')[0];

  const linkPrincipal = process.env.PDF_LINK || 'https://link-pendente';
  const linkCarretinha = process.env.PDF_LINK_CARRETINHA || '';
  const linkAcademia = process.env.PDF_LINK_ACADEMIA || '';
  const linkPerfuratriz = process.env.PDF_LINK_PERFURATRIZ || '';

  let htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #ea580c;">🎉 Pagamento Confirmado!</h2>
      <p>Olá <strong>${firstName}</strong>, seu pagamento foi aprovado com sucesso!</p>
      <p>Aqui estão os links para baixar o seu material:</p>
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p>📥 <strong>600 Projetos de Móveis Industriais:</strong><br/>
        <a href="${linkPrincipal}" style="color: #32bcad;">Clique aqui para acessar</a></p>
  `;

  if (productsBought.includes('carretinha') && linkCarretinha) {
    htmlContent += `<p>📥 <strong>Projetos de Carretinha:</strong><br/><a href="${linkCarretinha}" style="color: #32bcad;">Clique aqui para acessar</a></p>`;
  }
  if (productsBought.includes('academia') && linkAcademia) {
    htmlContent += `<p>📥 <strong>Projetos de Academia:</strong><br/><a href="${linkAcademia}" style="color: #32bcad;">Clique aqui para acessar</a></p>`;
  }
  if (productsBought.includes('perfuratriz') && linkPerfuratriz) {
    htmlContent += `<p>📥 <strong>Projeto da Perfuratriz:</strong><br/><a href="${linkPerfuratriz}" style="color: #32bcad;">Clique aqui para acessar</a></p>`;
  }

  htmlContent += `
      </div>
      <p><strong>Dicas:</strong> Recomendamos baixar no computador para melhor visualização.</p>
      <p>Qualquer dúvida, responda este e-mail.</p>
      <p>Bons projetos! 🔧</p>
    </div>
  `;

  try {
    const data = await resend.emails.send({
      from: `Arsenal do Serralheiro <${fromEmail}>`,
      to: email,
      subject: '📦 Seu material chegou! (Projetos de Móveis Industriais)',
      html: htmlContent,
    });
    console.log('[Webhook] Resend email sent successfully:', data);
  } catch (error) {
    console.error('[Webhook] Failed to send email via Resend:', error);
  }
}

export async function POST(request: Request) {
  try {
    const body: AbacatePayWebhookEvent = await request.json();

    console.log('[Webhook] Received event:', JSON.stringify(body, null, 2));

    if (!isPaymentConfirmed(body)) {
      console.log('[Webhook] Event is not a payment confirmation. Ignoring.');
      return NextResponse.json(
        { received: true, action: 'ignored', reason: 'not a payment confirmation' },
        { status: 200 }
      );
    }

    // Identify the unique Pix ID for this webhook
    const pixId = body.data?.pixQrCode?.id;
    if (pixId) {
      if (recentPixIds.has(pixId)) {
        console.log('[Webhook] Duplicate webhook detected for Pix ID:', pixId);
        return NextResponse.json({ received: true, action: 'ignored', reason: 'duplicate pix' }, { status: 200 });
      }
      recentPixIds.add(pixId);
      setTimeout(() => recentPixIds.delete(pixId), 30000); // keep for 30 seconds
    }

    const customerPhone = extractCustomerPhone(body);
    const customerName = extractCustomerName(body);

    if (!customerPhone) {
      console.error('[Webhook] Payment confirmed but no customer phone found in webhook data.');
      return NextResponse.json(
        { received: true, action: 'error', reason: 'no customer phone' },
        { status: 200 }
      );
    }

    const rawProdutos = body.data?.pixQrCode?.metadata?.produtos || '["serralheiro-pack"]';
    let productsBought: string[] = ['serralheiro-pack'];
    try {
      productsBought = JSON.parse(rawProdutos);
    } catch (e) {
      console.error('[Webhook] Falha ao fazer parse dos produtos:', e);
    }

    let cursoId = body.data?.pixQrCode?.metadata?.curso || 'serralheiro';

    // 1. Envia para o cliente
    try {
      if (cursoId === 'bones') {
        
        let token = crypto.randomUUID();
        let linkAcesso = process.env.BONES_PLATAFORMA_LINK || `${new URL(request.url).origin}/plataforma/login`;
        
        try {
          const { error } = await supabaseAdmin
            .from('bones_alunos')
            .upsert({ 
              telefone: customerPhone, 
              token: token,
              comprou_ads: productsBought.includes('mentoria-ads'),
              data_acesso: new Date().toISOString()
            }, { onConflict: 'telefone' });
            
          if (error) {
            console.error('[Webhook] Erro ao salvar aluno no Supabase:', error);
          } else {
             linkAcesso = `${new URL(request.url).origin}/plataforma/login`;
          }
        } catch (dbErr) {
          console.error('[Webhook] Exception saving student:', dbErr);
        }

        const message = `🎉 *Pagamento confirmado!* 🎉\n\n` +
          `Olá, ${customerName.split(' ')[0]}! Seu pagamento do mini-curso Fábrica de Bonés foi aprovado com sucesso.\n\n` +
          `📦 *O seu acesso já está liberado! Basta clicar no link abaixo para entrar na plataforma:*\n` +
          `${linkAcesso}\n\n` +
          `Seu login e senha de acesso é o seu próprio número de WhatsApp: ${customerPhone}\n\n` +
          `Qualquer dúvida, me chame aqui! 🚀`;

        await sendWhatsAppMessage(customerPhone, message);
        console.log(`[Webhook] Successfully processed payment for ${customerName} (${customerPhone}) - Course: Bones. Sent to customerPhone.`);

        if (productsBought.includes('mentoria-ads')) {
          const mentoriaAdsMessage = `🤝 *Sobre o seu Acompanhamento de Meta Ads!*\n\n` +
            `Vi que você também garantiu o acompanhamento individual comigo para criação das suas campanhas no Instagram/Facebook.\n\n` +
            `Por favor, me responda esta mensagem para marcarmos o dia e horário da nossa call no Google Meet onde vou te ensinar a subir o seu primeiro anúncio!\n\n` +
            `Bora vender muito! 🧢🔥`;

          setTimeout(async () => {
            try {
              await sendWhatsAppMessage(customerPhone, mentoriaAdsMessage);
              console.log(`[Webhook] Mentorship Ads message sent to ${customerName} (${customerPhone}) via customerPhone.`);
            } catch (err) {
              console.error('[Webhook] Failed to send Mentorship Ads message:', err);
            }
          }, 2000);
        }

      } else if (cursoId === 'currais') {
        // Salvar no banco para registro
        try {
          await supabaseAdmin
            .from('bones_alunos')
            .upsert({ 
              telefone: customerPhone, 
              token: crypto.randomUUID(),
              data_acesso: new Date().toISOString()
            }, { onConflict: 'telefone' });
        } catch (dbErr) {
          console.error('[Webhook] Error saving currais status to DB:', dbErr);
        }

        const link75Projetos = 'https://digital-beryl-five.vercel.app/Entregavel%2075%20projetos%20de%20currais_compressed%202.pdf';
        const link150Projetos = 'https://drive.google.com/drive/folders/1etvQfBKgRxYHehlXXEXIUom7HHfTkKrC?usp=sharing';
        const linkContrato = 'https://digital-beryl-five.vercel.app/CONTRATO%20DE%20ARRENDAMENTO%20RURAL.pdf';
        const linkPlanilha = 'https://docs.google.com/spreadsheets/d/1D7rM7g2iAuL9GegEGRNYubQeruFreEwU/edit?usp=sharing';

        const comprouArrendamento = productsBought.includes('arrendamento');
        const comprouPlanilha = productsBought.includes('planilha');

        let message = `🎉 *Pagamento confirmado!* 🎉\n\n` +
          `Olá, ${customerName.split(' ')[0]}! Seu acesso ao pacote de *Projetos de Currais & Manejo Inteligente* foi liberado com sucesso.\n\n` +
          `📥 *Aqui estão os seus links de acesso:*\n\n` +
          `🐂 *75 Projetos de Currais (PDF Principal):*\n` +
          `${link75Projetos}\n\n` +
          `📈 *150 Projetos Adicionais de Currais (Drive):*\n` +
          `${link150Projetos}\n\n`;

        if (comprouArrendamento) {
          message += `📜 *Contrato de Arrendamento Rural (Treinamento/Modelo):*\n` +
            `${linkContrato}\n\n`;
        }

        if (comprouPlanilha) {
          message += `📊 *Planilha de Orçamento Agro (Excel/Sheets):*\n` +
            `${linkPlanilha}\n\n`;
        }

        // Avisos dinâmicos se ele NÃO levou os upsells
        if (!comprouArrendamento || !comprouPlanilha) {
          message += `💡 *Oportunidade:* `;
          const itensFaltantes = [];
          if (!comprouArrendamento) itensFaltantes.push('Contrato de Arrendamento');
          if (!comprouPlanilha) itensFaltantes.push('Planilha de Orçamento Agro');
          
          message += `Caso queira adquirir o ${itensFaltantes.join(' e o ')} posteriormente por apenas R$ 9,90 cada, basta nos responder aqui no WhatsApp.\n\n`;
        }

        message += `📌 Salve esta mensagem para não perder os seus links de estudo e trabalho!`;

        await sendWhatsAppMessage(customerPhone, message);
        console.log(`[Webhook] Successfully processed currais for ${customerName} (${customerPhone}). Arrendamento: ${comprouArrendamento}, Planilha: ${comprouPlanilha}`);

      } else if (cursoId === 'acm') {
        // Salvar no banco para habilitar o status de redirecionamento no checkout
        try {
          await supabaseAdmin
            .from('bones_alunos')
            .upsert({ 
              telefone: customerPhone, 
              token: crypto.randomUUID(),
              data_acesso: new Date().toISOString()
            }, { onConflict: 'telefone' });
        } catch (dbErr) {
          console.error('[Webhook] Error saving acm status to DB:', dbErr);
        }

        const downloadLink = process.env.PDF_LINK_ACM || 'https://link-pendente-acm';
        const message = `🎉 *Pagamento confirmado!* 🎉\n\n` +
          `Olá, ${customerName.split(' ')[0]}! Seu pagamento dos *Projetos e Guia de ACM* foi aprovado.\n\n` +
          `📥 *Clique no link abaixo para fazer o download do material:*\n` +
          `${downloadLink}\n\n` +
          `📌 Salve esta mensagem para acessar as informações de dobra e instalação sempre que precisar!\n\n` +
          `Bons projetos! 📐🏢`;

        await sendWhatsAppMessage(customerPhone, message);
        console.log(`[Webhook] Successfully processed acm for ${customerName} (${customerPhone})`);

      } else if (cursoId === 'pedreiro' || cursoId === 'eletrica_hidraulica' || cursoId === 'porcelanato' || cursoId === 'cubas') {
        // Se a pessoa comprou um upgrade isolado, ele é processado sob o contexto do aluno de pedreiro.
        // Buscamos se o aluno já existe para complementar as permissões em vez de sobrescrever.
        let hasEletricaHidraulica = cursoId === 'eletrica_hidraulica' || productsBought.includes('eletrica') || productsBought.includes('hidraulica');
        let hasPorcelanato = cursoId === 'porcelanato' || productsBought.includes('porcelanato');
        let hasCubas = cursoId === 'cubas' || productsBought.includes('cubas');

        try {
          const { data: existingUser } = await supabaseAdmin
            .from('bones_alunos')
            .select('comprou_ads, comprou_porcelanato, comprou_cubas')
            .eq('telefone', customerPhone)
            .single();

          if (existingUser) {
            hasEletricaHidraulica = hasEletricaHidraulica || !!existingUser.comprou_ads;
            hasPorcelanato = hasPorcelanato || !!existingUser.comprou_porcelanato;
            hasCubas = hasCubas || !!existingUser.comprou_cubas;
          }

          await supabaseAdmin
            .from('bones_alunos')
            .upsert({ 
              telefone: customerPhone, 
              token: crypto.randomUUID(),
              comprou_ads: hasEletricaHidraulica, 
              comprou_porcelanato: hasPorcelanato, 
              comprou_cubas: hasCubas, 
              data_acesso: new Date().toISOString()
            }, { onConflict: 'telefone' });
        } catch (dbErr) {
          console.error('[Webhook] Error saving pedreiro upgrades status to DB:', dbErr);
        }

        const plataformaLink = `${new URL(request.url).origin}/plataforma/login?course=pedreiro`;

        let message = '';
        if (cursoId === 'pedreiro') {
          message = `🎉 *Pagamento confirmado!* 🎉\n\n` +
            `Olá, ${customerName.split(' ')[0]}! Seu acesso ao *Curso Mestre da Obra & Pedreiro Profissional* foi liberado com sucesso.\n\n` +
            `📺 *Seu curso é 100% em videoaulas completas!* Não precisa baixar nada, assista direto pela nossa plataforma exclusiva de membros.\n\n` +
            `👉 *Acesse a plataforma por aqui:* ${plataformaLink}\n` +
            `🔑 *Seu Login e Senha:* É o seu próprio WhatsApp: ${customerPhone}\n\n`;

          const tagsAdicionadas = [];
          if (hasEletricaHidraulica) tagsAdicionadas.push('*Elétrica & Hidráulica Residencial*');
          if (hasPorcelanato) tagsAdicionadas.push('*Projetos de Porcelanato*');
          if (hasCubas) tagsAdicionadas.push('*Manual de Fabricação de Cubas*');

          if (tagsAdicionadas.length > 0) {
            message += `⚡ *TREINAMENTOS INCLUSOS LIBERADOS:* Como você adicionou no seu pedido, o acesso aos módulos de ${tagsAdicionadas.join(', ')} já está 100% liberado dentro da sua área de membros!\n\n`;
          }

          const itensNaoComprados = [];
          if (!hasEletricaHidraulica) itensNaoComprados.push('Elétrica & Hidráulica');
          if (!hasPorcelanato) itensNaoComprados.push('Projetos de Porcelanato');
          if (!hasCubas) itensNaoComprados.push('Fabricação de Cubas');

          if (itensNaoComprados.length > 0) {
            message += `💡 *Treinamentos Extras:* Notei que você não adicionou os pacotes de ${itensNaoComprados.join(' e ')}. Caso mude de ideia e queira liberar essas aulas posteriormente, você poderá adquiri-los diretamente pelo painel da sua área de membros ou nos respondendo aqui.\n\n`;
          }
        } else {
          // Se for compra de um Upgrade individual direto na área de membros
          let upgradeTitle = 'Treinamento de Elétrica & Hidráulica';
          if (cursoId === 'porcelanato') upgradeTitle = 'Projetos de Porcelanato';
          else if (cursoId === 'cubas') upgradeTitle = 'Fabricação de Cubas';

          message = `🎉 *Upgrade Confirmado!* 🎉\n\n` +
            `Olá, ${customerName.split(' ')[0]}! Seu pagamento para o upgrade do modulo *${upgradeTitle}* foi aprovado com sucesso.\n\n` +
            `🔓 *O conteúdo já está desbloqueado automaticamente no seu painel!*\n\n` +
            `👉 *Acesse a plataforma e bons estudos:* ${plataformaLink}\n\n` +
            `Qualquer dúvida ou problema, basta nos chamar por aqui! 🏗️🛠️`;
        }

        message += `📌 Salve esta mensagem para acessar a plataforma sempre que quiser assistir!`;

        await sendWhatsAppMessage(customerPhone, message);
        console.log(`[Webhook] Successfully processed pedreiro upgrade for ${customerName} (${customerPhone}). Eletrica/Hidraulica: ${hasEletricaHidraulica}, Porcelanato: ${hasPorcelanato}, Cubas: ${hasCubas}`);

      } else {
        // Logica Antiga do Serralheiro
        const message = buildMessage(customerName, productsBought);
        await sendWhatsAppMessage(customerPhone, message);
        console.log(`[Webhook] Successfully processed payment for ${customerName} (${customerPhone}) - Course: Serralheiro.`);

        if (productsBought.includes('mentoria')) {
          const mentoriaMessage = `🤝 *Sobre o seu Treinamento de Vendas!*\n\n` +
            `Vi aqui que você também garantiu as 2 Calls de Mentoria comigo! Sou especialista em vendas e vou te ajudar a alavancar seus resultados.\n\n` +
            `Por favor, me responda esta mensagem informando qual o melhor dia e horário para agendarmos a nossa primeira call no Google Meet.\n\n` +
            `Aguardo seu retorno para deixarmos tudo marcado! 🚀`;

          setTimeout(async () => {
            try {
              await sendWhatsAppMessage(customerPhone, mentoriaMessage, '86995485600');
              console.log(`[Webhook] Mentorship message sent to ${customerName} (${customerPhone}).`);
            } catch (err) {
              console.error('[Webhook] Failed to send mentorship message:', err);
            }
          }, 2000);
        }
      }

    } catch (whatsappError) {
      console.error('[Webhook] Failed to send WhatsApp message to customer:', whatsappError);
    }
      
    // 2. Envia para o Admin
    try {
      const adminPhone = '5586995485600';
      const amountValue = body.data?.pixQrCode?.amount ? body.data.pixQrCode.amount / 100 : 0;
      const formattedAmount = amountValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      
      let courseName = 'Serralheiro';
      if (cursoId === 'bones') courseName = 'Fábrica de Bonés';
      else if (cursoId === 'pedreiro') courseName = 'Mestre de Obra';
      else if (cursoId === 'currais') courseName = 'Currais';
      else if (cursoId === 'acm') courseName = 'ACM';
      else if (cursoId === 'eletrica_hidraulica') courseName = 'Mestre de Obra (Upgrade Eletrica/Hidraulica)';
      else if (cursoId === 'porcelanato') courseName = 'Mestre de Obra (Upgrade Porcelanato)';
      else if (cursoId === 'cubas') courseName = 'Mestre de Obra (Upgrade Cubas)';

      const adminMessage = `✅ *Pix Pago (${courseName})!*\n\nNome: ${customerName}\nValor: ${formattedAmount}\nNúmero: ${customerPhone}`;
      await sendWhatsAppMessage(adminPhone, adminMessage);
    } catch (adminWhatsappError) {
      console.error('[Webhook] Failed to send WhatsApp message to admin:', adminWhatsappError);
    }

    // Dispara o Pixel de Compra direto do Servidor (CAPI)
    const amountValue = body.data?.pixQrCode?.amount ? body.data.pixQrCode.amount / 100 : 0;
    const customerEmail = body.data?.pixQrCode?.customer?.metadata?.email || body.data?.pixQrCode?.metadata?.email || '';
    await sendFacebookCapiPurchase(customerPhone, customerEmail, amountValue);

    // Envia o email via Resend
    try {
      await sendDeliveryEmail(customerEmail, customerName, productsBought);
    } catch (emailError) {
      console.error('[Webhook] Error executing sendDeliveryEmail:', emailError);
    }

    return NextResponse.json(
      { received: true, action: 'processed' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Webhook] Unexpected error processing webhook:', error);

    return NextResponse.json(
      { received: true, action: 'error' },
      { status: 200 }
    );
  }
}
