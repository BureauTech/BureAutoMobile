import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Image,
  Modal,
  Alert,
  Pressable
} from "react-native";
import { Icon } from "react-native-elements";
import { useAuth } from "../../contexts/AuthContext";

import api from "../../services/api";

const logo = require("../../../assets/logo.png");

export default function Login({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [passVisible, setPassVisible] = useState(true);
  const [passIcon, setPassIcon] = useState("visibility-off");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useAuth();

  function showPass() {
    passVisible ? setPassVisible(false) : setPassVisible(true);
    passIcon == "visibility-off"
      ? setPassIcon("visibility")
      : setPassIcon("visibility-off");
  }

  function handleSignIn() {
    const userLogin = {
      email,
      password,
    };

    api
      .post("/login", userLogin)
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user)
          if(res.data.user.use_is_temp_password) {
            navigation.navigate("ChangePassword")
            setUser("")
          } else {
            if(route)
            navigation.goBack()
          }
          
        } else {
          Alert.alert("Email ou senha incorretos!");
        }
      })
      .catch((err) => {
        console.log(err)
        Alert.alert("Houve um erro ao tentar fazer login!");
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.containerImg}>
            <Image style={styles.logo} source={logo} />
          </View>
          <View style={styles.content}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.viewModal}>
                <Text style={styles.txtModal}>
                  Entre em contato com o administrador do sistema para receber
                  as credenciais de seu login!
                </Text>
                <Pressable
                  style={styles.buttonClose}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.txtModal}>Fechar</Text>
                </Pressable>
              </View>
            </Modal>

            <Text style={styles.text}>
              Insira seu e-mail e senha para continuar
            </Text>
            <TextInput
              style={styles.input}
              placeholder="e-mail"
              textContentType="emailAddress"
              autoCompleteType="email"
              value={email}
              onChangeText={(text) => setEmail(text.toLowerCase())}
            />
            <TextInput
              style={styles.input}
              placeholder="senha"
              textContentType="password"
              autoCompleteType="password"
              secureTextEntry={passVisible}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <View style={styles.buttonPassCont}>
              <TouchableOpacity
                style={styles.buttonPass}
                activeOpacity={0.9}
                onPress={() => {
                  showPass();
                }}
              >
                <Icon name={passIcon} type="material" color="#2A6484" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonPass} activeOpacity={0.9} onPress={() => navigation.navigate("ForgotPassword")}>
                <Text style={styles.text}>Esqueci a senha</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.4}
              onPress={() => handleSignIn()}
            >
              <Text style={styles.text}>Login</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.buttonInfo}
                activeOpacity={0.9}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.text}>Primeiro acesso</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    padding: 5,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderColor: "#2A6484",
    borderWidth: 2,
    borderRadius: 50,
    height: "50%",
    backgroundColor: "#fff",
  },
  input: {
    width: "70%",
    borderWidth: 1,
    marginTop: 20,
    borderColor: "#2a6484",
    borderRadius: 20,
    padding: 10,
  },
  text: {
    color: "#2a6484",
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
  containerImg: {
    height: "20%",
  },
  logo: {
    width: 200,
    height: 100,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "70%",
    marginTop: 10,
  },
  buttonPassCont: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  buttonPass: {
    width: "auto",
    marginTop: 5,
  },
  viewModal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  buttonClose: {
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 5,
    margin: 20,
    borderColor: "#2a6484",
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  txtModal: {
    color: "#2a6484",
    textAlign: "center",
    fontSize: 22,
  },
});
