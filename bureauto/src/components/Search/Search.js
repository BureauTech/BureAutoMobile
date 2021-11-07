import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Icon } from "react-native-elements";

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

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-around",
  },
  input: {
    width: "70%",
    borderWidth: 1,
    marginTop: 20,
    borderColor: "#2a6484",
    borderRadius: 20,
    padding: 10,
    fontSize: 18,
    backgroundColor: "#fff",
  },
  button: {
    justifyContent: "center",
    width: "15%",
    borderWidth: 1,
    marginTop: 20,
    borderColor: "#2a6484",
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  icon: {
    borderRadius: 20,
  },
});
