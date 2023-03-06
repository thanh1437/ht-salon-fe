import React, { useState } from "react";

import classNames from "classnames/bind";
import styles from "./CustomTextField.module.scss";

const cx = classNames.bind(styles);

export default function FormTextField(props) {
  const {
    className,
    label,
    placeholder,
    name,
    handleChangeText,
    value,
    type = "text",
    min,
    max,
  } = props;

  return (
    <div className={cx("dialog-form-group", className)}>
      <label htmlFor="abc" className={cx("form-title")}>
        {label}
      </label>
      <input
        className={cx("form-input")}
        placeholder={placeholder}
        name={name}
        value={value}
        type={type}
        onChange={handleChangeText}
        min={type === "number" && min}
        max={type === "number" && max}
      />

      {/* {error && <span className={cx('text-danger')}>{helperText}</span>} */}
    </div>
  );
}
