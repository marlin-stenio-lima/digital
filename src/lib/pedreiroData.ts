export interface Lesson {
  id: string;
  title: string;
  videoId: string;
  description: string;
  videoUrl?: string; // Para hospedar links mp4 diretos
}

export interface Module {
  id: number;
  title: string;
  image: string;
  description: string;
  lessons?: Lesson[];
  isBonus?: boolean;
  isHydraulics?: boolean; // Novo identificador para separar Hidráulica
}

export const PEDREIRO_COURSE_DATA = {
  courseName: "Curso Mestre de Obras & Pedreiro Profissional",
  bonusRedirectUrl: "https://aprendaemcasaagora.com/", // Link de Venda do Upsell se não tiver comprado
  modules: [
    {
      id: 1,
      title: "Módulo 1 - Estrutura da Casa",
      image: "/images/modulo1.jpg",
      description: "Aprenda a planejar e executar a fundação, alvenaria e pilares da sua obra do absoluto zero.",
      lessons: [
        { id: "1-0", title: "Aula 0 - Como Fazer Alicerce", videoId: "xG_bQ_fXkY0", description: "Aprenda o passo a passo completo para fazer um alicerce firme e seguro para sua construção." },
        { id: "1-1", title: "Aula 1 - Como levantar parede do zero", videoId: "4AJUZgbEqR8", description: "Passo a passo completo para iniciar o assentamento de tijolos e subir a primeira parede com alinhamento." },
        { id: "1-2", title: "Aula 2 - Pra que serve cada tipo de tijolo", videoId: "A-XORldlEEQ", description: "Entenda a diferença entre blocos cerâmicos, de concreto e ecológicos, e qual o melhor para cada tipo de obra." },
        { id: "1-3", title: "Aula 3 - Como preparar argamassa", videoId: "9hShP4CQey8", description: "A dosagem (traço) perfeita de areia, cimento e aditivos para uma masa com ótima liga e aderência." },
        { id: "1-4", title: "Aula 4 - Aprenda a usar Prumo", videoId: "jlQPVMhSKIA", description: "A técnica indispensável para garantir que sua parede não fique torta ou inclinada." },
        { id: "1-5", title: "Aula 5 - Como usar fio de prumo e esquadro", videoId: "pqzhr2oxaoQ", description: "Aprenda a fechar cantos perfeitos em 90 graus usando ferramentas tradicionais de obra." },
        { id: "1-6", title: "Aula 6 - Verga e contraverga em portas e janelas", videoId: "89awV7FWi6k", description: "Instalação de vergas e contravergas para portas e janelas com total segurança para evitar rachaduras." },
        { id: "1-7", title: "Aula 7 - Como fazer Cinta AÉREA da Sua Casa do ZERO", videoId: "7Bhba6a6Oug", description: "Como fazer a caixaria, ferragem e concretagem da viga superior para amarração final das paredes." },
        { id: "1-8", title: "Aula 8 - Travamento de parede, qual a altura ideal", videoId: "NFDP6fnr-W8", description: "Como estruturar os pontos críticos de carga e garantir o travamento correto das paredes da casa." },
        { id: "1-9", title: "Aula 9 - Qual medida pra Fixar sua Porta na sua casa do zero", videoId: "ZieLKeI-DvI", description: "Dicas de prumo, alinhamento e medição exata para fixar portas na alvenaria." }
      ]
    },
    {
      id: 2,
      title: "Módulo 2 - Massa e Reboco",
      image: "/images/modulo2.jpg",
      description: "Domine o acabamento de paredes com técnicas de chapisco, emboço e reboco perfeito.",
      lessons: [
        { id: "2-1", title: "Aula 1 - TUDO SOBRE CHAPISCO EMBOÇO E REBOCO", videoId: "T-uV64fLDwE", description: "Entenda o papel de cada camada na preparação e impermeabilização da sua parede." },
        { id: "2-2", title: "Aula 2 - Como fazer um chapisco perfeito na alvenaria", videoId: "pKXK_pEuyFQ", description: "Como arremessar a colher de pedreiro para criar a base áspera ideal para o emboço." },
        { id: "2-3", title: "Aula 3 - Como fazer massa e traço certo", videoId: "8M-XssJlHEg", description: "A proporção ideal dos materiais para um reboco macio, resistente e fácil de sarrafear." },
        { id: "2-4", title: "Aula 4 - Técnica de aplicação de reboco", videoId: "TeaHMFCrtHs", description: "Como chapar a massa na parede, sarrafear usando réguas de alumínio e conferir o prumo." },
        { id: "2-5", title: "Aula 5 - Acabamento liso de parede", videoId: "FSwf851_aiI", description: "Técnica de desempeno com espuma e feltro para deixar a parede pronta para massa corrida e pintura." },
        { id: "2-6", title: "Aula 6 - Como evitar rachaduras e bolhas", videoId: "7-vA9NYDl2Q", description: "Dicas de controle de umidade e proporção de cal para evitar patologias no reboco seco." },
        { id: "2-7", title: "Aula 7 - Dicas de Cura e Secagem", videoId: "97otqnkZPmw", description: "O tempo ideal de cura e a importância de molhar a parede nos primeiros dias de secagem." }
      ]
    },
    {
      id: 3,
      title: "Módulo 3 - Piso e Contrapiso",
      image: "/images/modulo3.jpg",
      description: "Tudo o que você precisa saber para preparar o solo, nivelar e assentar cerâmicas e porcelanatos.",
      lessons: [
        { id: "3-1", title: "Aula 1 - Princípio de um contrapiso nivelado", videoId: "KGuJOeEO5TE", description: "Limpeza da laje ou compactação da terra antes de iniciar o lançamento do contrapiso." },
        { id: "3-2", title: "Aula 2 - Como FAZER MASSA para CONTRAPISO medida PERFEITA", videoId: "-ZkeWpSzXgo", description: "Qual a melhor dosagem de cimento e areia úmida (massa farofa) para piso interno e externo." },
        { id: "3-3", title: "Aula 3 - Nivelamento com mestras", videoId: "IeJLdpf_X9o", description: "Como bater nível nos cantos do cômodo e fixar taliscas e mestras de referência." },
        { id: "3-4", title: "Aula 4 - Aplicação e espalhamento do contrapiso", videoId: "aEeuGOZHdrE", description: "Como espalhar a massa farofa, compactar com soquete de madeira e sarrafear com régua." },
        { id: "3-5", title: "Aula 5 - Cura e tempo de secagem", videoId: "uHibdc3nYQs", description: "O tempo de cura do contrapiso antes de iniciar o assentamento cerâmico." },
        { id: "3-6", title: "Aula 6 - Cola e argamassa colante, qual usar?", videoId: "dm12x0D52hA", description: "A diferença prática entre argamassas AC1, AC2 e AC3 e qual escolher para cada tamanho de peça." },
        { id: "3-7", title: "Aula 7 - Técnicas de assentamento de cerâmica", videoId: "dyVtuUH5pR8", description: "Como aplicar argamassa dupla face e assentar peças cerâmicas usando martelo de borracha e niveladores de piso." },
        { id: "3-8", title: "Aula 8 - Cortes e arremates nas bordas", videoId: "6Qtqlvh87lk", description: "Uso do cortador manual (riscador) e esmerilhadeira para fazer recortes em ralos, portas e cantos de parede." },
        { id: "3-9", title: "Aula 9 - Rejuntes e acabamentos finais", videoId: "w_bN0bhHVDE", description: "Limpeza das juntas, aplicação correta do rejunte e limpeza das peças pós-obra." }
      ]
    },
    {
      id: 4,
      title: "Bônus - Elétrica Residencial",
      image: "/images/bonus.jpg",
      description: "Módulo bônus exclusivo com aulas práticas completas de instalações e manutenções elétricas residenciais.",
      isBonus: true,
      lessons: [
        { id: "4-1", title: "Aula 1 - Grandezas elétricas e conceito atômico", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/001-Grandezas-eletricas-e-conceito-atomico.mp4", description: "Conceitos fundamentais da física de eletricidade e átomos." },
        { id: "4-2", title: "Aula 2 - Corrente Contínua vs Alternada", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/002-Diferenca-de-corrente-continua-e-alternada.mp4", description: "Entenda a diferença entre a corrente de baterias e a que vem da rede elétrica." },
        { id: "4-3", title: "Aula 3 - Cálculos Básicos de Elétrica", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/003-Calculos-basicos-da-eletrica-triangulo-da-tensao-e-da-potencia.mp4", description: "Aprenda a calcular tensão, corrente e potência elétrica residencial." },
        { id: "4-4", title: "Aula 4 - Tipos de Condutores Elétricos", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/001-Condutores-eletricos-tipos-barramento-cabo-e-fio-e-Padrao-de.mp4", description: "Tipos de condutores como barramentos, cabos e fios." },
        { id: "4-5", title: "Aula 5 - Emendas Elétricas Fio a Fio", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/002-Emendas-eletricas-fio-a-fio-e-isolantes-eletricos.mp4", description: "Como fazer emendas de condutores de forma segura usando isolantes." },
        { id: "4-6", title: "Aula 6 - Emendas com Conectores", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/003-Emendas-com-conectores-eletricos.mp4", description: "Técnica de emendas utilizando conectores modernos de encaixe rápido." },
        { id: "4-7", title: "Aula 7 - Dimensionamento de Cabos", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/004-Dimensionamento-de-cabos-conforme-NBR-5410.mp4", description: "Como calcular a espessura de cabos recomendada de acordo com as normas da NBR 5410." },
        { id: "4-8", title: "Aula 8 - Segurança e EPIs (NR-10)", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/001-Seguranca-em-servicos-eletricos-e-EPIs-NR-10.mp4", description: "Instruções de segurança indispensáveis para serviços elétricos." },
        { id: "4-9", title: "Aula 9 - Tipos de Disjuntores e Dimensionamento", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/002-Disjuntores-Tipos-aplicacao-funcao-funcionamento-e-dimensionamento.mp4", description: "Entenda o funcionamento de disjuntores e como escolher o correto para seu circuito." },
        { id: "4-10", title: "Aula 10 - Instalação de DPS", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/003-DPS-Tipos-aplicacao-funcao-funcionamento-e-dimensionamento-1.mp4", description: "Como instalar Dispositivos de Proteção contra Surtos elétricos." },
        { id: "4-11", title: "Aula 11 - Instalação de IDR", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/004-IDR-Tipos-aplicacao-funcao-funcionamento-e-dimensionamento.mp4", description: "Instalação do dispositivo de proteção contra choque elétrico IDR." },
        { id: "4-12", title: "Aula 12 - Ferramentas Básicas do Eletricista", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/001-Ferramentas-basicas-de-um-eletricista-e-a-funcao-de-cada-uma.mp4", description: "Quais ferramentas ter na sua maleta e para que serve cada uma." },
        { id: "4-13", title: "Aula 13 - Como usar Multímetro", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/002-Como-usar-multimetroalicate-amperimetro.mp4", description: "Uso do multímetro e alicate amperímetro para testes de tensão e corrente." },
        { id: "4-14", title: "Aula 14 - Instalação de Interruptor Simples", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/001-Instalacao-de-interruptor-simples.mp4", description: "Esquema prático de ligação de interruptor simples." },
        { id: "4-15", title: "Aula 15 - Interruptores Duplos e Triplos", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/002-Instalacao-de-interruptor-duplo-e-triplo.mp4", description: "Como ligar chaves conjugadas." },
        { id: "4-16", title: "Aula 16 - Paralelo (Three Way) e Intermediário", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/003-Instalacao-de-interruptor-paralelo-three-way-e-intermediario.mp4", description: "Técnica de ligação paralela de lâmpadas." },
        { id: "4-17", title: "Aula 17 - Instalação de Tomadas NBR 14136", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/004-Instalacao-de-tomadas-conforme-NBR-14136-e-divisao-de-circuito.mp4", description: "Fixação e fiação de tomadas conforme padrão brasileiro." },
        { id: "4-18", title: "Aula 18 - Tomadas de 10A e 20A", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/005-Instalacao-de-tomadas-simples-dupla-e-tripla-de-10-e-20-Amperes.mp4", description: "Diferenças práticas e instalação física de tomadas normais e para eletrodomésticos pesados." },
        { id: "4-19", title: "Aula 19 - Tomada com Interruptor Combinado", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/006-Instalacao-de-tomada-com-interruptor-no-mesmo-ponto.mp4", description: "Como alimentar tomada e lâmpada na mesma caixinha 4x2." },
        { id: "4-20", title: "Aula 20 - Sensor de Presença", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/007-Instalacao-de-sensor-de-presenca-com-e-sem-interruptor.mp4", description: "Configuração e instalação elétrica de sensores de iluminação." }
      ]
    },
    {
      id: 5,
      title: "Bônus - Hidráulica Residencial",
      image: "/images/bonus.jpg",
      description: "Módulo bônus exclusivo focado em instalações de água fria, caixa d'água, drenagens e tratamentos de esgoto.",
      isBonus: true,
      isHydraulics: true,
      lessons: [
        { id: "5-1", title: "Aula 1 - Instalação Hidráulica Residencial", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/Instalacao-Hidraulica-Principais-Componentes-de-uma-Residencia.mp4", description: "Visão geral das tubulações hidráulicas em construções." },
        { id: "5-2", title: "Aula 2 - Instalações de Água Fria (NBR 5626)", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/Aula-1-Instalacoes-de-Agua-Fria-Fundamentos-e-Evolucao-das-Redes-Prediais-💧-NBR-5626.mp4", description: "Normas e fundação das redes prediais de água." },
        { id: "5-3", title: "Aula 3 - Drenagem de Banheiro", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/WATCH-THIS-VIDEO-FIRST-AND-THEN-YOU-CAN-DO-YOUR-BATHROOM-DRAINAGE.mp4", description: "Todo o esquema de caída e tubos de drenagem sanitária." },
        { id: "5-4", title: "Aula 4 - Válvula de Pressão de Caixa d'Água", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/Aprenda-como-instalar-valvula-na-caixa-dagua-para-aumentar-pressao-de-chuveiro-e-torneiras.mp4", description: "Instalação de válvula reguladora para aumentar a pressão de água nas torneiras." },
        { id: "5-5", title: "Aula 5 - Como aumentar a pressão da água", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/COMO-AUMENTAR-A-PRESSAO-DA-AGUA.mp4", description: "Macetes de bombeamento e gravidade." },
        { id: "5-6", title: "Aula 6 - Como Fazer Caixa de Esgoto", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/Como-Fazer-Caixa-de-Esgoto-de-Concreto.mp4", description: "Construção física da caixa de inspeção de esgoto residencial." },
        { id: "5-7", title: "Aula 7 - Bomba Pressurizadora", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/INSTALACAO-DE-BOMBA-PRESSURIZADORA.mp4", description: "Instalação física de bomba pressurizadora de vazão." },
        { id: "5-8", title: "Aula 8 - Instalação de Água Fria e Esgoto", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/Como-fazer-a-instalacao-de-agua-fria-e-esgoto-de-banheiro-cozinha-e-area-de-servico-1.mp4", description: "Guias práticos de instalação de canos em pias, sifão e chuveiros." },
        { id: "5-9", title: "Aula 9 - Tratamento de Esgoto Doméstico", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/TRATAMENTO-DE-ESGOTO.mp4", description: "Sistemas básicos de tratamento e descarte." },
        { id: "5-10", title: "Aula 10 - Fazer Esgoto Residencia Parte 17", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/FACA-SUA-CASA-ESGOTO-DA-CASA-17.mp4", description: "Montagem passo a passo final de tubulações de esgoto." },
        { id: "5-11", title: "Aula 11 - Como Achar Vazamento de Água", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/VEJA-COMO-e-FACIL-achar-vazamento-de-agua.mp4", description: "Técnicas fáceis para localizar infiltrações ocultas." },
        { id: "5-12", title: "Aula 12 - Como Consertar Cano Furado na Parede", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/COMO-CONSERTAR-CANO-FURADO-NA-PAREDE-TUBO-DE-AGUA-FURADO-COMO-CONSERTAR-SIMPLES-E-RAPIDO.mp4", description: "Tapa furos e remendos de canos sem precisar quebrar a parede toda." },
        { id: "5-13", title: "Aula 13 - Instalação Fácil de Caixa d'Água", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/Caixa-dAgua-INSTALACAO-FACIL-em-Poucos-Passos.mp4", description: "Fixação e entrada de tubulações na caixa d'água." },
        { id: "5-14", title: "Aula 14 - Desentupimento de Pia com Furadeira", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/Como-desentupir-pia-em-minutos-com-ajuda-da-furadeira.mp4", description: "Uso do desentupidor espiral acoplado à furadeira." },
        { id: "5-15", title: "Aula 15 - Desentupimento de Vaso Sanitário", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/Como-desentupir-vaso-em-1-minuto.mp4", description: "Macetes de pressão e vácuo." },
        { id: "5-16", title: "Aula 16 - Desentupimento de Ralo de Banheiro", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/Como-DESENTUPIR-RALO-de-BANHEIRO-sem-precisar-quebrar.mp4", description: "Técnicas eficientes sem quebra." },
        { id: "5-17", title: "Aula 17 - Limpeza e Higienização de Caixa d'Água", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/Como-limpar-a-CAIXA-DAGUA-10-passos-para-higienizacao-da-caixa-dagua.mp4", description: "10 passos para higienização completa." },
        { id: "5-18", title: "Aula 18 - Consertar Vazamento pelo Ladrão", videoId: "", videoUrl: "https://conexaoplay.com/wp-content/uploads/2026/03/Como-consertar-caixa-dagua-vazando-pelo-ladrao-agua-vazamento-001.mp4", description: "Regulação de boia e conserto de vazamentos." }
      ]
    },
    {
      id: 6,
      title: "Treinamento - Projetos de Porcelanato",
      image: "/images/porcelanato.jpg",
      description: "Modelos estruturados de bancadas, ilhas, áreas gourmet e nichos em porcelanato para download.",
      isBonus: true,
      lessons: [
        { id: "6-1", title: "Ilhas e Bancadas de Porcelanato", videoId: "pdf", videoUrl: "/porcelanato/ILHAS E BANCADAS DE PORCELANATO.pdf", description: "Clique no botão abaixo para baixar o PDF completo de Ilhas e Bancadas em Porcelanato." },
        { id: "6-2", title: "Áreas Gourmet em Porcelanato", videoId: "pdf", videoUrl: "/porcelanato/AREAS GOURMET.pdf", description: "Clique no botão abaixo para baixar o PDF completo de Áreas Gourmet em Porcelanato." },
        { id: "6-3", title: "Painéis e Detalhes Decorativos", videoId: "pdf", videoUrl: "/porcelanato/PAINÉIS E DETALHES DECORATIVOS.pdf", description: "Clique no botão abaixo para baixar o PDF completo de Painéis e Detalhes Decorativos." },
        { id: "6-4", title: "Nichos Embutidos em Porcelanato", videoId: "pdf", videoUrl: "/porcelanato/NICHOS EMBUTIDOS EM PORCELANATO.pdf", description: "Clique no botão abaixo para baixar o PDF completo de Nichos Embutidos em Porcelanato." },
        { id: "6-5", title: "Banheiros Modernos em Porcelanato - Parte 1", videoId: "pdf", videoUrl: "/porcelanato/BANHEIROS MODERNOS EM PORCELANATO PARTE 1.pdf", description: "Clique no botão abaixo para baixar a Parte 1 do PDF de Banheiros Modernos." },
        { id: "6-6", title: "Banheiros Modernos em Porcelanato - Parte 2", videoId: "pdf", videoUrl: "/porcelanato/BANHEIROS MODERNOS EM PORCELANATO PARTE 2.pdf", description: "Clique no botão abaixo para baixar a Parte 2 do PDF de Banheiros Modernos." },
        { id: "6-7", title: "Cozinhas Modernas em Porcelanato - Parte 1", videoId: "pdf", videoUrl: "/porcelanato/COZINHAS MODERNAS EM PORCELANATO PARTE 1.pdf", description: "Clique no botão abaixo para baixar a Parte 1 do PDF de Cozinhas Modernas." },
        { id: "6-8", title: "Cozinhas Modernas em Porcelanato - Parte 2", videoId: "pdf", videoUrl: "/porcelanato/COZINHAS MODERNAS EM PORCELANATO PARTE 2.pdf", description: "Clique no botão abaixo para baixar a Parte 2 do PDF de Cozinhas Modernas." }
      ]
    },
    {
      id: 7,
      title: "Treinamento - Fabricação de Cubas",
      image: "/images/cubas.jpg",
      description: "Guias práticos para criar e moldar cubas de concreto de alto padrão e efeitos rústicos decorativos.",
      isBonus: true,
      lessons: [
        { id: "7-1", title: "Cubas de Concreto de Alto Padrão", videoId: "pdf", videoUrl: "/cubas/Cubas de Concreto de Alto Padrao.pdf", description: "Clique no botão abaixo para baixar o guia completo de Fabricação de Cubas de Concreto de Alto Padrão." },
        { id: "7-2", title: "Cubas de Concreto HPC de Alto Desempenho", videoId: "pdf", videoUrl: "/cubas/Cubas de Concreto HPC de Alto Desempenho.pdf", description: "Clique no botão abaixo para baixar o PDF de Cubas de Concreto HPC de Alto Desempenho." },
        { id: "7-3", title: "Efeito Mármore em Cubas de Concreto", videoId: "pdf", videoUrl: "/cubas/Efeito de Marmore em Cubas de Concreto.pdf", description: "Clique no botão abaixo para baixar o PDF do guia prático de Efeito Mármore em Cubas." },
        { id: "7-4", title: "Efeito Paris em Cubas de Concreto", videoId: "pdf", videoUrl: "/cubas/Efeito Paris em Cubas de Concreto.pdf", description: "Clique no botão abaixo para baixar o PDF do guia de Efeito Paris em Cubas de Concreto." },
        { id: "7-5", title: "Efeito Granito - Acabamento Rústico de Alta Demanda", videoId: "pdf", videoUrl: "/cubas/Efeito Granito o Acabamento Rustico de Alta Demanda.pdf", description: "Clique no botão abaixo para baixar o PDF de Efeito Granito e acabamentos rústicos." }
      ]
    }
  ]
};
