import "./CardPokemonStyle.css";

export default function CardPokemon({ urlImage, nombre, tipo, habilidades }) {

    let tipoClass = '';

    switch (tipo) {
        case 'fire':
            tipoClass = 'bg-danger';
            break;
        case 'water':
            tipoClass = 'bg-primary';
            break;
        case 'grass':
            tipoClass = 'bg-success';
            break;
        case 'bug':
            tipoClass = 'purple';
            break;
        case 'normal':
            tipoClass = 'bg-warning';
            break;
        default:
            break;
    }

    return (
        <>
            <div className={`card text-center ${tipoClass}`}>
                <img className="image card-img-top m-auto p-2" src={urlImage} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title text-white">{nombre}</h5>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item text-white bg-transparent border-0">{tipo}</li>
                    <li className="list-group-item text-white bg-transparent border-0">{habilidades}</li>
                </ul>
            </div>
        </>
    )
}