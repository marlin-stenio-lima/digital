import { NextResponse } from 'next/server';
import crypto from 'crypto';

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

async function sendWhatsAppMessage(phone: string, message: string): Promise<void> {
  const evolutionApiUrl = process.env.EVOLUTION_API_URL;
  const evolutionInstance = process.env.EVOLUTION_INSTANCE;
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

    const message = buildMessage(customerName, productsBought);

    try {
      await sendWhatsAppMessage(customerPhone, message);
      console.log(`[Webhook] Successfully processed payment for ${customerName} (${customerPhone}).`);
      
      const adminPhone = '5586995485600';
      const amountValue = body.data?.pixQrCode?.amount ? body.data.pixQrCode.amount / 100 : 0;
      const formattedAmount = amountValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      const adminMessage = `✅ *Pix Pago!*\n\nNome: ${customerName}\nValor: ${formattedAmount}\nNúmero: ${customerPhone}`;
      await sendWhatsAppMessage(adminPhone, adminMessage);
    } catch (whatsappError) {
      console.error('[Webhook] Failed to send WhatsApp message:', whatsappError);
    }

    // Dispara o Pixel de Compra direto do Servidor (CAPI)
    const amountValue = body.data?.pixQrCode?.amount ? body.data.pixQrCode.amount / 100 : 0;
    const customerEmail = body.data?.pixQrCode?.customer?.metadata?.email || body.data?.pixQrCode?.metadata?.email || '';
    await sendFacebookCapiPurchase(customerPhone, customerEmail, amountValue);

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
