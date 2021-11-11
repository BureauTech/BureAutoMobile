import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderBottomColor: "#2A6484",
    borderBottomWidth: 1,
    padding: 3
  },
  title: {
    color: "#2A6484",
    fontSize: 20,
  },
  price: {
    color: "#2A6484",
    fontSize: 20,
    fontWeight: "bold",
  },
  lastMessage: {
    color: "#2A6484",
    fontSize: 15,
  },
  image: {
    width: Dimensions.get("window").width * 0.250,
    height: Dimensions.get("window").height * 0.1,
    borderRadius: 10,
  },
  touchable: {
    flexDirection: "row"
  },
  infs: {
    marginLeft: 10
  },
  msgUser: {
    fontWeight: "bold"
  }
});

export default styles;
