'use client'
import { useState } from "react";
import supabase from "../conexao/supabase";

function Cadastro() {

    const [ nome, alteraNome ] = useState("")
    const [ cpf, alteraCPF ] = useState("")
    const [ endereco, alteraEndereco ] = useState("")
    const [ email, alteraEmail ] = useState("")
    const [ senha, alteraSenha ] = useState("")

    async function cadastrar(){

        // .................

        // CADASTRAR NO AUTHENTICATION DO SUPABASE
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: senha,
        })

        if(data == null){
            alert("Dados inválidos...")
            return
        }

        // CADASTRAR NA MINHA TABELA DE USUÁRIOS
        const obj = {
            id: data.user.id,
            nome: nome,
            cpf: cpf,
            endereco: endereco
        }
        const resposta = await supabase
            .from('usuarios')
            .insert(obj)

        if(resposta.error == null){
            alert("Cadastrado com sucesso!")
        }else{
            alert("Verifique os dados inseridos e tente novamente...")
        }

    }

    return (
        <div>
            <h1>Cadastro!</h1>
            <p> Digite o nome: <input onChange={ e => alteraNome(e.target.value) } /> </p>
            <p> Digite o CPF: <input onChange={ e => alteraCPF(e.target.value) } /> </p>
            <p> Digite seu endereço: <input onChange={ e => alteraEndereco(e.target.value) } /> </p>
            <p> Digite o email: <input onChange={ e => alteraEmail(e.target.value) } /> </p>
            <p> Digite sua senha: <input onChange={ e => alteraSenha(e.target.value) } /> </p>
            <br/>
            <button onClick={cadastrar} >Salvar</button>
        </div>
    );
}

export default Cadastro;