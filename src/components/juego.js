import LottieView from 'lottie-react-native';
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';

const Juego = ({ arrayCartas, nivelElegido, changePantallaActualTo }) => {
    const [cartasClicadas, setCartasClicadas] = useState([]);
    const [parejaFormada, setParejaFormada] = useState([]);
    const [cartasAMostrar, setCartasAMostrar] = useState([]);
    var [intentos, setIntentos] = useState(0);
    const lottieRef = useRef(null);

    function triggerConfetti() {
        lottieRef.current.play(0);
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
                setIntentos(intentos += 1)
            } else {
                setParejaFormada((prev) => [...prev, primeraCarta, segundaCarta]);
                setCartasClicadas([]);
            }
        }
    }, [cartasClicadas]);

    const handlePress = (carta) => {
        if (cartasClicadas.length < 2 && !cartasClicadas.some(c => c.id === carta.id) && !parejaFormada.some(c => c.id === carta.id)) {
            setCartasClicadas((prev) => [...prev, carta]);
        }
    };

    useEffect(() => {
        if (parejaFormada.length > 0 && parejaFormada.length === cartasAMostrar.length) {
            triggerConfetti();
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
            <TouchableOpacity style={styles.contenedorFlecha} onPress={() => changePantallaActualTo()}>
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
    }
});

export default Juego;