import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Alert } from "react-native";
import api from "../../services/api";

import Advertisement from "../../components/Advertisement/Advertisement";
import Loading from "../../components/Loading/Loading";

export default function Advertisements({ navigation }) {
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  function getAds() {
    setLoading(true);
    api
      .get("/advertisement/all/1")
      .then((res) => {
        setData(res.data.data);
        setRefresh(false);
        setLoading(false);
      })
      .catch((err) => {
        Alert.alert("Houve um erro ao tentar obter os anúncios!");
        setLoading(true);
      });
  }

  function handleRefresh() {
    setData([]);
    setRefresh(true);
    getAds();
  }

  useEffect(() => {
    getAds();
  }, []);

  if (loading) return <Loading />;
  return (
    <View style={styles.container}>
      <View style={styles.conatinerAds}>
        <FlatList
          onRefresh={() => handleRefresh()}
          refreshing={refresh}
          data={data}
          renderItem={({ item }) => (
            <Advertisement
              onPress={() => navigation.navigate("Advertisement", { ad: item })}
              ad={item}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#cdd8de",
  },
  conatinerAds: {
    width: "90%",
    height: "100%",
    marginBottom: 20,
    paddingTop: 20,
    marginTop: 20,
  },
});
