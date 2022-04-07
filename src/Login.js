import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "./axios";
import { useStateValue } from "./StateProvider";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{ authTokens }, dispatch] = useStateValue();
  // const api = useAxios();
  const signIn = async (e) => {
    e.preventDefault();

    const responseLogin = await axios({
      method: "post",
      url: `/auth/login/`,
      data: {
        email,
        password,
      },
    });

    dispatch({
      type: "SET_AUTH_TOKENS",
      tokens: {
        access: responseLogin.data.authenticationToken,
        refresh: responseLogin.data.refreshToken,
      },
    });

    const responseProfile = await axios({
      method: "get",
      url: `/user/profile`,
      headers: {
        Authorization: "Bearer " + responseLogin.data.authenticationToken,
      },
    });

    dispatch({
      type: "SET_USER",
      user: responseProfile.data.data,
    });

    history.push("/");
  };

  const register = async (e) => {
    e.preventDefault();

    const responseLogin = await axios({
      method: "post",
      url: `/auth/signup/`,
      data: {
        email,
        password,
      },
    });

    alert("Account was created! Please login");
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        />
      </Link>

      <div className="login__container">
        <h1>Sign-in</h1>

        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            onClick={signIn}
            className="login__signInButton"
          >
            Sign In
          </button>
        </form>
        <p>
          By signing in you agree to this Amazon clone's Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookie Notice and our
          Interest-Based Ads Notice
        </p>

        <button onClick={register} className="login__registerButton">
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
