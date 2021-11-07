import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Alert,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import api from "../../services/api";

import Advertisement from "../../components/Advertisement/Advertisement";
import Loading from "../../components/Loading/Loading";
import Search from "../../components/Search/Search";

export default function Advertisements({ navigation }) {
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [textValue, setTextValue] = useState("");

  function getAds() {
    setLoading(true);
    api
      .get("/advertisement/all")
      .then((res) => {
        setData(res.data.data);
        setRefresh(false);
        setLoading(false);
      })
      .catch((err) => {
        Alert.alert(
          "Erro!",
          "Houve um erro ao tentar obter os anúncios!",
          [
            {
              text: "Tentar novamente!",
              onPress: () => getAds(),
            },
            { text: "Voltar!", onPress: () => navigation.goBack() },
          ]
        );
        setLoading(true);
      });
  }

  function handleRefresh() {
    setData([]);
    setRefresh(true);
    getAds();
  }

  function searchAds(term) {
    setLoading(true);
    term
      ? api
          .get(`/advertisement/search/${JSON.stringify({term: term})}`)
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
            setLoading(true);
          })
      : Alert.alert("Digite algo para pesquisar!");
    setLoading(false);
  }

  useEffect(() => {
    getAds();
  }, []);

  //if (loading) return <Loading />;
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <Search
              setTextValue={setTextValue}
              textValue={textValue}
              onPress={() => searchAds(textValue)}
            />
          </View>
          <View style={styles.conatinerAds}>
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
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#cdd8de",
    marginTop: 5,
  },
  conatinerAds: {
    width: "90%",
    height: "85%",
    marginBottom: 20,
    paddingTop: 20,
    //marginTop: 20,
  },
  searchContainer: {
    marginTop: 20,
  },
});
