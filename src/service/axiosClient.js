import axios from "axios";
import { API_PATH } from "./constant";

let token = "";

export const getToken = (accessToken) => {
  token = accessToken;
};

const axiosClient = axios.create({
  baseURL: API_PATH,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000,
});

axiosClient.interceptors.request.use(
  function (config) {
    config.headers["api-token"] = token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // if (response?.data?.data["api-token"]) {
    //   getToken(response.data.data["api-token"]);
    // }
    return response.data;
  },
  function (error) {
    if (error["message"] === "Network Error") {
      // console.log("Network Error ==> ", error);
      return Promise.reject(error);
    }
    return Promise.reject(error.response?.data);
  }
);
export default axiosClient;
