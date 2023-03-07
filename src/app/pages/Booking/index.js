import React, { useState, useEffect, useContext } from "react";
import MainBooking from "./MainBooking";
import ServiceBooking from "./ServiceBooking";
import * as actions from "../../redux/booking/actions";
import { useSelector, useDispatch } from "react-redux";
import { createBooking } from "../../service/booking";
import { ToastContext } from "../../context/ToastContextProvider";
import { useNavigate } from "react-router-dom";
import { routes } from "../../config/index";

import classNames from "classnames/bind";
import styles from "./Booking.module.scss";

const cx = classNames.bind(styles);

export default function Booking() {
  const toast = useContext(ToastContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMounting, setIsMounting] = useState(false);
  const [serviceDialog, setServiceDialog] = useState(false);
  const { dataSubmit } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(actions.getService.getServiceRequest());
    dispatch(actions.getStylist.getStylistRequest());
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
    const token = localStorage.getItem("access_token");
    if (token) {
      createBooking(
        {
          ...dataSubmit,
          takePhoto: dataSubmit.takePhoto ? 1 : 0,
          serviceIds: dataSubmit.serviceIds.map((item) => item.id),
          comboIds: dataSubmit.comboIds.map((item) => item.id),
        },
        token
      ).then((data) => {
        dispatch(actions.getDataSubmit.resetDataSubmit());
        toast.setDataAlert({
          ...toast.dataAlert,
          isOpen: true,
          message: "Bạn đã đặt lịch thành công",
          status: "success",
        });
        navigate(routes.history);
      });
    } else {
      toast.setDataAlert({
        ...toast.dataAlert,
        isOpen: true,
        message: "Bạn cần phải đăng nhập để có thể đặt lịch",
        status: "error",
      });
    }
  };

  return (
    <div className={cx("wrapper")}>
      {isMounting && (
        <div className={cx("inner")}>
          {serviceDialog ? (
            <ServiceBooking
              onClose={handleCloseService}
              onSubmit={handleSubmitService}
            />
          ) : (
            <MainBooking
              onSubmit={handleSubmitForm}
              onClick={handleChooseService}
            />
          )}
        </div>
      )}
    </div>
  );
}
