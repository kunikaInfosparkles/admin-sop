import toast from "react-hot-toast";
import { getToken } from "./tokenUtils.js";

export const resolveTime = 1000

export const getHeader = () => {
  const config = {
    headers: {
      authorization: getToken()
    },
  };
  return config;
};
export const errorMsg = (message) => {
  const msg = message || "Something went wrong";
  toast.error(msg, { id: "error-toast" });
  return message;
};

export const successMsg = (message = "Success") => {
  toast.success(message, { id: "success-toast" });
};


export const handleCatchErrors = (error, navigate) => {
  const { status, data } = error.response || {};

  if (error.response !== undefined) {
    if (data?.message) {
      errorMsg(data?.error?.detail || data?.message);
    }
    switch (status) {
      case 409:
        if (data?.message) {
          errorMsg(data?.message);
        }
        break;
        case 403:
        break;
      case 401:
        break;
      case 402:
        break;
      case 400:
        break;
        case 404:
          break;
      case 422:
        break;
      case 500:
        break;
      default:
        // Don't redirect to home page on submission errors
        // Let the component handle the error display
        console.error('Unhandled error status:', status, data);
    }
  }
};

export const buildUrl = (baseUrl, params = {}) => {
  let url = baseUrl;
  const remainingParams = { ...params };
  Object.keys(params).forEach((key) => {
    const placeholder = `:${key}`;
    if (url.includes(placeholder)) {
      url = url.replace(placeholder, params[key]);
      delete remainingParams[key]; // Remove used params
    }
  });
  const query = new URLSearchParams(remainingParams).toString();
  return query ? `${url}?${query}` : url;
};

