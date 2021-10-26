import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { useAuth } from "../../contexts/AuthContext";
import Login from "../Login/Login";

export default function MyAccount({ navigation }) {
  const [user, setUser] = useAuth();

  if (!user) return <Login />;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonInf}
        onPress={() => navigation.navigate("Profile")}
      >
        <Icon
          name="account-circle"
          type="material"
          color="#2a6484"
          style={styles.icon}
        />
        <Text style={styles.text}>Meu Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonInf}
        onPress={() => navigation.navigate("MyFavorites")}
      >
        <Icon
          name="star"
          type="material"
          color="#2a6484"
          style={styles.icon}
        />
        <Text style={styles.text}>Favoritos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonInf}
        onPress={() => navigation.navigate("MyAdvertisements")}
      >
        <Icon
          name="directions-car"
          type="material"
          color="#2a6484"
          style={styles.icon}
        />
        <Text style={styles.text}>Meus Anúncios</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonInf}
        onPress={() => navigation.navigate("Chats")}
      >
        <Icon
          name="chat"
          type="material"
          color="#2a6484"
          style={styles.icon}
        />
        <Text style={styles.text}>Mensagens</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  buttonInf: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    borderWidth: 2,
    borderColor: "#2A6484",
    borderRadius: 20,
    marginTop: 15,
    width: "90%",
  },
  icon: {
    padding: 10,
  },
  text: {
    fontSize: 25,
    color: "#2A6484",
    fontWeight: "bold",
  },
});
