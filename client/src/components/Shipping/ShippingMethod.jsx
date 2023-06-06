import React from "react";
import "./ShippingMethod.css";
import { useSelector } from "react-redux";

let ShippingMethod = () => {
  let finalCart = useSelector((state) => state.finalNoUser);
  return (
    <div className="ShippingMethod">
      <h3>Envío</h3>
      <div className="ShippingMethod-Block">
        <div className="Shipping-Method-Text">
          <input type="checkbox" name="" id="" checked={true} />
          <h4>Envío por Correo Argentino{"(5-8 dias habiles)"}</h4>
        </div>
        <h4>${finalCart.shippingPrice},00</h4>
      </div>
    </div>
  );
};

export default ShippingMethod;
