import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import { convertNumber } from "../../constants/utils";

import classNames from "classnames/bind";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);

export default function Service({ data }) {
  return (
    <>
      {data.map((item) => (
        <div className={cx("wrapper")}>
          <div className={cx("container")}>
            <div className={cx("container__header")}>
              <div className={cx("container__header-info")}>
                <h1>{item.title}</h1>
                <p>{item.describe}</p>
              </div>
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
                      <h3>{other.name}</h3>
                      <p>Giá: {convertNumber(other.price)}</p>
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
