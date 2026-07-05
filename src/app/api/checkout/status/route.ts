import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const phone = searchParams.get('phone');

    if (!id) {
      return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
    }

    const apiKey = process.env.ABACATE_PAY_API_KEY || 'abc_prod_yzd2JJtJ2RKeCDZF5rtXpfHN';
    let abacateStatus = 'PENDING';

    try {
      const response = await fetch(`https://api.abacatepay.com/v1/pixQrCode/check?id=${encodeURIComponent(id)}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
      });

      const data = await response.json();
      if (response.ok) {
        const billingData = data.data || data;
        abacateStatus = billingData.status || 'PENDING';
      }
    } catch (err) {
      console.error('[Status Check] Abacate Pay error:', err);
    }

    const upperStatus = String(abacateStatus).toUpperCase();
    if (upperStatus === 'PAID' || upperStatus === 'COMPLETED') {
      return NextResponse.json({ success: true, status: 'PAID' });
    }

    // Fallback: Check Supabase database to see if webhook processed this user's payment recently
    if (phone) {
      let cleanPhone = phone.replace(/\D/g, '');
      if (!cleanPhone.startsWith('55')) {
        cleanPhone = '55' + cleanPhone;
      }
      
      const checkDatabase = async (telToSearch: string) => {
        const { data: aluno, error } = await supabaseAdmin
          .from('bones_alunos')
          .select('data_acesso')
          .eq('telefone', telToSearch)
          .single();
          
        if (!error && aluno) {
          const acessoTime = new Date(aluno.data_acesso).getTime();
          const now = new Date().getTime();
          const diffMinutes = (now - acessoTime) / (1000 * 60);
          if (diffMinutes < 30) {
            return true;
          }
        }
        return false;
      };

      const isPaid1 = await checkDatabase(phone);
      if (isPaid1) return NextResponse.json({ success: true, status: 'PAID' });
      
      const isPaid2 = await checkDatabase(cleanPhone);
      if (isPaid2) return NextResponse.json({ success: true, status: 'PAID' });
    }

    return NextResponse.json({
      success: true,
      status: 'PENDING',
    });
  } catch (error) {
    console.error('[Status Check] Unexpected error:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
