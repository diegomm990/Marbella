import React, { useEffect, useState } from "react";
import "./ApprovingSale.css";
import { useDispatch, useSelector } from "react-redux";
import {
  approveSale,
  checkSale,
  emptyCart,
  getCartByUser,
  getCartIdByUser,
  getSaleById,
  logIn,
  substractStock,
} from "../../redux/actions/actions";

let ApprovingSale = () => {
  let dispatch = useDispatch();
  let cart = useSelector((state) => state.cart);
  let user = JSON.parse(localStorage.getItem("user"));
  let sale = JSON.parse(localStorage.getItem("saleObj"));
  let id = sale._id;
  let [alreadyDone, setAlreadyDone] = useState(false);
  if (!alreadyDone) {
    dispatch(emptyCart());
    setAlreadyDone(true);
    dispatch(approveSale(id));
    dispatch(getSaleById(id)).then((e) => {
      localStorage.setItem("saleObj", JSON.stringify(e));
    });
    setTimeout(() => {}, 1000);
    dispatch(getCartIdByUser(user._id)).then((e) => dispatch(checkSale(e)));
    dispatch(substractStock(sale.products));
  } else {
    setTimeout(() => {
      window.location.replace("/congratulations");
    }, 2000);
  }

  return (
    <div className="Approving">
      {/* <button onClick={()=> boton()}>Aprovar Venta</button> */}
      <div className="Approving-Loader">
        {/* <div class="lds-ring"><div></div><div></div><div></div><div></div></div> */}
        <div className="Approving-Loader-Cont">
          <div class="lds-dual-ring"></div>
          <h3>Aprobando transacción...</h3>
        </div>
      </div>
    </div>
  );
};

export default ApprovingSale;
