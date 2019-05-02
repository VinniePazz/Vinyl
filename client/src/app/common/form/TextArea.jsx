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
        <textarea
          style={{
            border: "1px solid rgba(0, 0, 0, 0.42)",
            marginTop: "2em",
            fontFamily: "Poppins, sans-serif",
            backgroundColor: "#31272e",
            color: "rgba(255, 255, 255, 0.76)",
						outlineColor: "#e76f517a",
						textAlign: 'center'
          }}
          {...input}
          placeholder={placeholder}
          rows={rows || 5}
          cols={cols || 10}
        />
      </div>
    );
  }
);

export default TextArea;
