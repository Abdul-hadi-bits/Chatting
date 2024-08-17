import React from "react";
import "../style/register.css";
import { useNavigate } from "react-router-dom";
import registerUser from "../api-calls/registerUser";
import { useAppDispatch } from "../app/hooks";
import { userLogin } from "../features/userSlice";

function RegisterPage() {
  const navitate = useNavigate();
  const dispatch = useAppDispatch();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  function handleRegister() {
    if (username === "" || password === "" || confirmPassword === "") {
      alert("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    registerUser({ userName: username, password: password }).then((data) => {
      if (data) {
        dispatch(userLogin(data));
        navitate("/");
      }
    });
  }
  return (
    <div id="register-container">
      <div id="register-form">
        <div id="register-form-title">
          <h1>Register for an account</h1>
        </div>
        <div id="register-form-inputs">
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          ></input>
        </div>
        <button
          id="register-button"
          onClick={() => {
            handleRegister();
          }}
        >
          Register
        </button>
        <section id="login-section">
          <label>already have account?</label>
          <div
            id="login-text-button"
            onClick={() => {
              navitate("/login");
            }}
          >
            Login
          </div>
        </section>
      </div>
    </div>
  );
}

export default RegisterPage;
