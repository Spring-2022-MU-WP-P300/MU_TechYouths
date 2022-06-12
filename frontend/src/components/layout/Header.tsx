import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  IconButton,
  Badge,
  Box,
} from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

import { CartItem } from "../../models/cart";
import { setLogOut } from "../Account/AccountSlice";

const navLinks = [
  { title: "Products", path: "/catalog" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
];

const logInLink = { title: "Login", path: "/login" };
const logOutLink = { title: "Logout", path: "/" };

const Header = () => {
  const { cart } = useSelector((state: any) => state.cartSlice);

  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.accountSlice);
  const history = useNavigate();

  const totalItems = (cart ? cart.items : []).reduce(
    (cur: number, item: CartItem) => cur + item.currentQuantity,
    0
  );

  return (
    <div>
      <AppBar position="static" color="transparent" sx={{ mb: 2 }}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              noWrap
              to="/"
              component={NavLink}
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              E-Furniture
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <IconButton component={Link} to="/cart" size="large">
              <Badge badgeContent={totalItems}>
                <ShoppingCart></ShoppingCart>
              </Badge>
            </IconButton>

            <List sx={{ display: "flex" }}>
              {navLinks.map((item) => {
                return (
                  <ListItem
                    to={item.path}
                    component={NavLink}
                    sx={{
                      color: "inherit",
                      "&.active": {
                        color: "secondary.main",
                        fontWeight: 900,
                      },
                    }}
                  >
                    {item.title}
                  </ListItem>
                );
              })}
              {user == null || user == undefined ? (
                <ListItem
                  to={logInLink.path}
                  component={NavLink}
                  sx={{
                    color: "inherit",
                    "&.active": {
                      color: "secondary.main",
                      fontWeight: 900,
                    },
                  }}
                >
                  {logInLink.title}
                </ListItem>
              ) : (
                <ListItem
                  to={logOutLink.path}
                  component={NavLink}
                  sx={{
                    color: "inherit",
                    "&.active": {
                      color: "secondary.main",
                      fontWeight: 900,
                    },
                  }}
                  onClick={() => {
                    dispatch(setLogOut());
                    history("/");
                  }}
                >
                  {logOutLink.title}
                </ListItem>
              )}
            </List>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
