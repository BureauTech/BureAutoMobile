import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Login from "../Login/Login";
import { useAuth } from "../../contexts/AuthContext";

export default function SendReports({ navigation }) {
  const [user, setUser] = useAuth();
  if (!user) return <Login navigation={navigation} />;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonSend}
        activeOpacity={0.7}
        onPress={() => Alert.alert("Essa função não foi desenvolvida ainda!")}
      >
        <Text style={styles.text}>Enviar relatórios por email</Text>
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
  buttonSend: {
    borderWidth: 1,
    borderColor: "#2A6484",
    borderRadius: 20,
    width: "80%",
    alignItems: "center",
    padding: 5,
  },
  text: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 22,
    color: "#2a6484",
  },
});
