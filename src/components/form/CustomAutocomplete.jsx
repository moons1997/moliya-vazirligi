import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  listbox: {
    boxSizing: 'border-box',
    padding: 0,
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});

const CustomAutocomplete = (props) => {
  const { options, placeholder, handleChange, name, label, value, ...rest } = props;
  const classes = useStyles();
  return (
    <div className="combo-box">
      <Autocomplete
        id="combo-box-demo"
        onChange={(e, val) => handleChange(val)}
        classes={classes}
        options={options}
        getOptionLabel={(option) => option.name}
        style={{ paddingRight: 0 }}
        name={name}
        renderInput={(params) => (
          <>
            <label htmlFor={name}>
              <Box className="full-need" component="span">
                *
              </Box>{' '}
              {label}
            </label>
            <TextField
              {...params}
              id={name}
              placeholder={placeholder}
              variant="outlined"
              value={value}
            />
          </>
        )}
      />
    </div>
  );
};

export default CustomAutocomplete;
