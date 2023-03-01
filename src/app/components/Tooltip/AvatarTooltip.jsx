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
    width: "400px",
    maxWidth: "400px",
    padding: "16px",
    border: "1px solid #3e4042",
  },
}));

export default function AvatarTooltip({ children, data }) {
  return (
    <HtmlTooltip
      title={
        <div className={cx("avatar__tool-tip")}>
          <div className={cx("header")}>
            <Avatar src={data.avatar} sx={{ width: "96px", height: "96px" }} />
            <div className={cx("info")}>
              <h3 className={cx("info-name")}>{data.name}</h3>
              <div className={cx("info-desc")}>
                <img
                  className={cx("info-img")}
                  height="20"
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/OdZ-zkGLHZy.png"
                  width="20"
                  alt=""
                />
                <span className={cx("info-desc-text")}>
                  46 bạn chung bao gồm{" "}
                  <a
                    className={cx("info-link")}
                    href="https://www.facebook.com/minhphuong.ta.3538?__cft__[0]=AZWVReCdyp4XC2KRUlYUspJ_TOx4i5PIPdVLflaGtbi5fA6gxQFPwu6bJvbRAwCkTUlwhGoma3nTJUpk7bJ2d0VB0KP7DGHBfRJZYpjJdInxFw6z_gjKDRR4qjoUiOyPI9XPHY9xugECTE7ZiYgD604yoNwv_hGtmhiiQ301bTKCOam_T6bECYPW5n98KSMyu28&amp;__tn__=%2Cd-]C%2CP-R"
                    role="link"
                  >
                    Minh Phương
                  </a>{" "}
                  và{" "}
                  <a
                    className={cx("info-link")}
                    href="https://www.facebook.com/haitu.nguyenn?__cft__[0]=AZWVReCdyp4XC2KRUlYUspJ_TOx4i5PIPdVLflaGtbi5fA6gxQFPwu6bJvbRAwCkTUlwhGoma3nTJUpk7bJ2d0VB0KP7DGHBfRJZYpjJdInxFw6z_gjKDRR4qjoUiOyPI9XPHY9xugECTE7ZiYgD604yoNwv_hGtmhiiQ301bTKCOam_T6bECYPW5n98KSMyu28&amp;__tn__=%2Cd-]C%2CP-R"
                    role="link"
                  >
                    Nguyễn Tú
                  </a>
                </span>
              </div>
              <div className={cx("info-desc")}>
                <img
                  className={cx("info-img")}
                  height="20"
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/84M3sLsZUmI.png"
                  width="20"
                  alt=""
                />
                <span className={cx("info-desc-text")}>
                  Từ{" "}
                  <strong>
                    <a
                      className={cx("info-link")}
                      href="https://www.facebook.com/Th%C3%A1i-B%C3%ACnh-Th%C3%A1i-B%C3%ACnh-Vietnam-109311335759536/?__cft__[0]=AZWVReCdyp4XC2KRUlYUspJ_TOx4i5PIPdVLflaGtbi5fA6gxQFPwu6bJvbRAwCkTUlwhGoma3nTJUpk7bJ2d0VB0KP7DGHBfRJZYpjJdInxFw6z_gjKDRR4qjoUiOyPI9XPHY9xugECTE7ZiYgD604yoNwv_hGtmhiiQ301bTKCOam_T6bECYPW5n98KSMyu28&amp;__tn__=%2Cd-]C%2CP-R"
                      role="link"
                    >
                      Thái Bình, Thái Bình, Vietnam
                    </a>
                  </strong>
                </span>
              </div>
            </div>
          </div>
          <div className={cx("actions")}>
            <button className={cx("btn", "btn-secondary")}>
              <img
                className={cx("icon")}
                src="https://static.xx.fbcdn.net/rsrc.php/v3/yF/r/5nzjDogBZbf.png"
                alt=""
                height="16"
                width="16"
              />
              <span>Bạn bè</span>
            </button>
            <button className={cx("btn", "btn-primary")}>
              <img
                className={cx("icon")}
                src="https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/YjBUcSAL8TC.png"
                alt=""
                height="16"
                width="16"
              />
              <span>Nhắn tin</span>
            </button>
            <button className={cx("btn", "btn-square")}>
              <MoreHorizSharp className={cx("icon")} />
            </button>
          </div>
        </div>
      }
      placement="bottom"
    >
      {children}
    </HtmlTooltip>
  );
}
