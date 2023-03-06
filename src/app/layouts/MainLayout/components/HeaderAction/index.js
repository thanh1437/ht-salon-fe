import React, { useState } from "react";
import LoginDialog from "../LoginDialog";
import { KeyboardArrowDownSharp } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Tooltip, tooltipClasses } from "@mui/material";
import { Link } from "react-router-dom";
import * as actions from "../../../../redux/auth/actions";
import { routes } from "../../../../config";
import { decodeJWT } from "../../../../constants/utils";
import { useDispatch } from "react-redux";

import classNames from "classnames/bind";
import styles from "./HeaderAction.module.scss";

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
  const dispatch = useDispatch();
  const [user, setUser] = useState(localStorage.getItem("access_token"));
  const [openDialog, setOpenDialog] = useState(false);

  const handleLogout = () => {
    dispatch(
      actions.getLogout.getLogoutRequest({
        token: user,
        deviceInfo: {
          deviceId: "XIAOMI",
          deviceType: "DEVICE_TYPE_ANDROID",
        },
      })
    );
  };

  return (
    <div className={cx("right")}>
      {user ? (
        <div className={cx("right__user")}>
          <HtmlTooltip
            title={
              <ul className={cx("user-popper")}>
                <li>
                  <Link className="d-block w-100 text-left" to={routes.history}>
                    Lịch sử cắt tóc
                  </Link>
                </li>
                <li>
                  <button className="w-100 text-left" onClick={handleLogout}>
                    Đăng xuất
                  </button>
                </li>
              </ul>
            }
            placement="bottom-end"
          >
            <button className={cx("btn")}>
              Xin chào, {decodeJWT(user).name} <KeyboardArrowDownSharp />
            </button>
          </HtmlTooltip>
        </div>
      ) : (
        <button className={cx("btn")} onClick={() => setOpenDialog(true)}>
          Đăng nhập
        </button>
      )}
      <LoginDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </div>
  );
}
