import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-around",
    height: "auto",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 3,
    flexDirection: "row",
    marginVertical: 5,
  },
  containerImage: {
    justifyContent: "center",
    alignContent: "center",
    width: "35%",
  },
  image: {
    width: Dimensions.get("window").width * 0.3,
    height: Dimensions.get("window").height * 0.1,
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
    width: "60%",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    flexDirection: "row",
  },
});

export default styles;