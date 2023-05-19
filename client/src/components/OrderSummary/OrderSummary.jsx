import React, { useEffect, useState } from "react";
import * as IoIcons from "react-icons/io";
import * as BsIcons from "react-icons/bs";
import { useSelector } from "react-redux";
import MiniProductFinish from "../FinishPurchase/MiniProductFinish";
import "./OrderSummary.css";

let OrderSummary = ({ number }) => {
  let [orderSummary, setOrderSummary] = useState(false);
  let cart = useSelector((state) => state.cart);
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price * cart[i].quantity;
  }
  let [shippingPrice, setShippingPrice] = useState(0);
  useEffect(() => {
    if (number >= 2) {
      let finalCart = JSON.parse(localStorage.getItem("finalCart"));
      setShippingPrice(finalCart.shippingPrice);
    }
  }, []);
  return (
    <div className="Order-Summary">
      <div
        className="Order-Summary-Header"
        onClick={() => setOrderSummary(!orderSummary)}
      >
        <div className="Order-Summary-Text">
          <BsIcons.BsBag />
          <h4>Mira tu pedido</h4>
          <IoIcons.IoIosArrowDown />
        </div>
        <h4>ARS ${totalPrice + shippingPrice},00</h4>
      </div>
      <div className={orderSummary ? "Order-Summary-Products" : "Display-None"}>
        {cart?.map((p) => {
          return <MiniProductFinish product={p} />;
        })}
      </div>
    </div>
  );
};

export default OrderSummary;
