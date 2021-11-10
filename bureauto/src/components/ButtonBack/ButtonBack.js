import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

export default function ButtonBack({onPress}) {
    return (
        <TouchableOpacity
          style={styles.container}
          onPress={onPress}
        >
          <Icon name="arrow-back" size={40} color="#2a6484" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "flex-start",
        width: "100%",
        marginLeft: 20
      }
})