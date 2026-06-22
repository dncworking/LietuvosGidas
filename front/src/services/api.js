import axios from "axios";

// Sukuriame Axios instanciją su tavo Backendo baziniu adresu
const API = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

// Šis interceptor'ius AUTOMATIŠKAI prikabins JWT žetoną prie KIEKVIENOS užklausos,
// jei tik jis bus išsaugotas naršyklės atmintyje (localStorage).
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
