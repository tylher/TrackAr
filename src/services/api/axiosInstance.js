import axios from "axios";
import { BASE_URL } from "./endpoints";

export const axiosInstance = axios.create({
  baseURL: BASE_URL, // Replace with your API base URL
  timeout: 10000, // Optional: Set a timeout for requests (in milliseconds)
  headers: {
    "Content-Type": "application/json",
    // Add any other default headers here
  },
});

export const authHeader = (username, password) => {
  let token = btoa(`${username}:${password}`);
  axiosInstance.defaults.headers.common["Authorization"] = `Basic ${token}`;
};
