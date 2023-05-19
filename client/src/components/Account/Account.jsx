import React, { useEffect, useState } from "react";
import "./Account.css";
import axios from "axios";
import {
  createCart,
  logIn,
  logOut,
  logedUser,
  replaceCart,
} from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";

let Account = () => {
  let dispatch = useDispatch();
  let user = JSON.parse(localStorage.getItem("user"));
  let cart = useSelector((state) => state.cart);
  let sales = [];
  let [address, setAddress] = useState(false);
  let logUserOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userLoged");
    dispatch(logOut());
    if (localStorage.getItem("id")) {
      let id = localStorage.getItem("id");
      dispatch(replaceCart({ id, products: cart }));
    } else {
      dispatch(createCart({ products: cart }));
    }
    setTimeout(() => {
      window.location.assign("/");
    }, 500);
  };
  return (
    <div className="Account-Main">
      <h1 className="Account-Title">TU USUARIO MARBELLA</h1>
      <div className="Account-Account">
        <div className="Account-Info">
          <div className="Account-Name">
            <div className="Account-Name-Logo">
              {user.name.charAt(0)}
              {user.lastname.charAt(0)}
            </div>
            <div className="Account-Name-Info">
              <div className="Account-Name-Complete">
                {user.name.toUpperCase()} {user.lastname.toUpperCase()}
              </div>
              <div className="Account-Name-Email">{user.email}</div>
              <button className="Account-Log-Out" onClick={() => logUserOut()}>
                Log Out
              </button>
            </div>
          </div>
          <div className="Account-Addresses">
            <h4 className="Account-Addresses-Title">TUS DIRECCIONES</h4>
            <button
              className="Account-Addresses-Button"
              onClick={() => setAddress(!address)}
            >
              Ver tus direcciones ({user.address.length})
            </button>
            {address ? (
              user.address.length ? (
                user.address.map((a) => {
                  return (
                    <div className="Account-Address">
                      <h5>
                        Calle: {a.street} {a.number}
                      </h5>
                      <h5>Departamento: {a.department}</h5>
                      <h5>Provincia: {a.province}</h5>
                      <h5>Codigo Postal: {a.zipCode}</h5>
                    </div>
                  );
                })
              ) : (
                <div className="Account-No-Address">
                  <h4>Todavia no tienes direcciones</h4>
                  <button>AGREGAR UNA DIRECCION</button>
                </div>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="Account-Orders">
          <h3 className="Account-Orders-Title">TUS PEDIDOS</h3>
          <div className="Account-Orders-Box">
            {sales.length ? (
              <></>
            ) : (
              <div className="Account-Orders-Empty">
                <img
                  src="https://row.shop.gymshark.com/no-orders-graphic.svg"
                  alt=""
                />
                <div className="Account-Orders-Empty-Title">NO HAY PEDIDOS</div>
                <div className="Account-Orders-Empty-Text">
                  Todavía no hiciste pedidos
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
