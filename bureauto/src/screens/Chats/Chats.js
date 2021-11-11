import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Alert } from "react-native";
import io from "socket.io-client";
import styles from "./Styles";
import ChatSelect from "../../components/ChatSelect/ChatSelect";
import { useAuth } from "../../contexts/AuthContext";
import Login from "../Login/Login";
import api from "../../services/api";
import { useServer } from "../../contexts/ServerContext";
import ButtonBack from "../../components/ButtonBack/ButtonBack"

export default function Chats({ navigation }) {
  const [user, setUser] = useAuth();
  const [chats, setChats] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [server, setServer] = useServer();
  const socket = io(server);

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
    setRefresh(true);
    getChats();
  }

  useEffect(() => {
    socket.disconnect()
    getChats();
  }, []);

  if (!user) return <Login />;
  return (
    <View style={styles.container}>
      <ButtonBack onPress={() => navigation.goBack()} />
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
