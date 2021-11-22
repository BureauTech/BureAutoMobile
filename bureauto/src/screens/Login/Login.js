import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, SafeAreaView, Image, Modal, Alert, Pressable } from "react-native";
import { Icon } from "react-native-elements";
import * as SecureStore from 'expo-secure-store';
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Styles";
import api from "../../services/api";
import ButtonBack from "../../components/ButtonBack/ButtonBack";
const logo = require("../../../assets/logo.png");
import Loading from "../../components/Loading/Loading";

export default function Login({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [passVisible, setPassVisible] = useState(true);
  const [passIcon, setPassIcon] = useState("visibility-off");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useAuth();
  const [loading, setLoading] = useState(false)

  function showPass() {
    passVisible ? setPassVisible(false) : setPassVisible(true);
    passIcon == "visibility-off"
      ? setPassIcon("visibility")
      : setPassIcon("visibility-off");
  }

  function handleSignIn() {
    setLoading(true)
    const userLogin = {
      email,
      password,
    };

    api
      .post("/login", userLogin)
      .then((res) => {
        if (res.data.success) {
          setLoading(false)
          setUser(res.data.user)
          saveLogin("bureautoLogin", JSON.stringify(res.data.user))
          if (res.data.user.use_is_temp_password) {
            navigation.navigate("ChangePassword")
            deleteLogin("bureautoLogin")
            setUser("")
          } else {
            if (route)
              navigation.goBack()
          }

        } else {
          setLoading(false)
          Alert.alert("Email ou senha incorretos!");
        }
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
        Alert.alert("Houve um erro ao tentar fazer login!");
      });
  }

  async function saveLogin(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  async function deleteLogin(key) {
    await SecureStore.deleteItemAsync(key);
  }
if (loading) return <Loading/>
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {route ? <ButtonBack onPress={() => navigation.goBack()} /> : <></>}
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
