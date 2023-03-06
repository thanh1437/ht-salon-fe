import React, { useState } from "react";
import { Link } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "../../Header/Header.module.scss";
import { IMAGE_PATH } from "../../../../appConfig";

const cx = classNames.bind(styles);

export default function HeaderLogo() {
  return (
    <div className={cx("left")}>
      <Link to="/">
        <img src={IMAGE_PATH + "/HT.png"} alt="" />
      </Link>
    </div>
  );
}
