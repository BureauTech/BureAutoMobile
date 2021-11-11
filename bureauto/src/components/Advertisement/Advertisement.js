import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./Styles";
import { useServer } from "../../contexts/ServerContext";
const logoBureau = require("../../../assets/logo.png");

export default function Advertisement({ onPress, navigation, ad }) {
  const [cor, setCor] = useState("");
  const [server, setServer] = useServer();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.8}
        onPress={onPress}
      >
        <View style={styles.containerImage}>
          {!ad.adv_images ? (
            <Image source={logoBureau} style={styles.image} />
          ) : (
            <Image
              source={{ uri: server + ad.adv_images }}
              style={styles.image}
            />
          )}
        </View>

        <View style={styles.containerInfs}>
          <View>
            {!ad.Manufacturer ? (
              <Text style={styles.textInfs} numberOfLines={1}>
                {ad.adv_model_description}
              </Text>
            ) : (
              <Text style={styles.textInfs} numberOfLines={1}>
                {ad.Manufacturer.man_name} | {ad.adv_model_description}
              </Text>
            )}
            <Text style={styles.textPrice}>
              R$ {ad.adv_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}