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
            <div className={`cardd text-center ${tipoClass}`}>
                <img className="image" src={urlImage} alt="Card image cap" />
                <div className="">
                    <h5 className="cardtitle">{nombre}</h5>
                </div>
                <ul className="listext">
                    <li className="itlist">{tipo}</li>
                    <li className="itlist">{habilidades}</li>
                </ul>
            </div>
        </>
    )
}