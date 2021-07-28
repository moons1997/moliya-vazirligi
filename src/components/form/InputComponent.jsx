import React from "react";

import InputAdornment from "@material-ui/core/InputAdornment";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";

import { ErrorMessage, useField } from "formik";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const InputComponent = ({ Icon, type, placeholder, ...props }) => {
  const [field, meta] = useField(props);

  //   console.log(field);

  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <FormControl
        variant="filled"
        component={Box}
        width="100%"
        marginBottom="1rem!important"
      >
        {type == "password" ? (
          <>
            <FilledInput
              autoComplete="off"
              type={values.showPassword ? "text" : "password"}
              placeholder={placeholder}
              {...field}
              startAdornment={
                <InputAdornment position="start">
                  <Icon />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <ErrorMessage
              name={field.name}
              className="error-msg"
              component={Box}
            />
          </>
        ) : (
          <>
            <FilledInput
              autoComplete="off"
              type={type ? type : "text"}
              placeholder={placeholder}
              {...field}
              startAdornment={
                Icon && (
                  <InputAdornment position="start">
                    <Icon />
                  </InputAdornment>
                )
              }
            />
            <ErrorMessage
              name={field.name}
              className="error-msg"
              component={Box}
            />
          </>
        )}
      </FormControl>
    </>
  );
};

export default InputComponent;
