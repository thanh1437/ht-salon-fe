import { createActions } from "redux-actions";

export const getType = (reduxAction) => {
  return reduxAction().type;
};

export const getService = createActions({
  getServiceRequest: (payload) => payload,
  getServiceSuccess: (payload) => payload,
  getServiceFailure: (payload) => payload,
  changeStatusService: (payload) => payload,
});

export const getStylist = createActions({
  getStylistRequest: (payload) => payload,
  getStylistSuccess: (payload) => payload,
  getStylistFailure: (payload) => payload,
});

export const getDataSubmit = createActions({
  changeDataSubmit: (payload) => payload,
  resetDataSubmit: (payload) => payload,
});
