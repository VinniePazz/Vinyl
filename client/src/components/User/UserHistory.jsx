import React from "react";
import moment from "moment";

const UserHistoryBlock = props => {
  const renderBlocks = () =>
    props.products
      ? props.products
          .map((product, i) => (
            <tr key={i}>
              <td>{moment(product.dateOfPurchase).format("MM-DD-YYYY")}</td>
              <td>
                {product.author} "{product.album}"
              </td>
              <td>$ {product.price}</td>
              <td>{product.quantity}</td>
            </tr>
          ))
          .reverse()
      : null;

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <table>
        <thead>
          <tr>
            <th>Date of purchase</th>
            <th>Product</th>
            <th>Price paid</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>{renderBlocks()}</tbody>
      </table>
    </div>
  );
};

export default UserHistoryBlock;
