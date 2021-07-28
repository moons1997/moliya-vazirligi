import React, { useState } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { ErrorMessage, useField } from "formik";
import Box from "@material-ui/core/Box";

const SelectComponent = ({
  placeholder,
  items,
  customValue,
  curentOblast,
  ...props
}) => {
  const [field, meta] = useField(props);
  const [list, setList] = useState([]);

  return (
    <div>
      <FormGroup>
        <FormControl variant="outlined" fullWidth>
          <Select placeholder={placeholder} {...field}>
            {items
              .filter((region) => region.oblast == curentOblast)
              .map((item, idx) => (
                <MenuItem
                  value={customValue ? item.fullname : item.id}
                  key={idx}
                >
                  {item.fullname}
                </MenuItem>
              ))}
          </Select>
          <ErrorMessage
            name={field.name}
            className="error-msg"
            component={Box}
          />
        </FormControl>
      </FormGroup>
    </div>
  );
};

export default SelectComponent;
