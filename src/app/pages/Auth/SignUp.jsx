import React from "react";

import classNames from "classnames/bind";
import styles from "./Auth.module.scss";

const cx = classNames.bind(styles);

export default function SignUps({ onChangeLink }) {
  return (
    <>
      <form>
        <div className={cx("input-wrapper")}>
          <label htmlFor="name">Họ và Tên</label>
          <input type="text" id="name" placeholder="Nhập đầy đủ họ và tên" />
        </div>
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
          <button type="button" onClick={() => onChangeLink(false)}>
            Bạn đã có tài khoản rồi?
          </button>
        </div>
        <button type="submit" className={cx("btn-submit")}>
          Đăng ký
        </button>
      </form>
    </>
  );
}
