import React from "react";
import CustomInput from "./form/CustomInput";

const FormikControll = (props) => {
  const { controll, ...rest } = props;
  switch (controll) {
    case "input":
      return <CustomInput {...rest} />;
    // case "select":
    //   break;
    default:
      return null;
  }
};

export default FormikControll;
