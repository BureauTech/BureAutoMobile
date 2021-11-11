import React from "react";
import { View, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Icon } from "react-native-elements";
import styles from "./Styles";

export default function Search({ onPress, textValue, setTextValue }) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TextInput
          placeholder="Pesquisar"
          style={styles.input}
          value={textValue}
          onChangeText={(text) => setTextValue(text)}
        />
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Icon name="search" style={styles.icon} color="#2a6484" />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
