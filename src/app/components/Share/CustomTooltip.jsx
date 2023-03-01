import React from "react";
import PropTypes from "prop-types";
import { memo } from "react";
import { Tooltip } from "@mui/material";

function CustomTooltip({ children, label, placement = "top" }) {
  return (
    <Tooltip
      title={<span className="normal-font text-capitalize">{label}</span>}
      placement={placement}
    >
      {children}
    </Tooltip>
  );
}

CustomTooltip.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string.isRequired,
};

export default memo(CustomTooltip);
