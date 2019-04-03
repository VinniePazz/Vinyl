import React from "react";

const PageTop = props => {
  return (
    <div className="page_top">
      <div className="container">
        <p style={{marginLeft: '1rem'}}>{props.title}</p>
      </div>
    </div>
  );
};

export default PageTop;
