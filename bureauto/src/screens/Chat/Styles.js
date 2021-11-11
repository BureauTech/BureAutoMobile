import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
  },
  infoAd: {
    height: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#2a6484",
    marginTop: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#2a6484",
  },
  iconContainer: {
    width: "auto",
    justifyContent: "center",
    height: "100%",
  },
  infoAdContainer: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  sendContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginRight: 15,
  },
});

export default styles;
