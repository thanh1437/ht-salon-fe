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

export const getServices = (data, token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return axios.get(API_ENDPOINT + "/service/search", config);
};

export const getCombos = (data, token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return axios.get(API_ENDPOINT + "/combo/search", config);
};

export const getStylists = (data, token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return axios.get(API_ENDPOINT + "/users/get-users-role-employee", config);
};

export const checkDateEmployee = (data, token) => {
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
