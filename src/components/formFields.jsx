import React, { useState } from "react";
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
  OutlinedInput,
  Box,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const TextInput = ({ 
  label, 
  register, 
  name, 
  errors, 
  size = 'small', 
  validation, 
  staticLabel = false,
  labelProps = {},
  ...rest 
}) => {
  const defaultValidation = validation === false
    ? {}
    : { required: `${label} is required`, ...(validation || {}) };

  if (staticLabel) {
    return (
      <Box>
        {label && (
          <Typography 
            variant="body2" 
            sx={{ mb: 1, fontWeight: 500, color: 'text.primary' }}
            {...labelProps}
          >
            {label}
          </Typography>
        )}
        <OutlinedInput
          size={size}
          fullWidth
          {...register(name, defaultValidation)}
          error={!!errors?.[name]}
          {...rest}
        />
        {errors?.[name] && (
          <FormHelperText error sx={{ mt: 0.5, mx: 0 }}>
            {errors?.[name]?.message}
          </FormHelperText>
        )}
      </Box>
    );
  }

  return (
    <TextField
      size={size}
      fullWidth
      label={label}
      {...register(name, defaultValidation)}
      error={!!errors?.[name]}
      helperText={errors?.[name]?.message}
      {...rest}
    />
  );
};

export const NumberInput = ({ 
  label, 
  register, 
  name, 
  errors, 
  validation, 
  size = 'small', 
  staticLabel = false,
  labelProps = {},
  ...rest 
}) => {
  const defaultValidation = validation === false
    ? {}
    : {
      required: `${label} is required`,
      validate: (value) =>
        /^[0-9]*$/.test(value) || `${label} must be a positive number`,
      ...(validation || {})
    };

  if (staticLabel) {
    return (
      <Box>
        {label && (
          <Typography 
            variant="body2" 
            sx={{ mb: 1, fontWeight: 500, color: 'text.primary' }}
            {...labelProps}
          >
            {label}
          </Typography>
        )}
        <OutlinedInput
          size={size}
          fullWidth
          type="number"
          inputProps={{ min: 0 }}
          {...register(name, defaultValidation)}
          error={!!errors?.[name]}
          {...rest}
        />
        {errors?.[name] && (
          <FormHelperText error sx={{ mt: 0.5, mx: 0 }}>
            {errors?.[name]?.message}
          </FormHelperText>
        )}
      </Box>
    );
  }

  return (
    <TextField
      size={size}
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

export const SelectInput = ({ 
  label, 
  register, 
  name, 
  options = [], 
  errors, 
  validation, 
  size = 'small', 
  staticLabel = false,
  labelProps = {},
  ...rest 
}) => {
  const defaultValidation = validation === false
    ? {}
    : { required: `${label} is required`, ...(validation || {}) };

  if (staticLabel) {
    return (
      <Box>
        {label && (
          <Typography 
            variant="body2" 
            sx={{ mb: 1, fontWeight: 500, color: 'text.primary' }}
            {...labelProps}
          >
            {label}
          </Typography>
        )}
        <FormControl fullWidth error={!!errors?.[name]} size={size}>
          <Select
            size={size}
            defaultValue=""
            {...register(name, defaultValidation)}
            IconComponent={KeyboardArrowDownIcon}
            displayEmpty
            input={<OutlinedInput />}
            {...rest}
          >
            <MenuItem value="" disabled>
              Select an option
            </MenuItem>
            {options.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
          {errors?.[name] && (
            <FormHelperText error sx={{ mt: 0.5, mx: 0 }}>
              {errors?.[name]?.message}
            </FormHelperText>
          )}
        </FormControl>
      </Box>
    );
  }

  return (
    <FormControl fullWidth error={!!errors?.[name]} size={size}>
      <InputLabel>{label}</InputLabel>
      <Select
        size={size}
        defaultValue=""
        label={label} 
        {...register(name, defaultValidation)} 
        IconComponent={KeyboardArrowDownIcon}
      >
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

export const CheckboxInput = ({ 
  label, 
  register, 
  name, 
  size = 'small',
  staticLabel = false,
  labelProps = {},
  ...rest 
}) => {
  if (staticLabel) {
    return (
      <Box display="flex" alignItems="center">
        <Checkbox
          {...register(name)}
          size={size}
          {...rest}
        />
        {label && (
          <Typography 
            variant="body2" 
            sx={{ ml: 1, color: 'text.primary' }}
            {...labelProps}
          >
            {label}
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <FormControlLabel
      control={<Checkbox {...register(name)} size={size} {...rest} />}
      label={label}
    />
  );
};

export const SwitchInput = ({ 
  label, 
  register, 
  name, 
  size = 'small',
  staticLabel = false,
  labelProps = {},
  ...rest 
}) => {
  if (staticLabel) {
    return (
      <Box display="flex" alignItems="center">
        <Switch
          {...register(name)}
          size={size}
          {...rest}
        />
        {label && (
          <Typography 
            variant="body2" 
            sx={{ ml: 1, color: 'text.primary' }}
            {...labelProps}
          >
            {label}
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <FormControlLabel
      control={<Switch {...register(name)} size={size} {...rest} />}
      label={label}
    />
  );
};

export const AutocompleteInput = ({
  label,
  name,
  control,
  options = [],
  errors,
  validation,
  getOptionLabel = (option) => option.label || "",
  isOptionEqualToValue = (option, value) => option.value === value.value,
  size = 'small',
  staticLabel = false,
  labelProps = {},
  ...rest
}) => {
  const defaultValidation = validation === false
    ? {}
    : { required: `${label} is required`, ...(validation || {}) };

  if (staticLabel) {
    return (
      <Box>
        {label && (
          <Typography 
            variant="body2" 
            sx={{ mb: 1, fontWeight: 500, color: 'text.primary' }}
            {...labelProps}
          >
            {label}
          </Typography>
        )}
        <Controller
          name={name}
          control={control}
          rules={defaultValidation}
          render={({ field: { onChange, value, ref } }) => (
            <Autocomplete
              size={size}
              options={options}
              getOptionLabel={getOptionLabel}
              isOptionEqualToValue={isOptionEqualToValue}
              value={value || null}
              onChange={(_, newValue) => onChange(newValue)}
              popupIcon={<KeyboardArrowDownIcon />}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size={size}
                  fullWidth
                  error={!!errors?.[name]}
                  placeholder="Select an option"
                  inputRef={ref}
                  InputProps={{
                    ...params.InputProps,
                    style: { 
                      paddingTop: 0, 
                      paddingBottom: 0,
                      height: size === 'small' ? '40px' : '56px'
                    }
                  }}
                />
              )}
              {...rest}
            />
          )}
        />
        {errors?.[name] && (
          <FormHelperText error sx={{ mt: 0.5, mx: 0 }}>
            {errors?.[name]?.message}
          </FormHelperText>
        )}
      </Box>
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={defaultValidation}
      render={({ field: { onChange, value, ref } }) => (
        <Autocomplete
          size={size}
          options={options}
          getOptionLabel={getOptionLabel}
          isOptionEqualToValue={isOptionEqualToValue}
          value={value || null}
          onChange={(_, newValue) => onChange(newValue)}
          popupIcon={<KeyboardArrowDownIcon />}
          renderInput={(params) => (
            <TextField
              {...params}
              size={size}
              label={label}
              error={!!errors?.[name]}
              helperText={errors?.[name]?.message}
              inputRef={ref}
            />
          )}
          {...rest}
        />
      )}
    />
  );
};

export const PasswordInput = ({ 
  label, 
  register, 
  name, 
  errors, 
  size = 'small', 
  validation, 
  staticLabel = false,
  labelProps = {},
  ...rest 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const defaultValidation = validation === false
    ? {}
    : { required: `${label} is required`, ...(validation || {}) };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const passwordAdornment = (
    <InputAdornment position="end">
      <IconButton
        aria-label={showPassword ? 'hide password' : 'show password'}
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
        edge="end"
        size={size}
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );

  if (staticLabel) {
    return (
      <Box>
        {label && (
          <Typography 
            variant="body2" 
            sx={{ mb: 1, fontWeight: 500, color: 'text.primary' }}
            {...labelProps}
          >
            {label}
          </Typography>
        )}
        <OutlinedInput
          size={size}
          fullWidth
          type={showPassword ? 'text' : 'password'}
          {...register(name, defaultValidation)}
          error={!!errors?.[name]}
          endAdornment={passwordAdornment}
          {...rest}
        />
        {errors?.[name] && (
          <FormHelperText error sx={{ mt: 0.5, mx: 0 }}>
            {errors?.[name]?.message}
          </FormHelperText>
        )}
      </Box>
    );
  }

  return (
    <TextField
      size={size}
      fullWidth
      label={label}
      type={showPassword ? 'text' : 'password'}
      {...register(name, defaultValidation)}
      error={!!errors?.[name]}
      helperText={errors?.[name]?.message}
      InputProps={{
        endAdornment: passwordAdornment,
      }}
      {...rest}
    />
  );
};
