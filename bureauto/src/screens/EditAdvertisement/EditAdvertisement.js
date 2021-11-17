import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { useServer } from "../../contexts/ServerContext";
import ButtonBack from "../../components/ButtonBack/ButtonBack";

export default function EditAdvertisement({ navigation, route }) {
  const { ad } = route.params;
  const [server, setServer] = useServer();
  const a = {
    adv_cod: 1,
  };
  return (
    <WebView
      source={{
        uri: server.replace(/.$/, "1") + "/editar-anuncio/" + ad.adv_cod,
      }}
      onNavigationStateChange={(e) => {
        if (e.canGoBack) {
          navigation.goBack();
          navigation.goBack();
        }
      }}
    />
  );
}
