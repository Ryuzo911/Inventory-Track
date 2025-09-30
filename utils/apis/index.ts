import axios from "axios";
import * as SecureStore from "expo-secure-store";


const api = axios.create({
  baseURL: "http://10.225.155.168:8000/api",
  // headers: {
  //   "Accept": "application/json"
  // },
  timeout: 60000, 
});

api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Interceptor error:", error);
    return Promise.reject(error);
  }
);




export default api;