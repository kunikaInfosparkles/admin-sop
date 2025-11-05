// src/services/httpService.js
import {getHeader, handleCatchErrors } from "../utils/customeFn";
import axios from "./axios";

export const httpService = {
  
  async get(url, navigate) {
    try {
      const config = { ...getHeader() };
      return (await axios.get(url, config)).data;
    } catch (err) {
      return handleCatchErrors(err, navigate);
    }
  },

  async post(url, data, navigate) {
    try {
      return (await axios.post(url, data)).data;
    } catch (err) {
      return handleCatchErrors(err, navigate);
    }
  },

  async patch(url, data, navigate) {
    try {
      return (await axios.patch(url, data)).data;
    } catch (err) {
      return handleCatchErrors(err, navigate);
    }
  },

  async delete(url, navigate) {
    try {
      return (await axios.delete(url)).data;
    } catch (err) {
      return handleCatchErrors(err, navigate);
    }
  },
};
