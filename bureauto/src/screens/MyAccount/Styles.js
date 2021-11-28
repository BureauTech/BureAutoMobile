import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  buttonInf: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    borderWidth: 2,
    borderColor: "#2A6484",
    borderRadius: 20,
    marginTop: 15,
    width: "90%",
  },
  icon: {
    padding: 10,
  },
  text: {
    fontSize: 25,
    color: "#2A6484",
    fontWeight: "bold",
  },
});

export default styles;
