import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import * as SecureStore from 'expo-secure-store';
import styles from "./Styles";
import ButtonBack from "../../components/ButtonBack/ButtonBack"
import api from "../../services/api";

export default function Profile({ navigation }) {
  const [user, setUser] = useAuth();

  function logOff() {
    setUser(false);
    deleteLogin("bureautoLogin")
    api.get("/logout")
  }
  async function deleteLogin(key) {
    await SecureStore.deleteItemAsync(key);
  }


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        {/* <View style={styles.imageConatiner}>
        <Image source={logo} style={styles.image} />
      </View> */}
        <ButtonBack onPress={() => navigation.goBack()} />
        <View style={styles.infsContainer}>
          <View>
            <Text style={styles.textTitle}>CNPJ/CPF</Text>
            <Text style={styles.textInf}>{user.use_document}</Text>
          </View>

          <View>
            <Text style={styles.textTitle}>Nome</Text>
            <Text style={styles.textInf}>{user.use_name}</Text>
          </View>

          <View>
            <Text style={styles.textTitle}>Apelido</Text>
            <Text style={styles.textInf}>{user.use_nickname}</Text>
          </View>

          <View>
            <Text style={styles.textTitle}>Email</Text>
            <Text style={styles.textInf}>{user.use_email}</Text>
          </View>

          <View>
            <Text style={styles.textTitle}>Telefone</Text>
            <Text style={styles.textInf}>{user.use_phone}</Text>
          </View>

          <View>
            <Text style={styles.textTitle}>Endereço</Text>
            <Text style={styles.textInf}>{user.use_address}</Text>
          </View>

          <View style={styles.buttonConatiner}>
            <TouchableOpacity
              style={styles.buttonLogOff}
              activeOpacity={0.7}
              onPress={() => {
                logOff()
                navigation.goBack();
              }}
            >
              <Text style={styles.textTitle}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
