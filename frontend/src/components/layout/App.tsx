import React, { useEffect } from "react";
import { Container } from "@mui/material";

import Catalog from "../../components/Catalog/Catalog";
import { Route, Routes } from "react-router-dom";
import Home from "../../components/UI/home";
import About from "../../components/UI/about";
import Contact from "../../components/UI/contact";
import ProductDetail from "../../components/UI/ProductDetail";
import CartPage from "../../components/Cart/Cart";
import { getCookie } from "../../helpers/helpers";
import Products from "../../helpers/apiSetup";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { setCart } from "../../components/Cart/CartSlice";
import Login from "../../components/Account/Login";
import Register from "../../components/Account/Register";

const App = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state: any) => state.cartSlice);

  useEffect(() => {
    const clientId = getCookie("clientId");
    if (clientId) {
      Products.cart.get().then((data) => dispatch(setCart(data)));
    }
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
