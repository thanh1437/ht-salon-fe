import React from "react";
import { Chip } from "@mui/material";

export default function CustomChip({ color, label }) {
  return (
    <>
      {color ? (
        <Chip label={label} color={color} className="normal-font" />
      ) : (
        <Chip label={label} className="normal-font" />
      )}
    </>
  );
}
