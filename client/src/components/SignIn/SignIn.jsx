import React, { useState } from "react";
import "./SignIn.css";
import { useDispatch, useSelector } from "react-redux";
import { logIn, logInUpdateCart, logedUser } from "../../redux/actions/actions";
import axios from "axios";
import Loader from "./Loader";

let SignIn = () => {
  let dispatch = useDispatch();
  let loged = useSelector((state) => state.logIn);
  let [userData, setUserData] = useState({});
  let cart = useSelector((state) => state.cart);
  let newCart = [];
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name) {
      newCart.push(cart[i]);
    }
  }
  let userInStore = useSelector((state) => state.user);
  let [error, setError] = useState(false);

  let inputHandler = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  let submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}users/loginUser`,
        userData,
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      dispatch(logedUser(data));
      localStorage.setItem("user", data._id);
      dispatch(logIn());
      dispatch(logInUpdateCart({ user: data._id, products: newCart }));
      localStorage.setItem("userLoged", true);
      setError(false);
      window.location.replace("/");
    } catch (error) {
      setError(true);
    }
  };
  return (
    <div className="SignIn-Full">
      <div className="SignIn">
        <h1 className="SignIn-Title">Inicio de Sesión</h1>
        <form className="SignIn-Form" onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Correo Electronico"
            name="email"
            className="SignIn-User"
            onChange={(e) => inputHandler(e)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            className="SignIn-User"
            onChange={(e) => inputHandler(e)}
          />
          <div className={error ? "SignIn-Error" : "SignIn-No-Error"}>
            Email o Contraseña incorrecta
          </div>
          <button className="SignIn-Button">Sign In</button>
        </form>
        <a className="SignIn-Create-Button" href="/createAccount">
          Create account
        </a>
      </div>
    </div>
  );
};

export default SignIn;
