import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Account } from "../../helpers/apiSetup";
import { setLoginUserData } from "./AccountSlice";

import "./Login.css";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate(); // In react-router-dom v6 useHistory() is replaced by useNavigate().
  const dispatch = useDispatch();

  const onChangeUserName = (e: any) => {
    setUserName(e.value);
  };

  const onChangePassword = (e: any) => {
    setPassword(e.value);
  };

  const onSubmit = async () => {
    const data = await Account.login({
      userName: userName,
      password: password,
    });
    localStorage.setItem("user", JSON.stringify(data));
    dispatch(setLoginUserData(data));
    history("/catalog");
    return data;
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
                placeholder="Email"
                value={userName}
                onChange={onChangeUserName}
                required
              />
            </div>
            <div className="row">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                value={password}
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
