import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 30
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginTop: 20,
  },
  logo: {
    width: 200,
    height: 100,
  },
  image: {
    width: Dimensions.get("screen").width * 0.75,
    height: Dimensions.get("window").height * 0.25,
    borderRadius: 10,
  },
  infContainer: {
    borderRadius: 40,
    height: "auto",
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
  },
  containerNameAd: {
    flexDirection: "row",
  },
  contYearUse: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  buttonContact: {
    borderWidth: 1,
    borderColor: "#2A6484",
    borderRadius: 20,
    width: "70%",
    alignItems: "center",
    padding: 5,
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#2a6484",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  containerDesc: {
    marginTop: 20,
  },
  textDesc: {
    fontSize: 16,
    marginBottom: 20,
  }
});

export default styles;
