import React, { useState, useEffect } from "react";
import MainBooking from "./MainBooking";
import ServiceBooking from "./ServiceBooking";
import * as actions from "../../redux/booking/actions";
import { useSelector, useDispatch } from "react-redux";

import classNames from "classnames/bind";
import styles from "./Booking.module.scss";

const cx = classNames.bind(styles);

export default function Booking() {
  const dispatch = useDispatch();
  const [isMounting, setIsMounting] = useState(false);
  const [serviceDialog, setServiceDialog] = useState(false);

  useEffect(() => {
    dispatch(actions.getService.getServiceRequest());
    setIsMounting(true);
  }, []);

  const handleChooseService = () => {
    setServiceDialog(true);
  };

  const handleCloseService = () => {
    setServiceDialog(false);
  };

  const handleSubmitService = () => {
    setServiceDialog(false);
  };

  const handleSubmitForm = () => {
    console.log("hihi");
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        {isMounting &&
          (serviceDialog ? (
            <ServiceBooking
              onClose={handleCloseService}
              onSubmit={handleSubmitService}
            />
          ) : (
            <MainBooking
              onSubmit={handleSubmitForm}
              onClick={handleChooseService}
            />
          ))}
      </div>
    </div>
  );
}
