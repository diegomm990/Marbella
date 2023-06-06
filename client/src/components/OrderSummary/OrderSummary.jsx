import React, { useEffect, useState } from "react";
import * as IoIcons from "react-icons/io";
import * as BsIcons from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import MiniProductFinish from "../FinishPurchase/MiniProductFinish";
import "./OrderSummary.css";
import {
  getFinalCartNoUser,
  getFinalCartUser,
  getSaleById,
  setSaleInReducer,
} from "../../redux/actions/actions";

let OrderSummary = ({ number }) => {
  let dispatch = useDispatch();
  let [orderSummary, setOrderSummary] = useState(false);
  let cart = useSelector((state) => state.cart);
  let finalCart = useSelector((state) => state.finalNoUser);
  let [discount, setDiscount] = useState(0);
  let totalPrice = finalCart.total;
  let totalPriceFinish = finalCart.total + finalCart.shippingPrice - discount;
  let [shippingPrice, setShippingPrice] = useState(0);
  let [saleObj, setSaleObj] = useState({});
  let sale = useSelector((state) => state.sale);
  useEffect(() => {
    if (number >= 2) {
      if (localStorage.getItem("userLoged")) {
        dispatch(getFinalCartUser(localStorage.getItem("user")));
      } else {
        dispatch(getFinalCartNoUser(localStorage.getItem("id")));
      }
      setShippingPrice(finalCart.shippingPrice);
    }
    if (number === 4) {
      dispatch(getSaleById(localStorage.getItem("saleObj")));
      if (sale.paymentMethod === "TB") {
        setDiscount(finalCart.discount);
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
          <h4>ARS ${totalPriceFinish},00</h4>
        ) : (
          <h4>
            ARS ${totalPriceFinish}
            ,00
          </h4>
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
              sale.paymentMethod === "TB" ? "Order-Discount" : "Display-None"
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
