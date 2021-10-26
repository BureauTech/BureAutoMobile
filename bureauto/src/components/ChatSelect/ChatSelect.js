import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

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

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderBottomColor: "#2A6484",
    borderBottomWidth: 1,
    padding: 3
  },
  title: {
    color: "#2A6484",
    fontSize: 20,
  },
  price: {
    color: "#2A6484",
    fontSize: 20,
    fontWeight: "bold",
  },
  lastMessage: {
    color: "#2A6484",
    fontSize: 15,
  },
  image: {
    width: Dimensions.get("window").width * 0.250,
    height: Dimensions.get("window").height * 0.1,
    borderRadius: 10,
  },
  touchable: {
    flexDirection: "row"
  },
  infs: {
      marginLeft: 10
  },
  msgUser: {
      fontWeight: "bold"
  }
});
