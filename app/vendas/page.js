'use client'
import { useEffect, useState } from "react";
import supabase from "../conexao/supabase";
import "./vendas.css"

function Vendas() {

    const [ usuario, alteraUsuario ] = useState()
    const [ livro, alteraLivro ] = useState()
    const [ quantidade, alteraQuantidade ] = useState()
    const [ pagamento, alteraPagamento ] = useState()
    const [ observacao, alteraObservacao ] = useState()

    const [ editando, alteraEditando ] = useState(false)

    const [listaVendas, alteraListaVendas] = useState([])
    const [listaUsuarios, alteraListaUsuarios] = useState([])
    const [listaLivros, alteraListaLivros] = useState([])

    const [ inputPesquisaPagamento, alteraInputPesquisaPagamento ] = useState()
    const [ inputPesquisaObservacao, alteraInputPesquisaObservacao ] = useState()
    const [ inputPesquisaData, alteraInputPesquisaData ] = useState()
    const [ inputPesquisaIdUsuario, alteraInputPesquisaIdUsuario ] = useState()
    const [ inputPesquisaIdProduto, alteraInputPesquisaIdProduto ] = useState()

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

    async function excluir(id){
        const opcao = confirm("Tem certeza que deseja excluir?")
        if(opcao == false){
            return
        }

        const response = await supabase.from('vendas').delete().eq('id', id)

    }

    function editar(objeto){

        alteraEditando(true)

        alteraQuantidade(objeto.quantidade)
        alteraPagamento(objeto.pagamento)
        alteraObservacao(objeto.observacao)

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
            pagamento: pagamento,
            observacao: observacao
        }

        const { error } = await supabase.from('vendas').insert(obj)
        console.log(error)

        buscaTodos()

    }


    // Funções de pesquisa
    async function pesquisaPagamento(){
        const { data, error } = await supabase
            .from('vendas')
            .select('*, id_usuario(*), id_livro(*)')
            .eq('pagamento', inputPesquisaPagamento)

        alteraListaVendas(data)

    }
    async function pesquisaObservacao(){
        const { data, error } = await supabase
            .from('vendas')
            .select('*, id_usuario(*), id_livro(*)')
            .ilike('observacao', '%' + inputPesquisaObservacao + '%' )

        alteraListaVendas(data)
    }
    async function pesquisaData(){
        const { data, error } = await supabase
            .from('vendas')
            .select('*, id_usuario(*), id_livro(*)')
            .gt('created_at', inputPesquisaData+" 00:00:00+00")
            .lt('created_at', inputPesquisaData+" 23:59:00+00")

        alteraListaVendas(data)
    }
    async function pesquisaIdUsuario(){
        
    }
    async function pesquisaIdProduto(){
        
    }
    async function pesquisaMaiorVenda(){
        const { data, error } = await supabase
            .from('vendas')
            .select('*, id_usuario(*), id_livro(*)')
            .order('quantidade', { ascending: false })
            .limit(1)
        alteraListaVendas(data)
    }
    async function pesquisaVendasHoje(){
        const { data, error } = await supabase
            .from('vendas')
            .select('*, id_usuario(*), id_livro(*)')
            .gt('created_at', new Date().toISOString().split("T")[0] +" 00:00:00+00")
            .lt('created_at', new Date().toISOString().split("T")[0] +" 23:5:00+00")

        alteraListaVendas(data)
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
                    <option>Selecione...</option>
                {
                    listaUsuarios.map(
                        item => <option value={item.id} > {item.nome} </option>
                    )
                }
                </select>

                <br/>
                <p>Digite o livro</p>
                <select onChange={ e => alteraLivro(e.target.value) } >
                    <option>Selecione...</option>
                    {
                        listaLivros.map(
                            item => <option value={item.id} > {item.nome} </option>
                        )
                    }
                </select>

                <br/>
                <p>Digite a quantidade</p>
                <input value={quantidade} onChange={ e => alteraQuantidade(e.target.value) } />
                <br/>
                <p>Forma de pagamento</p>
                <input value={pagamento} onChange={ e => alteraPagamento(e.target.value) } />
                <br/>
                <p>Digite uma observação</p>
                <input value={observacao} onChange={ e => alteraObservacao(e.target.value) } />
                <br/>
                <br/>
                
                {
                    editando == true ?
                        <div>
                            <button>Atualizar</button>
                            <button>Cancelar</button>
                        </div>
                    :
                        <button>Salvar</button>
                }

            </form>

            <hr/>

                <h2> Filtros </h2>
                <p> Pesquisar pagamento <input onChange={ e => alteraInputPesquisaPagamento(e.target.value) } /> <button onClick={pesquisaPagamento}>Pesquisar</button> </p>
                <p> Pesquisar observacao <input onChange={ e => alteraInputPesquisaObservacao(e.target.value) } /> <button onClick={pesquisaObservacao}>Pesquisar</button> </p>
                <p> Pesquisar data <input type="date" onChange={ e => alteraInputPesquisaData(e.target.value) } /> <button onClick={pesquisaData}>Pesquisar</button> </p>
                <p> Pesquisar pelo ID do usuario <input onChange={ e => alteraInputPesquisaIdUsuario(e.target.value) } /> <button onClick={pesquisaIdUsuario}>Pesquisar</button> </p>
                <p> Pesquisar pelo ID do produto <input onChange={ e => alteraInputPesquisaIdProduto(e.target.value) } /> <button onClick={pesquisaIdProduto}>Pesquisar</button> </p>
                <p> Filtrar por maiores vendas <button onClick={pesquisaMaiorVenda}>Pesquisar</button> </p>
                <p> Ver vendas de hoje <button onClick={pesquisaVendasHoje}>Pesquisar</button> </p>

            <hr/>

            <table class="table">
                <tr>
                    <td>#</td>
                    <td>Cliente</td>
                    <td>Produto</td>
                    <td>Qnt.</td>
                    <td>Forma de pagamento</td>
                    <td>Observação</td>
                    <td>Data</td>
                    <td>Ações</td>
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
                                        <td> {item.observacao} </td>
                                        <td> <button onClick={ ()=> location.href="/vendas/"+item.id } >Ver</button> <button onClick={ ()=> editar(item) } >Editar</button> <button onClick={ ()=> excluir(item.id) } >Excluir</button> </td>
                                    </tr>
                        )
                }
            </table>








<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
    );
}

export default Vendas;