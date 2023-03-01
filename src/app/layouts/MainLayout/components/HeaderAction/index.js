import React, { useState } from "react";
import LoginDialog from "../LoginDialog";
import { KeyboardArrowDownSharp } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Tooltip, tooltipClasses } from "@mui/material";
import { Link } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./HeaderAction.module.scss";
import { routes } from "../../../../config";

const cx = classNames.bind(styles);

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#fff",
    color: "#000",
    padding: "0",
    width: "200px",
    maxWidth: "200px",
    marginTop: "2px !important",
    boxShadow:
      "0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);",
  },
}));

export default function HeaderAction() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className={cx("right")}>
      {/* <button className={cx("btn")} onClick={() => setOpenDialog(true)}>
        Đăng nhập
      </button> */}
      <div className={cx("right__user")}>
        <HtmlTooltip
          title={
            <ul className={cx("user-popper")}>
              <li>
                <Link to={routes.history}>Lịch sử cắt tóc</Link>
              </li>
              <li>
                <button>Đăng xuất</button>
              </li>
            </ul>
          }
          placement="bottom-end"
        >
          <button className={cx("btn")}>
            Xin chào, Nguyen Doan Thanh <KeyboardArrowDownSharp />
          </button>
        </HtmlTooltip>
      </div>
      <LoginDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </div>
  );
}
