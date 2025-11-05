
import { httpService } from "./httpService";

export const loginService = async (data, navigate) => {
  return await httpService.post("/employee/login", data, navigate);
};
