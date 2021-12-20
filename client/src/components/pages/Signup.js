import React, { useState } from "react";
import { Button as BootstrapBtn } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Button from "../Button";
import { useAuth } from "../context/AuthContext";
import Form from "../Form";
import classes from "../styles/Form.module.css";
import Textinput from "../Textinput";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const { createUser } = useAuth();

  const textInputHandler = (e) => {
    if (e.target.type === "text") {
      setName(e.target.value);
    } else if (e.target.type === "email") {
      setEmail(e.target.value);
    } else if (e.target.type === "file") {
      setAvatar(e.target.files[0]);
    } else if (e.target.type === "password") {
      setPassword(e.target.value);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("userAvatar", avatar);
    formData.append("password", password);

    await createUser(formData, (response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        setName("");
        setEmail("");
        setAvatar("");
        setPassword("");
        navigate("/login");
      }
    });
  };

  return (
    <>
      <div className={classes.signupForm}>
        <h1 className="formTitle">Signup Now</h1>
        <Form
          className={classes.form}
          onSubmit={submitHandler}
          encType="multipart/form-data"
        >
          <Textinput
            name="name"
            text="Name :"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={textInputHandler}
          />
          <Textinput
            name="email"
            text="Email address :"
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={textInputHandler}
          />
          <Textinput
            name="avatar"
            text="Upload your Picture :"
            type="file"
            onChange={textInputHandler}
          />
          <Textinput
            name="password"
            text="Password :"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={textInputHandler}
          />
          <Button
            disabled={loading ? null : "disabled"}
            className="formSubmit"
            type="submit"
            text="Signup"
          />
          <div className="d-block">
            <span>If you have account </span>
            <Link to="/login">Login Now</Link>
          </div>
          <Link to="/">
            <BootstrapBtn className="mt-3 ml-3" variant="primary">
              <i className="fas fa-long-arrow-alt-left"></i> Back to Home
            </BootstrapBtn>
          </Link>
        </Form>
        <ToastContainer />
      </div>
    </>
  );
}
