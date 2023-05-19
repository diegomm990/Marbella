import React from "react";
import "./Shipping.css";
import ShippingUser from "./ShippingUser";
import ShippingNoUser from "./ShippingNoUser";
import FinishProgress from "../FinishProgress/FinishProgress";
import OrderSummary from "../OrderSummary/OrderSummary";
import FinishSectionCart from "../FinishSectionCart/FinishSectionCart";
import ShippingContactInfo from "./ShippingContactInfo";
import ShippingMethod from "./ShippingMethod";

let Shipping = () => {
  let finalCart = JSON.parse(localStorage.getItem("finalCart"));
  let submitHandler = () => {
    window.location.assign("/payment");
  };
  return (
    <div className="Shipping">
      {/* {loged ? <ShippingUser /> : <ShippingNoUser />} */}
      <div className="Shipping-Price-Information">
        <FinishProgress number={2} />
        <OrderSummary number={2} />
        <ShippingContactInfo />
        <ShippingMethod />
        <div className="Button-Shipping-Container">
          <button
            className="Finish-Shipping-Continue"
            onClick={() => {
              submitHandler();
            }}
          >
            CONTINUAR
          </button>
        </div>
        <div>
          <h6>
            Continuando con la compra acepta los Terminos y Condiciones de
            Marbella y el uso de las cookies
          </h6>
        </div>
      </div>
      <FinishSectionCart number={2} />
    </div>
  );
};

export default Shipping;
