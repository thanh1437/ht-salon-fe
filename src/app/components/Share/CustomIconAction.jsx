import { IconButton, Tooltip } from "@mui/material";
import React from "react";

function CustomIconAction(props) {
  const { icon, label, handleClick, className, children, arrow, sx } = props;
  return (
    <Tooltip
      arrow={arrow ? arrow : false}
      title={label ? <span className="small-font">{label}</span> : ""}
      sx={{
        "&:hover": {
          backgroundColor: "#e6e6e6",
        },
      }}
    >
      <IconButton sx={sx} className={className} onClick={handleClick}>
        {children ?? icon}
      </IconButton>
    </Tooltip>
  );
}

export default CustomIconAction;
