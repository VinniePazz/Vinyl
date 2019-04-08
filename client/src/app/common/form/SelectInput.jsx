import React from "react";

const SelectInput = React.memo(
  ({ options, input, label, meta: { touched, error, active } }) => {
    return (
      <div>
        <label>{label}</label>
        <select {...input}>
          <option value="">Select one</option>
          {options.map(item => (
            <option key={item._id || item.value} value={item._id || item.key}>
              {item.name || item.value}
            </option>
          ))}
        </select>
        {touched && error && <span style={{ color: "red" }}>{error}</span>}
      </div>
    );
  }
);
export default SelectInput;
