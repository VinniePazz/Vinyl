import React from "react";
import ViewModule from "@material-ui/icons/ViewModule";
import ViewStream from "@material-ui/icons/ViewStream";

const ShopBar = ({ onClick, grid }) => {
  const active = "rgba(0, 0, 0, 0.75)";
  const passive = "rgba(0, 0, 0, 0.47)";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        color: "#635e5e",
        marginBottom: "1em"
      }}
    >
      <ViewStream
        fontSize="large"
        onClick={() => onClick("row")}
        style={{
          cursor: "pointer",
          color: grid === "row" ? active : passive
        }}
      />
      <ViewModule
        color="action"
        fontSize="large"
        onClick={() => onClick("table")}
        style={{
          cursor: "pointer",
          color: grid === "table" ? active : passive
        }}
      />
    </div>
  );
};

export default ShopBar;
