import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Account } from "../../helpers/apiSetup";
import { User } from "../../models/User";
import { setCart } from "../Cart/CartSlice";

interface AccountState {
  user: User | null;
}

const initialState: AccountState = {
  user: null,
};

export const fetchCurrentUser = async () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  const data = await Account.currentUser();
  const { cart, ...user } = data;
  if (cart) {
    dispatch(setCart(cart));
  }
  localStorage.setItem("user", JSON.stringify(user));
  return user;
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = { ...action.payload.data };
    },
    setLogOut: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setLogin, setLogOut } = accountSlice.actions;
