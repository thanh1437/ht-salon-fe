import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
// Material Library
import { Alert, Box, LinearProgress, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Add, Edit } from "@mui/icons-material";
// Component
import CustomIconAction from "../../components/Share/CustomIconAction";
import CustomizationSearch from "../../components/Search/CustomizationSearch";
import CustomBreadcrumbs from "../../components/Share/CustomBreadcrumbs";
import CustomButton from "../../components/Share/CustomButton";
// Service
import { getServices } from "../../service/booking.js";

import { ToastContext } from "../../context/ToastContextProvider";
import CustomDialog from "../../components/Share/CustomDialog";
import FormTextField from "../../components/TextField/FormTextField";
import CustomChip from "../../components/Share/CustomChip";

import classNames from "classnames/bind";
import styles from "./Admin.module.scss";
import { createService } from "../../service/service";
import { catchingPromise } from "../../constants/utils";

const cx = classNames.bind(styles);

export default function ServiceList() {
  const inputRef = useRef();
  const [dataForm, setDataForm] = useState([]);
  const [dataSearch, setDataSearch] = useState({ searchText: "" });
  const context = useContext(ToastContext);
  const [dialogForm, setDialogForm] = useState(false);
  const [dataSubmit, setDataSubmit] = useState(null);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Danh sách dịch vụ | HTSalon";
  }, []);

  useEffect(() => {
    fetchData();
  }, [dataSearch]);

  const fetchData = async () => {
    const token = localStorage.getItem("access_token");
    setLoading(true);
    await getServices({}, token).then(({ data }) => {
      setDataForm(data.content);
      setLoading(false);
    });
  };

  const handleChangeSearch = (value) => {
    setDataSearch({ searchText: value });
  };

  const handleSubmitForm = () => {
    createService(dataSubmit)
      .then((data) => {
        console.log(data);
        context.setDataAlert({
          ...context.dataAlert,
          isOpen: true,
          message: dataSubmit?.id ? "Sửa thành công!" : "Thêm thành công!",
          status: "success",
        });
        setDialogForm(false);
        fetchData();
      })
      .catch((err) => {
        setNotification({
          name: catchingPromise(err.response),
          status: "error",
        });
      });
  };

  const handleClearForm = () => {
    setDataSubmit(null);
    setNotification(null);
  };

  const handleCloseForm = () => {
    handleClearForm();
    setDialogForm(false);
  };

  const handleOpenDialog = () => {
    setDialogForm(true);
  };

  const handleChangeText = (event) => {
    if (event.target.type === "number") {
      setDataSubmit((preState) => {
        return { ...preState, [event.target.name]: +event.target.value };
      });
    } else {
      setDataSubmit((preState) => {
        return { ...preState, [event.target.name]: event.target.value };
      });
    }
  };

  const handleChangeFilter = (event) => {
    setDataSubmit((preState) => {
      return { ...preState, status: +event.target.value };
    });
  };

  const handleOpenEditDialog = (id) => {
    setDialogForm(true);
    let data = dataForm.find((item) => item.id === id);
    setDataSubmit(data);
  };

  const changeHandler = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setDataSubmit((preState) => {
      return { ...preState, image: base64 };
    });
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const status = [
    {
      name: "Ẩn",
      value: 0,
    },
    {
      name: "Hiện",
      value: 1,
    },
  ];

  const columns = [
    {
      field: "id",
      minWidth: 50,
      sortable: false,
      editable: false,
      headerAlign: "center",
      renderHeader: (params) => <span className="header-table">STT</span>,
      renderCell: (params) => (
        <span className="normal-font row-center">
          {params.api.getRowIndex(params.row.id) + 1}
        </span>
      ),
    },
    {
      field: "username",
      minWidth: 300,
      sortable: false,
      headerAlign: "center",
      renderHeader: (params) => (
        <span className="header-table">Tên dịch vụ</span>
      ),
      renderCell: (params) => (
        <div className="normal-font row-center">{params.row.name}</div>
      ),
      editable: false,
    },
    {
      field: "email",
      minWidth: 200,
      sortable: false,
      editable: false,
      headerAlign: "center",
      renderHeader: (params) => <span className="header-table">Giá</span>,
      renderCell: (params) => (
        <div className="normal-font row-center">{params.row.price}</div>
      ),
    },
    {
      field: "photoURL",
      minWidth: 150,
      sortable: false,
      editable: false,
      headerAlign: "center",
      renderHeader: (params) => (
        <span className="header-table">Thời gian cắt</span>
      ),
      renderCell: (params) => (
        <div className="normal-font d-flex-center w-100">
          {params.row.duration} phút
        </div>
      ),
    },
    {
      field: "createdDate",
      minWidth: 220,
      sortable: false,
      headerAlign: "center",
      renderHeader: (params) => <span className="header-table">Ngày tạo</span>,
      renderCell: (params) => (
        <div className="normal-font row-center">{params.row.createdDate}</div>
      ),
      editable: false,
    },
    {
      field: "modifiedDate",
      minWidth: 220,
      sortable: false,
      headerAlign: "center",
      renderHeader: (params) => <span className="header-table">Ngày sửa</span>,
      renderCell: (params) => (
        <div className="normal-font row-center">{params.row.modifiedDate}</div>
      ),
      editable: false,
    },
    {
      field: "status",
      minWidth: 200,
      sortable: false,
      headerAlign: "center",
      renderHeader: (params) => (
        <span className="header-table">Trạng thái</span>
      ),
      renderCell: (params) => (
        <div className="normal-font row-center">
          <CustomChip
            label={params.row.status === 0 ? "Ẩn" : "Hiện"}
            color={params.row.status === 1 ? "primary" : "error"}
          />
        </div>
      ),
      editable: false,
    },
    {
      field: "",
      minWidth: 150,
      sortable: false,
      headerAlign: "center",
      type: "actions",
      renderHeader: (params) => <span className="header-table">Hành động</span>,
      renderCell: (params) => (
        <div>
          <CustomIconAction
            label="Detail"
            arrow
            handleClick={() => handleOpenEditDialog(params.id)}
          >
            <Edit className="text-primary icon" />
          </CustomIconAction>
        </div>
      ),
      editable: false,
    },
  ];

  return (
    <div className="w-100">
      <CustomBreadcrumbs routeSegments={[{ name: "Danh sách dịch vụ" }]} />

      <div className="d-flex-center-between mt-4">
        <div className="d-flex-center-between">
          <CustomButton
            handleClick={() => handleOpenDialog()}
            title="Thêm dịch vụ"
            startIcon={<Add />}
            fullWidth
            colorButton="primary"
          />
        </div>
        <div className="d-flex-align-center">
          {/* <select className={cx('filter', 'mr-3')} name="filter" onChange={handleChangeFilter}>
                        {filters.map((item, index) => (
                            <option key={index} value={item.value}>
                                {item.name}
                            </option>
                        ))}
                    </select> */}
          <CustomizationSearch
            placeholder="Tìm kiếm dịch vụ..."
            handleChangeSearch={handleChangeSearch}
          />
        </div>
      </div>
      <CustomDialog
        title={dataSubmit?.id ? "Sửa dịch vụ" : "Thêm dịch vụ"}
        open={dialogForm}
        size="md"
        handleSubmit={handleSubmitForm}
        handleClose={handleCloseForm}
        handleClear={handleClearForm}
      >
        {notification && (
          <Alert severity={notification.status} className="normal-font">
            {notification.name}
          </Alert>
        )}

        <div className={cx("dialog-content__header")}>
          <div className={cx("left")}>
            <FormTextField
              label="Tên dịch vụ"
              placeholder="Nhập tên dịch vụ"
              name="name"
              value={dataSubmit?.name}
              handleChangeText={handleChangeText}
            />
            <FormTextField
              label="Mô tả dịch vụ"
              placeholder="Nhập mô tả"
              name="description"
              value={dataSubmit?.description}
              handleChangeText={handleChangeText}
            />
            <FormTextField
              label="Giá"
              placeholder="Nhập giá"
              name="price"
              type="number"
              value={dataSubmit?.price}
              min={1}
              handleChangeText={handleChangeText}
            />
            <FormTextField
              label="Thời gian làm"
              placeholder="Nhập thời gian làm"
              name="duration"
              type="number"
              min={1}
              value={dataSubmit?.duration}
              handleChangeText={handleChangeText}
            />
            <FormTextField
              className={cx("orderByText")}
              label="Độ ưu tiên"
              placeholder="Nhập độ ưu tiên"
              name="orderBy"
              type="number"
              value={dataSubmit?.orderBy}
              min={1}
              max={1000}
              handleChangeText={handleChangeText}
            />
            <div className={cx("form-group")}>
              <label htmlFor="abc" className={cx("form-title")}>
                Trạng thái
              </label>
              <select
                className={cx("filter", "mr-3")}
                name="filter"
                onChange={handleChangeFilter}
              >
                {status.map((item, index) => (
                  <option
                    key={index}
                    value={item.value}
                    selected={
                      dataSubmit?.status === item.value ? "selected" : ""
                    }
                  >
                    {item.name}
                  </option>
                ))}
              </select>
              {/* {error && <span className={cx('text-danger')}>{helperText}</span>} */}
            </div>
          </div>
          <div className={cx("separate")}></div>
          <div className={cx("right")}>
            <div className={cx("image-wrapper")}>
              <label htmlFor="abc" className={cx("form-title")}>
                Ảnh
              </label>
              <div>
                {/* <img src={dataSubmit?.image} alt="" /> */}
                {dataSubmit?.image ? (
                  <div
                    className={cx("img")}
                    onClick={() => {
                      inputRef.current.click();
                    }}
                  >
                    <img src={dataSubmit?.image} alt="" />
                    <input
                      ref={inputRef}
                      onChange={changeHandler}
                      type="file"
                      className={cx("upload-input")}
                      accept=".png,.jpg"
                      hidden
                    ></input>
                  </div>
                ) : (
                  <div
                    className={cx("fake-img")}
                    onClick={() => {
                      inputRef.current.click();
                    }}
                  >
                    <img
                      src="https://100dayscss.com/codepen/upload.svg"
                      alt=""
                    />
                    <input
                      ref={inputRef}
                      onChange={changeHandler}
                      type="file"
                      className={cx("upload-input")}
                      accept=".png,.jpg"
                      hidden
                    ></input>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CustomDialog>

      <Box sx={{ height: 640, width: "100%", marginTop: "20px" }}>
        <DataGrid
          className="quesTable"
          rows={dataForm}
          columns={columns}
          components={{
            LoadingOverlay: LinearProgress,
            NoRowsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                Không có dịch vụ nào đang tồn tại
              </Stack>
            ),
          }}
          loading={loading}
          getRowId={(row) => row.id}
          disableSelectionOnClick
          disableColumnFilter
          disableColumnMenu
          rowsPerPageOptions={[10]}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even-row" : "odd-row"
          }
        />
      </Box>
    </div>
  );
}
