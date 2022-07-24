import React, { useEffect, useState } from "react";
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
  Checkbox,
  debounce,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import ProductList from "./ProductList";
import { Box } from "@mui/system";
import CheckboxButtons from "./CheckboxButtons";

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

  const [search, setSearch] = useState(ProductParams.search);

  console.log(ProductParams, brands);

  useEffect(() => {
    const parameters = getParameters(ProductParams);

    Products.list(parameters).then((data) => {
      dispatch(setProducts(data));
      dispatch(setBrands(getAllBrands(data)));
      dispatch(setTypes(getAllTypes(data)));
    });
  }, []);

  useEffect(() => {
    // fetch("http://localhost:5000/api/products")
    //   .then((response) => response.json())
    //   .then((data) => setProducts(data));
    const parameters = getParameters(ProductParams);

    Products.list(parameters).then((data) => {
      dispatch(setProducts(data));
    });
  }, [ProductParams, dispatch]);

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

  const debouncedSearch = debounce((e) => {
    dispatch(setProductParams({ Search: e.target.value }));
  }, 1000);

  return (
    <>
      <Grid container columnSpacing={4}>
        <Grid item xs={3}>
          <Paper sx={{ mb: 2 }}>
            <TextField
              label="Search Products"
              variant="outlined"
              fullWidth
              value={search || ""}
              onChange={(e) => {
                setSearch(e.target.value);
                debouncedSearch(e);
              }}
            />
          </Paper>
          <Paper sx={{ mb: 2, p: 2 }}>
            <FormControl component="fieldset">
              <RadioGroup
                onChange={(e) => {
                  dispatch(setProductParams({ OrderBy: e.target.value }));
                }}
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
            <CheckboxButtons
              items={brands}
              checked={ProductParams.Brands}
              onChange={(items: string[]) =>
                dispatch(setProductParams({ Brands: items }))
              }
            />
          </Paper>
          <Paper sx={{ mb: 2, p: 2 }}>
            <CheckboxButtons
              items={types}
              checked={ProductParams.Types}
              onChange={(items: string[]) =>
                dispatch(setProductParams({ Types: items }))
              }
            />
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
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>Displaying 1 to 6 of 20 items</Typography>
            <Pagination
              color="secondary"
              size="large"
              count={10}
              page={10}
              // onChange={(e, page) => handlePageChange(page)}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

interface Props {}

export default Catalog;
