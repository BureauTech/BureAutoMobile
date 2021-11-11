import React, { useEffect, useState } from "react";
import { View, Text, Image, Alert, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from "react-native-elements";
import styles from "./Styles";
import api from "../../services/api";
import Loading from "../../components/Loading/Loading";
import { useServer } from "../../contexts/ServerContext";
import { useAuth } from "../../contexts/AuthContext";
import ButtonBack from "../../components/ButtonBack/ButtonBack"
const logo = require("../../../assets/logo.png");

export default function Advertisement({ route, navigation }) {
  const [user, setUser] = useAuth();
  const { ad } = route.params;
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [server, setServer] = useServer();
  const [icon, setIcon] = useState("star-outline");
  const [isFav, setIsFav] = useState(false);

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

  function favorite() {
    !isFav
      ? api
        .post("/favorite/register", { adv_cod: ad.adv_cod })
        .then((res) => {
          if (res.data.success) {
            setIsFav(true);
            setIcon("star");
          }
        })
        .catch((err) => { })
      : api.delete(`/favorite/${ad.adv_cod}`).then((res) => {
        if (res.data.success) {
          setIcon("star-outline");
          setIsFav(false);
        }
      });
  }

  function createChat() {
    if (!user) {
      Alert.alert(
        "Erro!",
        "Você precisa fazer login para entrar em contato com o anunciante!",
        [
          {
            text: "Ok",
          },
          { text: "Login!", onPress: () => navigation.navigate("Login", { back: true }) },
        ]
      );
    } else {
      api
        .post("/chat/create", { adv_cod: ad.adv_cod })
        .then((res) => {
          if (res.data.success) {
            navigation.navigate("Chat", { chat: res.data.data, ad: ad });
          } else {
            Alert.alert("Erro ao tentar entrar em contato!");
          }
        })
        .catch((err) => Alert.alert("Erro!"));
    }
  }

  if (user) {
    api
      .get(`/favorite/${ad.adv_cod}`)
      .then((res) => {
        if (res.data.data) {
          setIsFav(true);
          setIcon("star");
        }
      })
      .then((err) => { });
  }

  useEffect(() => {
    getAd();
  }, []);

  if (loading) return <Loading />;
  
  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.infContainer}>
        <ButtonBack onPress={() => navigation.goBack()} />
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
            <Text style={styles.textInf}>{data.man_name} </Text>
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
          {!user ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonContact}
                activeOpacity={0.7}
                onPress={() => createChat()}
              >
                <Text style={styles.text}>Entrar em contato</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <></>
          )}
          {user && user.use_cod != data.adv_use_cod ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonContact}
                activeOpacity={0.7}
                onPress={() => createChat()}
              >
                <Text style={styles.text}>Entrar em contato</Text>
              </TouchableOpacity>
              {user && user.use_cod != ad.adv_use_cod ? (
                <View>
                  <Icon
                    name={icon}
                    color="#2a6484"
                    onPress={() => favorite()}
                  />
                </View>
              ) : (
                <></>
              )}
            </View>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

