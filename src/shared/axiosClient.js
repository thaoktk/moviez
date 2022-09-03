import axios from "axios";
import { API_MOVIE } from "./constant";

const axiosClient = axios.create({
  baseURL: API_MOVIE,
  params: {
    api_key: "e9e9d8da18ae29fc430845952232787c", // process.env.REACT_APP_API_KEY,
  },
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
