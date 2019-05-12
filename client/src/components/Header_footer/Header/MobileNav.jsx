import React, { Component } from "react";

import { Link, NavLink, withRouter } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";

import ShoppingCart from "../../icons/ShoppingCart";
import VinylIcon from "../../icons/VinylIcon";
import AccountIcon from "../../icons/AccountIcon";

const CartCounter = styled.div`
  position: absolute;
  top: -35%;
  right: -50%;
	color: #e8e8e8;
  background: #6f666c;
  font-size: 0.8rem;
  border-radius: 100%;
  height: 1.4rem;
  width: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class MobileNav extends Component {
  renderLinks = () => {
    let list = [];

    if (this.props.user.userData && this.props.user.userData.isAuth) {
      this.props.links.forEach(item => {
        if (!item.public || item.name === "shop") {
          list.push(item);
        }
      });
    }

    return list.map(item => {
      if (item.name === "cart") {
        return this.cartLink(item);
      } else {
        return this.defaultLink(item);
      }
    });
  };

  defaultLink = item => {
    switch (item.name) {
      case "logout":
        return (
          <ListItem button key={item.name} className={this.props.classes.logout} onClick={this.props.logoutHandler}>
            <ListItemText primary={item.name} classes={{ root: this.props.classes.logoutContent, primary: this.props.classes.logoutLabel }} />
          </ListItem>
        );
      default:
        return (
          <ListItem button key={item.name} onClick={() => this.props.handleMobileLink(item.linkTo)} >
            <ListItemIcon>
              {item.name === "account" ? (
                <AccountIcon />
              ) : (
                <VinylIcon />
              )}
            </ListItemIcon>
            <ListItemText primary={item.name} classes={{ primary: this.props.classes.label }} />
          </ListItem>
        );
    }
  };

  cartLink = item => {
    const user = this.props.user.userData;
    const numOfProducts =
      user.cart.length > 0
        ? user.cart.reduce((acc, current) => (acc += current.quantity), 0)
        : 0;

    return (
      <ListItem button key={item.name} component={Link} to={item.linkTo} onClick={() => this.props.handleMobileLink(item.linkTo)}>
        <ListItemIcon className={this.props.classes.iconBox}>
          <ShoppingCart />
          <CartCounter>{numOfProducts}</CartCounter>
        </ListItemIcon>
        <ListItemText primary={item.name} classes={{ primary: this.props.classes.label }} />
      </ListItem>
    );
  };

  render() {
    return <List>{this.renderLinks()}</List>;
  }
}

const styles = theme => ({
  logout: {
		marginTop: '1em',
		borderTop: '1px solid rgba(0, 0, 0, 0.30)',
		borderBottom: '1px solid rgba(0, 0, 0, 0.30)',
		textAlign: 'center',
    color: "#cac5c5"
	},
	logoutContent: {
		padding: '0',
	},
	logoutLabel: {
		color: '#e8e8e8'
	},
  iconBox: {
    position: "relative"
  },
  icon: {
		fill: "#e8e8e8",
		zIndex: '1000',
	},
	label: {
		color: '#e8e8e8'
	}
});

export default withRouter(withStyles(styles)(MobileNav));
