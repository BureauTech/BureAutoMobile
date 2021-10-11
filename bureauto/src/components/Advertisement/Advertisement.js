import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Icon } from "react-native-elements";

const logoBureau = require("../../../assets/logo.png");
import { useServer } from "../../contexts/ServerContext";

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
            <Text style={styles.textPrice}>
              R$ {ad.adv_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </Text>
            {!ad.Manufacturer ? (
              <></>
            ) : (
              <Text style={styles.textInfs}>
                {ad.Manufacturer.man_name} | {ad.adv_model_description}
              </Text>
            )}
          </View>
          {/*<View>
            <Icon
              name="heart"
              type="foundation"
              color={cor}
              onPress={() => {
                cor === "#2a6484" ? setCor("") : setCor("#2a6484");
              }}
            />
            </View>*/}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "auto",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 40,
    padding: 3,
    marginBottom: 10,
  },
  containerImage: {
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  image: {
    width: Dimensions.get("window").width * 0.75,
    height: Dimensions.get("window").height * 0.2,
    borderRadius: 10,
  },
  textPrice: {
    fontSize: 24,
    color: "#2a6484",
    fontWeight: "bold",
  },
  textInfs: {
    fontSize: 20,
    color: "#2a6484",
  },
  containerInfs: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    flexDirection: "row",
  },
});
