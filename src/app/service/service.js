import axios from "axios";
import { API_ENDPOINT } from "../appConfig";

const fetchDataToken = (url, data, method) => {
  const token = localStorage.getItem("access_token");
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  switch (method) {
    case "GET":
      return axios.get(API_ENDPOINT + url, { ...config, params: data });
    case "POST":
      return axios.post(API_ENDPOINT + url, data, config);
    case "PUT":
      return axios.put(API_ENDPOINT + url, data, config);
    case "DELETE":
      return axios.delete(API_ENDPOINT + url, data, config);
  }
};

const fetchGetDataToken = (url, params) => {
  const token = localStorage.getItem("access_token");
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return axios.get(API_ENDPOINT + url, { ...config, params });
};

export const createService = (data) => {
  return fetchDataToken("/service", data, "POST");
};

export const createCombo = (data) => {
  return fetchDataToken("/combo", data, "POST");
};

export const searchByPageBooking = (data = {}) => {
  return fetchDataToken("/bookings/search", data, "GET");
};

export const updateStatusBooking = (data) => {
  return fetchDataToken("/bookings/update-booking-status-list", data, "PUT");
};

export const completeBooking = (data, id) => {
  const token = localStorage.getItem("access_token");
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return axios.put(
    API_ENDPOINT + "/bookings/complete-booking/" + id,
    data,
    config
  );
};

export const getAccounts = (data) => {
  return fetchGetDataToken("/users", data, "GET");
};

export const createAccount = (data) => {
  return fetchDataToken("/auth/register", data, "POST");
};

export const updateAccount = (data) => {
  return fetchDataToken("/users/update", data, "POST");
};
