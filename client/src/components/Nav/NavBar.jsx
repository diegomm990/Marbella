import React, { useContext, useEffect, useState } from "react";
import "./NavBar.css";
import * as AiIcons from "react-icons/ai";
import * as GrIcons from "react-icons/gr";
import * as HiIcons from "react-icons/hi2";
import * as BsIcons from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartById,
  getCartByUser,
  logIn,
  logedUser,
} from "../../redux/actions/actions";
import { AppContext } from "../../AppContext/AppContext";

let NavBar = () => {
  let dispatch = useDispatch();
  const { popUpSet, popUpCourtain, closePopUpCourtain } =
    useContext(AppContext);
  let [nav, setNav] = useState(true);
  let params = window.location.href.split("/");
  let link = params[params.length - 1];
  let user = useSelector((state) => state.user);
  let loged = useSelector((state) => state.logIn);
  let [cartUser, setCartUser] = useState(false);
  if (!user.name) {
    let userInStorage = localStorage.getItem("user");
    if (userInStorage) {
      dispatch(logedUser(JSON.parse(userInStorage)));
      dispatch(logIn());
    }
  }
  let cart = useSelector((state) => state.cart);
  let [cartProducts, setCartProducts] = useState(0);
  useEffect(() => {
    let idInStorage = localStorage.getItem("id");
    if (
      link === "signIn" ||
      link === "finishPurchase" ||
      link === "shipping" ||
      link === "payment" ||
      link === "purchaseFinished"
    ) {
      setNav(false);
    }
    if (cart.length) {
      let productsInCart = 0;
      for (let i = 0; i < cart.length; i++) {
        productsInCart = productsInCart + cart[i].quantity;
      }
      setCartProducts(productsInCart);
    }
    if (!cart.length) {
      setCartProducts(0);
    }
    if (loged && user && cart.length === 0 && !cartUser) {
      let userId = user._id;
      dispatch(getCartByUser(userId));
      setCartUser(true);
    }
    if (!loged && idInStorage && cart.length === 0 && !cartUser) {
      dispatch(getCartById(idInStorage));
      setCartUser(true);
    }
  });
  return (
    <div className={nav ? "NavBar" : "NavBar-No"}>
      <HiIcons.HiBars3
        className="NavBar-Bars"
        onClick={() => popUpSet("Sidebar", true)}
      />
      <div className="NavBar-Logo">
        <a href="/" className="NavBar-Logo-Link">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/marbelladb-ee6df.appspot.com/o/Logo.png?alt=media&token=af753207-9ec2-404f-9912-3aa776192663"
            alt="Logo"
            className="NavBar-Logo-Image"
          />
        </a>
      </div>
      <div className="NavBar-Categories">
        <a href="/" className="NavBar-Categories-Link">
          HOME
        </a>
        <a href="/products" className="NavBar-Categories-Link">
          PRODUCTS
        </a>
        <a href="/contact" className="NavBar-Categories-Link">
          CONTACT US
        </a>
      </div>
      <div className="NavBar-User">
        <GrIcons.GrSearch
          className="NavBar-Icons"
          onClick={() => {
            popUpSet("Search", true);
            popUpSet("Courtain", true);
          }}
        />
        {loged ? (
          <AiIcons.AiOutlineUser
            onClick={() => window.location.assign("/account")}
            className="NavBar-Icons"
          />
        ) : (
          <AiIcons.AiOutlineUser
            onClick={() => window.location.assign("/signIn")}
            className="NavBar-Icons"
          />
        )}
        <div
          className="NavBar-Bag-Manage"
          onClick={() => {
            popUpSet("Cart", true);
            popUpSet("Courtain", true);
          }}
        >
          <BsIcons.BsBag className="NavBar-Icons" />
          <div className={cartProducts > 0 ? "Cart-Quantity" : "Display-None"}>
            {cartProducts}
          </div>
        </div>
      </div>
      <div
        className={popUpCourtain ? "Courtain" : "Courtain-No"}
        onClick={() => {
          closePopUpCourtain();
        }}
      ></div>
    </div>
  );
};

export default NavBar;
