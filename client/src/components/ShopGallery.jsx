import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

import ShopCard from "./ShopCard";
import { Button } from "@material-ui/core";

const Gallery = styled.div`
  max-width: 1100px;
	margin: 0 auto;
	padding: 0 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, 24.2%);
	grid-gap: 10px;
	justify-content: center;

	@media (max-width: 849px) {
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	}

	@media (max-width: 499px) {
		grid-template-columns: repeat(auto-fit, minmax(150px, 48%));
	}
`;

const CenterUtil = styled.div`
  text-align: center;
  padding-top: 5em;
`;

const ShopGallery = ({ products, loadMore, size, limit }) => {
  if (!products) {
    return (
      <CenterUtil>
        <CircularProgress style={{ color: "#e76f51" }} thickness={4} />
      </CenterUtil>
    );
  } else if (products.length === 0) {
    return <CenterUtil>No such products yet...</CenterUtil>;
  }

  const renderButton = () => (
    <Button variant="contained" color="secondary" onClick={loadMore}>
      more vinyls
    </Button>
  );

  const renderVinyls = () =>
    products.map(product => <ShopCard key={product._id} {...product} />);

  return (
    <>
      <Gallery>{renderVinyls()}</Gallery>
      <div style={{ margin: "3em 0 0", textAlign: "center" }}>
        {size > 0 && size >= limit && renderButton()}
      </div>
    </>
  );
};

export default ShopGallery;
