import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./Styles";
import { useServer } from "../../contexts/ServerContext";
const logoBureau = require("../../../assets/logo.png");

export default function ChatSelect({ onPress, chatInfo }) {
  const [server, setServer] = useServer();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchable}
        activeOpacity={0.5}
        onPress={onPress}
      >
        {!chatInfo.adv_images ? (
          <Image source={logoBureau} style={styles.image} />
        ) : (
          <Image
            source={{ uri: server + chatInfo.adv_images }}
            style={styles.image}
          />
        )}
        <View style={styles.infs}>
          <Text style={styles.title}>{chatInfo.adv_model_description}</Text>
          <Text style={styles.price}>
            R${" "}
            {chatInfo.adv_value
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </Text>
          <Text style={styles.lastMessage} numberOfLines={1}>
            <Text style={styles.msgUser}>{chatInfo.use_name}</Text> : {chatInfo.last_message}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
