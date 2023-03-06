import React from "react";

import classNames from "classnames/bind";
import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);

export default function Footer() {
  return (
    <div className={cx("header")}>
      <div className={cx("wrapper")}>Thiết kế bởi HTSalon</div>
    </div>
  );
}
