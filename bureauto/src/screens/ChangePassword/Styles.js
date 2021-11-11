import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "90%",
    padding: 10,
  },
  showPassContainer: {
    width: "70%",
    alignItems: "flex-end",
    padding: 20,
  },
  containerImg: {
    height: "20%",
  },
  logo: {
    width: 200,
    height: 100,
  },
  text: {
    color: "#2a6484",
    textAlign: "center",
  },
  button: {
    borderWidth: 1,
    borderColor: "#2a6484",
    width: "50%",
    padding: 10,
    marginTop: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  txtPassDiff: {
    color: "red",
    padding: 20,
  },
  containerInput: {
    flexDirection: "row",
    width: "70%",
    borderWidth: 1,
    marginTop: 20,
    borderColor: "#2a6484",
    borderRadius: 20,
    alignItems: "center",
  },
  passLike: {
    textAlign: "center",
    color: "red",
  },
  passLikeTitle: {
    color: "#2a6484",
    fontSize: 16,
  },
});

export default styles;
