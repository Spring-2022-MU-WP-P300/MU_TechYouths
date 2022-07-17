import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Account } from "../../helpers/apiSetup";
import { setLogin } from "./AccountSlice";

import "./Login.css";
import { setCart } from "../Cart/CartSlice";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const history = useNavigate(); // In react-router-dom v6 useHistory() is replaced by useNavigate().
  const dispatch = useDispatch();

  const onChangeUserName = (e: any) => {
    setValues({ ...values, username: e.target.value });
  };

  const onChangePassword = (e: any) => {
    setValues({ ...values, password: e.target.value });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const data = await Account.login(values);
    const { cart, ...user } = data;
    if (cart) {
      dispatch(setCart(cart));
    }
    // console.log("data", data);
    // console.log("JSON.stringify(data)", JSON.stringify(data));
    localStorage.setItem("user", JSON.stringify(user));
    history("/catalog");
    dispatch(setLogin({ payload: user }));
    return user;
  };

  return (
    <React.Fragment>
      <div className="login-container">
        <div className="login-wrapper">
          <div className="title">
            <span>Login Form</span>
          </div>
          <form action="#">
            <div className="row">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="User Name"
                value={values.username}
                onChange={onChangeUserName}
                required
              />
            </div>
            <div className="row">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                value={values.password}
                onChange={onChangePassword}
                required
              />
            </div>
            <div className="pass">
              <a href="#">Forgot password?</a>
            </div>
            <button className="row button" onClick={onSubmit}>
              Submit
            </button>
            <div className="signup-link">
              Not a member? <a href="/register">Signup now</a>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
