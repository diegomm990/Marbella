import React, { useState } from "react";
import "./FinishCart.css";
import { useDispatch, useSelector } from "react-redux";
import { addCount, deleteFromCart } from "../../redux/actions/actions";
import * as BsIcons from "react-icons/bs";

let FinishCart = (p) => {
  let dispatch = useDispatch();
  let cart = useSelector((state) => state.cart);
  let product = p.product;

  const sumarCantProd = (id) => {
    let obj = cart.find((p) => p._id === id && p.sizes === product.sizes);
    let lugar = cart.indexOf(obj);
    let cantidad = obj.quantity + 1;
    setTimeout(() => {
      dispatch(addCount({ cantidad, lugar }));
    }, 30);
  };
  const restarCantProd = (id) => {
    let obj = cart.find((p) => p._id === id && p.sizes === product.sizes);
    let lugar = cart.indexOf(obj);
    let cantidad = obj.quantity;
    if (cantidad > 1) {
      cantidad = cantidad - 1;
    }
    setTimeout(() => {
      dispatch(addCount({ cantidad, lugar }));
    }, 30);
  };
  const eliminar = (product) => {
    if (cart.length === 1) {
      dispatch(deleteFromCart(product));
      localStorage.removeItem("cart");
    } else {
      dispatch(deleteFromCart(product));
    }
  };
  return (
    <div className="Finish-Cart">
      <div className="Finish-Cart-Image">
        <img
          src={product.image}
          alt={product.name}
          className="Finish-Cart-Img"
        />
      </div>
      {/* <div className="Finish-Cart-Name">{product.name}</div> */}
      <div className="Finish-Cart-Block-S">{product.sizes}</div>
      <div className="Finish-Cart-Counter">
        <button
          onClick={() => restarCantProd(product._id)}
          className="Finish-Cart-Btn"
        >
          -
        </button>
        <div>{product.quantity}</div>
        <button
          onClick={() => sumarCantProd(product._id)}
          className="Finish-Cart-Btn"
        >
          +
        </button>
      </div>
      <div className="Finish-Cart-Block">
        ${parseInt(product.price) * parseInt(product.quantity)},00
      </div>
      <button className="Finish-Cart-Button" onClick={() => eliminar(product)}>
        <BsIcons.BsTrash className="Finish-Cart-Trash" />
      </button>
    </div>
  );
};

export default FinishCart;
