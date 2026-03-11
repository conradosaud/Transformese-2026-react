function Equipamentos() {

    const listaEquipamentos = [
        {
            nome: "Marreta",
            descricao: "Pra marretar",
            preco: 59.90
        },
        {
            nome: "Betoneira",
            descricao: "Sim",
            preco: 399.90
        },
        {
            nome: "Makita",
            descricao: "Os cara tão na maldade",
            preco: 559.90
        }
    ]

    return (
        <div>
            <h1>Listagem de equipamentos</h1>

            <hr/>

            <ul>
                <li> <strong>Item:</strong> {listaEquipamentos[0].nome} R$ <strong>{listaEquipamentos[0].preco} </strong> ({listaEquipamentos[0].descricao}) </li>
                <li> <strong>Item:</strong> {listaEquipamentos[1].nome} R$ <strong>{listaEquipamentos[1].preco} </strong> ({listaEquipamentos[1].descricao}) </li>
                <li> <strong>Item:</strong> {listaEquipamentos[2].nome} R$ <strong>{listaEquipamentos[2].preco} </strong> ({listaEquipamentos[2].descricao}) </li>
            </ul>

        </div>
    );
}

export default Equipamentos;