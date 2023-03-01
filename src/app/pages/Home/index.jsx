import React from "react";
import Carousel from "react-material-ui-carousel";
import {
  carouselHome,
  combos,
  employee,
  styleList,
} from "../../constants/fakeData";
import Service from "./Service";
import StyleList from "./StyleList";

import classNames from "classnames/bind";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);

export default function HomePage() {
  return (
    <div className="Home-Page">
      <div className={cx("carousel")}>
        <Carousel>
          {carouselHome.map((item, i) => (
            <img src={item.background} alt="" />
          ))}
        </Carousel>
      </div>
      <Service />

      <StyleList
        title="30Shine's Angels"
        des="Những thiên thần xinh đẹp hết lòng vì khách hàng"
        data={employee}
      />

      <StyleList
        title="30Shine's Stylist"
        des="Đội ngũ Stylist dày dạn kinh nghiệm, tư vấn nhiệt tình để khách hàng có kiểu tóc ưng ý nhất"
        data={styleList}
        more={"/"}
      />

      <StyleList
        title="Ưu đãi"
        des="Quà tặng, chiết khấu đặc biệt cập nhật liên tục"
        data={combos}
      />
    </div>
  );
}
