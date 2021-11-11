import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    borderColor: "#2A6484",
    borderWidth: 1,
    height: "80%",
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 30,
    borderRadius: 50,
    marginBottom: 5,
  },
  topHeader: {
    width: "100%",
    alignItems: "center",
    borderBottomColor: "#2A6484",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2A6484",
  },
  chatsContainer: {
    width: "100%",
    padding: 3,
    marginBottom: 30,
    paddingVertical: 20,
  },
  noChat: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  textNoChat: {
    fontSize: 18,
    color: "#2A6484",
    textAlign: "center",
  },
});

export default styles;
