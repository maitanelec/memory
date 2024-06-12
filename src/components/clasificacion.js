import { StyleSheet, Text, View, Image } from 'react-native';
const podio = require("../assets/img/podio.png");

const Clasificacion = ({ nombreJugador, intentos }) => {
  console.log("nombre",nombreJugador)
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
          <Text style={styles.celdaTabla}>Row 1, Cell 3</Text>
        </View>
        <View style={styles.filaTabla}>
          <Text style={styles.celdaTabla}>Row 2, Cell 1</Text>
          <Text style={styles.celdaTabla}>Row 2, Cell 2</Text>
          <Text style={styles.celdaTabla}>Row 2, Cell 3</Text>
        </View>
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
    height: 80,
    textAlign: "center",
    fontSize: 18,
    color: "black",
    borderColor: "black",
  },
});

export default Clasificacion;