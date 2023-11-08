import axios, { AxiosInstance } from "axios";
import { getAuthToken } from "../utils/localStorage";

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getAuthToken()}`;
  return config;
});

export default instance;
