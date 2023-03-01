import React, { memo } from "react";

import classNames from "classnames/bind";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

function ButtonIconSolid({ className, icon, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={cx("icon-solid", active && "is-active", className)}
    >
      {icon}
    </button>
  );
}

export default memo(ButtonIconSolid);
