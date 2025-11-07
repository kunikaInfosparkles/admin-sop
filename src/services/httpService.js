
import axios from "./axios";
import { getHeader, handleCatchErrors } from "../utils/customeFn";

export const httpService = {
  async get(url, navigate) {
    try {
      const config = { ...getHeader() };
      return await axios.get(url, config);
    } catch (err) {
      return handleCatchErrors(err, navigate);
    }
  },

  async post(url, data, navigate) {
    try {
      return await axios.post(url, data);
    } catch (err) {
      return handleCatchErrors(err, navigate);
    }
  },
  async put(url, data, navigate) {
    try {
      return await axios.put(url, data);
    } catch (err) {
      return handleCatchErrors(err, navigate);
    }
  },

  async patch(url, data, navigate) {
    try {
      return await axios.patch(url, data);
    } catch (err) {
      return handleCatchErrors(err, navigate);
    }
  },

  async delete(url, navigate) {
    try {
      return await axios.delete(url);
    } catch (err) {
      return handleCatchErrors(err, navigate);
    }
  },
};
