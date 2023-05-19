import React from "react";
import "./PurchaseFinished.css";
import FinishProgress from "../FinishProgress/FinishProgress";
import PurchaseCart from "./PurchaseCart";
import Congratulations from "./Congratulations";
import OrderSummary from "../OrderSummary/OrderSummary";

let PurchaseFinished = () => {
  return (
    <div className="Purchase-Finished">
      <div className="Purchase-Info-Section">
        <FinishProgress number={4} />
        <Congratulations />
      </div>
      <PurchaseCart />
    </div>
  );
};

export default PurchaseFinished;
