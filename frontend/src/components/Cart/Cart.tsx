import React from "react";
import { Button, Card } from "@mui/material";

import { useSelector } from "react-redux";
import "./styles.css";
import { CartItem } from "../../models/cart";
import CartItems from "./CartItems";

const CartPage = () => {
  const { cart } = useSelector((state: any) => state.cartSlice);
  const hasItems = cart ? cart.items.length > 0 : false;
  const totalAmounts = cart?.items.reduce(
    (cur: number, item: CartItem) => cur + item.price * item.currentQuantity,
    0
  );

  return (
    <React.Fragment>
      {hasItems && (
        <Card
          sx={{
            minWidth: 275,
            position: "fixed",
            top: "20vh",
            left: "5%",
            zIndex: "20",
            width: "90%",
            padding: "1rem",
          }}
        >
          <CartItems />
          <div className="totals">
            <span>Total Amount</span>
            <span>{totalAmounts}</span>
          </div>
          <div className="actions">
            {hasItems && <Button className="button-order">Order</Button>}
          </div>
        </Card>
      )}
      {!hasItems && <h1 style={{ textAlign: "center" }}>Cart is empty</h1>}
    </React.Fragment>
  );
};

export default CartPage;
