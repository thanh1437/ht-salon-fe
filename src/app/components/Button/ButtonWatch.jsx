import React, { memo } from "react";
import CustomIcon from "../Share/CustomIcon";
import { Link, useLocation } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

function ButtonWatch({ className, data }) {
  const location = useLocation();

  return (
    <button
      style={{
        backgroundColor:
          location.pathname == data.path ? data.background : "#ffffff1a",
      }}
      className={cx("icon-solid", className)}
    >
      <CustomIcon
        url={data.icon.url}
        position={data.icon.position}
        width={data.icon.width}
      />
    </button>
  );
}

export default memo(ButtonWatch);
