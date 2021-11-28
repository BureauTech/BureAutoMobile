import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import { useServer } from "../../contexts/ServerContext";

import ButtonBack from "../../components/ButtonBack/ButtonBack";

export default function ViewReports({navigation}) {
  return (
    <View style={{ flex: 1}}>
        <View style={{padding: 10}}>
        <ButtonBack onPress={() => navigation.goBack()}/>
        </View>
      <WebView
        source={{
          uri: "https://bureauto.herokuapp.com" + "/relatorios",
        }}
      />
      </View>
  );
}
