import {useEffect, useState} from 'react';
import './App.css';

export default function Juego(){
  const [secuenciaColores, setSecuenciaColores] = useState([]);
  const [jugadorSecuencia, setJugadorSecuencia] = useState([]);
  const [numRonda, setRonda] = useState(0);
  const [colorResaltado, setColorResaltado] = useState(""); 
  //const [colorqueToca, setColorqueToca] = useState("");

  const colores=[
    "azul",
    "rojo",
    "amarillo",
    "verde",
  ];

  function  generarAleatorio(){
    return Math.floor(Math.random() * colores.length);
  }
  function mecanicaJuego(){
    const nuevoColorIndex = generarAleatorio();
    const nuevoColor = colores[nuevoColorIndex];

    const nuevaSecuencia = secuenciaColores.slice();
    nuevaSecuencia.push(nuevoColor);

    setSecuenciaColores(nuevaSecuencia);
    //setColorqueToca(nuevoColor);
    setJugadorSecuencia([]);
    mostrarSecuencia(nuevaSecuencia);
    setRonda(numRonda + 1);
  }
  useEffect(()=>{
    
  })
  function mostrarSecuencia(secuencia){
    for(let i = 0; i<secuencia.length; i ++ ){
      const color = secuencia[i];
      setTimeout(() => {
        setColorResaltado(color);
      }, (i+1)*1000);
    }
    setTimeout(() => setColorResaltado(""), secuencia.length * 1000 + 500);
  }

  function manejarClicks(color){
    const nuevoJugadorSecuencia = jugadorSecuencia.slice();
    nuevoJugadorSecuencia.push(color);

    let secuenciaCorrecta = true;
    for(let i=0; i<nuevoJugadorSecuencia.length;i++){
      if(nuevoJugadorSecuencia[i] !== secuenciaColores[i]){
        secuenciaCorrecta = false;
      }
    }
    setJugadorSecuencia(nuevoJugadorSecuencia);

    if(!secuenciaCorrecta){
      alert("¡Perdiste!");
      setSecuenciaColores([]);
      setRonda(1);
    }else if(nuevoJugadorSecuencia.length == secuenciaColores.length){
      mecanicaJuego();
    }
  }
  return(
    <div className='container'>
      <h1>Ronda número: {numRonda}</h1>
      <div className='botones-colores'>
        <button 
          className={`boton azul ${colorResaltado === "azul" ? "resaltado" : ""}`}
          onClick={() => manejarClicks("azul")}>Azul</button>
        <button 
          className={`boton rojo ${colorResaltado === "rojo" ? "resaltado" : ""}`}
          onClick={() => manejarClicks("rojo")}>Rojo</button>
        <button 
          className={`boton amarillo ${colorResaltado === "amarillo" ? "resaltado" : ""}`}
          onClick={() => manejarClicks("amarillo")}>Amarillo</button>
        <button 
          className={`boton verde ${colorResaltado === "verde" ? "resaltado" : ""}`}
          onClick={() => manejarClicks("verde")}>Verde</button>
        
        <button className ='empezarJuego' onClick={mecanicaJuego}>Jugar</button>
      </div>
    </div>
  );
}