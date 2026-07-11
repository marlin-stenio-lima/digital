export interface Lesson {
  id: string;
  title: string;
  videoId: string;
  description: string;
}

export interface Module {
  id: number;
  title: string;
  image: string;
  description: string;
  lessons?: Lesson[];
  isBonusRedirect?: boolean;
}

export const PEDREIRO_COURSE_DATA = {
  courseName: "Curso Mestre de Obras & Pedreiro Profissional",
  bonusRedirectUrl: "https://aprendaemcasaagora.com/", // Link de Upsell de elétrica/hidráulica
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
      title: "Bônus: Elétrica & Hidráulica",
      image: "/images/bonus.jpg",
      description: "Clique abaixo para acessar o nosso curso bônus e dominar as instalações de eletricidade e encanamentos residenciais.",
      isBonusRedirect: true
    }
  ]
};
