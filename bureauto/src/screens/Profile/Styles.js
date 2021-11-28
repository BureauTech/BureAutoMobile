import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  imageConatiner: {
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: Dimensions.get("window").width * 0.4,
    height: Dimensions.get("window").height * 0.1,
  },
  infsContainer: {
    borderWidth: 1,
    borderColor: "#2A6484",
    borderRadius: 40,
    height: "85%",
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "space-around",
  },
  textTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#2a6484",
  },
  textInf: {
    fontSize: 20,
    color: "#2a6484",
    marginLeft: 10,
  },
  buttonConatiner: {
    marginTop: 20,
    alignItems: "center",
  },
  buttonLogOff: {
    borderWidth: 1,
    borderColor: "#2A6484",
    borderRadius: 20,
    width: "80%",
    alignItems: "center",
  },
});

export default styles;
