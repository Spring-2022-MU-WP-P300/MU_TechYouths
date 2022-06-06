import { configureStore } from "@reduxjs/toolkit";
import { accountSlice } from "../components/Account/AccountSlice";
import { cartSlice } from "../components/Cart/CartSlice";
import { catalogSlice } from "../components/Catalog/CatalogSlice";

export const store = configureStore({
  reducer: {
    cartSlice: cartSlice.reducer,
    catalogSlice: catalogSlice.reducer,
    accountSlice: accountSlice.reducer,
  },
});
