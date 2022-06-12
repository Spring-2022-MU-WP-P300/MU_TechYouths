import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { Account } from "../../helpers/apiSetup";
import { User } from "../../models/User";

interface AccountState {
  user: User | null;
}

const initialState: AccountState = {
  user: null,
};

export const fetchCurrentUser = async () => {
  const user = await Account.currentUser();
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
