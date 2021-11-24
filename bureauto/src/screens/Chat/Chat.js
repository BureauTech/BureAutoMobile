import React, { useEffect, useCallback, useState } from "react";
import { Alert, View, Text, TouchableOpacity } from "react-native";
import io from "socket.io-client";
import { Icon } from "react-native-elements";
import styles from "./Styles";
import { useAuth } from "../../contexts/AuthContext";
import { useServer } from "../../contexts/ServerContext";
import { GiftedChat, Send } from "react-native-gifted-chat";
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

  console.log(chatMessages)

  useEffect(() => {
    socket.connect();
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
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.text}>
              {!chat.adv_model_description
                ? ad.adv_model_description
                : chat.adv_model_description}{" "}
            </Text>
            <Text style={styles.text}>
              -{" "}
              {user.use_nickname === chat.use_nickname
                ? chat.use_nickname
                : chat.adv_use_nickname}
            </Text>
          </View>
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
        renderSend={(props) => {
          return (
            <Send {...props} containerStyle={styles.sendContainer}>
              <Icon name="send" color="#2a6484" />
            </Send>
          );
        }}
      />
    </View>
  );
}
