import React from "react";
import HeaderLogo from "../components/HeaderLogo/index";
import HeaderAction from "../components/HeaderAction";

import classNames from "classnames/bind";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

export default function Header() {
  return (
    <div className={cx("header")}>
      <div className={cx("wrapper")}>
        <HeaderLogo />
        <HeaderAction />
      </div>
    </div>
  );
}
