import React, { Component } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Typography,
  withStyles
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

class Header extends Component {
  render() {
    return (
        // <AppBar position="fixed">
        //   <Toolbar>
        //     <Typography variant="h3" color="inherit">
        //       News
        //     </Typography>
        //     <Button
        //       variant="text"
        //       color="inherit"
        //       style={{ marginLeft: "auto" }}
        //     >
        //       Sign up
        //     </Button>
        //     <Button variant="contained" color="secondary">
        //       Sign in
        //     </Button>
        //   </Toolbar>
				// </AppBar>
				<header className="bck_b_light">
                <div className="container">
                    <div className="left">
                        <div className="logo">
                            WAVES
                        </div>
                    </div>
                    <div className="right">
                        <div className="top">
                            LINKS
                        </div>
                        <div className="bottom">
                            LINKS
                        </div>
                    </div>
                </div>
            </header>
    );
  }
}


export default withStyles()(Header);
