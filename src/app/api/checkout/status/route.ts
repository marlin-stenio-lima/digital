import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get('phone');

    if (!phone) {
      return NextResponse.json({ error: 'Missing phone parameter' }, { status: 400 });
    }

    // Extrair apenas dígitos do telefone
    const digitsOnly = phone.replace(/\D/g, '');

    console.log('[Status] Checking payment for phone digits:', digitsOnly);

    // Checar DIRETO no Supabase - dados salvos pelo webhook
    const { data: aluno, error } = await supabaseAdmin
      .from('bones_alunos')
      .select('data_acesso, telefone')
      .eq('telefone', digitsOnly)
      .single();

    if (!error && aluno && aluno.data_acesso) {
      const acessoTime = new Date(aluno.data_acesso).getTime();
      const now = Date.now();
      const diffMinutes = (now - acessoTime) / (1000 * 60);

      console.log('[Status] Found record for', digitsOnly, '- data_acesso:', aluno.data_acesso, '- diff minutes:', diffMinutes.toFixed(1));

      if (diffMinutes < 60) {
        console.log('[Status] Payment CONFIRMED via Supabase for', digitsOnly);
        return NextResponse.json({ success: true, status: 'PAID' });
      }
    }

    // Tentar também com prefixo 55
    const withPrefix = '55' + digitsOnly;
    const { data: aluno2, error: error2 } = await supabaseAdmin
      .from('bones_alunos')
      .select('data_acesso, telefone')
      .eq('telefone', withPrefix)
      .single();

    if (!error2 && aluno2 && aluno2.data_acesso) {
      const acessoTime = new Date(aluno2.data_acesso).getTime();
      const now = Date.now();
      const diffMinutes = (now - acessoTime) / (1000 * 60);

      if (diffMinutes < 60) {
        console.log('[Status] Payment CONFIRMED via Supabase (55 prefix) for', withPrefix);
        return NextResponse.json({ success: true, status: 'PAID' });
      }
    }

    console.log('[Status] No recent payment found for', digitsOnly);
    return NextResponse.json({ success: true, status: 'PENDING' });

  } catch (error) {
    console.error('[Status] Unexpected error:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
