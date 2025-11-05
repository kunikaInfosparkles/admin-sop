import { useSnackbar } from "../context/toasterContext.jsx";
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



export const useAlertHelper = () => {
  const { showMessage } = useSnackbar();
  const successMsg = (msg) => showMessage(msg, "success");
  const errorMsg = (msg) => showMessage(msg, "error");
  const warningMsg = (msg) => showMessage(msg, "warning");

  return { successMsg, errorMsg, warningMsg };
};


export const handleCatchErrors = (error, navigate, rejectWithValue, path) => {

  if (error.code === "ERR_NETWORK") {
    if (rejectWithValue) {
      navigate("/");
      return rejectWithValue(error.message);
    }
  } else {
    const { status, data } = error.response || {}; 

    if (error.response !== undefined) {
      switch (status) {
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
          if (data.message) {
            errorMsg(data.message);
          }
          break;
        default:
          navigate("/");
      }
    }
  }
};


