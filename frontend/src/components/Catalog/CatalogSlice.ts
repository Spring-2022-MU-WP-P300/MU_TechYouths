import { createSlice } from "@reduxjs/toolkit";
import { MetaData } from "../../models/pagination";
import { Product } from "../../models/product";
import { ProductParameters } from "../../models/ProductParameters";

interface CatalogState {
  products: Product[];
  brands: string[];
  types: string[];
  ProductParams: ProductParameters;
  ProductLoaded: boolean;
  FiltersLoaded: boolean;
  metaData: MetaData | null;
}

const initParams = () => {
  return {
    PageNumber: 1,
    PageSize: 6,
    OrderBy: "name",
    Search: "",
    Brands: [],
    Types: [],
  };
};

const initialState: CatalogState = {
  products: [],
  brands: [],
  types: [],
  ProductLoaded: false,
  FiltersLoaded: false,
  ProductParams: initParams(),
  metaData: null,
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
    removeProductParams: (state, action) => {
      state.ProductParams = initParams();
    },
    setFilter: (state, action) => {
      state.FiltersLoaded = action.payload;
    },
    setProductLoadingStatus: (state, action) => {
      state.ProductLoaded = action.payload;
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
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
  setMetaData,
} = catalogSlice.actions;
