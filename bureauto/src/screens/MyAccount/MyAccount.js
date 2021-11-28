import React, { useLayoutEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { useAuth } from "../../contexts/AuthContext";
import Login from "../Login/Login";
import styles from "./Styles";

export default function MyAccount({ navigation }) {
  const [user, setUser] = useAuth();

  if (!user) return <Login navigation={navigation}/>;
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

      <TouchableOpacity
        style={styles.buttonInf}
        onPress={() => navigation.navigate("SendReports")}
      >
        <Icon
          name="send"
          type="material"
          color="#2a6484"
          style={styles.icon}
        />
        <Text style={styles.text}>Relatórios</Text>
      </TouchableOpacity>
    </View>
  );
}
