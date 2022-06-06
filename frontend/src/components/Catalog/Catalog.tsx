import React, { useEffect } from "react";
import Products from "../../helpers/apiSetup";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBrands,
  getAllTypes,
  getParameters,
} from "../../helpers/helpers";
import {
  setBrands,
  setFilter,
  setProductLoadingStatus,
  setProductParams,
  setProducts,
  setTypes,
} from "./CatalogSlice";
import { Product } from "../../models/product";

const Catalog = (props: Props) => {
  const dispatch = useDispatch();
  const {
    products,
    brands,
    types,
    ProductParams,
    ProductLoaded,
    FiltersLoaded,
  } = useSelector((state: any) => state.catalogSlice);

  useEffect(() => {
    if (!ProductLoaded) {
      // fetch("http://localhost:5000/api/products")
      //   .then((response) => response.json())
      //   .then((data) => setProducts(data));
      const parameters = getParameters(ProductParams);

      Products.list(parameters).then((data) => {
        dispatch(setProducts(data));
        dispatch(setBrands(getAllBrands(data)));
        dispatch(setTypes(getAllTypes(data)));
        dispatch(setProductLoadingStatus(true));
        dispatch(setProductLoadingStatus(true));
      });

      if (!FiltersLoaded) {
        Products.fetchFilters().then((data) => {
          dispatch(setFilter(true));
        });
      }
    }
  }, [FiltersLoaded, ProductLoaded, ProductParams, dispatch]);

  const addProduct = () => {
    // setProducts({
    //   id: 101,
    //   name: "product",
    //   price: 9090,
    //   description: "",
    //   type: "",
    //   brand: "",
    //   pictureUrl: "http://picsum.photos/id/180/2400/1600",
    //   warranty: "",
    //   currentQuantity: 0,
    // });
  };

  return <></>;
};

interface Props {}

export default Catalog;
