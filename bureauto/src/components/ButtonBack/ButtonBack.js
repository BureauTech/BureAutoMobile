import React from "react";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import styles from "./Styles";

export default function ButtonBack({ onPress }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <Icon name="arrow-back" size={40} color="#2a6484" />
    </TouchableOpacity>
  )
}