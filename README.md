# Como instalar e rodar o React
É necessário ter instalado o **Node** no computador.

Em seguida, abrir o terminal (CMD) na pasta onde vai ficar o projeto e digitar o comando ```npx create-next-app```.
*Nota: estamos usando o React junto do **NextJS***
Escolher as seguintes opções na instalação:
- No, Customize settings
- Use TypeScript? Escolher opção **NO**
- Use Tailwind CSS? Escolher opção **NO**
- O restante das opções pode deixar o padrão

Depois de baixado, se quiser, faça a limpeza dos arquivos padrão que vem no projeto (arquivos de CSS, SVG, ico).

Por fim, para **iniciar** (rodar) um projeto em React, rodar no terminal o comando ```npm run dev```.
*Nota: tenha certeza de rodar esse comando na pasta raiz do projeto*

## Como criar um módulo/componente em React
Sempre que for criar um módulo ou um componente use essa estrutura:
```
export default function Produtos() {
    return (
        <div>
            
        </div>
    )
}
```
