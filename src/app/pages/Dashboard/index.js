import React, { useEffect, useState } from "react";
import CustomBreadcrumbs from "../../components/Share/CustomBreadcrumbs";
import { Grid } from "@mui/material";
import HighChart from "./HighChart";

import classNames from "classnames/bind";
import styles from "./Dashboard.module.scss";

const cx = classNames.bind(styles);

export default function Dashboard() {
  const [state, setState] = useState({
    courses: [],
    accounts: [],
    totalCourses: 0,
    totalAccounts: 0,
  });
  useEffect(() => {
    document.title = "Dashboard | Key Quiz";
    const thisYear = new Date().getFullYear();
  }, []);

  return (
    <div className={cx("ttr-wrapper")}>
      <div class="container-fluid">
        <CustomBreadcrumbs
          routeSegments={[{ name: "Dashboard" }]}
          role="admin"
        />
        <Grid container spacing={2} className="mt-4">
          <Grid item md={6} lg={6} xl={6} sm={6} xs={12}>
            <div className={cx("widget-card", "widget-bg4")}>
              <div className="wc-item">
                <h4 className={cx("wc-title")}>Tài khoản mới</h4>
                <span className={cx("wc-des")}>Tài khoản mới tham gia</span>
                <span className={cx("wc-stats", "counter")}>10</span>
                <div className={cx("progress", "wc-progress")}>
                  <div
                    className={cx("progress-bar")}
                    role="progressbar"
                    style={{ width: "90%" }}
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                {/* <span className={cx("wc-progress-bx")}>
                  <span className={cx("wc-change")}>Change</span>
                  <span className={cx("wc-number", " ml-auto")}>90%</span>
                </span> */}
              </div>
            </div>
          </Grid>
          <Grid item md={6} lg={6} xl={6} sm={6} xs={12}>
            <div className={cx("widget-card", "widget-bg3")}>
              <div className="wc-item">
                <h4 className={cx("wc-title")}>Lịch cắt tóc mới</h4>
                <span className={cx("wc-des")}>Lịch cắt tóc mới</span>
                <span className={cx("wc-stats", "counter")}>20</span>
                <div className={cx("progress", "wc-progress")}>
                  <div
                    className={cx("progress-bar")}
                    role="progressbar"
                    style={{ width: "65%" }}
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                {/* <span className={cx("wc-progress-bx")}>
                  <span className={cx("wc-change")}>Change</span>
                  <span className={cx("wc-number", " ml-auto")}>65%</span>
                </span> */}
              </div>
            </div>
          </Grid>
        </Grid>

        <HighChart state={state} type="courses" />
      </div>
    </div>
  );
}
