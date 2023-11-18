import axios from "axios";
import store from "@/store/store";
import { GET_USER_TOKEN_GETTER } from "@/store/constants";

export default axios.create({
  baseURL: process.env.VUE_APP_API_SERVER_URL,
});

export const axiosPrivate = axios.create({
  baseURL: process.env.VUE_APP_API_SERVER_URL,
});

axiosPrivate.interceptors.request.use((config) => {
  const token = store.getters[`auth/${GET_USER_TOKEN_GETTER}`];
  config.headers = {
    Authorization: `Bearer ${token}`,
  };
  return config;
});
