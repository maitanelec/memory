import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

const Login = ({ changePantallaActualTo, nombreJugador, setNombreJugador }) => {
    function changeNextScreen({ name }) {
        setNombreJugador(name)
        changePantallaActualTo()
    }

    return (
        <View style={styles.container}>
            <Text style={styles.tituloLogin}>MEMORY</Text>
            <TextInput
                style={styles.inputNombre}
                value={nombreJugador}
                onChangeText={setNombreJugador}
                placeholder="Introduce nombre"
            />
            <Button color="#8BC34A" title="Elegir nivel" onPress={changeNextScreen} />
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
    tituloLogin: {
        color: "#00BCD4",
        fontWeight: "bold",
        fontSize: 60,
    },
    inputNombre: {
        height: 40,
        width: 160,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
});

export default Login;