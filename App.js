import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import Login from './src/components/login';
import Juego from './src/components/juego';
import Niveles from './src/components/niveles';

const arrayCartas = [require("./src/assets/img/abeja.png"), require("./src/assets/img/anaconda.png"), require("./src/assets/img/cangrejo.png"), require("./src/assets/img/medusa.png"), require("./src/assets/img/oveja.png"), require("./src/assets/img/pinguino.png"), require("./src/assets/img/polluelo.png"), require("./src/assets/img/rana.png"), require("./src/assets/img/mono.png"), require("./src/assets/img/zorro.png")];

export default function App() {
  const [pantallaActual, setPantallaActual] = useState("login");
  const [nombreJugador, setNombreJugador] = useState("");
  const [nivelElegido, setNivelElegido] = useState("");

  function changePantallaActualTo(pantallaName) {
    return () => {
      setPantallaActual(pantallaName);
    };
  }

  return (
    <>
      {pantallaActual === "login" && <Login changePantallaActualTo={changePantallaActualTo("niveles")} nombreJugador={nombreJugador} setNombreJugador={setNombreJugador} />}
      {pantallaActual === "niveles" && <Niveles setNivelElegido={setNivelElegido} changePantallaActualTo={changePantallaActualTo("juego")} />}
      {pantallaActual === "juego" && <Juego arrayCartas={arrayCartas} nivelElegido={nivelElegido} changePantallaActualTo={changePantallaActualTo("niveles")} />}
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
