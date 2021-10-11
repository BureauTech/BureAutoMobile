import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";

export default function Loading() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <LottieView
        source={require("../../../assets/animation-loading.json")}
        autoPlay
        loop
      />
    </View>
  );
}
