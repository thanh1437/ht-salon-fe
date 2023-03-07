import {
  getDataSubmit,
  getService,
  getStylist,
  getType,
} from "../booking/actions";

const initialState = {
  service: null,
  stylists: null,
  dataSubmit: {
    chooseUserId: null,
    startTime: null,
    description: null,
    takePhoto: 0,
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

    case getType(getStylist.getStylistRequest): {
      return { ...state, loading: true };
    }
    case getType(getStylist.getStylistSuccess): {
      return {
        ...state,
        stylists: action.payload,
        loading: false,
        error: null,
      };
    }
    case getType(getStylist.getStylistFailure): {
      return { ...state, loading: false, error: null };
    }

    case getType(getDataSubmit.changeDataSubmit): {
      return {
        ...state,
        dataSubmit: { ...state.dataSubmit, ...action.payload },
        loading: false,
        error: null,
      };
    }
    case getType(getDataSubmit.resetDataSubmit): {
      return {
        ...state,
        dataSubmit: {
          chooseUserId: null,
          startTime: null,
          description: null,
          takePhoto: 0,
          serviceIds: [],
          comboIds: [],
        },
        loading: false,
        error: null,
      };
    }
    default:
      return { ...state };
  }
};

export default BookingReducer;
