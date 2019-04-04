import React from "react";
import ViewModule from "@material-ui/icons/ViewModule";
import ViewStream from "@material-ui/icons/ViewStream";

import { AppBar, Toolbar } from "@material-ui/core";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ShopBar = ({ onClick }) => {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", color: '#635e5e', marginBottom: '1em' }}>
      <ViewStream
        fontSize="large"
        onClick={() => onClick("row")}
        style={{ cursor: "pointer" }}
      />
      <ViewModule
        fontSize="large"
        onClick={() => onClick("table")}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default ShopBar;
