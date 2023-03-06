import axios from "axios";
import { API_ENDPOINT } from "../appConfig";

export const login = (data) => {
  return axios.post(API_ENDPOINT + "/auth/login", data);
};

export const logout = (data) => {
  return axios.post(API_ENDPOINT + "/auth/logout", data);
};

export const register = (data) => {
  return axios.post(API_ENDPOINT + "/auth/register", data);
};
