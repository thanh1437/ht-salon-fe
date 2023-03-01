import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import { service } from "../../constants/fakeData";

import classNames from "classnames/bind";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);

export default function Service() {
  return (
    <>
      {service.map((item) => (
        <div className={cx("wrapper")}>
          <div className={cx("container")}>
            <div className={cx("container__header")}>
              <div className={cx("container__header-info")}>
                <h1>{item.title}</h1>
                <p>{item.describe}</p>
              </div>
              {item.more && (
                <Link to={item.more}>
                  Xem tất cả{" "}
                  <img
                    src="https://30shine.com/static/media/chevronRight.0f447c60.svg"
                    alt=""
                  ></img>
                </Link>
              )}
            </div>
            <div className={cx("container__banner")}>
              <Link to="/">
                <img
                  className={cx("container__banner-img")}
                  src={item.banner}
                  alt=""
                />
              </Link>
            </div>
            <Grid container spacing={2}>
              {item.other.map((other) => (
                <Grid item lg={3} md={3}>
                  <div className={cx("container__item")}>
                    <img
                      src={other.image}
                      alt=""
                      className={cx("container__item-img")}
                    />
                    <div>
                      <h3>{other.title}</h3>
                      <p>{other.describe}</p>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      ))}
    </>
  );
}
