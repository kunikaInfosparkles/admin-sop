import axios from "axios";
import { getToken } from "../utils/tokenUtils";

let ReactAppUrl = import.meta.env.VITE_API_URL;

// Create axios instance with the dynamic base URL
const instance = axios.create({
    baseURL: ReactAppUrl,
});


instance.defaults.headers.common["Content-Type"] = "multipart/form-data";


instance.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        config.headers["content-type"] = "multipart/form-data";
    } else {
        config.headers["Content-Type"] = "application/json";
    }
    const accessToken = getToken();
    if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
});



export default instance;
