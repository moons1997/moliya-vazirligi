import React from "react";
import { toast } from "react-toastify";

const Toast = ({ message, type }) => {
  const body = () => (
    <>
      <h5>{message}</h5>
    </>
  );
  if (type) {
    return toast.success(body, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    return toast.error(body, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

export default Toast;
