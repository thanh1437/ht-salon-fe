import React from "react";
import { Grid } from "@material-ui/core";
import { convertNumber } from "../../constants/utils";

import classNames from "classnames/bind";
import styles from "./Booking.module.scss";

const cx = classNames.bind(styles);

export default function CardItem({ title, data, onClick, type }) {
  return (
    <div className={cx("tab-container")}>
      <div className="d-flex-center-between my-3">
        <h3>{title}</h3>
        <span className={cx("text-service")}>{data.length} dịch vụ</span>
      </div>
      <Grid container spacing={2}>
        {data &&
          data.map((item) => (
            <Grid item md={6} key={item.name + item.id}>
              <div className={cx("tab-card-item")}>
                <img
                  src={
                    item.image
                      ? item.image
                      : "https://s3.ap-southeast-1.amazonaws.com/storage.30shine.com/service/combo_booking/701.jpg"
                  }
                  alt=""
                />
                <div className={cx("item-detail")}>
                  <div>
                    <span className="text-capitalize">{item.name}</span>
                    <p>{item.description}</p>
                  </div>
                  <div>
                    <span className={cx("text-price")}>
                      {convertNumber(item.price)}
                    </span>
                    <button
                      className={cx(
                        "item-btn",
                        item.isChoose && "item-btn--active"
                      )}
                      onClick={() => onClick(type, item.id)}
                    >
                      Chon
                    </button>
                  </div>
                </div>
              </div>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}
