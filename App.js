import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import Login from './src/components/login';
import Juego from './src/components/juego';
import Niveles from './src/components/niveles';
import Clasificacion from './src/components/clasificacion';

const arrayCartas = [
  {value: "abeja", image: require("./src/assets/img/abeja.png")}, 
  {value: "anaconda", image: require("./src/assets/img/anaconda.png")}, 
  {value: "cangrejo", image: require("./src/assets/img/cangrejo.png")}, 
  {value: "medusa", image: require("./src/assets/img/medusa.png")}, 
  {value: "oveja", image: require("./src/assets/img/oveja.png")}, 
  {value: "pinguino", image: require("./src/assets/img/pinguino.png")}, 
  {value: "polluelo", image: require("./src/assets/img/polluelo.png")},
  {value: "rana", image: require("./src/assets/img/rana.png")}, 
  {value: "mono", image: require("./src/assets/img/mono.png")}, 
  {value: "zorro", image: require("./src/assets/img/zorro.png")}
];

export default function App() {
  const [pantallaActual, setPantallaActual] = useState("login");
  const [nombreJugador, setNombreJugador] = useState("");
  const [nivelElegido, setNivelElegido] = useState("");
  const [intentos, setIntentos] = useState(0);

  function changePantallaActualTo(pantallaName) {
    return () => {
      setPantallaActual(pantallaName);
    };
  }

  return (
    <>
      {pantallaActual === "login" && <Login changePantallaActualTo={changePantallaActualTo("niveles")} nombreJugador={nombreJugador} setNombreJugador={setNombreJugador} />}
      {pantallaActual === "niveles" && <Niveles setNivelElegido={setNivelElegido} changePantallaActualTo={changePantallaActualTo("juego")} />}
      {pantallaActual === "juego" && <Juego arrayCartas={arrayCartas} nivelElegido={nivelElegido} intentos={intentos} setIntentos={setIntentos} changePantallaActualTo={changePantallaActualTo("niveles")} changePantallaActualToClasificacion={changePantallaActualTo("clasificacion")}/>}
      {pantallaActual === "clasificacion" && <Clasificacion nombreJugador={nombreJugador} intentos={intentos}/>}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
