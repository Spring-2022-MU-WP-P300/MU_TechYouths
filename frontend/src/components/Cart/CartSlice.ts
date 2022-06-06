import { createSlice } from "@reduxjs/toolkit";
import { Cart } from "../../models/cart";

interface CartState {
  cart: Cart | null;
}

const initialState: CartState = {
  cart: null,
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    removeItem: (state, action) => {
      const { productId, quantity } = action.payload;
      if (!state.cart) return;

      const removableItemIndex = state.cart.items.findIndex(
        (item: any) => item.productId === productId
      );

      if (removableItemIndex < 0) return;

      let removableItem = state.cart.items[removableItemIndex];
      const updatedTotalAmount = removableItem.currentQuantity - quantity;

      let updatedItems;
      if (updatedTotalAmount < 1) {
        updatedItems = state.cart.items.filter(
          (item) => item.productId !== productId
        );
      } else {
        updatedItems = [...state.cart.items];
        removableItem = {
          ...removableItem,
          currentQuantity: updatedTotalAmount,
        };
        updatedItems[removableItemIndex] = removableItem;
      }

      state.cart.items = [...updatedItems];
    },
  },
});

export const { setCart, removeItem } = cartSlice.actions;
