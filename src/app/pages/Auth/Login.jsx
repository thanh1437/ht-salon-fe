import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/auth/actions";

import classNames from "classnames/bind";
import styles from "./Auth.module.scss";

const cx = classNames.bind(styles);

export default function Login({ onChangeLink }) {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    username: null,
    password: null,
    deviceInfo: {
      deviceId: "XIAOMI",
      deviceType: "DEVICE_TYPE_ANDROID",
    },
  });

  const handleSubmit = (e) => {
    console.log(data);
    e.preventDefault();
    dispatch(actions.getLogin.getLoginRequest({ ...data }));
  };

  const handleChangeText = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  return (
    <>
      <form>
        <div className={cx("input-wrapper")}>
          <label htmlFor="name">Tài khoản</label>
          <input
            type="text"
            id="name"
            name="username"
            placeholder="Nhập tài khoản của bạn"
            value={data.username}
            onChange={handleChangeText}
          />
        </div>
        <div className={cx("input-wrapper")}>
          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Nhập mật khẩu"
            value={data.password}
            onChange={handleChangeText}
          />
        </div>
        <div className={cx("form__link")}>
          <button type="button" onClick={() => onChangeLink(true)}>
            Bạn chưa có tài khoản?
          </button>
        </div>
        <button
          type="submit"
          className={cx("btn-submit")}
          onClick={handleSubmit}
        >
          Đăng nhập
        </button>
      </form>
    </>
  );
}
