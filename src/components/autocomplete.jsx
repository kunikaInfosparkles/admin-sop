import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


export const AutocompleteInput = ({
    label,
    name,
    control,
    options = [],
    errors,
    getOptionLabel = (option) => option.label || "",
    isOptionEqualToValue = (option, value) => option.value === value.value,
}) => {
    return (
        <Autocomplete
            options={options}
            getOptionLabel={getOptionLabel}
            isOptionEqualToValue={isOptionEqualToValue}
            onChange={(_, value) => control.setValue(name, value)}
            popupIcon={<KeyboardArrowDownIcon />}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    error={!!errors?.[name]}
                    helperText={errors?.[name]?.message}
                />
            )}
        />
    );
};
