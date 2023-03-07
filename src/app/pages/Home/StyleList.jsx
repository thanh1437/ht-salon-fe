import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import { employee, service } from "../../constants/fakeData";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import { IMAGE_PATH } from "../../appConfig";

const cx = classNames.bind(styles);

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1130 },
    items: 3,
    partialVisibilityGutter: 50,
  },
  tablet: {
    breakpoint: { max: 1130, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const CustomRightArrow = ({ onClick, handleClick, ...rest }) => {
  const handleOnClick = () => {
    onClick();
    handleClick();
  };
  return (
    <button
      aria-label="Go to next slide"
      className="custom-carousel__arrow custom-carousel__arrow--right"
      onClick={handleOnClick}
    >
      <ArrowForwardIosOutlined className="icon" />
    </button>
  );
};

const CustomLeftArrow = ({ onClick, handleClick, ...rest }) => {
  const handleOnClick = () => {
    onClick();
    handleClick();
  };

  return (
    <button
      aria-label="Go to next slide"
      className="custom-carousel__arrow custom-carousel__arrow--left"
      onClick={handleOnClick}
    >
      <ArrowBackIosOutlined className="icon" />
    </button>
  );
};

export default function StyleList({ title, des, data, more }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("container__header")}>
          <div className={cx("container__header-info")}>
            <h1>{title}</h1>
            <p>{des}</p>
          </div>
          {more && (
            <Link to={more}>
              Xem tất cả{" "}
              <img
                src="https://30shine.com/static/media/chevronRight.0f447c60.svg"
                alt=""
              ></img>
            </Link>
          )}
        </div>
        <div className={cx("container__banner")}>
          <Carousel
            //   customLeftArrow={CustomLeftArrow}
            //   customRightArrow={CustomRightArrow}
            responsive={responsive}
            animation="slide"
            autoPlay={false}
            containerClass="w-100"
            itemClass="px-1"
            partialVisible={true}
          >
            {data.map((item) => (
              <div className={cx("container__banner-item")} key={item.id}>
                <Link to="/">
                  {item.photo ? (
                    <img src={item.photo} alt="" className={cx("has-img")} />
                  ) : (
                    <div className={cx("no-img")}>
                      <img src={IMAGE_PATH + "/no-data.png"} alt="" />
                      <span>Thợ này hiện chưa có ảnh</span>
                    </div>
                  )}
                  <span>{item.name}</span>
                </Link>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
