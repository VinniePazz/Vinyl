import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton
} from "@material-ui/core";

import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

import { addToCart } from "../actions/userActions";

const ShopCard = ({
	author,
	album,
	genre,
  price,
  images,
  description,
  _id,
  grid,
	classes,
	user,
	addToCart
}) => {
  return (
    <Card className={grid === "row" ? classes.grid : ""}>
      <CardMedia
        image={images.length > 0 ? images[0].url : `/images/placeholder.png`}
        title="Vinyl music"
        className={grid === "row" ? classes.mediaRow : classes.mediaTable}
      />
      <CardContent
        className={grid === "row" ? classes.rootRow : classes.rootTable}
      >
        <Typography gutterBottom variant="h5" className={classes.h5}>
          {author}
        </Typography>
        <Typography gutterBottom variant="h5" color="secondary">
          {album}
        </Typography>
        <Typography gutterBottom variant="h6" color="textSecondary">
          {`$${price}`}
        </Typography>
        {grid === "row" && (
          <Typography component="p">`${description}`</Typography>
        )}

        <CardActions
          className={grid === "row" ? classes.actionRow : classes.action}
        >
          <Button
            fullWidth
            className={classes.buttonBg}
            variant="outlined"
            component={Link}
            to={`/product_detail/${_id}`}
          >
            View product
          </Button>
          <IconButton
            color="secondary"
            className={classes.button}
            aria-label="Add to shopping cart"
            onClick={() => {
              user.userData.isAuth
                ? addToCart(_id)
                : console.log("you need to log in");
            }}
          >
            <AddShoppingCartIcon />
          </IconButton>
        </CardActions>
      </CardContent>
    </Card>
  );
};

const styles = theme => ({
  grid: {
    display: "flex"
  },
  rootRow: {
    width: "60%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 0 0 1em !important"
  },
  mediaTable: {
    height: 0,
    paddingTop: "76.25%",
    borderBottom: "1px solid #80808069"
  },
  mediaRow: {
    width: "40%",
    borderRight: "1px solid #80808069"
  },
  rootTable: {
    textAlign: "center",
    paddingBottom: ".5em !important"
  },
  action: {
    padding: 0
  },
  actionRow: {
    alignSelf: "flex-end"
  },
  h5: {
    fontSize: "1rem",
    fontWeight: 700
  },
  buttonBg: {
    backgroundColor: "#e1ddc3",
    color: "rgb(64, 64, 64)"
  }
});

const mapStateToProps = state => {
	console.log(state)
  return {
    user: state.user
  };
};

const StyledCard = withStyles(styles)(ShopCard);

export default connect(
  mapStateToProps,
  { addToCart }
)(StyledCard);
