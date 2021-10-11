import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

import Advertisement from "../../components/Advertisement/Advertisement";
import Loading from "../../components/Loading/Loading";

export default function MyAdvertisements() {
  const [user, setUser] = useAuth();
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  function getAdsByUser() {
    setLoading(true);
    api
      .get(`/advertisement/all/${user.use_cod}`)
      .then((res) => {
        setData(res.data.data);
        setRefresh(false);
        setLoading(false);
      })
      .catch((err) => {});
  }

  function handleRefresh() {
    setData([]);
    setRefresh(true);
    getAdsByUser();
  }

  useEffect(() => {
    getAdsByUser();
  }, []);
  if (loading) return <Loading />;
  return (
    <View style={styles.container}>
      {data.length ? (
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
      ) : (
        <View style={styles.notAdContainer}>
          <Text style={styles.textNotAd}>Voce não possui anúncios</Text>
        </View>
      )}
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
  notAdContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#ffffff",
    width: "100%",
  },
  textNotAd: {
    fontFamily: "Roboto",
    fontSize: 20,
    color: "#2a6484",
    fontWeight: "bold",
  },
});
