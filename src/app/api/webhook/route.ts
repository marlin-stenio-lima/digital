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

function isPaymentConfirmed(body: AbacatePayWebhookEvent): boolean {
  const event = body.event || '';
  const status = body.data?.pixQrCode?.status || '';

  const confirmedEvents = ['billing.paid', 'BILLING.PAID', 'payment.confirmed'];
  const confirmedStatuses = ['PAID', 'paid', 'COMPLETED'];

  if (confirmedEvents.includes(event)) return true;
  if (confirmedStatuses.includes(status)) return true;

  return false;
}

function formatPhoneForWhatsApp(phone: string): string {
  let cleaned = phone.replace(/\D/g, '');

  if (!cleaned.startsWith('55')) {
    cleaned = '55' + cleaned;
  }

  return cleaned;
}

function buildMessage(customerName: string, productsBought: string[]): string {
  const firstName = customerName.split(' ')[0];

  const linkPrincipal = process.env.PDF_LINK || 'https://link-pendente';
  const linkCarretinha = process.env.PDF_LINK_CARRETINHA || '';
  const linkAcademia = process.env.PDF_LINK_ACADEMIA || '';
  const linkPerfuratriz = process.env.PDF_LINK_PERFURATRIZ || '';

  let linksText = `📥 *600 Projetos de Móveis Industriais:*\n${linkPrincipal}\n\n`;

  if (productsBought.includes('carretinha') && linkCarretinha) {
    linksText += `📥 *Projetos de Carretinha:*\n${linkCarretinha}\n\n`;
  }
  if (productsBought.includes('academia') && linkAcademia) {
    linksText += `📥 *Projetos de Academia:*\n${linkAcademia}\n\n`;
  }
  if (productsBought.includes('perfuratriz') && linkPerfuratriz) {
    linksText += `📥 *Projeto da Perfuratriz:*\n${linkPerfuratriz}\n\n`;
  }

  return (
    `🎉 *Pagamento confirmado!* 🎉\n\n` +
    `Olá, ${firstName}! Seu pagamento foi recebido com sucesso.\n\n` +
    `📦 *Seu material está pronto:*\n\n` +
    `${linksText}` +
    `📌 *Dicas importantes:*\n` +
    `• Salve esta mensagem para acessar quando quiser\n` +
    `• Recomendamos baixar no computador para melhor visualização\n` +
    `• Os projetos estão em PDF, prontos para impressão\n\n` +
    `Qualquer dúvida, é só responder esta mensagem! 💬\n\n` +
    `Bons projetos! 🔧🔩`
  );
}

async function sendWhatsAppMessage(phone: string, message: string, instanceName?: string): Promise<void> {
  const evolutionApiUrl = process.env.EVOLUTION_API_URL;
  const evolutionInstance = instanceName || process.env.EVOLUTION_INSTANCE;
  const evolutionApiKey = process.env.EVOLUTION_API_KEY;

  if (!evolutionApiUrl || !evolutionInstance || !evolutionApiKey) {
    console.warn(
      '[Webhook] Evolution API environment variables not configured. Skipping WhatsApp message.',
      { evolutionApiUrl: !!evolutionApiUrl, evolutionInstance: !!evolutionInstance, evolutionApiKey: !!evolutionApiKey }
    );
    return;
  }

  const url = `${evolutionApiUrl}/message/sendText/${evolutionInstance}`;
  const formattedPhone = formatPhoneForWhatsApp(phone);

  console.log(`[Webhook] Sending WhatsApp message to: ${formattedPhone}`);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      apikey: evolutionApiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      number: formattedPhone,
      text: message,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`[Webhook] Failed to send WhatsApp message. Status: ${response.status}, Body: ${errorBody}`);
    throw new Error(`Evolution API returned status ${response.status}`);
  }

  console.log('[Webhook] WhatsApp message sent successfully.');
}

async function sendFacebookCapiPurchase(phone: string, email: string, amount: number) {
  const pixelId = process.env.NEXT_PUBLIC_PIXEL_ID;
  const token = process.env.META_PIXEL_TOKEN;

  if (!pixelId || !token) {
    console.log('[Webhook] Missing Facebook Pixel ID or Token. Skipping CAPI.');
    return;
  }

  try {
    const hashData = (data: string) => crypto.createHash('sha256').update(data.trim().toLowerCase()).digest('hex');

    const ph = phone ? hashData(phone.replace(/\D/g, '')) : undefined;
    const em = email ? hashData(email) : undefined;

    const payload = {
      data: [
        {
          event_name: 'Purchase',
          event_time: Math.floor(Date.now() / 1000),
          action_source: 'website',
          user_data: {
            ph: ph ? [ph] : undefined,
            em: em ? [em] : undefined,
          },
          custom_data: {
            currency: 'BRL',
            value: amount
          }
        }
      ]
    };

    const response = await fetch(`https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error('[Webhook] Facebook CAPI Error:', await response.text());
    } else {
      console.log('[Webhook] Facebook CAPI Purchase event sent successfully.');
    }
  } catch (err) {
    console.error('[Webhook] Facebook CAPI Exception:', err);
  }
}

async function sendDeliveryEmail(email: string, customerName: string, productsBought: string[]) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[Webhook] RESEND_API_KEY not found. Skipping email.');
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

    const cursoId = body.data?.pixQrCode?.metadata?.curso || 'serralheiro';

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
          console.error('[Webhook] Error saving currais status to DB:', dbErr);
        }

        const downloadLink = process.env.PDF_LINK_CURRAIS || 'https://link-pendente-currais';
        const message = `🎉 *Pagamento confirmado!* 🎉\n\n` +
          `Olá, ${customerName.split(' ')[0]}! Seu pagamento dos *Projetos de Currais* foi aprovado.\n\n` +
          `📥 *Clique no link abaixo para fazer o download dos projetos e manual:*\n` +
          `${downloadLink}\n\n` +
          `📌 Salve esta mensagem para não perder o link do seu material!\n\n` +
          `Bons projetos! 🔨🐂`;

        await sendWhatsAppMessage(customerPhone, message);
        console.log(`[Webhook] Successfully processed currais for ${customerName} (${customerPhone})`);

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

      } else if (cursoId === 'pedreiro') {
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
          console.error('[Webhook] Error saving pedreiro status to DB:', dbErr);
        }

        const downloadLink = process.env.PDF_LINK_PEDREIRO || 'https://link-pendente-pedreiro';
        const message = `🎉 *Pagamento confirmado!* 🎉\n\n` +
          `Olá, ${customerName.split(' ')[0]}! Seu pagamento dos *Projetos Estruturais de Pedreiro* foi aprovado com sucesso.\n\n` +
          `📥 *Baixe seu material com guias de ferragens e concreto no link abaixo:*\n` +
          `${downloadLink}\n\n` +
          `📌 Lembre-se de baixar e salvar no seu celular para olhar direto no canteiro de obras!\n\n` +
          `Bons projetos! 🏗️🧱`;

        await sendWhatsAppMessage(customerPhone, message);
        console.log(`[Webhook] Successfully processed pedreiro for ${customerName} (${customerPhone})`);

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
      const courseName = cursoId === 'bones' ? 'Fábrica de Bonés' : 'Serralheiro';
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
