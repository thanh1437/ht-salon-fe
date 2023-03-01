import React, { useState } from "react";
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { Box, Pagination, Rating, Stack } from "@mui/material";
import moment from "moment/moment";
import CustomChip from "../../components/Share/CustomChip";
import CustomIconAction from "../../components/Share/CustomIconAction";
import { RemoveRedEyeRounded } from "@mui/icons-material";
import DialogForm from "../../components/Dialogs/DialogForm";
import { IMAGE_PATH } from "../../appConfig";
import { Link } from "react-router-dom";
import { routes } from "../../config";

import classNames from "classnames/bind";
import styles from "./History.module.scss";

const cx = classNames.bind(styles);

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      className="history-pagination"
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

const status = {
  0: { title: "Chưa cắt", color: null },
  1: { title: "Đã cắt", color: "primary" },
  2: { title: "Đã hủy", color: "error" },
  3: { title: "Đang chờ xác nhận", color: "secondary" },
};

export default function History() {
  const [openDialog, setOpenDialog] = useState(false);
  const [dataDialog, setDataDialog] = useState(null);
  const [dataForm, setDataForm] = useState([
    {
      id: 1,
      dateCreated: "23/02/2022",
      stylist: "Nguyen Trong An",
      rate: 4,
      combo: [
        {
          name: "Combo cắt tóc gội đầu",
          total: 100000,
        },
      ],
      total: 0,
      status: 0,
      image: null,
    },
    {
      id: 2,
      dateCreated: "23/02/2022",
      stylist: "Nguyen Trong Ban",
      rate: 4,
      combo: [
        {
          name: "Combo cắt tóc gội đầu",
          total: 100000,
        },
      ],
      total: 0,
      status: 2,
      image: null,
    },
    {
      id: 3,
      dateCreated: "23/02/2022",
      stylist: "Nguyen Trong Can",
      rate: 4,
      combo: [
        {
          name: "Combo cắt tóc gội đầu",
          total: 100000,
        },
      ],
      total: 0,
      status: 1,
      image:
        "https://storage.30shine.com/ResourceWeb/data/images/home/stylist/2.jpg?v=2",
    },
  ]);

  const handleOpenEditDialog = (data) => {
    // console.log(id);
    setDataDialog(data);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const columns = [
    {
      field: "id",
      minWidth: 50,
      sortable: false,
      editable: false,
      headerAlign: "center",
      renderHeader: (params) => <span className="header-table">Lần cắt</span>,
      renderCell: (params) => (
        <span className="normal-font row-center">
          {params.api.getRowIndex(params.row.id) + 1}
        </span>
      ),
    },
    {
      field: "dateCreated",
      minWidth: 250,
      sortable: false,
      headerAlign: "center",
      renderHeader: (params) => <span className="header-table">Ngày cắt</span>,
      renderCell: (params) => (
        <div className="normal-font row-center">
          {moment(params.row.created_at).utc().format("DD/MM/YYYY HH:mm:ss")}
        </div>
      ),
      editable: false,
    },
    {
      field: "stylist",
      minWidth: 250,
      sortable: false,
      editable: false,
      headerAlign: "center",
      renderHeader: (params) => <span className="header-table">Stylist</span>,
      renderCell: (params) => (
        <div className="normal-font row-center">{params.row.stylist}</div>
      ),
    },
    {
      field: "rate",
      minWidth: 170,
      sortable: false,
      editable: false,
      headerAlign: "center",
      renderHeader: (params) => <span className="header-table">Đánh giá</span>,
      renderCell: (params) => (
        <div className="normal-font d-flex-center w-100">
          {params.row.status === 0 ? (
            <CustomChip label="Chưa cắt" color={null} />
          ) : params.row.status === 2 ? (
            <CustomChip label="Đã hủy" color="error" />
          ) : (
            <Rating
              name="half-rating"
              defaultValue={params.row.rate}
              readOnly
            />
          )}
        </div>
      ),
    },
    {
      field: "status",
      minWidth: 248,
      sortable: false,
      headerAlign: "center",
      renderHeader: (params) => (
        <span className="header-table">Thành tiền</span>
      ),
      renderCell: (params) => (
        <div className="normal-font row-center">{params.row.total}</div>
      ),
      editable: false,
    },
    {
      minWidth: 150,
      sortable: false,
      headerAlign: "center",
      type: "actions",
      renderHeader: (params) => <span className="header-table">Chi tiết</span>,
      renderCell: (params) => (
        <div>
          <CustomIconAction
            label="Chi tiết"
            arrow
            handleClick={() => handleOpenEditDialog(params.row)}
          >
            <RemoveRedEyeRounded className="text-primary icon" />
          </CustomIconAction>
          {/* <CustomIconAction label="Delete" arrow handleClick={() => handleRemoveRow(params.id)}>
                        <DeleteRounded className="text-danger icon" />
                    </CustomIconAction> */}
        </div>
      ),
      editable: false,
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("header")}>
          <span>Lịch sử cắt tóc</span>
          <div>
            <Link to={routes.booking}>Đặt lịch ngay</Link>
          </div>
        </div>
        <div className={cx("container-table")}>
          <Box sx={{ height: 640, width: "100%", marginTop: "20px" }}>
            <DataGrid
              className="quesTable"
              rows={dataForm}
              columns={columns}
              //   checkboxSelection
              components={{
                NoRowsOverlay: () => (
                  <Stack
                    height="100%"
                    alignItems="center"
                    justifyContent="center"
                  >
                    Bạn chưa có lịch nào cả! Hãy đặt ngay
                  </Stack>
                ),
                Pagination: CustomPagination,
              }}
              pagination
              pageSize={10}
              rowsPerPageOptions={[10]}
              getRowId={(row) => row.id}
              disableSelectionOnClick
              disableColumnFilter
              disableColumnMenu
              hideFooterRowCount
              //   onSelectionModelChange={handleChangeSelection}
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0
                  ? "even-row"
                  : "odd-row"
              }
            />
          </Box>
        </div>

        {dataDialog && (
          <DialogForm
            title="Chi tiết"
            open={openDialog}
            noButton={false}
            size="sm"
            handleClose={handleCloseDialog}
          >
            <div className={cx("dialog-content__header")}>
              <div className={cx("left")}>
                <div className={cx("content__wrapper")}>
                  <h3>Ngày cắt:</h3>
                  <span className={cx("content__wrapper-text")}>
                    {dataDialog.dateCreated}
                  </span>
                </div>
                <div className={cx("content__wrapper")}>
                  <h3>Stylist:</h3>
                  <span className={cx("content__wrapper-text")}>
                    {dataDialog.stylist}
                  </span>
                </div>
                <div>
                  <h3>Yêu cầu thêm:</h3>
                  <p className={cx("content__wrapper-paragraph")}>
                    Tôi muốn cắt kiểu Undercut
                  </p>
                </div>
                <div className={cx("content__wrapper")}>
                  <h3>Trạng thái:</h3>
                  <span className={cx("content__wrapper-text")}>
                    <CustomChip
                      label={status[dataDialog.status].title}
                      color={status[dataDialog.status].color}
                    />
                  </span>
                </div>
                {dataDialog.status === 1 && (
                  <div className={cx("content__wrapper")}>
                    <h3>Đánh giá:</h3>
                    <span className={cx("content__wrapper-text")}>
                      <Rating
                        name="half-rating"
                        defaultValue={dataDialog.rate}
                        readOnly
                      />
                    </span>
                  </div>
                )}
              </div>
              <div className={cx("separate")}></div>
              <div className={cx("right")}>
                <h3>Ảnh sau khi cắt:</h3>
                <div>
                  {dataDialog.image ? (
                    <img
                      className={cx("img-after-cut")}
                      src={dataDialog.image}
                      alt=""
                      width={150}
                      height={200}
                    />
                  ) : (
                    <div className={cx("no-img")}>
                      <img src={IMAGE_PATH + "/no-data.png"} alt="" />
                      <span>Ảnh không tồn tại</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <table border={1} className={cx("dialog-table")}>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Dịch vụ</th>
                  <th>Số tiền</th>
                </tr>
              </thead>
              <tbody>
                {dataDialog.combo.map((item, index) => (
                  <tr key={index + "a"}>
                    <td>{index + 1}</td>
                    <td className="pl-2">{item.name}</td>
                    <td>{item.total}đ</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={cx("content__wrapper", "space-between")}>
              <h3>Thành tiền</h3>
              <span className={cx("content__wrapper-text")}>
                {dataDialog.total}đ
              </span>
            </div>
          </DialogForm>
        )}
      </div>
    </div>
  );
}
