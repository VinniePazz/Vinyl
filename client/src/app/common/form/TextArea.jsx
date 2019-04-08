import React from "react";

const TextArea = React.memo(
  ({
    input,
    label,
    placeholder,
    rows,
    cols,
    meta: { touched, error, active }
  }) => {
    return (
      <div>
        <label>{label}</label>
        <textarea
          {...input}
          placeholder={placeholder}
          rows={rows || 5}
          cols={cols || 10}
        />
        {touched && error && <span style={{ color: "red" }}>{error}</span>}
      </div>
    );
  }
);

export default TextArea;
