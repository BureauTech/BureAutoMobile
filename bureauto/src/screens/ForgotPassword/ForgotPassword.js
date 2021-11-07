import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableNativeFeedback,
  Alert,
} from "react-native";

import api from "../../services/api";

export default function ForgotPassword({navigation}) {
  const [email, setEmail] = useState("");

  function resetPassword() {
    if (email.length <= 3 || !email.includes("@")) {
      Alert.alert("Erro", "Email inválido!", [
        {
          text: "Obrigado por avisar!",
        },
      ]);
    } else {
      api.post("/reset-password", { email })
      .then((res) => {
        if (res.data.success) {
            navigation.navigate("Tab")
          Alert.alert("Sucesso. Verifique seu email e siga as instruções!")
        } else {
            Alert.alert("Email não encontrado!")
        }
        
      })
      .catch(err => Alert("Erro ao fazer a requisição!"));
    }
  }
  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
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
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#2a6484",
    textAlign: "center",
  },
  input: {
    width: "70%",
    borderWidth: 1,
    marginTop: 20,
    borderColor: "#2a6484",
    borderRadius: 20,
    padding: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: "#2a6484",
    width: "50%",
    padding: 10,
    marginTop: 20,
    borderRadius: 20,
    alignItems: "center",
  },
});
