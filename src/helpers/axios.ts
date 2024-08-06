import Axios from "axios";
// auth helpers
import { getToken } from "helpers/auth";

const baseUrl = process.env.NEXT_PUBLIC_API_URL as string;
const apiKey = process.env.NEXT_PUBLIC_KEY as string;

export const axiosInstance = Axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: apiKey,
    session_id: getToken() ? getToken() : null,
  },
});
