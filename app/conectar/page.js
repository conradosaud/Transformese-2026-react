'use client'
import { useState } from "react";
import supabase from "../conexao/supabase";

function Conectar() {

    const [ email, alteraEmail ] = useState("")
    const [ senha, alteraSenha ] = useState("")

    async function autenticar(){

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: senha,
        })

        if(data.user == null){
            alert("Dados inválidos...")
            return
        }

        alert("Autenticado com sucesso!")
        localStorage.setItem("id_usuario", data.user.id)

    }

    return (
        <div>
            <h1>Conectar usuário (login)</h1>

            <p> Digite o email: <input onChange={ e => alteraEmail(e.target.value) } /> </p>
            <p> Digite a senha: <input onChange={ e => alteraSenha(e.target.value) } /> </p>
            <br/>
            <button onClick={autenticar} >Entrar</button>

        </div>
    );
}

export default Conectar;