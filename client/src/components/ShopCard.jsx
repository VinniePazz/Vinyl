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
  if (grid === 'row') {
    return (
      <Card className={classes.grid}>
        <CardMedia
          image={images.length > 0 ? images[0] : "/images/placeholder.png"}
          title="Vinyl item"
          className={classes.mediaRow}
        />
        <CardContent className={classes.root}>
          <Typography variant="h5">{brand.name}</Typography>
          <Typography variant="h4" color="secondary">
            {name}
          </Typography>
					<Typography component="p">`${description}`</Typography>
          <Typography variant="h6" color="textSecondary">
            {`$${price}`}
          </Typography>
          {grid === "rows" && (
            <Typography component="p">`${description}`</Typography>
          )}
          <CardActions>
            <Button
              fullWidth
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
  }

  return (
    <Card>
      <CardMedia
        image={images.length > 0 ? images[0] : "/images/placeholder.png"}
        title="Vinyl item"
        className={classes.media}
      />
      <CardContent className={classes.content}>
        <Typography gutterBottom variant="h5">
          {brand.name}
        </Typography>
        <Typography gutterBottom variant="h4" color="secondary">
          {name}
        </Typography>
        <Typography gutterBottom variant="h6" color="textSecondary">
          {`$${price}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
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
    </Card>
  );
};

const styles = theme => ({
  grid: {
    display: "flex"
  },
  root: {
    width: "65%",
    display: "flex",
    flexDirection: "column",
		alignItems: "center",
		padding: '0 0 0 1em !important',
  },
  media: {
    height: 0,
    paddingTop: "76.25%"
  },
  mediaRow: {
    width: "35%"
  },
  content: {
		textAlign: "center",
		paddingBottom: 0
  }
});

export default withStyles(styles)(ShopCard);
