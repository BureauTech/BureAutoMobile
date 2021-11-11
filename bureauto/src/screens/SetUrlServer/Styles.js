import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  text: {
    fontSize: 20,
    color: "#2a6484",
    fontWeight: "bold",
  },
  button: {
    padding: 10,
    borderWidth: 2,
    borderColor: "#2a6484",
    margin: 20,
    width: "50%",
    borderRadius: 20,
    alignItems: "center",
  },
  input: {
    padding: 10,
    borderWidth: 2,
    borderColor: "#2a6484",
    width: "70%",
    borderRadius: 20,
    textAlign: "center",
    margin: 20,
    fontSize: 20,
  },
  textI: {
    color: "red",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default styles;
