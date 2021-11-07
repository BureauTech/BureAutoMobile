import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";

const logo = require("../../../assets/logo.png");

export default function Profile({ navigation }) {
  const [user, setUser] = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.imageConatiner}>
        <Image source={logo} style={styles.image} />
      </View>
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
              setUser(false);
              navigation.goBack();
            }}
          >
            <Text style={styles.textTitle}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  imageConatiner: {
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: Dimensions.get("window").width * 0.4,
    height: Dimensions.get("window").height * 0.1,
  },
  infsContainer: {
    borderWidth: 1,
    borderColor: "#2A6484",
    borderRadius: 40,
    height: "85%",
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "space-around",
  },
  textTitle: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 20,
    color: "#2a6484",
  },
  textInf: {
    fontFamily: "Roboto",
    fontSize: 20,
    color: "#2a6484",
    marginLeft: 10,
  },
  buttonConatiner: {
    marginTop: 20,
    alignItems: "center",
  },
  buttonLogOff: {
    borderWidth: 1,
    borderColor: "#2A6484",
    borderRadius: 20,
    width: "80%",
    alignItems: "center",
  },
});
