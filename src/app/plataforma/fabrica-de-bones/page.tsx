import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import PlatformClient from './PlatformClient';
import { supabaseAdmin } from '@/lib/supabase';

export default async function PlataformaBones() {
  const cookieStore = cookies();
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
        .filter(f => f.name.endsWith('.mp4'))
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(f => {
          const { data } = supabaseAdmin.storage.from('bones_videos').getPublicUrl(f.name);
          return {
            id: f.id,
            name: f.name.replace('.mp4', ''),
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
