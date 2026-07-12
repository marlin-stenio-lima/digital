import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import PlatformClient from './PlatformClient';

export default async function PlataformaPedreiro() {
  const cookieStore = await cookies();
  const session = cookieStore.get('bones_session');

  if (!session || !session.value) {
    redirect('/plataforma/login?course=pedreiro');
  }

  // Verifica se o usuário correspondente à sessão realmente existe
  const { data: user } = await supabaseAdmin
    .from('bones_alunos')
    .select('*')
    .eq('telefone', session.value)
    .single();

  // Se o aluno não existir no banco, bloqueia o acesso
  if (!user) {
    redirect('/plataforma/login?course=pedreiro');
  }

  // Determinar se o usuário possui acesso ao bônus (Elétrica e Hidráulica / comprou_ads)
  const hasBonusAccess = !!user.comprou_ads;
  const hasPorcelanatoAccess = !!user.comprou_porcelanato;
  const hasCubasAccess = !!user.comprou_cubas;

  return (
    <PlatformClient 
      customerName={user.telefone} 
      hasBonusAccess={hasBonusAccess} 
      hasPorcelanatoAccess={hasPorcelanatoAccess}
      hasCubasAccess={hasCubasAccess}
    />
  );
}
