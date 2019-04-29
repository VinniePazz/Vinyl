import React, { Component } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";

import { connect } from "react-redux";
import { logout } from "../../../actions/userActions";

import ShoppingCart from "../../ShoppingCart";

const Navigation = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  height: 4em;
  width: 100%;
  z-index: 999;
  padding: 0 1em;
  background-color: #4b3645;
  opacity: ${({ header }) =>
    (header === "default" && "1") ||
    (header === "showedOnScroll" && "1") ||
    "0"};
  transform: ${({ header }) =>
    (header === "default" && "translateY(0)") ||
    (header === "showedOnScroll" && "translateY(0)") ||
    "translateY(-100%)"};
  transition: all 0.3s ease;
`;

const Container = styled.div`
  max-width: 1100px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

export const Logo = styled.div`
  font-family: "Monoton", cursive;
  color: #ffffff;
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  transition: color 0.2s;

  &:hover {
    color: #e76f51;
  }
`;

const NavBar = styled.nav`
  display: flex;
  height: 100%;
  align-items: center;
  margin-left: auto;
  color: #ffffff;
`;

const Navlink = styled.a`
  display: block;
  text-transform: uppercase;
  margin-right: 1.5rem;
  transition: color 0.2s;
  position: relative;

  &:hover {
    color: #e76f51;
  }
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0.5em 0.5em;
`;

const CartCounter = styled.div`
  position: absolute;
  top: -5%;
  right: -25%;
  background: #6f666c;
  font-size: 0.8rem;
  border-radius: 100%;
  height: 1.4rem;
  width: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class Header extends Component {
  state = {
    links: [
      {
        name: "account",
        linkTo: "/user/dashboard",
        public: false
      },
      {
        name: "shop",
        linkTo: "/shop",
        public: true
      },
      {
        name: "login",
        linkTo: "/login",
        public: true
      },
      {
        name: "cart",
        linkTo: "/user/cart",
        public: false
      },
      {
        name: "logout",
        public: false
      }
    ]
  };

  logoutHandler = async () => {
    const response = await this.props.logout();

    if (response.success) {
      this.props.history.push("/");
    }
  };

  cartLink = item => {
    const user = this.props.user.userData;
    const numOfProducts =
      user.cart.length > 0
        ? user.cart.reduce((acc, current) => (acc += current.quantity), 0)
        : 0;

    return (
      <Icon key={item.name} as={Link} to={item.linkTo}>
        <ShoppingCart />
        <CartCounter>{numOfProducts}</CartCounter>
      </Icon>
    );
  };

  defaultLink = item => {
    switch (item.name) {
      case "logout":
        return (
          <Button
            variant="text"
            color="secondary"
            className={this.props.classes.logout}
            key={item.name}
            onClick={this.logoutHandler}
          >
            {item.name}
          </Button>
        );
      case "login":
        return (
          <Button
            component={Link}
            to={item.linkTo}
            variant="contained"
            color="secondary"
            className={this.props.classes.login}
            key={item.name}
          >
            {item.name}
          </Button>
        );
      default:
        return (
          <Navlink as={NavLink} to={item.linkTo} key={item.name}>
            {item.name}
          </Navlink>
        );
    }
  };

  showLinks = links => {
    let list = [];

    if (this.props.user.userData) {
      links.forEach(item => {
        if (!this.props.user.userData.isAuth) {
          if (item.public === true) {
            list.push(item);
          }
        } else {
          if (item.name !== "login") {
            list.push(item);
          }
        }
      });
    }

    return list.map(item => {
      if (item.name !== "cart") {
        return this.defaultLink(item);
      } else {
        return this.cartLink(item);
      }
    });
  };

  render() {
    return (
      <Navigation header={this.props.header}>
        <Container>
          <Logo as={Link} to="/">
            vinyl
          </Logo>
          <NavBar>{this.showLinks(this.state.links)}</NavBar>
        </Container>
      </Navigation>
    );
  }
}

const styles = theme => ({
  logout: {
    marginLeft: "5rem",
    padding: "5px 30px",
    color: "#cac5c5"
  },
  login: {
    marginLeft: "1rem",
    padding: "5px 30px"
  }
});

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

export default connect(
  mapStateToProps,
  { logout }
)(withRouter(withStyles(styles)(Header)));
