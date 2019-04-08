import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = React.memo(props => {
  const renderButton = () => {
    let button = "";

    switch (props.type) {
      case "default":
        button = (
          <Link className="link_default" to={props.linkTo} {...props.addStyles}>
            {props.title}
          </Link>
        );
        break;
      case "bag_link":
        button = (
          <div
            className="bag_link"
            onClick={() => {
              props.runAction();
            }}
          >
            <FontAwesomeIcon icon="shopping-cart" />
          </div>
        );
        break;
      case "add_to_cart_link":
        button = (
          <div
            className="add_to_cart_link"
            onClick={() => {
              props.runAction();
            }}
          >
            <FontAwesomeIcon icon="shopping-cart" />
            Add to cart
          </div>
        );
        break;
      default:
        button = "";
    }
    return button;
  };

  return <div className="my_link">{renderButton()}</div>;
});

export default Button;
