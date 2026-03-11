import Link from "next/link";
import Cabecalho from "./components/Cabecalho";
import Produtos from "./components/Produtos";
import "./Home.css"

export default function Home() {
  return (
    <div>

      <Cabecalho/>

      <hr/>

      <Produtos/>

      <Link href="produtos" > Ir para Produtos </Link>
      <Link href="usuarios" > <button>Ir para usuários</button> </Link>

    </div>
  );
}
