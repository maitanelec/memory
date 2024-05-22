import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';

const Juego = ({ arrayCartas, nivelElegido, changePantallaActualTo }) => {
    const [cartasClicadas, setCartasClicadas] = useState([]);
    const [parejaFormada, setParejaFormada] = useState([]);
    const [cartasAMostrar, setCartasAMostrar] = useState([]);

    let shuffledCards = [];
    let numCartasMostrar = 0;
    let arrayTableroCartas = [];
    let arrayCortado = [];

    useEffect(() => {
        if (cartasClicadas.length === 2) {
            console.log("cartas",cartasClicadas)
            const [primeraCarta, segundaCarta] = cartasClicadas;
            if (primeraCarta != segundaCarta) {
                setTimeout(() => setCartasClicadas([]), 1000);
            } else { 
                setParejaFormada((prev) => [...prev, primeraCarta, segundaCarta]);
                setCartasClicadas([]);
            }
        }
    },[cartasClicadas,shuffledCards]);

    useEffect(() => {
        arrayCortado = arrayCartas.slice(0, numCartasMostrar);
        shuffledCards = [...arrayCortado, ...arrayCortado];
        shuffledCards.sort(() => Math.random() - 0.5).map((carta) => ({ ...carta }));
        setCartasAMostrar(shuffledCards)
    },[nivelElegido])

    const handlePress = (idx) => {
        if (cartasClicadas.length < 2 && !cartasClicadas.includes(idx) && !parejaFormada.includes(idx)) {
            setCartasClicadas((prev) => [...prev, idx]);
        }
    }

    if (nivelElegido == "principiante") {
        numCartasMostrar = 6;
    } else if (nivelElegido == "medio") {
        numCartasMostrar = 8;
    } else {
        numCartasMostrar = 10;
    }

    cartasAMostrar.map((carta, idx) => {
        arrayTableroCartas.push(
            <TouchableOpacity style={styles.contenedorCarta} onPress={() => handlePress(idx)} key={idx}>
                <Image source={(cartasClicadas.includes(idx) || parejaFormada.includes(idx)) ? carta : require("../assets/img/carta-de-juego.png")} style={styles.carta} />
            </TouchableOpacity>
        )
    })

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.contenedorFlecha} onPress={() => changePantallaActualTo()}>
                <Image source={require("../assets/img/volver.png")} style={styles.btnVolver} />
            </TouchableOpacity>
            <View style={styles.contenedorFondoCartas}>
                {arrayTableroCartas}
            </View>
        </View>
    )
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
        /* backgroundColor: "#e11d48", */
        borderRadius: 0.4,
        padding: 1
    },
    card: {
        width: 65,
        height: 5,
    },
    carta: {
        width: 65,
        height: 65,
    }
});

export default Juego;