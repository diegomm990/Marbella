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
  saleCompleted,
  substractStock,
} from "../../redux/actions/actions";

let ApprovingSale = () => {
  let dispatch = useDispatch();
  let cart = useSelector((state) => state.cart);
  let user = JSON.parse(localStorage.getItem("user"));
  let sale = JSON.parse(localStorage.getItem("saleObj"));
  let finalCart = JSON.parse(localStorage.getItem("finalCart"));
  let loged = useSelector((state) => state.logIn);
  console.log(loged);
  let finalPrice = 0;
  for (let i = 0; i < finalCart.products.length; i++) {
    finalPrice += finalCart.products[i].price;
  }
  let id = sale._id;
  let [alreadyDone, setAlreadyDone] = useState(false);
  if (!alreadyDone) {
    dispatch(emptyCart());
    setAlreadyDone(true);
    dispatch(approveSale(id));
    dispatch(getSaleById(id)).then((e) => {
      localStorage.setItem("saleObj", JSON.stringify(e));
    });
    if (loged) {
      dispatch(getCartIdByUser(user._id)).then((e) => dispatch(checkSale(e)));
    } else {
      dispatch(checkSale(cart._id));
    }
    dispatch(substractStock(sale.products));
    dispatch(
      saleCompleted({
        user: finalCart.buyerData,
        order: sale.orderNumber,
        products: finalCart.products,
        shipping: finalCart.shippingPrice,
        discount: finalPrice * 0.1,
        total: finalPrice - finalPrice * 0.1 + finalCart.shippingPrice,
      })
    );
  } else {
    setTimeout(() => {
      window.location.replace("/purchaseFinished");
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
