import React from "react";
import { Avatar, Tooltip, tooltipClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import { MoreHorizSharp } from "@mui/icons-material";

import classNames from "classnames/bind";
import styles from "./Tooltip.module.scss";

const cx = classNames.bind(styles);

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#242526",
    color: "#fff",
    maxWidth: "400px",
    border: "1px solid #3e4042",
  },
}));

export default function CommentSettingTooltip({ children, open }) {
  return (
    <HtmlTooltip
      open={open}
      arrow={true}
      title={
        <ul className={cx("comment-setting-tooltip")}>
          <li>
            <button className={cx("popper-link")}>
              <span className="normal-font">Ẩn bình luận</span>
            </button>
          </li>
          <li>
            <button className={cx("popper-link")}>
              <span className="normal-font">Báo cáo bình luận</span>
            </button>
          </li>
        </ul>
      }
      placement="bottom"
    >
      {children}
    </HtmlTooltip>
  );
}
