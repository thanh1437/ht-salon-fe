import * as actions from "./actions";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";

const services = {
  service: [
    {
      id: 1,
      name: "Shine Combo Ultra Care 2023",
      description:
        "Cắt Gội Massage 10 bước +5 trải nghiệm độc quyền Công nghệ xông mặt chuẩn SPA Tinh dầu thảo mộc thư giãn Công nghệ súng massage giảm đau nhức vai gáy Nâng cấp quy trình cắt (chỉn chu, trọn vẹn hơn) Đổi mới trải nghiệm gội riêng cho phái mạnh",
      price: 140000,
      image:
        "https://s3.ap-southeast-1.amazonaws.com/storage.30shine.com/service/combo_booking/701.jpg",
    },
    {
      id: 2,
      name: "Chăm sóc trắng sáng da Chuyên sâu NANO TECH",
      description:
        "Ánh sáng sinh học thúc đẩy tinh chất,sử dụng sản phẩm Vitaronic số 1 Hàn Quốc, công nghệ Nano thẩm thấu dưỡng chất. Trắng sáng bật tone",
      price: 140000,
      image: "https://30shine.com/static/media/arrowLeft.3e6be3da.svg",
    },
    {
      id: 3,
      name: "Shine Combo Ultra Care 2023",
      description:
        "Phòng gội VIP nhất từ trước đến giờ!!! Thư giãn massage bằng đá nóng núi lửa Himalaya giảm tê cứng, căng cơ Gội dưỡng sinh thẩm thấu các dưỡng chất bảo vệ da đầu Cắt xả và vuốt sáp tạo kiểu bằng gôm sáp Glanzen giữ nếp tóc lâu",
      price: 140000,
      image: "https://30shine.com/static/media/arrowLeft.3e6be3da.svg",
    },
  ],
  combo: [
    {
      id: 1,
      name: "Combo Cắt gội VIP (all dịch vụ chăm sóc)",
      description:
        "Cắt Gội Massage 10 bước +5 trải nghiệm độc quyền Công nghệ xông mặt chuẩn SPA Tinh dầu thảo mộc thư giãn Công nghệ súng massage giảm đau nhức vai gáy Nâng cấp quy trình cắt (chỉn chu, trọn vẹn hơn) Đổi mới trải nghiệm gội riêng cho phái mạnh",
      price: 140000,
      image:
        "https://s3.ap-southeast-1.amazonaws.com/storage.30shine.com/service/combo_booking/701.jpg",
    },
  ],
};

function getAllService() {
  return new Promise((resolve) => {
    resolve(services);
  });
}

function* getServiceSaga(action) {
  try {
    let fetchData = yield call(getAllService, {});
    console.log(fetchData);
    let newService = fetchData["service"].map((item) => ({
      ...item,
      isChoose: false,
    }));
    let newCombo = fetchData["combo"].map((item) => ({
      ...item,
      isChoose: false,
    }));
    yield put(
      actions.getService.getServiceSuccess({
        service: newService,
        combo: newCombo,
      })
    );
  } catch (error) {
    let message;
    if (error.response) {
      switch (error.response.status) {
        case 500:
          message = "Internal Server Error";
          break;
        case 401:
          message = "Invalid credentials";
          break;
        default:
          message = error.message;
      }
    } else {
      message = "Wrong something " + error;
    }
    yield put(actions.getService.getServiceFailure(message));
  }
}

export function* watchService() {
  yield takeEvery(actions.getService.getServiceRequest, getServiceSaga);
}
export default function* bookingSaga() {
  yield all([fork(watchService)]);
}
