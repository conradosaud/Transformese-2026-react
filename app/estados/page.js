'use client'
import { useState } from "react";

function Estados() {

    //const nome = "Conrado"
    const [nome, alteraNome] = useState("")
    const [senha, alteraSenha] = useState("")
    
    function salvar(){
        alert("O nome é "+nome+" e a senha é "+senha)
    }

    return (
        <div>
            <h1>Programação em React com estados</h1>
            
            <p>Digite o seu nome:</p>
            <input onChange={ e => alteraNome(e.target.value) } />

             <p>Digite o sua senha:</p>
            <input type="password" onChange={ e => alteraSenha(e.target.value) } />

            <button onClick={salvar} >Salvar</button>

        </div>
    );
}

export default Estados;