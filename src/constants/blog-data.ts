export const BLOG_POSTS = [
    {
        id: 12,
        title: "Cilindros Hidráulicos de Simples Ação: tipos, vantagens e como escolher",
        excerpt: "Seis anos após o artigo original, uma revisão ampliada — mais completa, mais comentada e com uma indicação clara de qual modelo escolher em cada situação.",
        category: "Técnico",
        date: "07 Mai, 2026",
        type: "artigo",
        slug: "cilindros-simples-acao-tipos-vantagens-como-escolher",
        image: "/images/sa-capa.jpg",   // ← substitua pelo nome da sua imagem de capa
        contentBlocks: [
            {
                type: "text",
                content: "Revisão ampliada do artigo originalmente publicado em 2020. Seis anos depois, reescrevi este texto, mais completo, mais comentado e, desta vez, com uma indicação clara de qual modelo escolher em cada situação."
            },
            {
                type: "heading",
                level: 2,
                content: "1. O que é, e o que não é, um cilindro de simples ação"
            },
            {
                type: "text",
                content: "Um cilindro de simples ação usa a força hidráulica em um único sentido. O retorno, no sentido inverso, é feito por uma ação externa ao cilindro, o peso do próprio equipamento, uma mola ou ar comprimido. Qual dos movimentos será o de \"força\" (avanço ou recolhimento) é uma decisão de projeto do equipamento, definida na concepção, e não uma característica fixa do cilindro hidráulico."
            },
            {
                type: "text",
                content: "Aqui está o mal-entendido mais comum, e que vale corrigir logo: \"simples\" não quer dizer \"mais barato\" nem \"mais simples por dentro\". Em vários casos, a construção interna de um simples ação é tão ou mais elaborada que a de um dupla ação, o termo se refere apenas a usar a pressão hidráulica em um sentido, não à complexidade do cilindro. Tratar o simples ação como a \"versão econômica\" do dupla ação é um erro de especificação."
            },
            {
                type: "text",
                content: "O que ele realmente é: uma escolha de engenharia. Quando a aplicação já oferece a força de retorno, gravidade, carga ou mola, você troca o retorno pressurizado por menos componentes, comando hidráulico mais simples e reservatório menor. É uma troca deliberada. O resto deste artigo é sobre quando ela compensa e qual das três construções usar."
            },
            {
                type: "image",
                src: "/images/sa-img1.jpg",      // ← substitua
                alt: "Cilindro hidráulico de simples ação",
                caption: ""                        // ← legenda opcional
            },
            {
                type: "heading",
                level: 2,
                content: "2. Como o cilindro retorna, e por que essa é a primeira decisão"
            },
            {
                type: "text",
                content: "Antes de escolher o tipo de cilindro, há uma decisão que vem primeiro: como ele vai voltar. Como a força hidráulica atua em um só sentido, o retorno depende inteiramente de algo externo, e são três os caminhos."
            },
            {
                type: "text",
                content: "Gravidade. O mais simples e o mais robusto: o peso do próprio equipamento empurra a haste de volta quando a pressão é aliviada. Não há peça adicional para falhar. Funciona bem quando o cilindro trabalha na vertical ou em ângulo suficiente para que a carga garanta o retorno, levante de caçamba, plataforma, implemento agrícola. Tire o ângulo favorável e tira-se a confiabilidade do método."
            },
            {
                type: "text",
                content: "Mola, interna ou externa. Quando a montagem é horizontal ou em ângulo que não favorece a gravidade, a mola fornece a força de retorno independente da posição. A interna é compacta e protegida, mas ocupa espaço dentro do cilindro, consome parte da força de avanço e limita o curso. A externa é mais fácil de inspecionar e trocar e dá mais liberdade de curso, mas fica exposta ao ambiente. Em ambos os casos, mola é componente de fadiga: tem vida útil e deve entrar no plano de manutenção."
            },
            {
                type: "image",
                src: "/images/sa-img2.jpg",      // ← substitua
                alt: "Métodos de retorno em cilindros de simples ação",
                caption: ""
            }
            // Continue adicionando blocos aqui conforme cola o restante do texto
        ]
    },
    {
        id: 1,
        title: "Cilindro Hidráulico Telescópico Dupla Ação com 3 Estágios",
        excerpt: "Projeto e execução conforme necessidade e demanda. Desenvolvido para trabalhar na horizontal ou vertical com força de atuação em ambos os sentidos.",
        category: "Vídeo",
        date: "22 Mai, 2025",
        type: "video",
        youtubeId: "-0-S_Sznidg",
        slug: "cilindro-telescopico-dupla-acao-3-estagios",
        image: "/images/Cilindros-hid9.jpg",
        content: "Neste vídeo, demonstramos o funcionamento de um Cilindro Hidráulico Telescópico de Dupla Ação com 3 Estágios. Este equipamento foi projetado sob medida para atender demandas específicas de força de atuação em ambos os sentidos, podendo operar de forma eficiente tanto na posição horizontal quanto na vertical."
    },
    {
        id: 2,
        title: "Teste e Manutenção de Cilindro Haste Passante",
        excerpt: "Acompanhe a transformação de um cilindro dupla ação em cilindro com haste passante, incluindo brunimento e testes hidrostáticos.",
        category: "Manutenção",
        date: "20 Mai, 2020",
        type: "video",
        youtubeId: "6ne9eAW4Ddc",
        slug: "manutencao-cilindro-haste-passante",
        image: "/images/manutencao.jpg",
        content: "Apresentamos um serviço completo de manutenção e transformação. O vídeo detalha a conversão de um cilindro hidráulico de dupla ação (camisa de ø 260mm e haste de ø 150mm, 300BAR) em um cilindro com haste passante. O processo incluiu brunimento, instalação de novos êmbolos, troca de vedação e rigorosos testes hidrostáticos."
    },
    {
        id: 3,
        title: "Cilindro Hidráulico com Amortecimento Regulável",
        excerpt: "Entenda como o amortecimento regulável evita impactos no final do curso e aumenta a vida útil do seu equipamento.",
        category: "Técnico",
        date: "29 Set, 2019",
        type: "video",
        youtubeId: "Wnz8pTJiGyk",
        slug: "cilindro-amortecimento-regulavel",
        image: "/images/Cilindros-hid3.jpg",
        content: "Nesta demonstração técnica, explicamos a importância do amortecimento em cilindros hidráulicos. Mostramos como a regulagem permite uma velocidade reduzida e controlada no final do curso, evitando pancadas que podem causar danos ao cilindro e à máquina. O sistema pode ser instalado na parte dianteira, traseira ou em ambos os lados."
    },
    {
        id: 4,
        title: "Cilindro Telescópico Dupla Ação para Motor Home",
        excerpt: "Desenvolvimento e fabricação de cilindro dupla ação aplicado especificamente para o nivelamento seguro de motor homes.",
        category: "Aplicações",
        date: "19 Set, 2025",
        type: "video",
        youtubeId: "mt6P6JokNhQ",
        slug: "cilindro-telescopico-motor-home",
        image: "/images/Cilindros-hid1.png",
        content: "Apresentamos uma aplicação prática e muito procurada: cilindros hidráulicos telescópicos de dupla ação desenvolvidos exclusivamente para sistemas de nivelamento de motor homes, garantindo estabilidade e precisão para os veículos."
    },
    {
        id: 5,
        title: "Apresentação de Fabricação e Linha PATROL®️",
        excerpt: "Conheça a estrutura da Incocil e nossa linha completa de fabricação de cilindros hidráulicos da marca PATROL.",
        category: "Institucional",
        date: "08 Abr, 2019",
        type: "video",
        youtubeId: "5xMb_RlhhF0",
        slug: "apresentacao-incocil-linha-patrol",
        image: "/images/incocil-predio.png",
        content: "Um vídeo institucional que abre as portas da nossa fábrica. Conheça as instalações da Incocil, nossa capacidade técnica e os rigorosos padrões de qualidade que aplicamos na fabricação dos cilindros hidráulicos da marca PATROL®️."
    },
    {
        id: 6,
        title: "Cilindro Hidráulico Telescópico 4 Estágios - Dupla Ação",
        excerpt: "Projeto e fabricação de cilindro hidráulico telescópico de dupla ação, desenvolvido para atuar também na posição horizontal.",
        category: "Projetos",
        date: "15 Ago, 2023",
        type: "video",
        youtubeId: "ozOIxbLX0AM", // Substitua pelo ID real do vídeo do YouTube
        slug: "cilindro-telescopico-4-estagios-dupla-acao",
        image: "/images/Cilindros-hid6.png",
        content: "Projeto e fabricação de cilindro hidráulico telescópico, dupla ação (pode ser utilizado na horizontal). O projeto contempla entrada e saída de óleo na lateral do tubo, porém poderiam ser configuradas na extremidade da haste, conforme a necessidade específica do cliente."
    },
    {
        id: 7,
        title: "Teste de Sincronismo em Cilindros Mestre-Escravo",
        excerpt: "Veja na prática o teste de sincronismo em cilindros hidráulicos dupla ação operando com batente frontal limitador.",
        category: "Técnico",
        date: "10 Jul, 2023",
        type: "video",
        youtubeId: "oyBx4Mt5L9I", // Substitua pelo ID real do vídeo do YouTube
        slug: "teste-sincronismo-cilindros-mestre-escravo",
        image: "/images/Cilindros-hid8.png",
        content: "Demonstração do teste de sincronismo em cilindros hidráulicos dupla ação, montados no formato Mestre-Escravo. Ambos os cilindros foram fabricados com batente frontal para limitar o curso no fechamento. Este tipo de batente é comumente utilizado para a inclusão de calços que limitam o curso diretamente no equipamento."
    },
    {
        id: 8,
        title: "Cilindro Hidráulico Telescópico de 4 Estágios (190Bar)",
        excerpt: "Análise técnica de cilindro com alimentação externa capaz de exercer até 19 toneladas de força no estágio maior.",
        category: "Aplicações",
        date: "05 Jun, 2023",
        type: "video",
        youtubeId: "XCjN7T4wYHU", // Substitua pelo ID real do vídeo do YouTube
        slug: "cilindro-telescopico-4-estagios-190bar",
        image: "/images/Cilindros-hid2.png",
        content: "Apresentação de um Cilindro Hidráulico 4 estágios Dupla Ação com alimentação de entrada e saída de óleo no tubo externo. Trabalhando a 190Bar de pressão, este modelo exerce uma força de 1,6Ton no estágio menor e de impressionantes 19Ton no estágio maior."
    },
    {
        id: 9,
        title: "Cilindros Telescópicos Customizados para Grandes Cursos",
        excerpt: "Solução de engenharia para quando se necessita de um equipamento super compacto fechado, mas com grande alcance aberto.",
        category: "Projetos",
        date: "20 Mai, 2023",
        type: "video",
        youtubeId: "1e6izCgOskY", // Substitua pelo ID real do vídeo do YouTube
        slug: "cilindros-telescopicos-customizados",
        image: "/images/Cilindros-hid5.png",
        content: "Neste desenvolvimento customizado, a engenharia da Incocil focou em possibilitar um pequeno comprimento quando totalmente recolhido, conseguindo atingir um comprimento aberto superior ao seu comprimento fechado (cursos superiores ao tamanho original). É a solução ideal quando se deseja utilizar somente 1 cilindro para grandes cursos ou quando o espaço de instalação é extremamente limitado."
    }
];