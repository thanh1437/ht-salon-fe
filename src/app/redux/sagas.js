import { all } from "redux-saga/effects";
import authSaga from "./auth/saga";
import bookingSaga from "./booking/saga";

export default function* rootSaga(getState) {
  yield all([authSaga(), bookingSaga()]);
}
