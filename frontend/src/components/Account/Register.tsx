import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Account } from "../../helpers/apiSetup";

import "./Register.css";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [termsAC, setTermsAC] = useState(false);

  const history = useNavigate();

  return (
    <React.Fragment>
      <div className="reg-wrapper">
        <h2>Sign Up Form</h2>
        <form action="#">
          <div className="input-box">
            <input
              type="text"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="policy">
            <input type="checkbox" onClick={() => setTermsAC(!termsAC)} />
            <h3>I accept all terms & conditions</h3>
          </div>
          <div className="input-box button">
            <input
              type="Submit"
              value="Register Now"
              onClick={() => {
                if (
                  userName &&
                  password &&
                  email &&
                  password == confirmPassword &&
                  termsAC
                ) {
                  Account.register({ username: userName, password, email })
                    .then(() => {
                      history("/login");
                    })
                    .catch(() => {})
                    .finally(() => {});
                }
              }}
            />
          </div>
          <div className="text">
            <h3>
              Already have an account? <a href="/login">Login now</a>
            </h3>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Register;
