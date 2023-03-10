import * as actions from "./actions";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { getCombos, getServices, getStylists } from "../../service/booking";

function* getServiceSaga(action) {
  try {
    let fetchService = yield call(getServices, {});
    let fetchCombo = yield call(getCombos, {});
    let newService = fetchService.data.content.map((item) => ({
      ...item,
      isChoose: false
    }));
    let newCombo = fetchCombo.data.content.map((item) => ({
      ...item,
      isChoose: false
    }));
    yield put(
      actions.getService.getServiceSuccess({
        service: newService,
        combo: newCombo,
      })
    );
  } catch (error) {
    let message;
    if (error.response) {
      switch (error.response.status) {
        case 500:
          message = "Internal Server Error";
          break;
        case 401:
          message = "Invalid credentials";
          break;
        default:
          message = error.message;
      }
    } else {
      message = "Wrong something " + error;
    }
    yield put(actions.getService.getServiceFailure(message));
  }
}

function* getStylistsSaga(action) {
  try {
    const token = localStorage.getItem("access_token");
    let fetchStylist = yield call(getStylists, {}, token);
    yield put(actions.getStylist.getStylistSuccess(fetchStylist.data));
  } catch (error) {
    let message;
    if (error.response) {
      switch (error.response.status) {
        case 500:
          message = "Internal Server Error";
          break;
        case 401:
          message = "Invalid credentials";
          break;
        default:
          message = error.message;
      }
    } else {
      message = "Wrong something " + error;
    }
    yield put(actions.getStylist.getStylistFailure(message));
  }
}

export function* watchService() {
  yield takeEvery(actions.getService.getServiceRequest, getServiceSaga);
}
export function* watchStylists() {
  yield takeEvery(actions.getStylist.getStylistRequest, getStylistsSaga);
}

export default function* bookingSaga() {
  yield all([fork(watchService), fork(watchStylists)]);
}
