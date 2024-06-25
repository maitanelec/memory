import { StyleSheet, Text, View, Image, Button } from 'react-native';
const podio = require("../assets/img/podio.png");

const Clasificacion = ({ nombreJugador, intentos, timer, changePantallaActualTo }) => {
  function changeNextScreen() {
    changePantallaActualTo()
  }

  return (
    <View style={styles.container}>
      <Image source={podio} style={styles.podio} />

      <View style={styles.tablaClasificacion}>
        <View style={styles.cabeceraTabla}>
          <Text style={styles.celdaCabecera}>Nombres</Text>
          <Text style={styles.celdaCabecera}>Intentos</Text>
          <Text style={styles.celdaCabecera}>Tiempo</Text>
        </View>
        <View style={styles.filaTabla}>
          <Text style={styles.celdaTabla}>{nombreJugador}</Text>
          <Text style={styles.celdaTabla}>{intentos}</Text>
          <Text style={styles.celdaTabla}>{timer} s</Text>
        </View>
        <View style={styles.filaTabla}>
          <Text style={styles.celdaTabla}></Text>
          <Text style={styles.celdaTabla}></Text>
          <Text style={styles.celdaTabla}></Text>
        </View>
      </View>

      <Button color="#6cf5c2" title="Volver a jugar" onPress={changeNextScreen} />
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
  podio: {
    width: 120,
    height: 120
  },
  tablaClasificacion: {
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
    marginTop: 30,
    width: 350
  },
  cabeceraTabla: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9ED3FF",
    height: 50
  },
  celdaCabecera: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    width: 200,
    height: "100%",
    textAlign: "center",
    fontSize: 18,
    color: "black",
    textTransform: "uppercase"
  },
  filaTabla: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  celdaTabla: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    width: 200,
    height: 50,
    textAlign: "center",
    fontSize: 18,
    color: "black",
    borderColor: "black",
  },
});

export default Clasificacion;