'use client'

function Objetos() {

    const listaNumeros = [3, 10, 9, 7, 821, -9999]
    const listaNomes = ["Luan","Marcio","Alex","Tanan"]

    const usuario = { 
        nome: "Conrado",
        dataNascimento: "14/10/1995",
        idade: 30,
        admin: true
    }

    const listaUsuarios = [
        {
            id: 7,
            nome: "Quati",
            email: "quati.voador@patinete.br",
            enderecos: [
                "Rua episcopal",
                "Rua Sampaio",
                "Praça XV"
            ],
            dependentes: [
                {
                    nome: "Pedrinho",
                    parentesco: "filho"
                },
                {
                    nome: "Pedrinho",
                    parentesco: "filho"
                }
            ]
        },
        {
            id: 32,
            nome: "Gilbarte",
            email: "labaleia@batatinha.uk"
        },
        {
            id: 99,
            nome: "Ornitorrinco",
            email: "o_lojista_de_laringes@comercial.com"
        }
    ]

    return (
        <div>
            <h1>Objetos em JavaScript</h1>
            <p>Conhecendo o famoso JSON, a estrutura mais usada da programação</p>
            
            <p> Seja bem-vindo {usuario.nome} você nasceu em {usuario.dataNascimento} e tem {usuario.idade} anos. </p>
            <p> Top 5 melhores númers: { listaNumeros[5] } </p>
            <p> Top 3 bichos: { listaUsuarios[1].nome } </p>

        </div>
    );
}

export default Objetos;