import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import PlatformClient from './PlatformClient';

interface Props {
  params: Promise<{
    token: string;
  }>;
}

export default async function PlataformaPedreiro({ params }: Props) {
  const resolvedParams = await params;
  const urlToken = resolvedParams.token;

  const cookieStore = await cookies();
  const session = cookieStore.get('bones_session');

  if (!session || !session.value) {
    redirect('/plataforma/login?course=pedreiro');
  }

  // Verifica se o usuário correspondente à sessão realmente existe e tem esse token seguro na URL
  const { data: user } = await supabaseAdmin
    .from('bones_alunos')
    .select('*')
    .eq('telefone', session.value)
    .eq('token', urlToken)
    .single();

  // Se o token na URL não bater com o token do aluno logado, bloqueia
  if (!user) {
    redirect('/plataforma/login?course=pedreiro');
  }

  // Determinar se o usuário possui acesso ao bônus (Elétrica e Hidráulica / comprou_ads)
  const hasBonusAccess = !!user.comprou_ads;

  return (
    <PlatformClient 
      customerName={user.telefone} 
      hasBonusAccess={hasBonusAccess} 
    />
  );
}
