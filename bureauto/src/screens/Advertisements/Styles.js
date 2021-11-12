import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#cdd8de",
    marginTop: 5,
    height: "10%"
  },
  containerAds: {
    width: "90%",
    height: "80%",
    marginBottom: 20,
    paddingTop: 20,
  },
  searchContainer: {
     //marginTop: 20,
  },
  containerPagination: {
    flexDirection: "row",
    height: "10%",
    marginBottom: 30,
  },
  btnPagination: {
    justifyContent: "center",
    borderWidth: 1,
    marginBottom: 20,
    borderColor: "#2a6484",
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 10,
    height: "33%",
    marginHorizontal: 3
  },
  currentPageBtn: {
    borderColor: "#fff",
  }
});

export default styles;
