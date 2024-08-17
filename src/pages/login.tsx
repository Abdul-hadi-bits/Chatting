import React, { useEffect } from "react";
import "../style/login.css";
import { useNavigate } from "react-router-dom";
import login from "../api-calls/loginUser";
import { useAppDispatch } from "../app/hooks";
import { userLogin } from "../features/userSlice";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  useEffect(() => {
    const user = localStorage.getItem("userCridentials");
    if (user) {
      const parsedUser = JSON.parse(user);
      login(parsedUser.username, parsedUser.password).then((user) => {
        dispatch(userLogin(user));
        navigate("/");
      });
    }
  });

  async function handleLogin() {
    login(username, password).then((user) => {
      if (user) {
        localStorage.setItem(
          "userCridentials",
          JSON.stringify({ username, password })
        );

        dispatch(userLogin(user));
        navigate("/");
      } else {
        console.error("Failed to login");
      }
    });
  }

  return (
    <section id="login-container">
      <div id="login-form">
        <div id="login-form-title">
          <h1>Sign in to your account</h1>
        </div>
        <div id="login-form-inputs">
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
        </div>
        <button
          id="login-button"
          onClick={() => {
            handleLogin();
          }}
        >
          Login
        </button>
        <section id="register-section">
          <label>dont' have account?</label>
          <div
            id="register-text-button"
            onClick={() => {
              // navigtate to register page
              navigate("/register");
            }}
          >
            Register
          </div>
        </section>
      </div>
    </section>
  );
}

export default LoginPage;
