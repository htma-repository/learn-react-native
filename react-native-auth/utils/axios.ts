import axios from "axios";

const BASE_URL_AUTH = "https://identitytoolkit.googleapis.com/v1";
const BASE_URL_RESOURCE =
  "https://react-native-expense-1951d-default-rtdb.asia-southeast1.firebasedatabase.app";

export const axiosInstance = axios.create({
  baseURL: BASE_URL_AUTH,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL_RESOURCE,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
