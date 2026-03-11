'use client'
import { useState } from "react";

function Carros() {

    const [exibeListagem, alteraExibeListagem] = useState(true)

    const [nome, alteraNome] = useState("")
    const [marca, alteraMarca] = useState("")
    const [valor, alteraValor] = useState()

    const [listaCarros, alteraListaCarros] = useState([
        {
            "nome": "Civic",
            "marca": "Honda",
            "cor": "Prata",
            "valor": 120000
        },
        {
            "nome": "Corolla",
            "marca": "Toyota",
            "cor": "Preto",
            "valor": 115000
        },
        {
            "nome": "Onix",
            "marca": "Chevrolet",
            "cor": "Branco",
            "valor": 85000
        },
        {
            "nome": "HB20",
            "marca": "Hyundai",
            "cor": "Vermelho",
            "valor": 78000
        },
        {
            "nome": "Gol",
            "marca": "Volkswagen",
            "cor": "Azul",
            "valor": 70000
        },
        {
            "nome": "Compass",
            "marca": "Jeep",
            "cor": "Cinza",
            "valor": 165000
        },
        {
            "nome": "Renegade",
            "marca": "Jeep",
            "cor": "Verde",
            "valor": 135000
        },
        {
            "nome": "Ka",
            "marca": "Ford",
            "cor": "Branco",
            "valor": 68000
        },
        {
            "nome": "208",
            "marca": "Peugeot",
            "cor": "Amarelo",
            "valor": 92000
        },
        {
            "nome": "Argo",
            "marca": "Fiat",
            "cor": "Preto",
            "valor": 88000
        }
    ])

    function salvar(e) {
        e.preventDefault()

        const objeto = {
            nome: nome,
            marca: marca,
            cor: "Preto",
            valor: valor
        }

        //listaCarros.push(objeto)
        //alteraListaCarros(listaCarros.concat(objeto))
        console.log(objeto)

    }
    
    function mostraListagem(){
        alteraExibeListagem(true)
    } // Se for fazer desse jeito, precisa chamar no butão: onClick={mostraListagem}
    function mostraCadastro(){
        alteraExibeListagem(false)
    }

    return (
        <div>

            <h1>Lista de Carros</h1>
            <hr />

            <button onClick={ ()=> alteraExibeListagem(true) } class="btn btn-primary mx-4">Listagem</button>
            <button onClick={ ()=> alteraExibeListagem(false) } class="btn btn-success" >Cadastro</button>

            {
                exibeListagem == true ?
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Marca</th>
                                <th scope="col">Cor</th>
                                <th scope="col">Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listaCarros.map(
                                    item => <tr>
                                        <th scope="row">{item.nome}</th>
                                        <td>{item.marca}</td>
                                        <td>{item.cor}</td>
                                        <td>R$ {item.valor}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                :
                    <form onSubmit={salvar} >

                        <p>Digite o nome do carro:</p>
                        <input onChange={e => alteraNome(e.target.value)} />
                        <p>Digite a marca:</p>
                        <input onChange={e => alteraMarca(e.target.value)} />
                        <p>Digite o valor:</p>
                        <input onChange={e => alteraValor(e.target.value)} />

                        <br />
                        <button>Salvar</button>

                    </form>
            }

        </div>
    );
}

export default Carros;