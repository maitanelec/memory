import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

const Niveles = ({ setNivelElegido, changePantallaActualTo }) => {   
    function changeNivel(nivel) {
        return () => {
            setNivelElegido(nivel);
            changePantallaActualTo();
        };
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btnNivelPrincipiante} onPress={changeNivel("principiante")}><Text>Principiante</Text></TouchableOpacity>
            <TouchableOpacity style={styles.btnNivelMedio} onPress={changeNivel("medio")}><Text>Medio</Text></TouchableOpacity>
            <TouchableOpacity style={styles.btnNivelDificil} onPress={changeNivel("dificil")}><Text>Dificil</Text></TouchableOpacity>
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
    btnNivelPrincipiante: {
        width: 100,
        backgroundColor: "#CDDC39",
        alignItems: 'center',
        padding: 10,
        borderRadius: 8,
        marginBottom: 15
    },
    btnNivelMedio: {
        width: 100,
        backgroundColor: "#FF9800",
        alignItems: 'center',
        padding: 10,
        borderRadius: 8,
        marginBottom: 15
    },
    btnNivelDificil: {
        width: 100,
        backgroundColor: "#FF5722",
        alignItems: 'center',
        padding: 10,
        borderRadius: 8,
        marginBottom: 15
    }
});

export default Niveles;