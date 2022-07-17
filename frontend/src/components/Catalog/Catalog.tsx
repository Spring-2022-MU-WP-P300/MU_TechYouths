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
import {
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
} from "@mui/material";
import ProductList from "./ProductList";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price - High to low" },
  { value: "price", label: "Price - Low to high" },
];

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

  console.log(
    products,
    brands,
    types,
    ProductParams,
    ProductLoaded,
    FiltersLoaded
  );

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

  return (
    <>
      <Grid container columnSpacing={4}>
        <Grid item xs={3}>
          <Paper sx={{ mb: 2 }}>{/* <ProductSearch /> */}</Paper>
          <Paper sx={{ mb: 2, p: 2 }}>
            <FormControl component="fieldset">
              <RadioGroup
                onChange={(e) =>
                  dispatch(setProductParams({ orderBy: e.target.value }))
                }
                value={ProductParams.orderBy}
              >
                {sortOptions.map(({ value, label }) => (
                  <FormControlLabel
                    value={value}
                    control={<Radio />}
                    label={label}
                    key={value}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Paper>
          <Paper sx={{ mb: 2, p: 2 }}>
            {/* <CheckboxButtons
              items={brands}
              checked={productParams.brands}
              onChange={(items: string[]) =>
                dispatch(setProductParams({ brands: items }))
              }
            /> */}
          </Paper>
          <Paper sx={{ mb: 2, p: 2 }}>
            {/* <CheckboxButtons
              items={types}
              checked={productParams.types}
              onChange={(items: string[]) =>
                dispatch(setProductParams({ types: items }))
              }
            /> */}
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <ProductList products={products} />
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={9} sx={{ mb: 2 }}>
          {/* {metaData && (
            <AppPagination
              metaData={metaData}
              onPageChange={(page: number) =>
                dispatch(setPageNumber({ pageNumber: page }))
              }
            />
          )} */}
        </Grid>
      </Grid>
    </>
  );
};

interface Props {}

export default Catalog;
