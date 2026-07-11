const fs = require('fs');
try {
  const content = fs.readFileSync('d:\\DIGITAL\\serralheiro-pack\\public\\upsell_bundle.js', 'utf8');
  
  // Encontrar todas as ocorrências de links .mp4
  const regex = /https?:\/\/[^\s"']+\.mp4/g;
  const matches = content.match(regex);
  
  console.log("=== ENCONTRADOS ===");
  if (matches) {
    // Remover duplicados
    const unique = [...new Set(matches)];
    console.log(JSON.stringify(unique, null, 2));
  } else {
    console.log("Nenhum link mp4 encontrado.");
  }
} catch (err) {
  console.error(err);
}
