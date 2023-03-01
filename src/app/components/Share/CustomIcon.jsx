import React, { memo } from "react";

function CustomIcon({ className, url, position, width }) {
  return (
    <i
      className={className}
      style={{
        backgroundImage: `url('${url}')`,
        backgroundPosition: position,
        backgroundSize: "auto",
        width: width + "px",
        height: width + "px",
        backgroundRepeat: "no-repeat",
        display: "inline-block",
      }}
    ></i>
  );
}

export default memo(CustomIcon);
