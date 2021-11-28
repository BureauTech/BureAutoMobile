import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Alert,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Styles";
import Advertisement from "../../components/Advertisement/Advertisement";
import Loading from "../../components/Loading/Loading";
import Search from "../../components/Search/Search";

export default function Advertisements({ navigation }) {
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [textValue, setTextValue] = useState("");
  const [paginationPages, setPaginationPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [user, setUser] = useAuth();

  function getAds(curPage) {
    setLoading(true);
    api
      .get(`/advertisement/all?page=${curPage || 1}&items=${itemsPerPage}`)
      .then((res) => {
        setData(res.data.data);
        setRefresh(false);
        setLoading(false);
      })
      .catch((err) => {
        Alert.alert("Erro!", "Houve um erro ao tentar obter os anúncios!", [
          {
            text: "Tentar novamente!",
            onPress: () => getAds(),
          },
          { text: "Voltar!", onPress: () => navigation.goBack() },
        ]);
        setLoading(true);
      });
  }

  function handleRefresh() {
    setCurrentPage(1);
    setData([]);
    setRefresh(true);
    getAds(1);
  }

  function searchAds(term) {
    setLoading(true);
    term
      ? api
          .get(`/advertisement/search/${JSON.stringify({ term: term })}`)
          .then((res) => {
            Keyboard.dismiss();
            if (res.data.data.length) {
              setData(res.data.data);
              setRefresh(false);
              setLoading(false);
            } else {
              Alert.alert("Não encontramos nenhum anúncio para sua pesquisa!");
            }
          })
          .catch((err) => {
            Alert.alert("Houve um erro ao tentar obter os anúncios!");
            handleRefresh(true);
          })
      : getAds();
    setLoading(false);
  }

  function loadMoreAds() {
    api
      .get(`/advertisement/all?page=${currentPage + 1}&items=${itemsPerPage}`)
      .then((res) => {
        setData([...data, ...res.data.data]);
        setCurrentPage(currentPage + 1);
      });
  }

  async function getLoginSaved() {
    let result = await SecureStore.getItemAsync("bureautoLogin");
    if (result) {
      setUser(JSON.parse(result));
    }
  }

  function logOff() {
    setUser(false);
    deleteLogin("bureautoLogin");
    api.get("/logout");
  }
  async function deleteLogin(key) {
    await SecureStore.deleteItemAsync(key);
  }

  function verifyLogged() {
    api.get("/auth").then((res) => {
      if (!res.data.success) {
        logOff();
      }
    });
  }
  useEffect(() => {
    getAds();
    verifyLogged()
    getLoginSaved();
  }, []);

  if (loading) return <Loading />;
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View>
            <Search
              setTextValue={setTextValue}
              textValue={textValue}
              onPress={() => searchAds(textValue)}
            />
          </View>
          <View style={styles.containerAds}>
            <FlatList
              onRefresh={() => handleRefresh()}
              refreshing={refresh}
              data={data}
              renderItem={({ item }) => (
                <Advertisement
                  onPress={() =>
                    navigation.navigate("Advertisement", { ad: item })
                  }
                  ad={item}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              onEndReached={loadMoreAds}
              onEndReachedThreshold={0.5}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
