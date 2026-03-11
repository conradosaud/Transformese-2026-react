import "./Listagem.css"

function Listagem() {

    const listaAves = [
        {
            nome: "Arara Azul",
            cor: "Azul com detalhes amarelos",
            especie: "Anodorhynchus hyacinthinus",
            habitat: "Florestas tropicais e áreas de cerrado",
            alimentacao: "Sementes e frutas"
        },
        {
            nome: "Tucano Toco",
            cor: "Preto com peito branco e bico laranja",
            especie: "Ramphastos toco",
            habitat: "Florestas e savanas",
            alimentacao: "Frutas, insetos e pequenos vertebrados"
        },
        {
            nome: "Bem-te-vi",
            cor: "Marrom, amarelo e branco",
            especie: "Pitangus sulphuratus",
            habitat: "Áreas urbanas, campos e florestas",
            alimentacao: "Insetos e frutas"
        },
        {
            nome: "Sabiá-laranjeira",
            cor: "Marrom com ventre alaranjado",
            especie: "Turdus rufiventris",
            habitat: "Jardins, parques e florestas",
            alimentacao: "Frutas e insetos"
        },
        {
            nome: "Coruja-buraqueira",
            cor: "Marrom com manchas brancas",
            especie: "Athene cunicularia",
            habitat: "Campos abertos e pastagens",
            alimentacao: "Insetos e pequenos roedores"
        },
        {
            nome: "Flamingo",
            cor: "Rosa",
            especie: "Phoenicopterus ruber",
            habitat: "Lagos salgados e áreas costeiras",
            alimentacao: "Algas e pequenos crustáceos"
        },
        {
            nome: "Pinguim-imperador",
            cor: "Preto e branco com detalhes amarelos",
            especie: "Aptenodytes forsteri",
            habitat: "Regiões geladas da Antártida",
            alimentacao: "Peixes e lulas"
        },
        {
            nome: "Águia-careca",
            cor: "Marrom com cabeça branca",
            especie: "Haliaeetus leucocephalus",
            habitat: "Próximo a rios e lagos",
            alimentacao: "Peixes e pequenos mamíferos"
        },
        {
            nome: "Garça-branca-grande",
            cor: "Branca",
            especie: "Ardea alba",
            habitat: "Áreas alagadas e margens de rios",
            alimentacao: "Peixes e anfíbios"
        },
        {
            nome: "Canário-da-terra",
            cor: "Amarelo",
            especie: "Sicalis flaveola",
            habitat: "Campos e áreas abertas",
            alimentacao: "Sementes"
        },
        {
            nome: "Papagaio-verdadeiro",
            cor: "Verde com detalhes vermelhos",
            especie: "Amazona aestiva",
            habitat: "Florestas tropicais",
            alimentacao: "Frutas e sementes"
        },
        {
            nome: "Calopsita",
            cor: "Cinza com face amarela",
            especie: "Nymphicus hollandicus",
            habitat: "Áreas abertas e savanas",
            alimentacao: "Sementes"
        },
        {
            nome: "Periquito-australiano",
            cor: "Verde e amarelo",
            especie: "Melopsittacus undulatus",
            habitat: "Áreas áridas e semiáridas",
            alimentacao: "Sementes"
        },
        {
            nome: "João-de-barro",
            cor: "Marrom-avermelhado",
            especie: "Furnarius rufus",
            habitat: "Campos e áreas urbanas",
            alimentacao: "Insetos"
        },
        {
            nome: "Beija-flor",
            cor: "Variadas e iridescentes",
            especie: "Trochilidae",
            habitat: "Florestas e jardins",
            alimentacao: "Néctar"
        },
        {
            nome: "Andorinha",
            cor: "Azul-escuro e branco",
            especie: "Hirundinidae",
            habitat: "Áreas abertas e urbanas",
            alimentacao: "Insetos"
        },
        {
            nome: "Albatroz",
            cor: "Branco e preto",
            especie: "Diomedeidae",
            habitat: "Oceanos",
            alimentacao: "Peixes e lulas"
        },
        {
            nome: "Gaivota",
            cor: "Branca e cinza",
            especie: "Laridae",
            habitat: "Regiões costeiras",
            alimentacao: "Peixes e restos orgânicos"
        },
        {
            nome: "Falcão-peregrino",
            cor: "Cinza-azulado",
            especie: "Falco peregrinus",
            habitat: "Montanhas e áreas urbanas",
            alimentacao: "Outras aves"
        },
        {
            nome: "Gavião-carijó",
            cor: "Cinza com listras",
            especie: "Rupornis magnirostris",
            habitat: "Florestas e áreas urbanas",
            alimentacao: "Pequenos vertebrados"
        },
        {
            nome: "Cisne-branco",
            cor: "Branco",
            especie: "Cygnus olor",
            habitat: "Lagos e lagoas",
            alimentacao: "Plantas aquáticas"
        },
        {
            nome: "Maritaca",
            cor: "Verde",
            especie: "Psittacara leucophthalmus",
            habitat: "Florestas e áreas urbanas",
            alimentacao: "Frutas e sementes"
        },
        {
            nome: "Corvo",
            cor: "Preto",
            especie: "Corvus corax",
            habitat: "Diversos ambientes",
            alimentacao: "Onívoro"
        },
        {
            nome: "Pardal",
            cor: "Marrom e cinza",
            especie: "Passer domesticus",
            habitat: "Áreas urbanas",
            alimentacao: "Grãos e insetos"
        },
        {
            nome: "Pato-mandarim",
            cor: "Colorido (laranja, verde e branco)",
            especie: "Aix galericulata",
            habitat: "Lagos e rios",
            alimentacao: "Sementes e insetos"
        },
        {
            nome: "Pato-selvagem",
            cor: "Marrom com cabeça verde (macho)",
            especie: "Anas platyrhynchos",
            habitat: "Lagos e rios",
            alimentacao: "Plantas aquáticas e insetos"
        },
        {
            nome: "Galo",
            cor: "Variadas",
            especie: "Gallus gallus domesticus",
            habitat: "Áreas rurais",
            alimentacao: "Grãos e insetos"
        },
        {
            nome: "Pavão",
            cor: "Azul e verde metálico",
            especie: "Pavo cristatus",
            habitat: "Florestas e fazendas",
            alimentacao: "Grãos e insetos"
        },
        {
            nome: "Urubu",
            cor: "Preto",
            especie: "Coragyps atratus",
            habitat: "Áreas abertas e urbanas",
            alimentacao: "Carniça"
        },
        {
            nome: "Condor-andino",
            cor: "Preto com colar branco",
            especie: "Vultur gryphus",
            habitat: "Cordilheiras e montanhas",
            alimentacao: "Carniça"
        },
        {
            nome: "Pica-pau",
            cor: "Preto, branco e vermelho",
            especie: "Picidae",
            habitat: "Florestas",
            alimentacao: "Insetos"
        },
        {
            nome: "Rolinha",
            cor: "Marrom-claro",
            especie: "Columbina talpacoti",
            habitat: "Áreas urbanas e campos",
            alimentacao: "Sementes"
        },
        {
            nome: "Ema",
            cor: "Cinza e marrom",
            especie: "Rhea americana",
            habitat: "Campos e cerrados",
            alimentacao: "Plantas e insetos"
        },
        {
            nome: "Avestruz",
            cor: "Preto e branco (macho)",
            especie: "Struthio camelus",
            habitat: "Savanas",
            alimentacao: "Plantas e sementes"
        },
        {
            nome: "Cacatua",
            cor: "Branca com crista amarela",
            especie: "Cacatuidae",
            habitat: "Florestas tropicais",
            alimentacao: "Sementes e frutas"
        },
        {
            nome: "Garça-azul",
            cor: "Azul-acinzentado",
            especie: "Egretta caerulea",
            habitat: "Áreas alagadas",
            alimentacao: "Peixes"
        },
        {
            nome: "Cardeal",
            cor: "Vermelho vibrante",
            especie: "Cardinalis cardinalis",
            habitat: "Bosques e jardins",
            alimentacao: "Sementes e insetos"
        },
        {
            nome: "Tangará",
            cor: "Colorido (azul, verde, vermelho)",
            especie: "Chiroxiphia caudata",
            habitat: "Florestas tropicais",
            alimentacao: "Frutas"
        },
        {
            nome: "Maçarico",
            cor: "Marrom e branco",
            especie: "Scolopacidae",
            habitat: "Áreas costeiras",
            alimentacao: "Pequenos invertebrados"
        },
        {
            nome: "Tesourinha",
            cor: "Preto",
            especie: "Tyrannus savana",
            habitat: "Campos e áreas abertas",
            alimentacao: "Insetos"
        }
    ];

    return (
        <div>

            <h1>Listagem de aves bonitas</h1>
            <hr />

            {
                listaAves.map(
                    item => <p> {item.nome} </p>
                )
            }

        </div>
    );
}

export default Listagem;