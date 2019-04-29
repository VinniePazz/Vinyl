import React from "react";

import CollapseCheckbox from "./CollapseCheckbox";
import CollapseRadio from "./CollapseRadio";

import { price } from "../app/data/price";

const FilterBar = ({ products, handleFilters }) => {
  return (
    <>
      <CollapseCheckbox
        initState={false}
        title="Genres"
        list={products.genres}
        handleFilters={filters => handleFilters(filters, "genre")}
      />
      <CollapseRadio
        initState={false}
        title="Price"
        list={price}
        handleFilters={filters => handleFilters(filters, "price")}
      />
    </>
  );
};

export default FilterBar;
