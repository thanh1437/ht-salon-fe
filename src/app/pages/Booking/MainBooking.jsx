import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/booking/actions";
import moment from "moment";

import classNames from "classnames/bind";
import styles from "./Booking.module.scss";

const cx = classNames.bind(styles);

const styList = [
  {
    id: "t1",
    name: "Văn Sỹ",
    image:
      "https://30shine.s3-ap-southeast-1.amazonaws.com/avatar_booking/213.jpg",
  },
  {
    id: "t2",
    name: "Trọng Tuấn",
    image:
      "https://storage.30shine.com/staff/avatar/2268/e30dcdc8-7aa6-4494-b408-41509683a2c5",
  },
  {
    id: "t3",
    name: "Đức Phú",
    image:
      "https://storage.30shine.com/staff/avatar/5884/9ca6ba2b-cdc1-47f8-a4c3-a49554f9d2db",
  },
];

export default function MainBooking({ onSubmit, onClick }) {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  const { dataSubmit } = useSelector((state) => state.booking);
  const [styListDialog, setStyListDialog] = useState(false);

  const handleOpenStylistDialog = () => {
    setStyListDialog(!styListDialog);
  };

  const handleChooseStyList = (id) => {
    dispatch(
      actions.getDataSubmit.changeDataSubmit({
        ChooseUserId: id,
      })
    );
  };

  return (
    <div className={cx("card")}>
      <div className={cx("card-header")}>
        <h3>Đặt lịch giữ chỗ</h3>
      </div>
      <div>
        <div className={cx("card-content")}>
          <div
            className={cx(
              "card-content-block",
              (dataSubmit.serviceIds.length || dataSubmit.comboIds.length) &&
                "--active"
            )}
            onClick={onClick}
          >
            <span className={cx("card-content-header")}>Chọn dịch vụ</span>
            <div className={cx("content-choose")}>
              <div className={cx("content-choose-img")}>
                <img
                  src="https://30shine.com/static/media/service.3a62b101.svg"
                  alt=""
                />
              </div>
              <span className={cx("content-choose-text")}>
                {dataSubmit.serviceIds.length || dataSubmit.comboIds.length
                  ? `Đã chọn ${dataSubmit.serviceIds.length} dịch vụ và ${dataSubmit.comboIds.length} combo`
                  : "Xem tất cả dịch vụ hấp dẫn"}
              </span>
              <img
                src="https://30shine.com/static/media/caretRight.b0d191b3.svg"
                alt=""
              ></img>
            </div>
            <div className={cx("card-result")}>
              {[...dataSubmit.serviceIds, ...dataSubmit.comboIds].map(
                (item) => (
                  <span key={item.name + item.id} className={cx("chip")}>
                    {item.name}
                  </span>
                )
              )}
            </div>
          </div>
          {/* Block */}
          <div
            className={cx(
              "card-content-block",
              dataSubmit.ChooseUserId && "--active"
            )}
          >
            <span className={cx("card-content-header")}>Chọn stylist</span>
            <div
              className={cx("content-choose")}
              onClick={handleOpenStylistDialog}
            >
              <div className={cx("content-choose-img")}>
                <img
                  src="https://30shine.com/static/media/service.3a62b101.svg"
                  alt=""
                />
              </div>
              <span className={cx("content-choose-text")}>
                {dataSubmit.ChooseUserId === 0
                  ? "Xem tất cả style"
                  : `StyList: ${
                      styList.find(
                        (item) => item.id === dataSubmit.ChooseUserId
                      ).name
                    }`}
              </span>
              <img
                className={cx(styListDialog && "rotate")}
                src="https://30shine.com/static/media/caretRight.b0d191b3.svg"
                alt=""
              ></img>
            </div>
            {styListDialog && (
              <div className={cx("card-result1")}>
                <div
                  className={cx("styList-item")}
                  onClick={() => handleChooseStyList(0)}
                >
                  <div
                    className={cx(
                      "avatar-wrapper",
                      dataSubmit.ChooseUserId === 0 && "--active"
                    )}
                  >
                    <img
                      src="https://30shine.com/static/media/account_circle%20-%20gray%20600.d22649fa.svg"
                      alt=""
                    />
                  </div>
                  <span className={cx("avatar-name")}>Chọn ngẫu nhiên</span>
                </div>
                {styList.map((item) => (
                  <div
                    className={cx("styList-item")}
                    onClick={() => handleChooseStyList(item.id)}
                  >
                    <div
                      key={item.id}
                      className={cx(
                        "avatar-wrapper",
                        dataSubmit.ChooseUserId === item.id && "--active"
                      )}
                    >
                      <img src={item.image} alt="" />
                    </div>
                    <span className={cx("avatar-name")}>{item.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Block */}
          <div
            className={cx(
              "card-content-block",
              dataSubmit.startTime && "--active"
            )}
          >
            <span className={cx("card-content-header")}>Chọn ngày, giờ</span>
            <div className={cx("content-choose")}>
              <div className={cx("content-choose-img")}>
                <img
                  src="https://30shine.com/static/media/calendar-2.3c77d299.svg"
                  alt=""
                />
              </div>
              <span className={cx("content-choose-text")}>
                {moment().locale("LLLL").format("MMMM Do YYYY, h:mm:ss a")}
              </span>
              <img
                src="https://30shine.com/static/media/caretRight.b0d191b3.svg"
                alt=""
              ></img>
            </div>
          </div>
        </div>
        <button
          className={cx("card-action")}
          disabled={disabled ? "disabled" : ""}
          onClick={onSubmit}
        >
          Hoàn tất
        </button>
      </div>
    </div>
  );
}
