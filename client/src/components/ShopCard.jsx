import React from "react";
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

const ShopCard = ({
  name,
  price,
  brand,
  images,
  description,
  _id,
  grid,
  classes
}) => {
  return (
    <Card className={grid === "row" ? classes.grid : ''}>
      <CardMedia
        image={images.length > 0 ? images[0] : `/images/featured/featured_home_2.jpg`}
        title="Vinyl music"
        className={grid === "row" ? classes.mediaRow : classes.mediaTable}
      />
      <CardContent
        className={grid === "row" ? classes.rootRow : classes.rootTable}
      >
        <Typography gutterBottom variant="h5" className={classes.h5} >
          {brand.name}
        </Typography>
        <Typography gutterBottom variant="h5" color="secondary">
          {name}
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
              console.log("added to cart");
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
		borderBottom: '1px solid #80808069'
  },
  mediaRow: {
		width: "40%",
		borderRight: '1px solid #80808069'
  },
  rootTable: {
    textAlign: "center",
    paddingBottom: '.5em !important'
  },
  action: {
    padding: 0
  },
  actionRow: {
    alignSelf: "flex-end"
	},
	h5 : {
		fontSize: '1rem',
		fontWeight: 700
	},
	buttonBg: {
		backgroundColor: '#e1ddc3',
		color: 'rgb(64, 64, 64)'
	}
});

export default withStyles(styles)(ShopCard);
