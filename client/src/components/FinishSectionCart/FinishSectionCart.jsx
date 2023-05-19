import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MiniProductFinish from "../FinishPurchase/MiniProductFinish";
import "./FinishSectionCart.css";

let FinishSectionCart = ({ number }) => {
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
          <div className="Subtotal-Price">
            {shippingPrice !== 0
              ? `ARS $${shippingPrice},00`
              : "Calculado en proximo paso"}
          </div>
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
