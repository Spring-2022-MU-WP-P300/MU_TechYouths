import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../models/product";
import { ProductParameters } from "../../models/ProductParameters";

interface CatalogState {
  products: Product[];
  brands: string[];
  types: string[];
  ProductParams: ProductParameters;
  ProductLoaded: boolean;
  FiltersLoaded: boolean;
}

const initialState: CatalogState = {
  products: [],
  brands: [],
  types: [],
  ProductLoaded: false,
  FiltersLoaded: false,
  ProductParams: {
    PageNumber: 1,
    PageSize: 10,
    OrderBy: "name",
    Search: "",
    Brands: [],
    Types: [],
  },
};

export const catalogSlice = createSlice({
  name: "catalogSlice",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setBrands: (state, action) => {
      state.brands = action.payload;
    },
    setTypes: (state, action) => {
      state.types = action.payload;
    },
    setProductParams: (state, action) => {
      state.ProductParams = { ...state.ProductParams, ...action.payload };
    },
    setFilter: (state, action) => {
      state.FiltersLoaded = action.payload;
    },
    setProductLoadingStatus: (state, action) => {
      state.ProductLoaded = action.payload;
    },
  },
});

export const {
  setProducts,
  setBrands,
  setProductParams,
  setFilter,
  setTypes,
  setProductLoadingStatus,
} = catalogSlice.actions;
