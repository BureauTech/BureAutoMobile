import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import styles from "./Styles";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import Advertisement from "../../components/Advertisement/Advertisement";
import Loading from "../../components/Loading/Loading";
import ButtonBack from "../../components/ButtonBack/ButtonBack"

export default function MyFavorites({navigation }) {
  const [user, setUser] = useAuth();
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  
  function getFavoritesByUSer() {
    api
      .get(`/favorite/favorites/${user.use_cod}`)
      .then((res) => {
        setData(res.data.data);
        setRefresh(false);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRefresh() {
    setData([]);
    setRefresh(true);
    getFavoritesByUSer();
  }

  useEffect(() => {
    getFavoritesByUSer();
  }, []);
  if (loading) return <Loading />;
  return (
    <View style={styles.container}>
      {data.length ? (
        <View style={styles.conatinerAds}>
          <ButtonBack onPress={() => navigation.goBack()}/>
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
          <ButtonBack onPress={() => navigation.goBack()}/>
          <View style={{height: "90%", justifyContent: "center"}}>
            <Text style={styles.textNotAd}>Voce não possui anúncios favoritados</Text>
            </View>
        </View>
      )}
    </View>
  );
}
