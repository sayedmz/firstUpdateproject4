import axios from "axios";
import Cookie from "cookie-universal";
import { baseURL } from "./Api";

const cookie = Cookie();
const token = cookie.get("commerce");

export const Axios = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
