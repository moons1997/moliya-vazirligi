import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  listbox: {
    boxSizing: "border-box",
    padding: 0,
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
});

const ComboBoxComponent = ({
  name,
  placeholder,
  getData,
  data,
  handleChange,
}) => {
  const classes = useStyles();
  return (
    <div className="combo-box">
      <Autocomplete
        id="combo-box-demo"
        onChange={(event, value) => getData(value)}
        classes={classes}
        options={data}
        getOptionLabel={(option) => option.name}
        style={{ paddingRight: 0 }}
        renderInput={(params) => (
          <TextField
            {...params}
            name={name}
            placeholder={placeholder}
            variant="outlined"
          />
        )}
      />
    </div>
  );
};

export default ComboBoxComponent;
