
import { useNavigate } from "react-router-dom";
import { httpService } from "../httpService";
import { API_ENDPOINTS } from "../../constants/endpoints";
import { buildUrl, errorMsg } from "../../utils/customeFn";
import { useState } from "react";

const useAuthService = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const loginAPi = async (data, params = {}) => {
    setLoading(true);
    try {
      const url = buildUrl(API_ENDPOINTS?.login, params);
      return await httpService.post(url, data, navigate);
    } catch (error) {
      errorMsg(error);
      return null;
    } finally {
      setLoading(false);
    }
  };
  return{loading,loginAPi}
}
export default useAuthService;
