import clsx from "clsx";
import React from "react";
import { MdWarning, MdInfo, MdError, MdSuc, MdDone } from "react-icons/md";
const VARIANTS = {
  top_left: {
    style: "top-0 left-0",
  },
  top_right: {
    style: "top-0 right-0",
  },
  bottom_right: {
    style: "bottom-0 right-0",
  },
  bottom_left: {
    style: "bottom-0 left-0",
  },
  top_middle: {
    style: "top-0 left-1/2 -translate-x-1/2 transform",
  },
  bottom_middle: {
    style: "bottom-0 left-1/2 -translate-x-1/2 transform",
  },
  undefined: {
    style: "top-0 right-0",
  },
};
const messageIcon = ({ message, props }) => {
  switch (message) {
    case "error":
      return <MdWarning {...props} />;
      break;
    case "info":

    default:
      break;
  }
};
const Toast = ({ variant = "top_right" }) => {
  const selectedVariant = VARIANTS[variant] || VARIANTS.top_right;

  return <div className={clsx(selectedVariant.style, "container")}></div>;
};

export default Toast;
