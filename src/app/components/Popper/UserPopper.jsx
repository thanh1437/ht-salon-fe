import React, { useState } from "react";
import PopperWrapper from "./index";
import { IMAGE_PATH } from "../../appConfig";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import * as actions from "../../redux/auth/actions";
import { useDispatch } from "react-redux";

function UserPopper() {
  const dispatch = useDispatch();
  let [popper, setPopper] = useState(false);
  let [key, setKey] = useState(1);

  const show = () => {
    setPopper(true);
    setKey((key += 1));
  };
  const hide = () => {
    setPopper(false);
    setKey((key += 1));
  };

  const handleLogout = () => {
    const token = localStorage.getItem("access_token");
    dispatch(
      actions.getLogout.getLogoutRequest({
        token,
        deviceInfo: {
          deviceId: "XIAOMI",
          deviceType: "DEVICE_TYPE_ANDROID",
        },
      })
    );
  };

  return (
    <Tippy
      interactive
      visible={popper}
      key={key}
      render={(attrs) => (
        <div className="user-popper" tabIndex="-1" {...attrs}>
          <PopperWrapper>
            <ul>
              {/* <li className="text-center">
                                <Link
                                    to="/user-profile"
                                    className="w-100 d-block p-3"
                                    onClick={hide}
                                >
                                    User Profile
                                </Link>
                            </li> */}
              <li className="text-center">
                <button className="p-3 w-100" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </PopperWrapper>
        </div>
      )}
      onClickOutside={hide}
    >
      <div className="avatar__wrapper ml-4">
        <button className="w-100 h-100 p-0" onClick={popper ? hide : show}>
          <img
            src={IMAGE_PATH + "/user.jpg"}
            alt=""
            className="object-fit-contain rounded-circle border"
          />
        </button>
      </div>
    </Tippy>
  );
}

export default UserPopper;
