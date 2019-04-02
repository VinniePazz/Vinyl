import React from "react";

const TextInput = ({
  input,
  label,
  type,
  meta: { touched, error, active }
}) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} type={type} />
      {touched && error && <span style={{color: 'red'}}>{error}</span>}
    </div>
  );
};

export default TextInput;
