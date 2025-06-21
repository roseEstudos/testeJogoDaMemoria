import { useEffect, useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import Carta from './Carta.jsx';
import './App.css';

const cartaImagens = [
  {"src": "/img/1par.png", matched: false},
  {"src": "/img/2par.png", matched: false},
  {"src": "/img/3par.png", matched: false}
];

function App() {
  const [cartas, setCartas] = useState([]);
  const [rodada, setRodadas] = useState(0);
  const [primeiraEscolha, setPrimeiraEscolha] = useState(null);
  const [segundaEscolha, setSegundaEscolha] = useState(null);
  const [desabilitar, setDesabilitar] = useState(false);

  const misturarCartas = () => {
    const misturarCartas = [...cartaImagens, ...cartaImagens]
    .sort(() => Math.random() - 0.5)
    .map((carta) => ({...carta, id: Math.random() }));

    setPrimeiraEscolha(null);
    setSegundaEscolha(null);
    setCartas(misturarCartas);
    setRodadas(0);
  };

  const parEscolhido = (carta) => {
    primeiraEscolha ? setSegundaEscolha(carta) : setPrimeiraEscolha(carta);
  };

  useEffect(() => {
    if (primeiraEscolha && segundaEscolha){
      setDesabilitar(true);
      if (primeiraEscolha.src === segundaEscolha.src){
        setCartas((prevCartas) => {
          return prevCartas.map((carta) => {
            if (carta.src === primeiraEscolha.src){
              return {...carta, matched: true};
            }
            else {
              return carta;
            }
          });
        });
        virarCarta();
      }
      else{
        setTimeout(() => virarCarta(), 1000);
      }
    }
  }, [primeiraEscolha, segundaEscolha]);

  const virarCarta = () => {
    setPrimeiraEscolha(null);
    setSegundaEscolha(null);
    setRodadas((prevCartas) => prevCartas + 1);
    setDesabilitar(false);
  };

  useEffect(() => {
    misturarCartas();
  }, []);

  return(
    <div className='App'>
      <h1>Jogo da memória</h1>
      <button onClick={misturarCartas}>Novo jogo</button>

      <div className='cartaGrid'>
        {cartas.map((carta) => (
          <Carta
            key={carta.id}
            carta={carta}
            cartaEscolhida={parEscolhido}
            virarCarta={carta === primeiraEscolha || carta === segundaEscolha || carta.matched}
            desabilitada={desabilitar}
          />
        ))}
      </div>
      <p>Tentativas: {rodada}</p>
    </div>
  )
}

export default App
