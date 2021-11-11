import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-around",
  },
  input: {
    width: "70%",
    borderWidth: 1,
    marginTop: 20,
    borderColor: "#2a6484",
    borderRadius: 20,
    padding: 10,
    fontSize: 18,
    backgroundColor: "#fff",
  },
  button: {
    justifyContent: "center",
    width: "15%",
    borderWidth: 1,
    marginTop: 20,
    borderColor: "#2a6484",
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  icon: {
    borderRadius: 20,
  },
});

export default styles;
