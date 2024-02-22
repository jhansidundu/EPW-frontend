import { LinearProgress } from "@mui/material";
import React from "react";
import { createPortal } from "react-dom";

const Loader = ({ isLoading }) => {
  const loaderElement = document.getElementById("loader");
  if (loaderElement && isLoading) {
    return createPortal(
      <LinearProgress
        color="error"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
        }}
      />,
      loaderElement
    );
  } else return;
};

export default Loader;
