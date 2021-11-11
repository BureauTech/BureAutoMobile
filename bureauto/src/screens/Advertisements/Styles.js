import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#cdd8de",
    marginTop: 5,
  },
  conatinerAds: {
    width: "90%",
    height: "85%",
    marginBottom: 20,
    paddingTop: 20,
  },
  searchContainer: {
    marginTop: 20,
  },
  containerPagination: {
    flexDirection: "row",
    height: "5%",
  },
  btnPagination: {
    justifyContent: "center",
    borderWidth: 1,
    marginBottom: 20,
    borderColor: "#2a6484",
    borderRadius: 20,
    backgroundColor: "#fff",
    padding: 10
  },
  currentPageBtn: {
    borderColor: "#fff",
  }
});

export default styles;
