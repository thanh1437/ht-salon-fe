import React from "react";
import { Link } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./Item.module.scss";
import { Avatar } from "@mui/material";

const cx = classNames.bind(styles);

export default function ImageItem({
  to = "/",
  name,
  icon,
  avatar,
  image,
  handleClick,
}) {
  const Icon = icon;

  const handleOnClick = (e) => {
    e.preventDefault();
    handleClick();
  };

  return (
    <Link to={to} onClick={handleOnClick}>
      <div className={cx("menu-item")}>
        {avatar ? (
          <div className={cx("btn", "image-wrapper")}>{avatar}</div>
        ) : image ? (
          <div className={cx("btn", "image-wrapper", "no-bg")}>
            <i
              style={{
                backgroundImage: `url(${image.url})`,
                backgroundPosition: image.position,
                backgroundSize: "auto",
                width: "36px",
                height: "36px",
                backgroundRepeat: "no-repeat",
                display: "inline-block",
              }}
            ></i>
          </div>
        ) : (
          <div className={cx("btn", "image-wrapper")}>
            <Icon className={cx("icon")} />
          </div>
        )}
        <div className={cx("menu-item__content")}>
          <span className={cx("item-title")}>{name}</span>
        </div>
      </div>
    </Link>
  );
}
