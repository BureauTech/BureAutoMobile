import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    padding: 5,
    marginTop: 10
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderColor: "#2A6484",
    borderWidth: 2,
    borderRadius: 50,
    height: "50%",
    backgroundColor: "#fff",
  },
  input: {
    width: "70%",
    borderWidth: 1,
    marginTop: 20,
    borderColor: "#2a6484",
    borderRadius: 20,
    padding: 10,
  },
  text: {
    color: "#2a6484",
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
  containerImg: {
    height: "20%",
  },
  logo: {
    width: 200,
    height: 100,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "70%",
    marginTop: 10,
  },
  buttonPassCont: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  buttonPass: {
    width: "auto",
    marginTop: 5,
  },
  viewModal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  buttonClose: {
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 5,
    margin: 20,
    borderColor: "#2a6484",
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  txtModal: {
    color: "#2a6484",
    textAlign: "center",
    fontSize: 22,
  },
});

export default styles;
