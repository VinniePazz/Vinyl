import React, { Component } from "react";
import UserLayout from "../User/UserLayout";
import UserProductBlock from "./UserProductBlock";
import Purchase from "./Purchase";

import { connect } from "react-redux";
import {
  getCartItems,
  removeCartItem,
  onPurchase
} from "../../actions/userActions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        }
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
      showTotal: true
    });
  };

  removeFromCart = async id => {
    await this.props.removeCartItem(id);
    if (this.props.user.cartDetail.length <= 0) {
      this.setState({
        showTotal: false
      });
    } else {
      this.calculateTotal(this.props.user.cartDetail);
    }
  };

  showNoItemMessage = () => (
    <div className="cart_no_items">
      <FontAwesomeIcon icon="frown" />
      <div>You have no items</div>
    </div>
  );

  handlePurchase = async () => {
    await this.props.onPurchase({
      cartDetail: this.props.user.cartDetail,
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
        <div>
          <h1>My cart</h1>
          <div className="user_cart">
            <UserProductBlock
              products={this.props.user}
              type="cart"
              removeItem={id => this.removeFromCart(id)}
            />
            {this.state.showTotal ? (
              <div>
                <div className="user_cart_sum">
                  <div>Total amount: $ {this.state.total}</div>
                </div>
              </div>
            ) : this.state.showSuccess ? (
              <div className="cart_success">
                <FontAwesomeIcon icon="smile" />
                <div>THANK YOU</div>
                <div>YOUR ORDER IS NOW COMPLETE</div>
              </div>
            ) : (
              this.showNoItemMessage()
            )}
          </div>
          {this.state.showTotal ? (
            <Purchase onPurchase={this.handlePurchase} />
          ) : null}
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { getCartItems, removeCartItem, onPurchase }
)(UserCart);
