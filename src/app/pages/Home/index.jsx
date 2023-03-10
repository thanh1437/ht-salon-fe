import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { carouselHome, service, styleList } from "../../constants/fakeData";
import Service from "./Service";
import StyleList from "./StyleList";
import * as actions from "../../redux/booking/actions";
import { useSelector, useDispatch } from "react-redux";
import { getCombos, getServices } from "../../service/booking";

import classNames from "classnames/bind";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);

export default function HomePage() {
  const dispatch = useDispatch();
  const [serviceData, setServiceData] = useState(null);
  const { stylists } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(actions.getStylist.getStylistRequest());
    getServices({status: 1}).then((data) => {
      service[1].other = data.data.content.slice(0, 4);
      getCombos({status: 1}).then((res) => {
        service[0].other = res.data.content.slice(0, 4);
        setServiceData(service);
      });
    });
  }, []);

  return (
    <div className="Home-Page">
      <div className={cx("carousel")}>
        <Carousel>
          {carouselHome.map((item, i) => (
            <img src={item.background} alt="" />
          ))}
        </Carousel>
      </div>
      {serviceData && <Service data={serviceData} />}

      <StyleList
        title="30Shine's Stylist"
        des="Đội ngũ Stylist dày dạn kinh nghiệm, tư vấn nhiệt tình để khách hàng có kiểu tóc ưng ý nhất"
        data={stylists ? stylists : []}
      />
    </div>
  );
}
