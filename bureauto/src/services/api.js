import axios from "axios";

const api = axios.create({
  baseURL: "https://api-bureauto.herokuapp.com",
});

export default api;
