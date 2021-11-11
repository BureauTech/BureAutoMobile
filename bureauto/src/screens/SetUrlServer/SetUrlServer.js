import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./Styles";
import api from "../../services/api";
import { useServer } from "../../contexts/ServerContext";

export default function SetUrlServer({ navigation }) {
  const [urlServer, setUrlServer] = useState("");
  const [server, setServer] = useServer();

  async function storeDataLocal() {
    try {
      await AsyncStorage.setItem("@urlServer", `http://${urlServer}:3000`);
      api.defaults.baseURL = `http://${urlServer}:3000`;
      setServer(`http://${urlServer}:3000`);
    } catch (e) { }
  }

  function Go() {
    if (!urlServer.includes(".") || !urlServer.length || urlServer.length <= 3)
      Alert.alert("Corrija as informações!");
    else {
      storeDataLocal();
      navigation.navigate("Tab");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Coloque apenas o Ip da sua máquina aqui</Text>
      <Text style={styles.text}>Exemplo: 192.168.100.6</Text>
      <Text style={styles.textI}>
        A API tem que estar rodando na porta 3000!
      </Text>

      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        placeholder="ex: 192.169.100.1"
        value={urlServer}
        onChangeText={(text) => setUrlServer(text)}
      />
      <TouchableOpacity style={styles.button} onPress={() => Go()}>
        <Text style={styles.text}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
}
