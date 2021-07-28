import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';

const CustomSelect = (props) => {
  const { options, customValue, handleChange, name, label, value, curentOblast, ...rest } = props;
  return (
    <div>
      <FormGroup>
        <FormControl variant="outlined" fullWidth>
          <label htmlFor={name}>
            <Box className="full-need" component="span">
              *
            </Box>{' '}
            {label}
          </label>
          {name === 'regionid' ? (
            <Select
              id={name}
              onChange={(e) => handleChange(e)}
              value={value}
              name={name}
              disabled={curentOblast.length === 0 ? true : false}>
              {options
                .filter((region) => region.oblast === curentOblast)
                .map((item, idx) => (
                  <MenuItem value={customValue ? item.fullname : item.id} key={idx}>
                    {item.fullname}
                  </MenuItem>
                ))}
            </Select>
          ) : (
            <Select id={name} onChange={(e) => handleChange(e)} value={value} name={name}>
              {options.map((item, idx) => (
                <MenuItem value={customValue ? item.fullname : item.id} key={idx}>
                  {item.fullname}
                </MenuItem>
              ))}
            </Select>
          )}
        </FormControl>
      </FormGroup>
    </div>
  );
};

export default CustomSelect;
