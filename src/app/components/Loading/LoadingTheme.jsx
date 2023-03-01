import React from "react";
import { Skeleton } from "@mui/material";

export default function LoadingTheme() {
  function render() {
    let html = [];
    for (let i = 0; i < 10; i++) {
      html.push(
        <Skeleton
          sx={{ bgcolor: "#3e4042", borderRadius: "8px", margin: "0 4px" }}
          variant="rounded"
          width={32}
          height={32}
        />
      );
    }
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0 4px 0 8px",
        }}
      >
        {html}
      </div>
    );
  }
  return render();
}
