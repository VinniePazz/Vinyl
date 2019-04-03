import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import { logout } from "../../../actions/userActions";

class Header extends Component {
  state = {
    page: [
      {
        name: "Home",
        linkTo: "/",
        public: true
      },
      {
        name: "Guitars",
        linkTo: "/shop",
        public: true
      }
    ],
    user: [
      {
        name: "My Cart",
        linkTo: "/user/cart",
        public: false
      },
      {
        name: "My Account",
        linkTo: "/user/dashboard",
        public: false
      },
      {
        name: "Log in",
        linkTo: "/login",
        public: true
      },
      {
        name: "Log out",
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

  cartLink = (item, i) => {
    const user = this.props.user.userData;

    return (
      <div className="cart_link" key={i}>
        <span>{user.cart ? user.cart.length : 0}</span>
        <Link to={item.linkTo}>{item.name}</Link>
      </div>
    );
  };

  defaultLink = (item, i) =>
    item.name === "Log out" ? (
      <div className="log_out_link" key={i} onClick={this.logoutHandler}>
        {item.name}
      </div>
    ) : (
      <Link to={item.linkTo} key={i}>
        {item.name}
      </Link>
    );

  showLinks = type => {
    let list = [];

    if (this.props.user.userData) {
      type.forEach(item => {
        if (!this.props.user.userData.isAuth) {
          if (item.public === true) {
            list.push(item);
          }
        } else {
          if (item.name !== "Log in") {
            list.push(item);
          }
        }
      });
    }

    return list.map((item, i) => {
      if (item.name !== "My Cart") {
        return this.defaultLink(item, i);
      } else {
        return this.cartLink(item, i);
      }
    });
  };

  render() {
    const { page, user } = this.state;
    const { classes } = this.props;

    return (
      <header className="bck_b_light">
        <div className="container">
          <Link to="/" className={classes.logo}>
            VINYL
          </Link>
          <div className="right">
            <div className="top">{this.showLinks(user)}</div>
            <div className="bottom">{this.showLinks(page)}</div>
          </div>
        </div>
      </header>
    );
  }
}

const styles = theme => ({
  logo: {
    fontFamily: '"Monoton", cursive',
    color: "#ffffff",
    fontSize: "2.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
		width: "20%",
		marginLeft: 0,

    [theme.breakpoints.down("sm")]: {
			width: "30%",	
		},
		[theme.breakpoints.down("xs")]: {
			fontSize: "1.8rem",
			width: "35%",
    },
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
