import clsx from "clsx";
import React, { useEffect, useState } from "react";
import {
  MdWarning,
  MdInfo,
  MdError,
  MdSuc,
  MdDone,
  MdClose,
} from "react-icons/md";
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
const getMessageProps = (message) => {
  const colors = {
    success: "green-500",
    error: "red-500",
    warning: "orange-300",
    info: "blue-300",
  };
  switch (message) {
    case "error":
      return {
        icon: <MdWarning className={`bg-${colors[message]}`} />,
        color: colors[message],
      };
    case "info":
      return {
        icon: <MdInfo className={`bg-${colors[message]}`} />,
        color: colors[message],
      };
    case "warning":
      return {
        icon: <MdWarning className={`bg-${colors[message]}`} />,
        color: colors[message],
      };
    case "success":
      return {
        icon: <MdDone className={`bg-${colors[message]}`} />,
        color: colors[message],
      };
    default:
      return {};
      break;
  }
};
const Toast = ({
  variant = "bottom_right",
  message,
  type,
  lifetime = 3000,
  onComplete,
}) => {
  const selectedVariant = VARIANTS[variant] || VARIANTS.top_right;
  const messageProperties = getMessageProps(type);
  useEffect(() => {
    setTimeout(onComplete, lifetime);
  }, []);
  return (
    <div
      className={clsx(
        selectedVariant.style,
        "container  bg-white flex flex-row justify-between items-center p-3  border-l-2 shadow-lg",
        `border-${messageProperties.color}`
      )}
    >
      <div className="flex flex-row justify-center items-center">
        {messageProperties.icon}
        <span className={`text-${messageProperties.color}`}>{message}</span>
      </div>
      <MdClose />
    </div>
  );
};

export default Toast;
