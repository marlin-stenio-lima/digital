import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
    }

    const apiKey = process.env.ABACATE_PAY_API_KEY || 'abc_prod_yzd2JJtJ2RKeCDZF5rtXpfHN';

    const response = await fetch(`https://api.abacatepay.com/v1/pixQrCode/check?id=${encodeURIComponent(id)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[Status Check] Abacate Pay error:', data);
      return NextResponse.json({ error: 'Erro ao verificar status', details: data }, { status: response.status });
    }

    return NextResponse.json({
      success: true,
      status: data.data?.status || 'PENDING',
    });
  } catch (error) {
    console.error('[Status Check] Unexpected error:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
