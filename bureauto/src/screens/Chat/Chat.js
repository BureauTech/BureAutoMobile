import React, {
  useEffect,
  useCallback,
  useState
} from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import io from "socket.io-client";

const socket = io("http://192.168.100.6:3007");

import { useAuth } from "../../contexts/AuthContext";
import { GiftedChat } from "react-native-gifted-chat";

export default function Chat() {
  const [user, setUser] = useAuth();
  const messages = [
    {
      mes_cod: 1,
      mes_use_cod: 2,
      mes_cha_cod: 1,
      mes_text: "oi. como vai?",
    },
    {
      mes_cod: 2,
      mes_use_cod: 1,
      mes_cha_cod: 1,
      mes_text: "vou bem meu chegado",
    },
    {
      mes_cod: 3,
      mes_use_cod: 2,
      mes_cha_cod: 1,
      mes_text: "esse veiculo ai ta top?",
    },
    {
      mes_cod: 4,
      mes_use_cod: 2,
      mes_cha_cod: 1,
      mes_text: "sem nada pra fazer?",
    },
    {
      mes_cod: 5,
      mes_use_cod: 1,
      mes_cha_cod: 1,
      mes_text: "é só pegar e andar, nunca me deu problemas",
    },
    {
      mes_cod: 10,
      mes_use_cod: 2,
      mes_cha_cod: 1,
      mes_text: "beleza e qual o valor dele",
    },
    {
      mes_cod: 6,
      mes_use_cod: 1,
      mes_cha_cod: 1,
      mes_text: "o valor é inestimável, mas o preço é esse aí do anúncio mesmo",
    },
    {
      mes_cod: 7,
      mes_use_cod: 2,
      mes_cha_cod: 1,
      mes_text: "okkkki",
    },
    {
      mes_cod: 8,
      mes_use_cod: 1,
      mes_cha_cod: 1,
      mes_text: "ta interessado?",
    },
    {
      mes_cod: 9,
      mes_use_cod: 2,
      mes_cha_cod: 1,
      mes_text: "to sim",
    },
    {
      mes_cod: 16,
      mes_use_cod: 1,
      mes_cha_cod: 1,
      mes_text: "ok entao",
    },
    {
      mes_cod: 88,
      mes_use_cod: 1,
      mes_cha_cod: 1,
      mes_text: "mas nao posso falar agr",
    },
    {
      mes_cod: 99,
      mes_use_cod: 2,
      mes_cha_cod: 1,
      mes_text: "ok. fico no aguardo",
    },
  ];
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    setChatMessages(
      messages.map(function (item) {
        return {
          _id: item.mes_cod,
          text: item.mes_text,
          createdAt: new Date(),
          user: {
            _id: user.use_cod,
            name: "caique",
          },
        };
      })
    );

    socket.on("chat message", (msg) => {
      setChatMessages([...chatMessages, msg]);
    });
  }, []);

  const onSend = useCallback((messages = []) => {
    setChatMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.messages}>
        <GiftedChat
          messages={chatMessages}
          showAvatarForEveryMessage={true}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: user.use_cod,
            name: user.use_name,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 50,
    height: "100%",
  },
  messages: {
    backgroundColor: "#fff",
    width: "100%",
    height: "90%",
    maxHeight: "90%",
    marginTop: 20,
  }
});
