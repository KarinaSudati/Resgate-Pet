import axios from "axios";

const api = axios.create({
  baseURL: "https://resgate-pet.onrender.com",
});

export default api;
