import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Keyboard, TouchableNativeFeedback, Alert } from "react-native";
import styles from "./Styles";
import api from "../../services/api";
import ButtonBack from "../../components/ButtonBack/ButtonBack";

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");

  function resetPassword() {
    if (email.length <= 3 || !email.includes("@")) {
      Alert.alert("Erro", "Email inválido!", [
        {
          text: "Obrigado por avisar!",
        },
      ]);
    } else {
      api
        .post("/reset-password", { email })
        .then((res) => {
          if (res.data.success) {
            navigation.navigate("Tab");
            Alert.alert("Sucesso. Verifique seu email e siga as instruções!");
          } else {
            Alert.alert("Email não encontrado!");
          }
        })
        .catch((err) => Alert("Erro ao fazer a requisição!"));
    }
  }
  
  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ButtonBack onPress={() => navigation.goBack()} />
        <View
          style={styles.subContainer}
        >
          <Text style={styles.text}>
            Digite seu email para recuperar sua senha!
          </Text>
          <TextInput
            style={styles.input}
            placeholder="email"
            textContentType="emailAddress"
            autoCompleteType="email"
            onChangeText={(e) => setEmail(e)}
          />

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.4}
            onPress={() => resetPassword()}
          >
            <Text style={styles.text}>Redefinir Senha</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}
