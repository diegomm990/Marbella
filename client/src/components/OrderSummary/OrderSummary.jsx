import React, { useEffect, useState } from "react";
import * as IoIcons from "react-icons/io";
import * as BsIcons from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import MiniProductFinish from "../FinishPurchase/MiniProductFinish";
import "./OrderSummary.css";
import { getSaleById } from "../../redux/actions/actions";

let OrderSummary = ({ number }) => {
  let [orderSummary, setOrderSummary] = useState(false);
  let cart = useSelector((state) => state.cart);
  let totalPrice = 0;
  let [finalCart, setFinalCart] = useState({});
  let totalPriceFinish = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price * cart[i].quantity;
  }
  if (finalCart !== {}) {
    for (let i = 0; i < finalCart?.products?.length; i++) {
      totalPriceFinish +=
        finalCart.products[i].price * finalCart.products[i].quantity;
    }
  }
  let [shippingPrice, setShippingPrice] = useState(0);
  let [saleObj, setSaleObj] = useState({});
  let [discount, setDiscount] = useState(0);
  useEffect(() => {
    if (number >= 2) {
      let finalCartStore = JSON.parse(localStorage.getItem("finalCart"));
      setFinalCart(finalCartStore);
      setShippingPrice(finalCartStore.shippingPrice);
    }
    if (number === 4) {
      let newObj = JSON.parse(localStorage.getItem("saleObj"));
      setSaleObj(newObj);
      if (newObj.paymentMethod === "TB") {
        setDiscount(totalPrice * 0.1);
      }
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
        {number === 4 ? (
          <h4>ARS ${totalPriceFinish + shippingPrice - discount},00</h4>
        ) : (
          <h4>ARS ${totalPrice + shippingPrice},00</h4>
        )}
      </div>
      {number === 4 ? (
        <div
          className={orderSummary ? "Order-Summary-Products" : "Display-None"}
        >
          {finalCart?.products?.map((p) => {
            return <MiniProductFinish product={p} />;
          })}
          <div
            className={
              saleObj.paymentMethod === "TB" ? "Order-Discount" : "Display-None"
            }
          >
            <h3 className="Order-Discount-Text">Descuento:</h3>
            <h3 className="Order-Discount-Price">${totalPrice * 0.1},00</h3>
          </div>
          <div className="Order-Discount">
            <h3 className="Order-Discount-Text">Envio:</h3>
            <h3 className="Order-Discount-Price">
              ${finalCart.shippingPrice},00
            </h3>
          </div>
        </div>
      ) : (
        <div
          className={orderSummary ? "Order-Summary-Products" : "Display-None"}
        >
          {cart?.map((p) => {
            return <MiniProductFinish product={p} />;
          })}
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
