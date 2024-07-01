import LottieView from 'lottie-react-native';
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';

const Juego = ({ arrayCartas, nivelElegido, intentos, setIntentos, timer, setTimer, changePantallaActualTo, changePantallaActualToClasificacion }) => {
  const [cartasClicadas, setCartasClicadas] = useState([]);
  const [parejaFormada, setParejaFormada] = useState([]);
  const [cartasAMostrar, setCartasAMostrar] = useState([]);
  const [btnHabilitado, setBtnHabilitado] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const lottieRef = useRef(null);

  function triggerConfetti() {
    lottieRef.current.play(0);
  }

  function volverAlMenuNiveles() {
    setIntentos(0);
    setTimer(0);
    changePantallaActualTo();
  }

  useEffect(() => {
    var numCartasMostrar;
    if (nivelElegido === "principiante") {
      numCartasMostrar = 6;
    } else if (nivelElegido === "medio") {
      numCartasMostrar = 8;
    } else {
      numCartasMostrar = 10;
    }

    const arrayCortado = arrayCartas.slice(0, numCartasMostrar);
    const shuffledCards = [...arrayCortado, ...arrayCortado].sort(() => Math.random() - 0.5).map((carta, index) => ({ ...carta, id: index }));
    setCartasAMostrar(shuffledCards);
  }, [nivelElegido, arrayCartas]);

  useEffect(() => {
    if (cartasClicadas.length === 2) {
      const [primeraCarta, segundaCarta] = cartasClicadas;
      if (primeraCarta.value !== segundaCarta.value) {
        setTimeout(() => setCartasClicadas([]), 1000);
      } else {
        setParejaFormada((prev) => [...prev, primeraCarta, segundaCarta]);
        setCartasClicadas([]);
      }
      setIntentos(intentos + 1);
    }
  }, [cartasClicadas]);

  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  const handlePress = (carta) => {
    if (!timerActive) {
      setTimerActive(true);
    }
    if (cartasClicadas.length < 2 && !cartasClicadas.some(c => c.id === carta.id) && !parejaFormada.some(c => c.id === carta.id)) {
      setCartasClicadas((prev) => [...prev, carta]);
    }
  };

  useEffect(() => {
    if (parejaFormada.length > 0 && parejaFormada.length === cartasAMostrar.length) {
      triggerConfetti();
      setBtnHabilitado(true);
      setTimerActive(false);
    }
  }, [parejaFormada]);

  return (
    <View style={styles.container}>
      <LottieView
        ref={lottieRef}
        source={require('../assets/confetti.json')}
        autoPlay={false}
        loop={false}
        style={styles.lottie}
        resizeMode='cover'
      />
      <TouchableOpacity style={styles.contenedorFlecha} onPress={() => volverAlMenuNiveles()}>
        <Image source={require("../assets/img/volver.png")} style={styles.btnVolver} />
      </TouchableOpacity>
      
      <View style={styles.contenedorFondoCartas}>
        {cartasAMostrar.map((carta) => (
          <TouchableOpacity
            key={carta.id}
            style={styles.contenedorCarta}
            onPress={() => handlePress(carta)}
          >
            <Image
              source={(cartasClicadas.includes(carta) || parejaFormada.includes(carta)) ? carta.image : require("../assets/img/carta-de-juego.png")}
              style={styles.carta}
            />
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.intentos}>Intentos: {intentos}</Text>
      <Text style={styles.timer}>Tiempo: {timer} s</Text>
      <TouchableOpacity style={(btnHabilitado != true) ? styles.contenedorBtnClasificacionDeshabilitado : styles.contenedorBtnClasificacionHabilitado} disabled={!btnHabilitado} onPress={() => changePantallaActualToClasificacion()}>
        <Text style={styles.txtClasificacion}>Clasificación</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fondoJuego: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: "contain",
    width: "100%"
  },
  contenedorFlecha: {
    position: "absolute",
    right: 20,
    top: 70,
    width: 30,
    height: 30,
  },
  btnVolver: {
    width: 30,
    height: 30,
  },
  contenedorFondoCartas: {
    display: "flex",
    flexWrap: 'wrap',
    justifyContent: "space-evenly",
    alignContent: "space-around",
    alignItems: "center",
    width: 360,
    height: 300,
    padding: 2,
  },
  contenedorCarta: {
    padding: 2,
    display: "flex",
    alignItems: "center",
    borderRadius: 0.4,
    padding: 1
  },
  carta: {
    width: 65,
    height: 65,
  },
  lottie: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zindex: 2,
    pointerEvents: 'none',
  },
  intentos: {
    marginTop: 10
  },
  timer: {
    marginTop: 10,
  },
  contenedorBtnClasificacionHabilitado: {
    backgroundColor: "#8746FF",
    padding: 8,
    borderRadius: 10,
    marginTop: 20
  },
  contenedorBtnClasificacionDeshabilitado: {
    backgroundColor: "#BDBDBD",
    padding: 8,
    borderRadius: 10,
    marginTop: 20
  },
  txtClasificacion: {
    color: "white",
    textTransform: "uppercase"
  }
});

export default Juego;
