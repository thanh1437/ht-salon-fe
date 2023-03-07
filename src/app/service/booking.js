import axios from "axios";
import { API_ENDPOINT } from "../appConfig";

export const createBooking = (data, token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return axios.post(API_ENDPOINT + "/bookings", data, config);
};

export const getServices = (data) => {
  return axios.get(API_ENDPOINT + "/service/search");
};

export const getCombos = (data) => {
  return axios.get(API_ENDPOINT + "/combo/search");
};

export const getStylists = (data, token) => {
  return axios.get(API_ENDPOINT + "/users/get-users-role-employee");
};

export const checkDateEmployee = (data) => {
  const token = localStorage.getItem("access_token");
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return axios.post(
    API_ENDPOINT + "/bookings/get-working-time-information",
    data,
    config
  );
};
