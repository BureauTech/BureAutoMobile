import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import api from "../../services/api";

import Loading from "../../components/Loading/Loading";

const logo = require("../../../assets/logo.png");
import { useServer } from "../../contexts/ServerContext";

export default function Advertisement({ route, navigation }) {
  const { ad } = route.params;
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [server, setServer] = useServer();

  function getAd() {
    setLoading(true);
    api
      .get(`/advertisement/${ad.adv_cod}`)
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        Alert.alert("Houve um erro ao tentar obter os anúncios!");
      });
  }

  useEffect(() => {
    getAd();
  }, []);

  if (loading) return <Loading />;
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.infContainer}>
        <View style={styles.imageContainer}>
          {!data.adv_images ? (
            <Image source={logo} style={styles.image} />
          ) : (
            <Image
              source={{ uri: server + data.adv_images }}
              style={styles.image}
            />
          )}
        </View>
        <View style={{ height: "auto" }}>
          <Text style={styles.textTitle}>
            R$ {data.adv_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </Text>

          <View style={styles.containerNameAd}>
            <Text style={styles.textInf}>{data.Manufacturer.man_name} </Text>
            <Text style={styles.textTitle}> {ad.adv_model_description}</Text>
          </View>

          <View style={styles.containerDesc}>
            <Text style={styles.textDesc}>{data.adv_description}</Text>
          </View>

          <View style={styles.contYearUse}>
            <View>
              <Text style={styles.textInf}>Ano</Text>
              <Text style={styles.textTitle}>{data.adv_year_manufacture}</Text>

              <Text>Anúncio: {data.adv_cod}</Text>
            </View>
            <View>
              <Text style={styles.textInf}>Vendedor</Text>
              <Text style={styles.textTitle}>
                {data.use_is_cpf_document ? "Pessoa Física" : "Pessoa Jurídica"}
              </Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonContact} activeOpacity={0.7}>
              <Text style={styles.text}>Entrar em contato</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  imageContainer: {
    //height: "40%",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginTop: 20,
  },
  logo: {
    width: 200,
    height: 100,
  },
  image: {
    width: Dimensions.get("screen").width * 0.75,
    height: Dimensions.get("window").height * 0.25,
    borderRadius: 10,
  },
  infContainer: {
    borderRadius: 40,
    height: "auto",
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "space-around",
  },
  textTitle: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 20,
    color: "#2a6484",
  },
  textInf: {
    fontFamily: "Roboto",
    fontSize: 20,
    color: "#2a6484",
  },
  containerNameAd: {
    flexDirection: "row",
  },
  contYearUse: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  buttonContact: {
    borderWidth: 1,
    borderColor: "#2A6484",
    borderRadius: 20,
    width: "100%",
    alignItems: "center",
    padding: 5,
    alignItems: "center",
  },
  text: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 20,
    color: "#2a6484",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  containerDesc: {
    marginTop: 20,
  },
  textDesc: {
    fontSize: 16,
    marginBottom: 20,
  },
});
