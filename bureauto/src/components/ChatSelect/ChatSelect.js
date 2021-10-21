import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"

export default function ChatSelect({ onPress }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
            <Text style={styles.title}>
                Corolla
            </Text>
            <Text style={styles.price}>
                R$ 122,990
            </Text>
            <Text style={styles.lastMessage}>
                Poderia me passar mais informações?
            </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderBottomColor: "#2A6484",
        borderBottomWidth: 1
    },
    title: {
        color: "#2A6484",
        fontSize: 20
    },
    price: {
        color: "#2A6484",
        fontSize: 20,
        fontWeight: "bold",
    },
    lastMessage: {
        color: "#2A6484",
        fontSize: 15
    }
})