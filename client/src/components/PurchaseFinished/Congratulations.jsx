import React from "react";
import "./Congratulations.css";
import OrderSummary from "../OrderSummary/OrderSummary";
import ShippingContactInfo from "../Shipping/ShippingContactInfo";

let Congratulations = () => {
  let finalCart = JSON.parse(localStorage.getItem("finalCart"));
  console.log(finalCart);
  return (
    <div className="Congratulations">
      <div className="Congratulations-Header">
        <h3 className="Congratulations-Title">
          Felicidades por tu compra {finalCart.buyerData.name}
        </h3>
        <h5 className="Congratulations-Text">Resumen de tu compra:</h5>
        <OrderSummary number={3} />
        <ShippingContactInfo number={4} />
        <div>Te llegara un mail detallando la compra realizada</div>
      </div>
    </div>
  );
};

export default Congratulations;
