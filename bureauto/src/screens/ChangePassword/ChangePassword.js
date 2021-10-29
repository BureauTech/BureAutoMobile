import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import { Icon } from "react-native-elements";
const logo = require("../../../assets/logo.png");

import api from "../../services/api"

export default function ChangePassword({ route, navigation }) {
  const [passVisible, setPassVisible] = useState(true);
  const [passIcon, setPassIcon] = useState("visibility-off");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [passDiff, setPassDiff] = useState(false);

  function showPass() {
    passVisible ? setPassVisible(false) : setPassVisible(true);
    passIcon == "visibility-off"
      ? setPassIcon("visibility")
      : setPassIcon("visibility-off");
  }

  function changePass() {
    if (password != password1 || (password || password1).length <= 4) {
      setPassDiff(true);
    } else {
        const form = new FormData()
        form.append("newPassword", password)
        api.post("/reset-password/change", form)
        .then(res => {
          if(res.data.success){
            Alert.alert(
              "Senha alterada!",
              "Sua senha foi alterada com sucesso!",
              [
                {
                  text: "Ok",
                }
              ]
            )
            navigation.goBack()
          }
        })
        
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerImg}>
        <Image style={styles.logo} source={logo} />
      </View>

      <Text style={styles.text}>Você está usando uma senha temporária!{"\n"}Altere sua senha!</Text>

      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder="senha"
          textContentType="password"
          autoCompleteType="password"
          secureTextEntry={passVisible}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setPassDiff(false);
          }}
        />
        <TouchableOpacity
          style={styles.buttonPass}
          activeOpacity={0.9}
          onPress={() => {
            showPass();
          }}
        >
          <Icon name={passIcon} type="material" color="#2A6484" />
        </TouchableOpacity>
      </View>

      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder="senha"
          textContentType="password"
          autoCompleteType="password"
          secureTextEntry={passVisible}
          value={password1}
          onChangeText={(text) => {
            setPassword1(text);
            setPassDiff(false);
          }}
        />
      </View>

      {passDiff ? (
        <Text style={styles.txtPassDiff}>Senhas diferentes!</Text>
      ) : (
        <></>
      )}

      <View style={styles.showPassContainer}></View>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.4}
        onPress={() => changePass()}
      >
        <Text style={styles.text}>Alterar Senha</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "90%",
    // borderWidth: 1,
    // marginTop: 20,
    // borderColor: "#2a6484",
    // borderRadius: 20,
    padding: 10,
  },
  showPassContainer: {
    width: "70%",
    alignItems: "flex-end",
    padding: 20,
  },
  containerImg: {
    height: "20%",
  },
  logo: {
    width: 200,
    height: 100,
  },
  text: {
    color: "#2a6484",
    textAlign: "center"
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
  buttonPass: {
   // marginTop: 20,
    //padding: 10,
  },
  txtPassDiff: {
    color: "red",
    padding: 20,
  },
  containerInput: {
    flexDirection: "row",
    width: "70%",
    borderWidth: 1,
    marginTop: 20,
    borderColor: "#2a6484",
    borderRadius: 20,
    alignItems: "center"

  },
});
