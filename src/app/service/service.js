import axios from "axios";
import { API_ENDPOINT } from "../appConfig";

const token = localStorage.getItem("access_token");

const config = {
  headers: {
    Authorization: "Bearer " + token,
  },
};

export const createService = (data) => {
  return axios.post(API_ENDPOINT + "/service", data, config);
};

export const createCombo = (data) => {
  return axios.post(API_ENDPOINT + "/combo", data, config);
};

export const searchByPageBooking = (data) => {
  return axios.get(API_ENDPOINT + "/bookings/search", {
    ...config,
    params: data,
  });
};

export const updateStatusBooking = (data) => {
  return axios.put(
    API_ENDPOINT + "/bookings/update-booking-status-list",
    data,
    config
  );
};

export const completeBooking = (data, id) => {
  return axios.put(
    API_ENDPOINT + "/bookings/complete-booking/" + id,
    data,
    config
  );
};
