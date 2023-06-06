import React, { useEffect, useState } from "react";
import "./Congratulations.css";
import OrderSummary from "../OrderSummary/OrderSummary";
import ShippingContactInfo from "../Shipping/ShippingContactInfo";
import { useSelector } from "react-redux";

let Congratulations = () => {
  let finalCart = useSelector((state) => state.finalNoUser);
  return (
    <div className="Congratulations">
      <div className="Congratulations-Header">
        <h3 className="Congratulations-Title">
          Felicidades por tu compra {finalCart?.buyerData?.name}
        </h3>
        <h5 className="Congratulations-Text">Resumen de tu compra:</h5>
        <OrderSummary number={4} />
        <ShippingContactInfo number={4} />
        <div className="Congratulations-Footer-Text">
          Te llegara un mail detallando la compra realizada. Si pagaste con
          transferencia bancaria nos pondremos en contacto con vos para
          finalizar la compra.
        </div>
      </div>
    </div>
  );
};

export default Congratulations;
