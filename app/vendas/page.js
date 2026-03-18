'use client'
import { useEffect, useState } from "react";
import supabase from "../conexao/supabase";

function Vendas() {

    const [ usuario, alteraUsuario ] = useState()
    const [ livro, alteraLivro ] = useState()
    const [ quantidade, alteraQuantidade ] = useState()
    const [ pagamento, alteraPagamento ] = useState()

    const [listaVendas, alteraListaVendas] = useState([])
    const [listaUsuarios, alteraListaUsuarios] = useState([])
    const [listaLivros, alteraListaLivros] = useState([])

    async function buscaLivros(){
        const { data, error } = await supabase
            .from('livros')
            .select()
        alteraListaLivros(data)
    }

    async function buscaUsuarios(){
        const { data, error } = await supabase
            .from('usuarios')
            .select()
        alteraListaUsuarios(data)
    }

    async function buscaTodos() {

        const { data, error } = await supabase
            .from('vendas')
            .select(`
                *,
                id_usuario (*),
                id_livro (*)
            `)

        console.log(data)

        alteraListaVendas(data)

    }

    function formataData(data){
        let data_formatada = new Date(data)
        data_formatada = data_formatada.toLocaleDateString()
        return data_formatada
    }

    function formataHoras(horas){
        let horas_formatadas = new Date(horas)
        horas_formatadas = horas_formatadas.toLocaleTimeString()
        return horas_formatadas
    }

    function formataPagamento(pagamento){
        
        if(pagamento == "pix"){
            return <span class="badge text-bg-primary">PIX</span>
        }

        if(pagamento == "cartao_credito"){
            return <span class="badge text-bg-success">Crédito</span>
        }

        if(pagamento == "boleto"){
            return <span class="badge text-bg-secondary">Boleto</span>
        }

        if(pagamento == "debito"){
            return <span class="badge text-bg-warning">Débito</span>
        }

    }

    async function salvar(e){
        e.preventDefault()

        const obj = {
            id_usuario: usuario,
            id_livro: livro,
            quantidade: quantidade,
            pagamento: pagamento
        }

        const { error } = await supabase.from('vendas').insert(obj)
        console.log(error)

    }

    useEffect(() => {
        buscaTodos() 
        buscaUsuarios()
        buscaLivros()
    }, [])

    return (
        <div>

            <h1>Vendas</h1>
            <hr />

            <form onSubmit={salvar} >
                <p>Selecione o usuário</p>
                
                <select onChange={ e => alteraUsuario(e.target.value) } >
                {
                    listaUsuarios.map(
                        item => <option value={item.id} > {item.nome} </option>
                    )
                }
                </select>

                <br/>
                <p>Digite o livro</p>
                <select onChange={ e => alteraLivro(e.target.value) } >
                    {
                        listaVendas.map(
                            item => <option value={item.id_livro.id} > {item.id_livro.nome} </option>
                        )
                    }
                </select>

                <br/>
                <p>Digite a quantidade</p>
                <input onChange={ e => alteraQuantidade(e.target.value) } />
                <br/>
                <p>Forma de pagamento</p>
                <input onChange={ e => alteraPagamento(e.target.value) } />
                <br/>
                <br/>
                <button>Salvar</button>
            </form>

            <hr/>

            <table class="table">
                <tr>
                    <td>#</td>
                    <td>Cliente</td>
                    <td>Produto</td>
                    <td>Qnt.</td>
                    <td>Forma de pagamento</td>
                    <td>Data</td>
                </tr>
                {
                    listaVendas.length == 0 ?
                        <p>Carregando...</p>
                        :
                        listaVendas.map(
                            (item, indice) => <tr>
                                        <td> {indice + 1} </td>
                                        <td> {item.id_usuario.nome} </td>
                                        <td> {item.id_livro.nome} </td>
                                        <td> {item.quantidade} </td>
                                        <td> { formataPagamento(item.pagamento) } </td>
                                        <td> { formataData(item.created_at) } às { formataHoras(item.created_at) } </td>
                                    </tr>
                        )
                }
            </table>


        </div>
    );
}

export default Vendas;