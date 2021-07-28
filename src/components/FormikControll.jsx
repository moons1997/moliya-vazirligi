import React from 'react';
import CustomAutocomplete from './form/CustomAutocomplete';
import CustomInput from './form/CustomInput';
import CustomSelect from './form/CustomSelect';

const FormikControll = (props) => {
  const { controll, ...rest } = props;
  switch (controll) {
    case 'input':
      return <CustomInput {...rest} />;
    case 'select':
      return <CustomSelect {...rest} />;
    case 'autocomplete':
      return <CustomAutocomplete {...rest} />;
    default:
      return null;
  }
};

export default FormikControll;
