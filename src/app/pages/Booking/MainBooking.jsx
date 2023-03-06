import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/booking/actions";
import moment from "moment";
import "moment/locale/vi";

import dayjs from "dayjs";
import "dayjs/locale/vi";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Alert, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { checkDateEmployee } from "../../service/booking";

import classNames from "classnames/bind";
import styles from "./Booking.module.scss";

const cx = classNames.bind(styles);

export default function MainBooking({ onSubmit, onClick }) {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  const { dataSubmit } = useSelector((state) => state.booking);
  const { stylists } = useSelector((state) => state.booking);
  const [styListDialog, setStyListDialog] = useState(false);
  const [dateDialog, setDateDialog] = useState(false);
  const [value, setValue] = useState(dayjs(new Date()));
  const [dataError, setDataError] = useState({
    status: false,
    message: null,
  });
  const [dataDate, setDataDate] = useState(null);
  const [dateActive, setDateActive] = useState(null);

  useEffect(() => {
    if (
      dataSubmit.startTime &&
      (dataSubmit.serviceIds.length || dataSubmit.comboIds.length)
    ) {
      setDisabled(false);
    }
  }, [dataSubmit]);

  const handleOpenStylistDialog = () => {
    if (dataSubmit.serviceIds.length || dataSubmit.comboIds.length) {
      setStyListDialog(!styListDialog);
    } else {
      setDataError({ status: true, message: "Bạn hãy chọn dịch vụ trước" });
    }
  };

  const handleChooseStyList = (id) => {
    dispatch(
      actions.getDataSubmit.changeDataSubmit({
        ChooseUserId: id,
      })
    );
  };

  const handleChangeDate = (newValue) => {
    setValue(newValue);
    dispatch(
      actions.getDataSubmit.changeDataSubmit({
        startTime: moment(newValue).format("DD/MM/YYYY hh:ss"),
      })
    );
    const { ChooseUserId, startTime, serviceIds } = dataSubmit;
    const token = localStorage.getItem("access_token");
    checkDateEmployee(
      {
        userId: ChooseUserId,
        date: moment(newValue).format("DD/MM/YYYY"),
        serviceIds: serviceIds.map((item) => item.id),
      },
      token
    ).then(({ data }) => {
      setDataDate(data);
    });
  };

  const handleOpenDateDialog = () => {
    if (
      dataSubmit.serviceIds.length ||
      dataSubmit.comboIds.length ||
      dataSubmit.ChooseUserId
    ) {
      setDateDialog(true);
    } else {
      setDataError({
        status: true,
        message: "Bạn hãy chọn dịch vụ và stylist trước",
      });
    }
  };

  return (
    <div className={cx("card")}>
      <div className={cx("card-header")}>
        <h3>Đặt lịch giữ chỗ</h3>
      </div>
      <div>
        <div className={cx("card-content")}>
          {dataError.status && (
            <Alert className="mb-3" severity="error">
              <span className="normal-font">{dataError.message}</span>
            </Alert>
          )}
          <div
            className={cx(
              "card-content-block",
              (dataSubmit.serviceIds.length || dataSubmit.comboIds.length) &&
                "--active"
            )}
          >
            <span className={cx("card-content-header")}>Chọn dịch vụ</span>
            <div className={cx("content-choose")} onClick={onClick}>
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
            {(dataSubmit.serviceIds.length > 0 ||
              dataSubmit.comboIds.length > 0) && (
              <div className={cx("card-result")}>
                {[...dataSubmit.serviceIds, ...dataSubmit.comboIds].map(
                  (item) => (
                    <span
                      key={item.name + item.id}
                      className={cx("chip", "text-capitalize")}
                    >
                      {item.name}
                    </span>
                  )
                )}
              </div>
            )}
          </div>
          {/* Block */}
          <div
            className={cx(
              "card-content-block",
              (dataSubmit.ChooseUserId || dataSubmit.ChooseUserId === 0) &&
                "--active"
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
                {dataSubmit.ChooseUserId || dataSubmit.ChooseUserId === 0
                  ? `StyList: ${
                      dataSubmit.ChooseUserId === 0
                        ? "Salon sẽ chọn giúp bạn"
                        : stylists.find(
                            (item) => item.id === dataSubmit.ChooseUserId
                          ).name
                    }`
                  : "Xem tất cả style"}
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
                {stylists.map((item) => (
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
                      <img
                        src={
                          item.photo
                            ? item.photo
                            : "https://30shine.com/static/media/account_circle%20-%20gray%20600.d22649fa.svg"
                        }
                        alt=""
                      />
                    </div>
                    <span className={cx("avatar-name")}>{item.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Block */}
          <div
            id="date-time-picker"
            className={cx(
              "card-content-block",
              dataSubmit.startTime && "--active"
            )}
          >
            <span className={cx("card-content-header")}>Chọn ngày, giờ</span>
            <div
              className={cx("content-choose")}
              onClick={handleOpenDateDialog}
            >
              <div className={cx("content-choose-img")}>
                <img
                  src="https://30shine.com/static/media/calendar-2.3c77d299.svg"
                  alt=""
                />
              </div>
              <span className={cx("content-choose-text", "text-capitalize")}>
                {moment(value.$d).locale("vi").format("LLLL")}
              </span>
              <img
                src="https://30shine.com/static/media/caretRight.b0d191b3.svg"
                alt=""
              ></img>
            </div>
            {dataDate && (
              <div className={cx("date")}>
                {dataDate.map((item, index) => (
                  <button
                    onClick={() => setDateActive(index)}
                    className={cx(dateActive === index && "--activated")}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
            {dateDialog && (
              <LocalizationProvider
                adapterLocale={"vi"}
                dateAdapter={AdapterDayjs}
              >
                <DatePicker
                  className="invisible h-0"
                  renderInput={(props) => <TextField {...props} />}
                  label="DateTimePicker"
                  value={value}
                  open={dateDialog}
                  onClose={() => {
                    setDateDialog(false);
                  }}
                  disablePast={true}
                  onChange={(newValue) => handleChangeDate(newValue)}
                />
              </LocalizationProvider>
            )}
          </div>
        </div>
        <FormGroup className={cx("form__group")}>
          <FormControlLabel
            control={
              <Checkbox
                checked={dataSubmit.takePhoto}
                onChange={(event) => {
                  dispatch(
                    actions.getDataSubmit.changeDataSubmit({
                      takePhoto: event.target.checked,
                    })
                  );
                }}
              />
            }
            label={<span className="normal-font">Chụp ảnh sau cắt</span>}
          />
        </FormGroup>
        <FormGroup className={cx("form__group")}>
          <textarea
            className={cx("text-desc")}
            name="description"
            id=""
            cols="20"
            rows="3"
            placeholder="Bạn có thể điền thêm ghi chú nếu muốn. VD: tôi muốn cắt undercut"
            value={dataSubmit.description}
            onBlur={(event) => {
              console.log(event.target.value);
              if (event.target.value !== "") {
                dispatch(
                  actions.getDataSubmit.changeDataSubmit({
                    description: event.target.value,
                  })
                );
              }
            }}
          ></textarea>
        </FormGroup>
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
