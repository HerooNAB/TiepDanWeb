import axios from "axios";

const config = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const instance = axios.create({
  baseURL: "https://tiepdan.herokuapp.com/",
  // baseURL: "http://localhost:1010",
  config: config,
});

instance.interceptors.request.use(async (config) => {
  // Handle token here ...
  if (localStorage.getItem("accessToken")) {
    const token = await localStorage.getItem("accessToken");
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
