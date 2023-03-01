import React, { useEffect, useState } from "react";
import { Box, Grid, Tab, Tabs } from "@material-ui/core";
import PropTypes from "prop-types";
import * as actions from "../../redux/booking/actions";
import CardItem from "./CardItem";
import { useDispatch, useSelector } from "react-redux";

import classNames from "classnames/bind";
import styles from "./Booking.module.scss";
import LoadingSpinier from "../../components/Spinners/LoadingSpinier";

const cx = classNames.bind(styles);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ServiceBooking({ onClick, onClose, onSubmit }) {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  const { service, loading } = useSelector((state) => state.booking);
  const [value, setValue] = useState(0);

  useEffect(() => {
    checkDisable();
  });

  const checkDisable = () => {
    let check = [...service["service"], ...service["combo"]].some(
      (item) => item.isChoose
    );
    setDisabled(!check);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickItem = (type, id) => {
    dispatch(actions.getService.changeStatusService({ type, id }));
    checkDisable();
  };

  const handleClickSubmit = () => {
    dispatch(
      actions.getDataSubmit.changeDataSubmit({
        serviceIds: service["service"].filter((item) => item.isChoose),
        comboIds: service["combo"].filter((item) => item.isChoose),
      })
    );
    onSubmit();
  };

  return (
    <div className={cx("card")}>
      <div className={cx("card-header")}>
        <button onClick={onClose}>
          <img
            src="https://30shine.com/static/media/arrowLeft.3e6be3da.svg"
            alt=""
            role="presentation"
          />
        </button>
        <h3>Chọn dịch vụ</h3>
      </div>
      <div className={cx("card-content")}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            className="tabs"
          >
            <Tab label="Tất cả" {...a11yProps(0)} />
            <Tab label="Dịch vụ" {...a11yProps(1)} />
            <Tab label="Combo" {...a11yProps(2)} />
          </Tabs>
        </Box>
        {loading ? (
          <LoadingSpinier />
        ) : (
          <>
            <TabPanel value={value} index={0}>
              <CardItem
                title="Dịch vụ"
                data={service["service"]}
                onClick={handleClickItem}
                type="service"
              />
              <CardItem
                title="Combo"
                data={service["combo"]}
                onClick={handleClickItem}
                type="combo"
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <CardItem
                title="Dịch vụ"
                data={service["service"]}
                onClick={handleClickItem}
                type="service"
              />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <CardItem
                title="Combo"
                data={service["combo"]}
                type="combo"
                onClick={handleClickItem}
              />
            </TabPanel>
          </>
        )}
      </div>
      <button
        className={cx("card-action", "stick-element")}
        disabled={disabled ? "disabled" : ""}
        onClick={handleClickSubmit}
      >
        Hoàn tất
      </button>
    </div>
  );
}
