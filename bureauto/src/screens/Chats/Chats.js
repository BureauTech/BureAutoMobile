import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import ChatSelect from "../../components/ChatSelect/ChatSelect";
import { useAuth } from "../../contexts/AuthContext";
import Login from "../Login/Login";

export default function Chats({ navigation }) {
  const chats = [
    1, 2, 3, 4, 5, 4, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
  ];

  const [user, setUser] = useAuth();

  if (!user) return <Login />;
  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <Text style={styles.title}>Chats</Text>
      </View>

      <View style={styles.chatsContainer}>
        {!chats ? (
          <View style={styles.noChat}>
            <Text style={styles.textNoChat}>
              Você não iniciou nenhuma conversa ainda {"\n"} Que tal iniciar
              uma?
            </Text>
          </View>
        ) : (
          <FlatList
            data={chats}
            renderItem={({ item }) => <ChatSelect onPress={() => navigation.navigate("Chat")}/>}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#2A6484",
    borderWidth: 1,
    height: "80%",
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 30,
    borderRadius: 50,
    marginBottom: 5,
  },
  topHeader: {
    width: "100%",
    alignItems: "center",
    borderBottomColor: "#2A6484",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2A6484",
  },
  chatsContainer: {
    width: "100%",
    padding: 3,
    marginBottom: 30,
    paddingVertical: 20,
  },
  noChat:{
      alignItems: "center",
      justifyContent: "center",
      height: "100%"
  },
  textNoChat: {
      fontSize: 18,
      color: "#2A6484",
      textAlign: "center"
  }
});
