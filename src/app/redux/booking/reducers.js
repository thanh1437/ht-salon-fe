import { getDataSubmit, getService, getType } from "../booking/actions";

const initialState = {
  service: null,
  dataSubmit: {
    ChooseUserId: 0,
    startTime: null,
    description: null,
    takePhoto: null,
    serviceIds: [],
    comboIds: [],
  },
};

const BookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case getType(getService.getServiceRequest): {
      return { ...state, loading: true };
    }
    case getType(getService.getServiceSuccess): {
      return { ...state, service: action.payload, loading: false, error: null };
    }
    case getType(getService.getServiceFailure): {
      return { ...state, loading: false, error: null };
    }
    case getType(getService.changeStatusService): {
      const { type, id } = action.payload;
      let item = state.service[type].find((item) => item.id === id);
      item.isChoose = !item.isChoose;
      return { ...state, service: state.service, loading: false, error: null };
    }

    case getType(getDataSubmit.changeDataSubmit): {
      return {
        ...state,
        dataSubmit: { ...state.dataSubmit, ...action.payload },
        loading: false,
        error: null,
      };
    }
    default:
      return { ...state };
  }
};

export default BookingReducer;
