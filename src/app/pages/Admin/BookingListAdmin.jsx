import React, { useState, useEffect, useContext, useRef } from "react";
// Material Library
import {
  Alert,
  Autocomplete,
  Box,
  LinearProgress,
  Stack,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Beenhere, Check, Close, Delete, Edit } from "@mui/icons-material";
// Component
import CustomIconAction from "../../components/Share/CustomIconAction";
import CustomBreadcrumbs from "../../components/Share/CustomBreadcrumbs";
import CustomDialog from "../../components/Share/CustomDialog";
import CustomChip from "../../components/Share/CustomChip";
// Service
import {
  completeBooking,
  createCombo,
  searchByPageBooking,
  updateStatusBooking,
} from "../../service/service";
import { useDispatch, useSelector } from "react-redux";

import { ToastContext } from "../../context/ToastContextProvider";
import { catchingPromise } from "../../constants/utils";
import * as actions from "../../redux/booking/actions";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CustomizationSearch from "../../components/Search/CustomizationSearch";
import CustomButton from "../../components/Share/CustomButton";

import classNames from "classnames/bind";
import styles from "./Admin.module.scss";
import { IMAGE_PATH } from "../../appConfig";
import { useMemo } from "react";

const cx = classNames.bind(styles);

export default function BookingListAdmin() {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [dataForm, setDataForm] = useState([]);
  const [dataSearch, setDataSearch] = useState({
    name: null,
    fromDate: null,
    toDate: null,
    chooseUserId: null,
  });
  const context = useContext(ToastContext);
  const [dialogForm, setDialogForm] = useState(false);
  const [dataSubmit, setDataSubmit] = useState(null);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const { stylists } = useSelector((state) => state.booking);
  const [dataSelected, setDataSelected] = useState([]);
  const [openUpload, setOpenUpload] = useState(false);
  const [dataImage, setDataImage] = useState(null);
  const [dataId, setDataId] = useState(null);

  useEffect(() => {
    document.title = "Lịch cắt tóc | HTSalon";
    setLoading(true);

    dispatch(actions.getStylist.getStylistRequest());
    fetchData();
  }, []);

  const fetchData = async () => {
    await searchByPageBooking({ ...dataSearch }).then(({ data }) => {
      setDataForm(data.content);
      setLoading(false);
    });
  };

  const handleChangeSelection = (data) => {
    console.log(data);
    setDataSelected(data);
  };

  const handleChangeSearch = (value) => {
    setDataSearch((preState) => ({ ...preState, name: value }));
  };

  const handleSubmitForm = () => {
    createCombo({
      ...dataSubmit,
      serviceIds: dataSubmit.serviceDtos.map((item) => item.id),
    })
      .then(() => {
        context.setDataAlert({
          ...context.dataAlert,
          isOpen: true,
          message: dataSubmit?.id ? "Sửa thành công!" : "Thêm thành công!",
          status: "success",
        });
        fetchData();
        handleCloseForm();
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

  const handleOpenEditDialog = (id) => {
    setDialogForm(true);
    let data = dataForm.find((item) => item.id === id);
    setDataSubmit(data);
  };

  const handleOpenFilter = () => {
    setIsOpenFilter(!isOpenFilter);
  };

  const handleSubmitSearch = () => {
    fetchData();
  };

  const handleChangeStatus = (id, status) => {
    updateStatusBooking({ status, ids: [id] }).then(() => {
      fetchData();
      context.setDataAlert({
        ...context.dataAlert,
        isOpen: true,
        message: "Cập nhật trạng thái thành công",
        status: "success",
      });
    });
  };

  const handleChangeMultiStatus = (status) => {
    updateStatusBooking({ status, ids: dataSelected }).then(() => {
      fetchData();
      context.setDataAlert({
        ...context.dataAlert,
        isOpen: true,
        message: "Cập nhật trạng thái thành công",
        status: "success",
      });
    });
  };

  const changeHandler = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setDataImage(base64);
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

  const handleUploadImage = () => {
    completeBooking({ photo: dataImage }, dataId).then(() => {
      fetchData();
      setOpenUpload(false);
      context.setDataAlert({
        ...context.dataAlert,
        isOpen: true,
        message: "Cập nhật trạng thái thành công",
        status: "success",
      });
    });
  };

  const handleCompleteBooking = (id) => {
    const findData = dataForm.find((item) => item.id === id);
    if (findData.takePhoto === 1) {
      setDataId(id);
      setOpenUpload(true);
    } else {
      completeBooking({ photo: "" }, id).then(() => {
        fetchData();
        context.setDataAlert({
          ...context.dataAlert,
          isOpen: true,
          message: "Cập nhật trạng thái thành công",
          status: "success",
        });
      });
    }
  };

  const status1 = [
    {
      name: "Chờ xác nhận",
      value: 0,
      color: "",
    },
    {
      name: "Đã xác nhận",
      value: 1,
      color: "primary",
    },
    {
      name: "Đã hoàn thành",
      value: 2,
      color: "success",
    },
    {
      name: "Đã hủy",
      value: 3,
      color: "error",
    },
  ];

  const columns = [
    {
      field: "id",
      minWidth: 50,
      sortable: false,
      editable: false,
      headerAlign: "center",
      renderHeader: () => <span className="header-table">STT</span>,
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
      renderHeader: () => <span className="header-table">Người đặt</span>,
      renderCell: (params) => (
        <div className="normal-font row-center">
          {params.row.createBy + " - " + params.row.code}
        </div>
      ),
      editable: false,
    },
    {
      field: "email",
      minWidth: 300,
      sortable: false,
      editable: false,
      headerAlign: "center",
      renderHeader: () => <span className="header-table">Người cắt</span>,
      renderCell: (params) => (
        <div className="normal-font row-center">{params.row.chooseUser}</div>
      ),
    },
    {
      field: "createdDate",
      minWidth: 250,
      sortable: false,
      headerAlign: "center",
      renderHeader: () => <span className="header-table">Ngày đặt lịch</span>,
      renderCell: (params) => (
        <div className="normal-font row-center">{params.row.startTime}</div>
      ),
      editable: false,
    },
    {
      field: "modifiedDate",
      minWidth: 300,
      sortable: false,
      headerAlign: "center",
      renderHeader: () => <span className="header-table">Ghi chú</span>,
      renderCell: (params) => (
        <div className="normal-font row-center">{params.row.description}</div>
      ),
      editable: false,
    },
    {
      field: "status",
      minWidth: 200,
      sortable: false,
      headerAlign: "center",
      renderHeader: () => <span className="header-table">Trạng thái</span>,
      renderCell: (params) => (
        <div className="normal-font row-center">
          <CustomChip
            label={status1[params.row.status].name}
            color={status1[params.row.status].color}
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
      renderHeader: () => <span className="header-table">Hành động</span>,
      renderCell: (params) => (
        <div>
          {params.row.status != 3 && (
            <>
              <CustomIconAction
                label="Chi tiết"
                arrow
                handleClick={() => handleOpenEditDialog(params.id)}
              >
                <Edit className="text-primary icon" />
              </CustomIconAction>
              {params.row.status != 2 &&
                (params.row.status === 1 ? (
                  <CustomIconAction
                    label="Hoàn thành"
                    arrow
                    handleClick={() => handleCompleteBooking(params.id)}
                  >
                    <Beenhere className="text-secondary icon" />
                  </CustomIconAction>
                ) : (
                  <>
                    <CustomIconAction
                      label="Xác nhận"
                      arrow
                      handleClick={() => handleChangeStatus(params.id, 1)}
                    >
                      <Check className="text-success icon" />
                    </CustomIconAction>
                    <CustomIconAction
                      label="Từ chối"
                      arrow
                      handleClick={() => handleChangeStatus(params.id, 3)}
                    >
                      <Close className="text-danger icon" />
                    </CustomIconAction>
                  </>
                ))}
            </>
          )}
        </div>
      ),
      editable: false,
    },
  ];

  const handleTotal = useMemo(() => {
    if (dataSubmit?.serviceDtos) {
      return dataSubmit.serviceDtos.reduce(
        (store, preVal) => store + preVal.price,
        0
      );
    }
  }, [dataSubmit]);

  return (
    <div className="w-100">
      <CustomBreadcrumbs routeSegments={[{ name: "Lịch cắt tóc" }]} />

      <div className="d-flex-center-between mt-4">
        <div className="d-flex-center-between">
          <CustomButton
            style={{ width: "155px" }}
            className="mr-3"
            handleClick={() => handleChangeMultiStatus(1)}
            title="Chấp nhận nhiều"
            colorButton="success"
          />
          <CustomButton
            style={{ width: "155px" }}
            handleClick={() => handleChangeMultiStatus(3)}
            title="Từ chối nhiều"
            colorButton="danger"
          />
        </div>
        <div className="d-flex-align-center mb-3">
          <CustomButton
            handleClick={() => handleOpenFilter()}
            title="Bộ lọc"
            fullWidth
            colorButton="blue"
          />
          <CustomizationSearch
            placeholder="Tìm kiếm người đặt..."
            handleChangeSearch={handleChangeSearch}
          />
        </div>
      </div>
      {isOpenFilter && (
        <div className={cx("filter-wrapper")}>
          <LocalizationProvider adapterLocale={"vi"} dateAdapter={AdapterDayjs}>
            <DatePicker
              renderInput={(props) => (
                <TextField
                  {...props}
                  variant="standard"
                  className="date-search"
                />
              )}
              label="Từ ngày"
              value={dataSearch.fromDate}
              onChange={(newValue) =>
                setDataSearch((preState) => ({
                  ...preState,
                  fromDate: newValue,
                }))
              }
              disablePast={true}
            />
            <DatePicker
              renderInput={(props) => (
                <TextField
                  {...props}
                  variant="standard"
                  className="date-search"
                />
              )}
              label="Đến ngày"
              value={dataSearch.toDate}
              onChange={(newValue) =>
                setDataSearch((preState) => ({
                  ...preState,
                  toDate: newValue,
                }))
              }
              disablePast={true}
            />
          </LocalizationProvider>
          <Autocomplete
            className="autocomplete-search"
            disablePortal
            options={stylists}
            sx={{ width: 300, height: 40 }}
            getOptionLabel={(option) => option.name}
            onChange={(event, newValue) => {
              setDataSearch((preState) => ({
                ...preState,
                chooseUserId: newValue.id,
              }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                className="normal-font"
                label="Người cắt"
                variant="standard"
              />
            )}
          />
          <CustomButton
            className={cx("search-btn")}
            handleClick={() => handleSubmitSearch()}
            title="Tìm kiếm"
            fullWidth
            colorButton="purple"
          />
        </div>
      )}
      {dataSubmit && (
        <CustomDialog
          title={"Xem chi tiết"}
          open={dialogForm}
          size="md"
          noButton={false}
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
              <div className={cx("content__wrapper")}>
                <h3>Ngày cắt:</h3>
                <span className={cx("content__wrapper-text")}>
                  {dataSubmit.startTime}
                </span>
              </div>
              <div className={cx("content__wrapper")}>
                <h3>Stylist:</h3>
                <span className={cx("content__wrapper-text")}>
                  {dataSubmit.chooseUser}
                </span>
              </div>
              {dataSubmit.description && (
                <div>
                  <h3>Yêu cầu thêm:</h3>
                  <p className={cx("content__wrapper-paragraph")}>
                    {dataSubmit.description}
                  </p>
                </div>
              )}
              <div className={cx("content__wrapper")}>
                <h3>Trạng thái:</h3>
                <span className={cx("content__wrapper-text")}>
                  <CustomChip
                    label={status1[dataSubmit.status].name}
                    color={status1[dataSubmit.status].color}
                  />
                </span>
              </div>
            </div>
            <div className={cx("separate")}></div>
            <div className={cx("right")}>
              <h3>Ảnh sau khi cắt:</h3>
              <div>
                {dataSubmit.takePhoto === 1 ? (
                  <img
                    className={cx("img-after-cut")}
                    src={dataSubmit.photo}
                    alt=""
                    width={150}
                    height={200}
                  />
                ) : (
                  <div className={cx("no-img")}>
                    <img src={IMAGE_PATH + "/no-data.png"} alt="" />
                    <span>Người dùng không chụp ảnh sau cắt</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          {dataSubmit.serviceDtos.length > 0 && (
            <>
              <table border={1} className={cx("dialog-table")}>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Dịch vụ</th>
                    <th>Số tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {dataSubmit.serviceDtos.map((item, index) => (
                    <tr key={index + "a"}>
                      <td>{index + 1}</td>
                      <td className="text-center">{item.name}</td>
                      <td>{item.price}đ</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className={cx("content__wrapper", "space-between")}>
                <h3>Thành tiền</h3>
                <span className={cx("content__wrapper-text")}>
                  {handleTotal}đ
                </span>
              </div>
            </>
          )}
        </CustomDialog>
      )}

      <CustomDialog
        title={"Upload ảnh sau cắt"}
        open={openUpload}
        size="xs"
        handleSubmit={handleUploadImage}
        handleClose={() => setOpenUpload(false)}
      >
        <div className={cx("right")}>
          <div className={cx("image-wrapper")}>
            <div>
              {dataImage ? (
                <div
                  className={cx("img")}
                  onClick={() => {
                    inputRef.current.click();
                  }}
                >
                  <img src={dataImage} alt="" className="w-100" />
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
                  className={cx("fake-img", "w-100")}
                  onClick={() => {
                    inputRef.current.click();
                  }}
                >
                  <img src="https://100dayscss.com/codepen/upload.svg" alt="" />
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
                Không có lịch nào đang tồn tại
              </Stack>
            ),
          }}
          loading={loading}
          getRowId={(row) => row.id}
          disableSelectionOnClick
          disableColumnFilter
          rowsPerPageOptions={[10]}
          disableColumnMenu
          checkboxSelection
          isRowSelectable={(params) => params.row.status === 0}
          onSelectionModelChange={handleChangeSelection}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even-row" : "odd-row"
          }
        />
      </Box>
    </div>
  );
}
