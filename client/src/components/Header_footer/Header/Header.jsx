import React, { Component } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import MediaQuery from "react-responsive";

import { connect } from "react-redux";
import { logout } from "../../../actions/userActions";

import ShoppingCart from "../../icons/ShoppingCart";
import CartCounter from "./CartCounter";
import MobileToogle from "./MobileToogle";
import MobileNav from "./MobileNav";

class Header extends Component {
  state = {
    openDrawer: false
	};

  cartLink = item => {
    const user = this.props.user.userData;
    const numOfProducts =
      user.cart.length > 0
        ? user.cart.reduce((acc, current) => (acc += current.quantity), 0)
        : 0;

    return (
      <Icon key={item.name} as={Link} to={item.linkTo}>
        <ShoppingCart hover />
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

  renderLinks = links => {
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

  toogleDrawer = () => {
    this.setState(prevState => ({ openDrawer: !prevState.openDrawer }));
  };

  logoutHandler = async () => {
    const response = await this.props.logout();

    if (response.success) {
      this.setState(
        prevState => ({ openDrawer: !prevState.openDrawer }),
        this.props.history.push("/")
      );
    }
  };

  handleMobileLink = path => {
    this.props.history.push(path);
    this.setState(prevState => ({ openDrawer: !prevState.openDrawer }));
  };

  render() {
    const links = [
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
    ];

    return (
      <Navigation header={this.props.header}>
        <Container>
          <Logo as={Link} to="/">
            vinyl
          </Logo>
          <MediaQuery query="(min-width: 600px)">
            <NavBar>{this.renderLinks(links)}</NavBar>
          </MediaQuery>
          {this.props.user.userData && this.props.user.userData.isAuth ? (
            <MediaQuery query="(max-width: 599px)">
              <MobileToogle
                toogleDrawer={this.toogleDrawer}
                openDrawer={this.state.openDrawer}
              />
              {this.state.openDrawer && (
                <Drawer
                  anchor="right"
                  open={this.state.openDrawer}
                  onClose={this.toogleDrawer}
                  PaperProps={{ style: { backgroundColor: "#4b3645" } }}
                >
                  <MobileNav
                    links={links}
                    user={this.props.user}
                    logoutHandler={this.logoutHandler}
                    handleMobileLink={this.handleMobileLink}
                  />
                </Drawer>
              )}
            </MediaQuery>
          ) : (
            <MediaQuery query="(max-width: 599px)">
              <NavBar>{this.renderLinks(links)}</NavBar>
            </MediaQuery>
          )}
        </Container>
      </Navigation>
    );
  }
}

// ======================== Styled components ========================
const Navigation = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  height: 4em;
  width: 100%;
  z-index: 999;
  background-color: #4b3645;
  background-image: linear-gradient(to bottom, #5d3c53, #2b1d27);
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

export const Container = styled.div`
  max-width: 1100px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 0 1em;
  align-items: center;
`;

export const Logo = styled.div`
  font-family: "Monoton", cursive;
  color: #ffffff;
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  transition: color 0.2s;

  @media (min-width: 960px) {
    &:hover {
      color: #e76f51;
    }
  }
`;

const NavBar = styled.nav`
  display: flex;
  height: 100%;
  align-items: center;
  color: #ffffff;
`;

export const Navlink = styled.a`
  display: block;
  text-transform: uppercase;
  margin-right: 1.5rem;
  transition: color 0.2s;
  position: relative;

  @media (min-width: 960px) {
    &:hover {
      color: #e76f51;
    }
  }

  @media (max-width: 25em) {
    margin-right: 0;
  }
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0.5em 0.5em;
`;
// ===================================================================

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
