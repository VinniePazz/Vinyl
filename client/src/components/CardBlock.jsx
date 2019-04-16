import React from "react";
import ShopCard from "./ShopCard";

const CardBlock = props => {
  const renderCards = () =>
    props.list ? props.list.map((product, i) => <ShopCard key={i} {...product} />) : null;

  return (
    <div className="card_block">
      <div className="container">
        {props.title ? <div className="title">{props.title}</div> : null}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
						justifyContent: 'space-around'
          }}
        >
          {renderCards(props.list)}
        </div>
      </div>
    </div>
  );
};

export default CardBlock;
