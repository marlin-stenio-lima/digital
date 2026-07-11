import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { phone, token } = await request.json();

    if (!phone && !token) {
      return NextResponse.json({ success: false, error: 'Forneça telefone ou token.' }, { status: 400 });
    }

    let user = null;

    if (token) {
      const { data, error } = await supabaseAdmin
        .from('bones_alunos')
        .select('*')
        .eq('token', token)
        .single();
      
      if (!error && data) {
        user = data;
      }
    } else if (phone) {
      const cleanPhone = phone.replace(/\D/g, '');
      const { data, error } = await supabaseAdmin
        .from('bones_alunos')
        .select('*')
        .eq('telefone', cleanPhone)
        .single();
      
      if (!error && data) {
        user = data;
      } else {
        // Fallback: busca parcial
        const { data: listData } = await supabaseAdmin
          .from('bones_alunos')
          .select('*');
        if (listData) {
          user = listData.find(u => u.telefone.endsWith(cleanPhone));
        }
      }
    }

    if (!user) {
      return NextResponse.json({ success: false, error: 'Cadastro não encontrado. Verifique seu número ou se a compra foi aprovada.' }, { status: 404 });
    }

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set({
      name: 'bones_session',
      value: user.telefone,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });

    return NextResponse.json({ 
      success: true, 
      user: { 
        telefone: user.telefone, 
        comprou_ads: user.comprou_ads,
        token: user.token
      } 
    });

  } catch (error) {
    console.error('[Auth] Error:', error);
    return NextResponse.json({ success: false, error: 'Erro interno' }, { status: 500 });
  }
}
