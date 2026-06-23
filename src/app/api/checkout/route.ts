import { NextResponse } from 'next/server';

interface CheckoutRequestBody {
  name: string;
  phone: string;
  email: string;
  cpf: string;
  products: string[];
  totalAmount: number;
}

function generateMockQrCodeSvgBase64(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <rect width="200" height="200" fill="#ffffff"/>
    <rect x="10" y="10" width="60" height="60" fill="#000" rx="4"/>
    <rect x="15" y="15" width="50" height="50" fill="#fff" rx="2"/>
    <rect x="22" y="22" width="36" height="36" fill="#000" rx="2"/>
    <rect x="130" y="10" width="60" height="60" fill="#000" rx="4"/>
    <rect x="135" y="15" width="50" height="50" fill="#fff" rx="2"/>
    <rect x="142" y="22" width="36" height="36" fill="#000" rx="2"/>
    <rect x="10" y="130" width="60" height="60" fill="#000" rx="4"/>
    <rect x="15" y="135" width="50" height="50" fill="#fff" rx="2"/>
    <rect x="22" y="142" width="36" height="36" fill="#000" rx="2"/>
    <rect x="80" y="10" width="10" height="10" fill="#000"/>
    <rect x="100" y="10" width="10" height="10" fill="#000"/>
    <rect x="80" y="30" width="10" height="10" fill="#000"/>
    <rect x="100" y="30" width="10" height="10" fill="#000"/>
    <rect x="110" y="30" width="10" height="10" fill="#000"/>
    <rect x="80" y="50" width="10" height="10" fill="#000"/>
    <rect x="90" y="50" width="10" height="10" fill="#000"/>
    <rect x="110" y="50" width="10" height="10" fill="#000"/>
    <rect x="80" y="80" width="10" height="10" fill="#000"/>
    <rect x="90" y="80" width="10" height="10" fill="#000"/>
    <rect x="100" y="80" width="10" height="10" fill="#000"/>
    <rect x="130" y="80" width="10" height="10" fill="#000"/>
    <rect x="150" y="80" width="10" height="10" fill="#000"/>
    <rect x="170" y="80" width="10" height="10" fill="#000"/>
    <rect x="80" y="100" width="10" height="10" fill="#000"/>
    <rect x="110" y="100" width="10" height="10" fill="#000"/>
    <rect x="140" y="100" width="10" height="10" fill="#000"/>
    <rect x="160" y="100" width="10" height="10" fill="#000"/>
    <rect x="80" y="120" width="10" height="10" fill="#000"/>
    <rect x="100" y="120" width="10" height="10" fill="#000"/>
    <rect x="120" y="120" width="10" height="10" fill="#000"/>
    <rect x="140" y="120" width="10" height="10" fill="#000"/>
    <rect x="160" y="120" width="10" height="10" fill="#000"/>
    <rect x="130" y="140" width="10" height="10" fill="#000"/>
    <rect x="150" y="140" width="10" height="10" fill="#000"/>
    <rect x="180" y="140" width="10" height="10" fill="#000"/>
    <rect x="130" y="160" width="10" height="10" fill="#000"/>
    <rect x="160" y="160" width="10" height="10" fill="#000"/>
    <rect x="180" y="160" width="10" height="10" fill="#000"/>
    <rect x="130" y="180" width="10" height="10" fill="#000"/>
    <rect x="140" y="180" width="10" height="10" fill="#000"/>
    <rect x="160" y="180" width="10" height="10" fill="#000"/>
    <rect x="170" y="180" width="10" height="10" fill="#000"/>
    <text x="100" y="115" text-anchor="middle" font-size="8" fill="#666" font-family="sans-serif">TEST PIX</text>
  </svg>`;

  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

async function sendWhatsAppMessage(phone: string, message: string): Promise<void> {
  const evolutionApiUrl = process.env.EVOLUTION_API_URL;
  const evolutionInstance = process.env.EVOLUTION_INSTANCE;
  const evolutionApiKey = process.env.EVOLUTION_API_KEY;

  if (!evolutionApiUrl || !evolutionInstance || !evolutionApiKey) return;

  let cleaned = phone.replace(/\D/g, '');
  if (!cleaned.startsWith('55')) cleaned = '55' + cleaned;

  const url = `${evolutionApiUrl}/message/sendText/${evolutionInstance}`;
  await fetch(url, {
    method: 'POST',
    headers: { apikey: evolutionApiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ number: cleaned, text: message }),
  });
}

export async function POST(request: Request) {
  try {
    const body: CheckoutRequestBody = await request.json();

    const { name, phone, email, cpf, products, totalAmount } = body;

    if (!name || !phone || !email || !cpf || !totalAmount) {
      return NextResponse.json(
        { error: 'Campos obrigatórios não preenchidos.' },
        { status: 400 }
      );
    }

    const cleanCpf = cpf.replace(/[.\-]/g, '');
    const cleanPhone = phone.replace(/[() \-]/g, '');

    if (cleanCpf.length !== 11) {
      return NextResponse.json(
        { error: 'CPF inválido. Deve conter 11 dígitos.' },
        { status: 400 }
      );
    }

    if (cleanPhone.length < 10 || cleanPhone.length > 11) {
      return NextResponse.json(
        { error: 'Telefone inválido.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.ABACATE_PAY_API_KEY || 'abc_prod_yzd2JJtJ2RKeCDZF5rtXpfHN';

    if (!apiKey) {
      console.log('[Checkout] No ABACATE_PAY_API_KEY set. Returning mock response for testing.');

      const mockBrCode =
        '00020126580014br.gov.bcb.pix0136fake-pix-code-for-testing-purposes52040000530398654051590055802BR5925ARSENAL SERRALHEIRO MESTR6014SAO PAULO SP62070503***6304FAKE';

      const mockQrCodeBase64 = generateMockQrCodeSvgBase64();

      return NextResponse.json({
        success: true,
        data: {
          billingId: 'test_' + Date.now(),
          brCode: mockBrCode,
          qrCodeBase64: mockQrCodeBase64,
          amount: totalAmount,
          status: 'PENDING',
        },
      });
    }

    const apiUrl = 'https://api.abacatepay.com/v1/pixQrCode/create';

    const priceInCents = Math.round(totalAmount * 100);
    const productList = products || ['serralheiro-pack'];

    const abacateBody = {
      amount: priceInCents,
      expiresIn: 3600,
      description: 'Arsenal do Serralheiro Mestre',
      customer: {
        name: name,
        email: email,
        cellphone: cleanPhone,
        taxId: cleanCpf,
      },
      metadata: {
        externalId: `order_${Date.now()}`,
        produtos: JSON.stringify(productList),
        telefone: cleanPhone,
        email: email,
        nome: name,
      },
    };

    console.log('[Checkout] Sending request to Abacate Pay:', JSON.stringify(abacateBody, null, 2));

    const abacateResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(abacateBody),
    });

    const responseData = await abacateResponse.json();

    if (!abacateResponse.ok) {
      console.error('[Checkout] Abacate Pay API error:', JSON.stringify(responseData));
      
      let friendlyError = 'Erro ao processar pagamento com o banco. Tente novamente.';
      
      if (responseData?.error === 'Invalid taxId') {
        friendlyError = 'O CPF informado é inválido ou irregular. Por favor, verifique os números e tente novamente.';
      } else if (typeof responseData?.error === 'string') {
        friendlyError = `Falha no pagamento: ${responseData.error}`;
      }

      return NextResponse.json(
        {
          error: friendlyError,
          details: responseData,
        },
        { status: abacateResponse.status }
      );
    }

    console.log('[Checkout] Abacate Pay response:', JSON.stringify(responseData, null, 2));

    const billingData = responseData.data || responseData;

    const brCode = billingData.brCode || '';
    const qrCodeBase64 = billingData.brCodeBase64 || '';
    const billingId = billingData.id || '';

    const adminPhone = '5586995485600';
    const formattedAmount = Number(totalAmount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const adminMessage = `⚠️ *Pix Gerado*\n\nNome: ${name}\nValor: ${formattedAmount}\nNúmero: ${cleanPhone}`;
    
    try {
      await sendWhatsAppMessage(adminPhone, adminMessage);
    } catch (e) {
      console.error('[Checkout] Admin notification failed:', e);
    }

    return NextResponse.json({
      success: true,
      data: {
        billingId: billingId,
        brCode: brCode,
        qrCodeBase64: qrCodeBase64,
        amount: totalAmount,
        status: billingData.status || 'PENDING',
      },
    });
  } catch (error) {
    console.error('[Checkout] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor. Tente novamente.' },
      { status: 500 }
    );
  }
}
