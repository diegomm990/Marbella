import React, { useState } from "react";
import "./Sign.css";
import logo from "../Nav/Logo.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logIn, logInUpdateCart, logedUser } from "../../redux/actions/actions";

let Sign = () => {
  let dispatch = useDispatch();
  let user = useSelector((state) => state.user);
  let [sign, setSign] = useState(true);
  let [error, setError] = useState(false);
  let cart = useSelector((state) => state.cart);
  let newCart = [];
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name) {
      newCart.push(cart[i]);
    }
  }
  let [logInData, setLogIn] = useState({
    email: "",
    password: "",
  });
  let [signUpData, setSignUp] = useState({
    email: "",
    password: "",
    name: "",
    lastname: "",
    phone: 0,
  });
  let logInHandler = (e) => {
    setLogIn({
      ...logInData,
      [e.target.name]: e.target.value,
    });
  };
  let SignUpHandler = (e) => {
    setSignUp({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };
  let submitLogIn = async (e) => {
    e.preventDefault();
    try {
      setError(false);
      const { data } = await axios.post(
        "http://localhost:3001/users/loginUser",
        logInData,
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      dispatch(logedUser(data));
      localStorage.setItem("user", JSON.stringify(data));
      dispatch(logIn());
      dispatch(logInUpdateCart({ user: data._id, products: newCart }));
      localStorage.setItem("userLoged", true);
      window.location.replace("/");
    } catch (error) {
      setError(true);
    }
  };
  let submitSignUp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3001/users",
        signUpData,
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      dispatch(logedUser(data));
      localStorage.setItem("user", JSON.stringify(data));
      dispatch(logIn());
      localStorage.setItem("userLoged", true);
      setError(false);
      dispatch(logInUpdateCart({ user: data._id, products: newCart }));
      window.location.assign("/");
    } catch (error) {
      setError(true);
    }
  };
  return (
    <div className="Sign">
      <div className="Sign-Photo">
        <img
          src="https://cdn.shopify.com/s/files/1/0352/7249/1141/products/4_78e1f10f-6389-47a7-93d5-ae6cea3e6555.png?v=1642515683"
          alt=""
          className="Sign-Photo-Image"
        />
      </div>
      <div className={sign ? "Sign-Form-1" : "Sign-Form-2"}>
        <img src={logo} alt="" className="Sign-Form-Image" />
        <h4 className="Sign-Form-Title">MI MARBELLA</h4>
        <div className="Sign-Form-Selector">
          <div
            className={sign ? "Sign-Form-Button" : "Sign-Form-Button-No"}
            onClick={() => setSign(true)}
          >
            LOG IN
          </div>
          <div
            className={sign ? "Sign-Form-Button-No" : "Sign-Form-Button"}
            onClick={() => setSign(false)}
          >
            SIGN UP
          </div>
        </div>
        {sign ? (
          <form className="Sign-LogIn" onSubmit={submitLogIn}>
            <h5>Email Address</h5>
            <input
              type="email"
              name="email"
              placeholder="Enter Email Address"
              className="Sign-Input"
              onChange={(e) => logInHandler(e)}
            />
            <h5>Password</h5>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="Sign-Input"
              onChange={(e) => logInHandler(e)}
            />
            <button className="Sign-LogIn-Button">LOGIN</button>
          </form>
        ) : (
          <form className="Sign-SignIn" onSubmit={submitSignUp}>
            <h5>Email Address</h5>
            <input
              type="email"
              name="email"
              placeholder="Enter Email Address"
              className="Sign-Input"
              onChange={(e) => SignUpHandler(e)}
            />
            <h5>Password</h5>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="Sign-Input"
              onChange={(e) => SignUpHandler(e)}
            />
            <h5>Nombre</h5>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              className="Sign-Input"
              onChange={(e) => SignUpHandler(e)}
            />
            <h5>Apellido</h5>
            <input
              type="text"
              name="lastname"
              placeholder="Enter Lastname"
              className="Sign-Input"
              onChange={(e) => SignUpHandler(e)}
            />
            <div className="Sign-CheckBox">
              <input type="checkbox" name="" id="" />
              <h4>
                Clickea aca si queres recibir noticias de ofertas y nuevos
                productos
              </h4>
            </div>
            <button className="Sign-LogIn-Button">CREAR USUARIO</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Sign;
