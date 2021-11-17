import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import Login from "../Login/Login";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../services/api";
import styles from "./Styles";
import ButtonBack from "../../components/ButtonBack/ButtonBack";

export default function SendReports({ navigation }) {
  const [user, setUser] = useAuth();

  function send() {
    api.get("/report/send")
      .then(res => {
        if (res.data.sucess)
          Alert.alert("Sucesso! \nConfira seu email para ver o relatório!")
      })
      .catch(err => {
        Alert.alert("Erro! \nHouve um erro ao fazer a requisição!")
      })
  }
  if (!user) return <Login navigation={navigation} />;
  return (
    <View style={styles.container}>
      <ButtonBack onPress={() => navigation.goBack()} />
      <View style={{ height: "90%", justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          style={styles.buttonSend}
          activeOpacity={0.7}
          onPress={() => send()}
        >
          <Text style={styles.text}>Enviar relatórios por email</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSend}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("ViewReports")}
        >
          <Text style={styles.text}>Vizualizar relatórios</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
