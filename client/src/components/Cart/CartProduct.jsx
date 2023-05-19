import React, { useState } from "react";
import "./CartProduct.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addCount,
  deleteFromCart,
  deleteFromCartDB,
  getCartById,
  getCartByUser,
  manageCart,
} from "../../redux/actions/actions";
import * as BsIcons from "react-icons/bs";

let CartProduct = (p) => {
  let dispatch = useDispatch();
  let cart = useSelector((state) => state.cart);
  let product = p.product;
  let user = useSelector((state) => state.user);
  let loged = useSelector((state) => state.logIn);
  const sumarCantProd = (id) => {
    let cartId = localStorage.getItem("id");
    if (loged) {
      dispatch(
        manageCart({
          user: user._id,
          name: product.name,
          sizes: product.sizes,
          sign: "+",
          stock: product.stock,
        })
      );
    } else {
      dispatch(
        manageCart({
          id: cartId,
          name: product.name,
          sizes: product.sizes,
          sign: "+",
          stock: product.stock,
        })
      );
    }
  };
  const restarCantProd = (id) => {
    let cartId = localStorage.getItem("id");
    if (loged) {
      dispatch(
        manageCart({
          user: user._id,
          name: product.name,
          sizes: product.sizes,
          sign: "-",
          stock: product.stock,
        })
      );
    } else {
      dispatch(
        manageCart({
          id: cartId,
          name: product.name,
          sizes: product.sizes,
          sign: "-",
          stock: product.stock,
        })
      );
    }
  };
  const eliminar = (product) => {
    let cartId = localStorage.getItem("id");
    if (cart.length === 1) {
      localStorage.removeItem("cart");
      if (loged) {
        dispatch(getCartByUser(user._id));
      } else {
        dispatch(getCartById(cartId));
      }
    }
    if (loged) {
      dispatch(
        deleteFromCartDB({
          user: user._id,
          name: product.name,
          sizes: product.sizes,
        })
      );
    } else {
      dispatch(
        deleteFromCartDB({
          id: cartId,
          name: product.name,
          sizes: product.sizes,
        })
      );
    }
  };
  let name = product.name.split(" ");
  return (
    <div className="Cart-Product">
      <div className="Cart-Product-Image">
        <img
          src={product.image}
          alt={product.name}
          className="Cart-Product-Img"
        />
      </div>
      <div className="Cart-Product-Details">
        <div className="Cart-Product-Name">
          {name[0]} {name[1]}
        </div>
        <div className="Cart-Product-Color">
          {name[2]} || {product.sizes}
        </div>
        <div className="Cart-Product-Price">${parseInt(product.price)},00</div>
        <div className="Cart-Product-Footer">
          <button
            className="Cart-Product-Button"
            onClick={() => eliminar(product)}
          >
            <BsIcons.BsTrash className="Cart-Product-Trash" />
          </button>
          <div className="Cart-Product-Counter">
            <button
              onClick={() => restarCantProd(product._id)}
              className="Cart-Product-Btn"
            >
              -
            </button>
            <div>{product.quantity}</div>
            <button
              onClick={() => sumarCantProd(product._id)}
              className="Cart-Product-Btn"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
