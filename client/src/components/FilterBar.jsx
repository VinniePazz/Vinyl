import React from "react";

import CollapseCheckbox from "./CollapseCheckbox";
import CollapseRadio from "./CollapseRadio";

import { price } from "../app/data/price";
import { frets } from "../app/data/frets";

const FilterBar = ({ products, handleFilters }) => {
  return (
    <>
      <CollapseCheckbox
        initState={true}
        title="Brands"
        list={products.brands}
        handleFilters={filters => handleFilters(filters, "brand")}
      />
      <CollapseCheckbox
        initState={false}
        title="Frets"
        list={frets}
        handleFilters={filters => handleFilters(filters, "frets")}
      />
      <CollapseCheckbox
        initState={false}
        title="Wood"
        list={products.woods}
        handleFilters={filters => handleFilters(filters, "wood")}
      />
      <CollapseRadio
        initState={true}
        title="Price"
        list={price}
        handleFilters={filters => handleFilters(filters, "price")}
      />
    </>
  );
};

export default FilterBar;
