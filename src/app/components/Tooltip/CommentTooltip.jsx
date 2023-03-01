import React from "react";
import PropTypes from "prop-types";
import { memo } from "react";
import { Tooltip } from "@mui/material";
import LoadingSpinier from "../Spinners/LoadingSpinier";

import classNames from "classnames/bind";
import styles from "./Tooltip.module.scss";

const cx = classNames.bind(styles);

function CommentTooltip({ children, label, placement = "top" }) {
  // 20 người
  return (
    <Tooltip
      title={
        <div className={cx("comment__tool-tip")}>
          <h3 className={cx("title")}>{label}</h3>
          <LoadingSpinier className={cx("loading")} />
          {/* <div className={cx("users-list")}>
            <span className={cx("user-item")}>Lê Khánh Huyền</span>
            <span className={cx("user-item")}>Lê Khánh Huyền</span>
            <span className={cx("user-item")}>và 20.383 người khác...</span>
          </div> */}
        </div>
      }
      placement={placement}
    >
      {children}
    </Tooltip>
  );
}

CommentTooltip.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string.isRequired,
};

export default memo(CommentTooltip);
