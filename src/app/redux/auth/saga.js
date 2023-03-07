import { login, logout, register } from "../../service/auth";
import * as actions from "./actions";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { routes } from "../../config";
import { decodeJWT } from "../../constants/utils";

const setSession = (user) => {
  if (user) {
    localStorage.setItem("access_token", user.accessToken);
    localStorage.setItem("expired_time", user.expiryDuration);
  } else {
    localStorage.removeItem("access_token");
    localStorage.removeItem("expired_time");
  }
};

function* loginSaga(action) {
  const { username, password, deviceInfo, navigate } = action.payload;
  try {
    const user = yield call(login, { username, password, deviceInfo });
    console.log(user);
    const userInfo = user.data;
    setSession(userInfo);
    yield put(actions.getLogin.getLoginSuccess(userInfo));
    const role = decodeJWT(userInfo.accessToken).authorities;
    yield call(() => {
      if (role === "ROLE_ADMIN" || role === "ROLE_EMPLOYEE") {
        navigate(routes.admin.dashboard);
      } else {
        navigate(routes.home);
        window.location.reload();
      }
    });
  } catch (error) {
    let message;
    switch (error.response.status) {
      case 500:
        message = "Incorrect email or password";
        break;
      case 401:
        message = "Incorrect email or password";
        break;
      case 422:
        message = "Email or password can not empty";
        break;
      default:
        message = error.message;
    }
    yield put(actions.getLogin.getLoginFailure(message));
    setSession(null);
  }
}

function* logoutSaga(action) {
  console.log("hihi");
  try {
    yield call(logout, { ...action.payload });
    setSession(null);
    yield call(() => {
      window.location.reload();
    });
  } catch (error) {}
}

function* registerSaga(action) {
  try {
    yield call(register, { ...action.payload });

    yield put(actions.getRegister.getRegisterSuccess());
  } catch (error) {
    let message;
    switch (error.response.status) {
      case 500:
        message = "Lỗi server";
        break;
      case 401:
        message = "";
        break;
      default:
        message = error;
    }
    yield put(actions.getRegister.getRegisterFailure(message));
  }
}

// // /**
// //  * forget password
// //  */
// // function* forgetPassword({ payload: { username } }) {
// //     const options = {
// //         body: JSON.stringify({ username }),
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //     };

// //     try {
// //         const response = yield call(fetchJSON, '/users/password-reset', options);
// //         yield put(forgetPasswordSuccess(response.message));
// //     } catch (error) {
// //         let message;
// //         switch (error.status) {
// //             case 500:
// //                 message = 'Internal Server Error';
// //                 break;
// //             case 401:
// //                 message = 'Invalid credentials';
// //                 break;
// //             default:
// //                 message = error;
// //         }
// //         yield put(forgetPasswordFailed(message));
// //     }
// // }

export function* watchLoginUser() {
  yield takeEvery(actions.getLogin.getLoginRequest, loginSaga);
}

export function* watchLogoutUser() {
  yield takeEvery(actions.getLogout.getLogoutRequest, logoutSaga);
}

export function* watchRegisterUser() {
  yield takeEvery(actions.getRegister.getRegisterRequest, registerSaga);
}

// // export function* watchForgetPassword() {
// //     yield takeEvery(FORGET_PASSWORD, forgetPassword);
// // }

export default function* authSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
  ]);
}
