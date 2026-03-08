import axios from "axios";

export const API = axios.create({
  baseURL: "http://10.147.212.105:5000/api",
});