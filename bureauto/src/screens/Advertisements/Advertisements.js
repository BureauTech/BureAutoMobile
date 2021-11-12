import React, { useEffect, useState } from "react";
import { View, FlatList, Alert, SafeAreaView, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Text } from "react-native";
import api from "../../services/api";
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

  function getAds(curPage) {
    setLoading(true);
    getPagination();
    setCurrentPage(curPage || 1)
    api
      .get(
        `/advertisement/all?page=${curPage || currentPage
        }&items=${itemsPerPage}`
      )
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
    getPagination();
    getAds(currentPage)
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
      : getAds()
    setLoading(false);
  }

  function getPagination() {
    api
      .get("/advertisement/pagination/quantity")
      .then((res) => {
        if (res.data.success) {
          setPaginationPages(Math.ceil(res.data.data / itemsPerPage));
        }
      })
      .catch((err) => console.log(err));
  }

  function pagination() {
    let paginationList = [];
    for (let k = 0; k < paginationPages; k++) {
      paginationList.push(k + 1);
    }
    return paginationList;
  }

  useEffect(() => {
    getPagination()
    getAds();
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
            />
          </View>

          <View style={styles.containerPagination}>
            <TouchableOpacity
              style={[
                styles.btnPagination,
                currentPage === 1 && styles.currentPageBtn,
              ]}
              disabled={currentPage === 1}
              onPress={() => getAds(currentPage - 1)}
            >
              <Text style={{ height: 18 }}>{"<"}</Text>
            </TouchableOpacity>
            {pagination().map(function (page, index) {
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.btnPagination, currentPage === page && styles.currentPageBtn]}
                  disabled={currentPage === page}
                  onPress={() => {
                    setCurrentPage(page);
                    getAds(page);
                  }}
                >
                  <Text style={{ height: 18 }}>{page}</Text>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity
              style={[styles.btnPagination, currentPage === paginationPages && styles.currentPageBtn]}
              disabled={currentPage === paginationPages}
              onPress={() => getAds(currentPage + 1)}
            >
              <Text style={{ height: 18 }}>{">"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
