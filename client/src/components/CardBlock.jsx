import React from "react";
import ShopCard from "./ShopCard";

const CardBlock = props => {
  const renderCards = () =>
    props.list ? props.list.map((card, i) => <ShopCard key={i} {...card} />) : null;

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
