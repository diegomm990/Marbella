import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MiniProductFinish from "../FinishPurchase/MiniProductFinish";
import "./FinishSectionCart.css";

let FinishSectionCart = ({ number }) => {
  let cart = useSelector((state) => state.cart);
  let finalCart = useSelector((state) => state.finalNoUser);
  let totalPrice = finalCart.total;
  let shippingPrice = finalCart.shippingPrice;
  return (
    <div className="Section-Purchase-Information">
      <div className="Section-Purchase-Cart">
        <h4>TU CARRITO</h4>
        {cart?.map((p) => {
          return <MiniProductFinish product={p} />;
        })}
      </div>
      <div className="Section-Purchase-Code">
        <input
          type="text"
          name="code"
          id="code"
          placeholder="Codigo de Descuento"
          className="Section-Purchase-Code-Input"
        />
        <button className="Section-Purchase-Code-Button">APLICAR</button>
      </div>
      <div className="Section-Subtotal">
        <div className="Subtotal-Cont">
          <div>Subtotal</div>
          <div className="Subtotal-Price">ARS ${totalPrice},00</div>
        </div>
        <div className="Subtotal-Cont">
          <div>Envio</div>
          {number >= 2 ? (
            <div className="Subtotal-Price">ARS ${shippingPrice},00</div>
          ) : (
            <div className="Subtotal-Price">
              {shippingPrice
                ? `ARS $${shippingPrice},00`
                : "Calculado en proximo paso"}
            </div>
          )}
        </div>
      </div>
      <div className="Section-Subtotal">
        <div className="Subtotal-Cont">
          <div>Total</div>
          <div className="Subtotal-Price">
            ARS ${totalPrice + shippingPrice},00
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishSectionCart;
