import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import io from "socket.io-client";

import ChatSelect from "../../components/ChatSelect/ChatSelect";
import { useAuth } from "../../contexts/AuthContext";
import Login from "../Login/Login";
import Loading from "../../components/Loading/Loading";
import api from "../../services/api";
import { useServer } from "../../contexts/ServerContext";

export default function Chats({ navigation }) {
  const [user, setUser] = useAuth();
  const [chats, setChats] = useState([]);
  const [refresh, setRefresh] = useState(false);
  // const [loading, setLoading] = useState(true);
  const [server, setServer] = useServer();

  const socket = io(server);


  // function connectSocket() {
  //   chats.forEach((chat) => {
  //     socket.emit("joinRoom", chat.cha_cod);
  //   });
  // }

  function getChats() {
    api
      .get("/chat/userChats")
      .then((res) => {
        setChats(res.data.data);
        setRefresh(false);
      })
      .catch((err) => {
        Alert.alert("Erro ao fazer a requisição!");
      });
  }

  function handleRefresh() {
    //setChats([]);
    setRefresh(true);
    getChats();
  }

  useEffect(() => {
    socket.disconnect()
    // socket.connect()
    getChats();
    // connectSocket();

    // socket.on("getMessageSent", (msg) => {
    //   getChats();
    // });
  }, []);

  if (!user) return <Login />;
  //if (loading) return <Loading />;
  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <Text style={styles.title}>Chats</Text>
      </View>

      <View style={styles.chatsContainer}>
        {!chats || !chats.length ? (
          <View style={styles.noChat}>
            <Text style={styles.textNoChat}>
              Você não iniciou nenhuma conversa ainda {"\n"} Que tal iniciar
              uma?
            </Text>
          </View>
        ) : (
          <FlatList
            onRefresh={() => handleRefresh()}
            refreshing={refresh}
            data={chats}
            renderItem={({ item }) => (
              <ChatSelect
                chatInfo={item}
                onPress={() => navigation.navigate("Chat", { chat: item })}
              />
            )}
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
    //justifyContent: "space-between",
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
  noChat: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  textNoChat: {
    fontSize: 18,
    color: "#2A6484",
    textAlign: "center",
  },
});
