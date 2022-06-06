import React from "react";

import { CartItem } from "../../models/cart";

import "./styles.css";

const CartSummary = ({ item }: Props) => {
  return (
    <div>
      <h1>{item.name}</h1>
      <div className="summary">
        <span className="price">{item.price}</span>
        <span className="amount">x {item.currentQuantity}</span>
      </div>
    </div>
  );
};

interface Props {
  item: CartItem;
}

export default CartSummary;
