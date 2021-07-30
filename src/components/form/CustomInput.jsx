import React, { useState } from "react";

import InputAdornment from "@material-ui/core/InputAdornment";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const CustomInput = (props) => {
  const [values, setValues] = useState({
    showPassword: false,
  });

  const classes = useStyles();

  const {
    Icon,
    type,
    placeholder,
    handleChange,
    name,
    errors,
    label,
    value,
    ...rest
  } = props;

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
            <label htmlFor={name}>
              <Box className="full-need" component="span">
                *
              </Box>{" "}
              {label}
            </label>
            <FilledInput
              type={values.showPassword ? "text" : "password"}
              placeholder={placeholder}
              id={name}
              onChange={(e) => handleChange(e)}
              value={value}
              name={name}
              autoComplete="off"
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
            {errors && <Alert severity="error">{errors}</Alert>}
          </>
        ) : (
          <>
            <label htmlFor={name}>
              <Box className="full-need" component="span">
                *
              </Box>{" "}
              {label}
            </label>
            <FilledInput
              type={type ? type : "text"}
              placeholder={placeholder}
              id={name}
              onChange={(e) => handleChange(e)}
              value={value}
              name={name}
              autoComplete="off"
              startAdornment={
                Icon && (
                  <InputAdornment position="start">
                    <Icon />
                  </InputAdornment>
                )
              }
            />
            {errors && <Alert severity="error">{errors}</Alert>}
          </>
        )}
      </FormControl>
    </>
  );
};

export default CustomInput;
