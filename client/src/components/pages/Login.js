import React, { useState } from "react";
import { Button as BootstrapBtn } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button";
import { useAuth } from "../context/AuthContext";
import Form from "../Form";
import GoogleSvg from "../GoogleSvg";
import classes from "../styles/Form.module.css";
import Textinput from "../Textinput";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loginTextInputHandlear = (e) => {
    if (e.target.type === "email") {
      setEmail(e.target.value);
    } else if (e.target.type === "password") {
      setPassword(e.target.value);
    }
  };

  const loginFormSubmitHandlear = async (e) => {
    e.preventDefault();
    try {
      setLoading(false);
      await login(email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const responseGoogle = async (response) => {
    localStorage.setItem(
      process.env.REACT_APP_LOCALSTORE_NAME,
      JSON.stringify(response)
    );
    navigate("/");
  };

  const faillurGoogle = (err) => {
    console.log(err);
  };

  return (
    <div className={classes.signupForm}>
      <h1 className="formTitle">Login Now</h1>
      <Form className={classes.form} onSubmit={loginFormSubmitHandlear}>
        <Textinput
          text="Email address :"
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={loginTextInputHandlear}
        />
        <Textinput
          text="Password :"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={loginTextInputHandlear}
        />
        <Button
          disabled={loading ? null : "disabled"}
          className="formSubmit"
          type="submit"
          text="Login"
        />

        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          render={(renderProps) => (
            <Button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className={`${classes.googleLoginBtn} formSubmit`}
            >
              <GoogleSvg />
              Log in with google
            </Button>
          )}
          onSuccess={responseGoogle}
          onFailure={faillurGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <div className="d-block">
          <span>If you haven't account </span>
          <Link to="/signup">Signup Now</Link>
        </div>
        <Link to="/">
          <BootstrapBtn className="mt-3 ml-3" variant="primary">
            <i className="fas fa-long-arrow-alt-left"></i> Back to Home
          </BootstrapBtn>
        </Link>
      </Form>
    </div>
  );
}
