import React, { useEffect } from "react";
import "./PurchaseFinished.css";
import FinishProgress from "../FinishProgress/FinishProgress";
import PurchaseCart from "./PurchaseCart";
import Congratulations from "./Congratulations";
import OrderSummary from "../OrderSummary/OrderSummary";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartById,
  getCartByUser,
  getFinalCartNoUser,
  getFinalCartUser,
  getSaleById,
  setSaleInReducer,
} from "../../redux/actions/actions";

let PurchaseFinished = () => {
  let dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      let id = localStorage.getItem("user");
      dispatch(getFinalCartUser(id));
    } else {
      dispatch(getFinalCartNoUser(localStorage.getItem("id")));
    }
    // dispatch(getSaleById(localStorage.getItem("saleObj"))).then((e) =>
    //   setSaleInReducer(e)
    // );
  }, []);

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
