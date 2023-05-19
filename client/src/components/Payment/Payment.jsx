import React from "react";
import "./Payment.css";
import FinishProgress from "../FinishProgress/FinishProgress";
import OrderSummary from "../OrderSummary/OrderSummary";
import ShippingContactInfo from "../Shipping/ShippingContactInfo";
import FinishSectionCart from "../FinishSectionCart/FinishSectionCart";
import ChoosePayment from "./ChoosePayment";

let Payment = () => {
  return (
    <div className="Payment">
      <div className="Payment-Info-Section">
        <FinishProgress number={3} />
        <OrderSummary number={3} />
        <ShippingContactInfo number={3} />
        <ChoosePayment />
      </div>
      <FinishSectionCart number={2} />
    </div>
  );
};

export default Payment;
