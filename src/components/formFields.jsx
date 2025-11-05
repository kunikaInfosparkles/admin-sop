import React from "react";
import { Controller } from "react-hook-form";
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
  Autocomplete,
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


export const NumberInput = ({ label, register, name, errors, validation, ...rest }) => {
  const defaultValidation = validation === false
    ? {}
    : {
        required: `${label} is required`,
        validate: (value) =>
          /^[0-9]*$/.test(value) || `${label} must be a positive number`,
        ...(validation || {})
      };
  return (
    <TextField
      fullWidth
      label={label}
      type="number"
      inputProps={{ min: 0 }}
      {...register(name, defaultValidation)}
      error={!!errors?.[name]}
      helperText={errors?.[name]?.message}
      {...rest}
    />
  );
};


export const SelectInput = ({ label, register, name, options = [], errors, validation, ...rest }) => {
  const defaultValidation = validation === false
    ? {}
    : { required: `${label} is required`, ...(validation || {}) };
  return (
    <FormControl fullWidth error={!!errors?.[name]} {...rest}>
      <InputLabel>{label}</InputLabel>
      <Select defaultValue="" label={label} {...register(name, defaultValidation)} IconComponent={KeyboardArrowDownIcon}>
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{errors?.[name]?.message}</FormHelperText>
    </FormControl>
  );
};


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


export const AutocompleteInput = ({
  label,
  name,
  control,
  options = [],
  errors,
  validation,
  getOptionLabel = (option) => option.label || "",
  isOptionEqualToValue = (option, value) => option.value === value.value,
  ...rest
}) => {
  const defaultValidation = validation === false
    ? {}
    : { required: `${label} is required`, ...(validation || {}) };

  return (
    <Controller
      name={name}
      control={control}
      rules={defaultValidation}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          options={options}
          getOptionLabel={getOptionLabel}
          isOptionEqualToValue={isOptionEqualToValue}
          value={value || null}
          onChange={(_, newValue) => onChange(newValue)}
          popupIcon={<KeyboardArrowDownIcon />}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={!!errors?.[name]}
              helperText={errors?.[name]?.message}
            />
          )}
          {...rest}
        />
      )}
    />
  );
};
