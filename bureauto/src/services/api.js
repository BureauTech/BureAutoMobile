import axios from "axios";

const api = axios.create({
  baseURL: "https://bureauto-backend.herokuapp.com",
});

export default api;
