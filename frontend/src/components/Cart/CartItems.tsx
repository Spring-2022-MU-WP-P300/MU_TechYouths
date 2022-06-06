import React from "react";
import Products from "../../helpers/apiSetup";
import { Button, IconButton } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { Delete } from "@mui/icons-material";
import { CartItem } from "../../models/cart";

import "./styles.css";
import CartSummary from "./CartSummary";
import { removeItem, setCart } from "./CartSlice";

const CartItems = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state: any) => state.cartSlice);

  const handleAddItem = (productId: number) => {
    Products.cart.addItem(productId).then((cart) => dispatch(setCart(cart)));
  };

  const handleRemoveItem = (productId: number, quantity = 1) => {
    Products.cart
      .deleteItem(productId, quantity)
      .then(() => dispatch(removeItem({ productId, quantity })));
  };

  const renderActionsButtons = (item: CartItem) => {
    return (
      <div className="actions">
        <Button onClick={() => handleRemoveItem(item.productId)}>-</Button>
        <Button onClick={() => handleAddItem(item.productId)}>+</Button>
        <IconButton
          color="error"
          onClick={() => handleRemoveItem(item.productId, item.currentQuantity)}
        >
          <Delete />
        </IconButton>
      </div>
    );
  };

  return (
    <React.Fragment>
      <ul className="cart-items">
        {cart?.items.map((item: CartItem) => (
          <li key={item.productId} className="cart-item">
            <CartSummary item={item} />
            {renderActionsButtons(item)}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default CartItems;
