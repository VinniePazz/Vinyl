import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import UserLayout from "../User/UserLayout";
import UserProductBlock from "./UserProductBlock";
import { Heading } from "../../styled_components";
import EmptyBoxIcon from "../icons/EmptyBox";

import {
  getCartItems,
  removeCartItem,
  onPurchase
} from "../../actions/userActions";

const CartHeading = styled(Heading)``;

const EmptyCartBlock = styled.div`
  margin-top: 5em;
  text-align: center;

  p {
    margin-top: 1.5em;
  }
`;

const TotalSum = styled.div`
  padding: 0.5em 0;
  text-align: center;
  font-weight: 500;
  font-size: 1.2rem;

  span {
    color: #e76f51;
    font-weight: 600;
    margin-left: 0.7em;
  }
`;

const Purchase = styled.div`
  padding: 0.5em 0;
  text-align: center;
`;

class UserCart extends Component {
  state = {
    loading: true,
    total: 0,
    showTotal: false,
    showSuccess: false
  };

  async componentDidMount() {
    let cartItems = [];
    let user = this.props.user;

    if (user.userData.cart) {
      if (user.userData.cart.length > 0) {
        user.userData.cart.forEach(item => {
          cartItems.push(item.id);
        });
        await this.props.getCartItems(cartItems, user.userData.cart);
        if (this.props.user.cartDetail.length > 0) {
          this.calculateTotal(this.props.user.cartDetail);
        } else {
          this.setState({ loading: false });
        }
      } else {
        this.setState({ loading: false });
      }
    }
  }

  calculateTotal = cartDetail => {
    let total = 0;

    cartDetail.forEach(item => {
      total += parseInt(item.price, 10) * item.quantity;
    });

    this.setState({
      total,
      showTotal: true,
      loading: false
    });
  };

  removeFromCart = async id => {
    await this.props.removeCartItem(id);
    if (this.props.user.cartDetail.length <= 0) {
      this.setState({
        showTotal: false,
        loading: false
      });
    } else {
      this.calculateTotal(this.props.user.cartDetail);
    }
  };

  showNoItemMessage = () => (
    <EmptyCartBlock>
      <EmptyBoxIcon />
      <p>your shopping cart is empty...</p>
      <Button
        component={Link}
        to={`/shop`}
        variant="text"
        color="secondary"
        style={{ marginTop: "1.5em" }}
      >
        go to shop
      </Button>
    </EmptyCartBlock>
  );

  handlePurchase = async () => {
    await this.props.onPurchase({
      cartDetail: this.props.user.cartDetail
    });

    if (this.props.user.successPurchase) {
      this.setState({
        showTotal: false,
        showSuccess: true
      });
    }
  };

  render() {
    return (
      <UserLayout>
        {this.state.loading ? (
          <CircularProgress color="secondary" size={40} thickness={4} />
        ) : (
          <>
            <CartHeading> cart</CartHeading>
            <UserProductBlock
              products={this.props.user}
              type="cart"
              removeItem={id => this.removeFromCart(id)}
            />
            {this.state.showTotal ? (
              <TotalSum>
                <p>
                  Summary: <span>{this.state.total} $</span>
                </p>
              </TotalSum>
            ) : this.state.showSuccess ? (
              <div
                style={{
                  textAlign: "center",
                  marginTop: "5em",
                  color: "rgb(224, 136, 114)",
                  fontSize: "1.5rem"
                }}
              >
                <div>THANK YOU FOR YOUR PURCHASE!</div>
              </div>
            ) : (
              this.showNoItemMessage()
            )}
            {this.state.showTotal ? (
              <Purchase>
                <Button
                  style={{ width: "200px" }}
                  variant="contained"
                  color="secondary"
                  onClick={this.handlePurchase}
                >
                  Buy
                </Button>
              </Purchase>
            ) : null}
          </>
        )}
      </UserLayout>
    );
  }
}

export default connect(
  null,
  { getCartItems, removeCartItem, onPurchase }
)(UserCart);
