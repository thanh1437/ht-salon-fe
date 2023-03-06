import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContext } from "../../context/ToastContextProvider";

import classNames from "classnames/bind";
import styles from "./Auth.module.scss";
import { register } from "../../service/auth";

const cx = classNames.bind(styles);

export default function SignUps({ onChangeLink }) {
  const toast = useContext(ToastContext);
  const [data, setData] = useState({
    username: null,
    password: null,
    email: null,
    registerAsAdmin: false,
    name: null,
    mobile: null,
  });

  const handleChangeText = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    register({ ...data })
      .then((data) => {
        toast.setDataAlert({
          ...toast.dataAlert,
          isOpen: true,
          message: "Đăng ký thành công",
          status: "success",
        });
        onChangeLink(false);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        toast.setDataAlert({
          ...toast.dataAlert,
          isOpen: true,
          message: err.response.data.message,
          status: "error",
        });
      });
  };

  return (
    <>
      <form>
        <div className={cx("input-wrapper")}>
          <label htmlFor="name">Họ và Tên</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nhập đầy đủ họ và tên"
            value={data.name}
            onChange={handleChangeText}
          />
        </div>
        <div className={cx("input-wrapper")}>
          <label htmlFor="name">Số điện thoại</label>
          <input
            type="number"
            id="name"
            name="mobile"
            placeholder="Nhập sô điện thoại của bạn"
            value={data.mobile}
            onChange={handleChangeText}
          />
        </div>
        <div className={cx("input-wrapper")}>
          <label htmlFor="name">Email</label>
          <input
            type="text"
            id="name"
            name="email"
            placeholder="Nhập email"
            value={data.email}
            onChange={handleChangeText}
          />
        </div>
        <div className={cx("input-wrapper")}>
          <label htmlFor="name">Tên đăng nhập</label>
          <input
            type="text"
            id="name"
            name="username"
            placeholder="Nhập tên đăng nhập"
            value={data.username}
            onChange={handleChangeText}
          />
        </div>
        <div className={cx("input-wrapper")}>
          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Nhập mật khẩu"
            value={data.password}
            onChange={handleChangeText}
          />
        </div>
        <div className={cx("form__link")}>
          <button type="button" onClick={() => onChangeLink(false)}>
            Bạn đã có tài khoản rồi?
          </button>
        </div>
        <button
          type="submit"
          className={cx("btn-submit")}
          onClick={handleSubmit}
        >
          Đăng ký
        </button>
      </form>
    </>
  );
}
