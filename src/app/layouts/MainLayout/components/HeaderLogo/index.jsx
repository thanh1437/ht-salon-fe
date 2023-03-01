import React, { useState } from "react";
import { Link } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "../../Header/Header.module.scss";

const cx = classNames.bind(styles);

export default function HeaderLogo() {
  return (
    <div className={cx("left")}>
      <Link to="/">
        <img
          src="https://30shine.com/static/media/log-30shine-white.9945e644.jpg"
          alt=""
        />
      </Link>
    </div>
  );
}
