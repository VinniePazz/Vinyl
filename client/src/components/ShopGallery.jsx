import React from "react";
import ShopCard from "./ShopCard";
import { Grid, Button } from "@material-ui/core";

const ShopGallery = ({ products, grid, loadMore, size, limit }) => {
  if (!products) {
    return <div>Loading...</div>;
  } else if (products.length === 0) {
    return <div>No Products...</div>;
  }

  const renderButton = () => (
    <Button variant="contained" color="secondary" onClick={loadMore}>
      Load more
    </Button>
  );

  const renderGrid = grid =>
    grid === "table"
      ? products.map(product => (
          <Grid item key={product._id} md={4} xs={12} sm={6}>
            <ShopCard {...product} grid={grid} />
          </Grid>
        ))
      : products.map(product => (
          <Grid item key={product._id} xs={12}>
            <ShopCard {...product} grid={grid} />
          </Grid>
        ));

  return (
    <>
      <Grid container spacing={16}>
        {renderGrid(grid)}
      </Grid>
      <div style={{ margin: "1em 0 5em 0", textAlign: "center" }}>
        {size > 0 && size >= limit && renderButton()}
      </div>
    </>
  );
};

export default ShopGallery;
