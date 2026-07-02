import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import PlatformClient from './PlatformClient';
import { supabaseAdmin } from '@/lib/supabase';

export default async function PlataformaBones() {
  const cookieStore = await cookies();
  const session = cookieStore.get('bones_session');

  if (!session || !session.value) {
    redirect('/plataforma/login');
  }

  // Verifica se o usuário existe mesmo
  const { data: user } = await supabaseAdmin
    .from('bones_alunos')
    .select('*')
    .eq('telefone', session.value)
    .single();

  if (!user) {
    redirect('/plataforma/login');
  }

  // Busca lista de vídeos do Storage
  let videos: any[] = [];
  try {
    const { data: files, error } = await supabaseAdmin.storage.from('bones_videos').list();
    if (!error && files) {
      videos = files
        .filter(f => f.name.toLowerCase().endsWith('.mp4'))
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(f => {
          const { data } = supabaseAdmin.storage.from('bones_videos').getPublicUrl(f.name);
          
          let cleanName = f.name.replace(/\.mp4/gi, '').replace(/^[\d\s\-\.]+/g, '').trim().toLowerCase();
          
          let beautifulTitle = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
          if (cleanName.includes('boas vindas')) beautifulTitle = 'Boas-Vindas e Introdução';
          if (cleanName.includes('fornecedores')) beautifulTitle = 'Encontrando Fornecedores';
          if (cleanName.includes('primeiros modelos')) beautifulTitle = 'Como Escolher os Primeiros Modelos';
          if (cleanName.includes('melhor loja')) beautifulTitle = 'Montando a Melhor Loja';
          if (cleanName.includes('iniciar as vendas')) beautifulTitle = 'Como Iniciar as Vendas';
          if (cleanName.includes('tecnicas de vendas')) beautifulTitle = 'Técnicas de Vendas';
          if (cleanName.includes('segredo dos 15 mil')) beautifulTitle = 'O Segredo dos 15 Mil';
          if (cleanName.includes('modelos sazonais')) beautifulTitle = 'Escolhendo Modelos Sazonais';
          if (cleanName.includes('influenciadores')) beautifulTitle = 'Marketing com Influenciadores';

          return {
            id: f.id,
            name: beautifulTitle,
            url: data.publicUrl
          };
        });
    }
  } catch (err) {
    console.error('Erro ao buscar vídeos:', err);
  }

  // Fallback se não houver vídeos ainda
  if (videos.length === 0) {
    videos = [
      { id: '1', name: 'Módulo 1 - Introdução', url: '' },
      { id: '2', name: 'Módulo 2 - Fornecedores', url: '' }
    ];
  }

  return <PlatformClient videos={videos} />;
}
