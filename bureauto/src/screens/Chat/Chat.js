import React, { useEffect, useCallback, useState } from "react";
import { Alert, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import io from "socket.io-client";
import { Icon } from "react-native-elements";

import { useAuth } from "../../contexts/AuthContext";
import { useServer } from "../../contexts/ServerContext";
import { GiftedChat } from "react-native-gifted-chat";
import api from "../../services/api";

export default function Chat({ route, navigation }) {
  const { chat, ad } = route.params;
  const [user, setUser] = useAuth();
  const [server, setServer] = useServer();
  const [chatMessages, setChatMessages] = useState([]);

  const socket = io(server);

  function getMessages() {
    api
      .get(`/message/messages/${chat.cha_cod}`)
      .then((res) => {
        setChatMessages(
          res.data.data.map(function (item) {
            return {
              _id: item.mes_cod,
              text: item.mes_text,
              createdAt: item.mes_created_at,
              user: {
                _id: item.mes_use_cod,
              },
            };
          })
        );
      })
      .catch((err) => {
        Alert.alert("erro");
      });
  }


  useEffect(() => {
    socket.disconnect()
    socket.connect()
    getMessages();
    socket.emit("joinRoom", chat.cha_cod);

    socket.on("getMessageSent", () => getMessages());
  }, []);

  const onSend = useCallback((messages = []) => {
    api
      .post("/message/create", {
        cha_cod: chat.cha_cod,
        message: messages[0].text,
      })
      .then((res) => {
        socket.emit("sendMessage", res.data.data);
      })
      .catch((err) => Alert.alert("Erro ao enviar a mensagem"));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.infoAd}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={40} color="#2a6484" />
        </TouchableOpacity>
        <View style={styles.infoAdContainer}>
          <Text style={styles.text}>
            {!chat.adv_model_description
              ? ad.adv_model_description
              : chat.adv_model_description}
          </Text>
          <Text style={styles.text}>
            R${" "}
            {!chat.adv_value
              ? ad.adv_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
              : chat.adv_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </Text>
        </View>
      </View>
      <GiftedChat
        messagesContainerStyle={styles.messagesContainer}
        placeholder="Digite uma mensagem..."
        messages={chatMessages.reverse()}
        showAvatarForEveryMessage={true}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: user.use_cod,
          name: user.use_name,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
  },
  infoAd: {
    height: "10%",
    //padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#2a6484",
    marginTop: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#2a6484",
  },
  messagesContainer: {
    //borderWidth: 2,
    //borderColor: "#2a6484"
  },
  iconContainer: {
    width: "auto",
    justifyContent: "center",
    height: "100%",
  },
  infoAdContainer: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
});
