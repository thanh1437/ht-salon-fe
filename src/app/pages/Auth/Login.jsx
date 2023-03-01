import React, { useState } from "react";
import { useDispatch } from "react-redux";

import classNames from "classnames/bind";
import styles from "./Auth.module.scss";

const cx = classNames.bind(styles);

export default function Login({ onChangeLink }) {
  return (
    <>
      <form>
        <div className={cx("input-wrapper")}>
          <label htmlFor="name">Số điện thoại</label>
          <input
            type="text"
            id="name"
            placeholder="Nhập sô điện thoại của bạn"
          />
        </div>
        <div className={cx("input-wrapper")}>
          <label htmlFor="password">Mật khẩu</label>
          <input type="text" id="password" placeholder="Nhập mật khẩu" />
        </div>
        <div className={cx("form__link")}>
          <button type="button" onClick={() => onChangeLink(true)}>
            Bạn chưa có tài khoản?
          </button>
        </div>
        <button type="submit" className={cx("btn-submit")}>
          Đăng nhập
        </button>
      </form>
    </>
  );
}
