import './Carta.css';

const Carta = ({carta, cartaEscolhida, virarCarta, desabilitada}) => {
    const verificarPar = () => {
        if (!desabilitada){
            cartaEscolhida(carta);
        }
    };

    return (
        <div className='carta'>
            <div className={virarCarta ? 'virarCarta' : ''}>
                <img className='frente' src={carta.src} alt="carta com par já achado"/>
                <img className='costa' src="/img/parteDetras.png" onClick={verificarPar} alt="Carta de costas" />
            </div>
        </div>
    );
};

export default Carta;