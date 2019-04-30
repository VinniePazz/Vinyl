import React from "react";
import {
  Select,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem
} from "@material-ui/core";

const SelectInput = React.memo(
  ({ options, input, label, meta: { touched, error, active } }) => {
    return (
      <FormControl
        style={{ width: "100%", marginTop: "1em" }}
        error={touched && error}
      >
        <InputLabel htmlFor="genre">{label}</InputLabel>
        <Select
          {...input}
          inputProps={{
            name: "genre",
            id: "genre"
          }}
        >
          <MenuItem value="">
            <span>None</span>
          </MenuItem>
          {options.map(option => (
            <MenuItem key={option.name} value={option._id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
        {touched && error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    );
  }
);
export default SelectInput;
