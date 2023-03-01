import React, { useState } from "react";
import DialogForm from "../../../components/Dialogs/DialogForm";
import Login from "../../../pages/Auth/Login";
import SignUps from "../../../pages/Auth/SignUp";

import classNames from "classnames/bind";
import styles from "../components/HeaderAction/HeaderAction.module.scss";

const cx = classNames.bind(styles);

export default function LoginDialog({ open, onClose }) {
  const [isLogin, setIsLogin] = useState(false);

  const handleChangeLink = (status) => {
    setIsLogin(status);
  };

  return (
    <DialogForm
      title={isLogin ? "Đăng ký" : "Đăng nhập"}
      open={open}
      handleClose={onClose}
      size="xs"
      noButton={false}
    >
      {!isLogin ? (
        <Login onChangeLink={handleChangeLink} />
      ) : (
        <SignUps onChangeLink={handleChangeLink} />
      )}
    </DialogForm>
  );
}
