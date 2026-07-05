const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing keys");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function addTestUser() {
  const phone = '5586995485600';
  const token = 'token-de-teste-123';
  
  const { data, error } = await supabase
    .from('bones_alunos')
    .upsert({ 
      telefone: phone, 
      token: token,
      comprou_ads: true,
      data_acesso: new Date().toISOString()
    }, { onConflict: 'telefone' });

  if (error) {
    console.error("Erro ao adicionar:", error);
  } else {
    console.log("Usuário adicionado com sucesso!", data);
  }
}

addTestUser();
