import { combineReducers } from "redux";
import login from "./auth/reducers";
import booking from "./booking/reducers";

export default combineReducers({
  login,
  booking,
});
