import React from "react";
import TextField from "@material-ui/core/TextField";

const TextInput = React.memo(
  ({ input, label, type, meta: { touched, error, invalid }, ...custom }) => {
    return (
      <TextField
				type={type}
        label={label}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
				style={{ width: '100%', marginTop: '1em' }}
      />
    );
  }
);

export default TextInput;
