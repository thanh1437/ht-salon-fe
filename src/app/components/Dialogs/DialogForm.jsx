import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import CustomIconAction from "../Share/CustomIconAction";
import CustomButton from "../Share/CustomButton";

export default function DialogForm({
  title,
  children,
  open,
  handleClose,
  fullWidth = true,
  size = "md",
  noButton = true,
}) {
  return (
    <Dialog
      fullWidth={fullWidth}
      maxWidth={size}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle className="position-relative text-center">
        <h1 className="m-0">{title}</h1>
        <CustomIconAction
          sx={{ position: "absolute", right: 8, top: 15 }}
          icon={<CloseIcon />}
          handleClick={handleClose}
          label={"Đóng"}
        />
      </DialogTitle>
      <DialogContent style={{ minHeight: "200px" }}>{children}</DialogContent>
      {noButton && (
        <DialogActions>
          <CustomButton
            title={"Đăng nhập"}
            colorButton="primary"
            handleClick={handleClose}
          />
        </DialogActions>
      )}
    </Dialog>
  );
}
