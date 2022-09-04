import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  params: {
    api_key: process.env.REACT_APP_API_KEY,
  },
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
