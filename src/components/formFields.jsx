import React from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Switch,
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";


export const TextInput = ({ label, register, name, errors, validation, ...rest }) => {
  const defaultValidation = validation === false
    ? {}
    : { required: `${label} is required`, ...(validation || {}) };
  return (
    <TextField
      fullWidth
      label={label}
      {...register(name, defaultValidation)}
      error={!!errors?.[name]}
      helperText={errors?.[name]?.message}
      {...rest}
    />
  )
};


export const NumberInput = ({ label, register, name, errors, ...rest }) => (
  <TextField
    fullWidth
    label={label}
    type="number"
    inputProps={{ min: 0 }}
    {...register(name, {
      required: `${label} is required`,
      validate: (value) =>
        /^[0-9]*$/.test(value) || `${label} must be a positive number`,
    })}
    error={!!errors?.[name]}
    helperText={errors?.[name]?.message}
    {...rest}
  />
);


export const SelectInput = ({ label, register, name, options = [], errors }) => (
  <FormControl fullWidth error={!!errors?.[name]}>
    <InputLabel>{label}</InputLabel>
    <Select defaultValue="" label={label} {...register(name)} IconComponent={KeyboardArrowDownIcon} >
      {options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.label}
        </MenuItem>
      ))}
    </Select>
    <FormHelperText>{errors?.[name]?.message}</FormHelperText>
  </FormControl>
);


export const CheckboxInput = ({ label, register, name }) => (
  <FormControlLabel
    control={<Checkbox {...register(name)} />}
    label={label}
  />
);


export const SwitchInput = ({ label, register, name }) => (
  <FormControlLabel
    control={<Switch {...register(name)} />}
    label={label}
  />
);
