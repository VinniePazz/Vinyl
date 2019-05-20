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
      <textarea
        style={{
          display: "flex",
					width: '100%',
					padding: '1em .5em',
          marginTop: "2em",
          fontFamily: "Poppins, sans-serif",
          backgroundColor: "#31272e",
					border: "1px solid transparent",
          color: "rgba(255, 255, 255, 0.76)",
          outlineColor: "#e76f517a",
          textAlign: "center"
        }}
        {...input}
        placeholder={placeholder}
        rows={rows || 5}
      />
    );
  }
);

export default TextArea;
