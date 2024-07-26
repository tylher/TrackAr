import { axiosInstance } from "./axiosInstance";

export const sendGetRequest = async (url, params = {}, headers = {}) => {
  try {
    const res = await axiosInstance.get(url, { params, headers });
    return res.data;
  } catch (error) {
    console.error("Error making GET request:", error);
    throw error; // Re-throw the error to handle it where the function is called
  }
};
