import axios, { AxiosInstance } from "axios";
import { getAuthToken } from "../utils/localStorage";
import { URL_SERVER } from "../redux/api/api.constant";

const instance: AxiosInstance = axios.create({
  baseURL: URL_SERVER,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getAuthToken()}`;
  return config;
});

export default instance;
