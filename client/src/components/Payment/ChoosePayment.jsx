import React, { useEffect, useState } from "react";
import "./ChoosePayment.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createSale,
  getFinalCartNoUser,
  getFinalCartUser,
  getSaleById,
  payment,
  saleTransfer,
  setSaleInReducer,
} from "../../redux/actions/actions";
import Spinner from "./Spinner";

let ChoosePayment = () => {
  let dispatch = useDispatch();
  let [checked, setChecked] = useState("TB");
  let [loader, setLoader] = useState(false);
  let finalCart = useSelector((state) => state.finalNoUser);
  let sale = useSelector((state) => state.sale);
  useEffect(() => {
    if (localStorage.getItem("userLoged")) {
      dispatch(getFinalCartUser(localStorage.getItem("user")));
    } else {
      dispatch(getFinalCartNoUser(localStorage.getItem("id")));
    }
  }, []);

  let cartMercadoPago = [];
  let saleObj = {
    user: finalCart.user,
    address: finalCart.buyerData?.address,
    products: finalCart.products,
    paymentMethod: checked,
  };
  let totalPrice = finalCart.total;
  let finishPurchase = () => {
    setLoader(true);
    if (checked === "MP") {
      for (let i = 0; i < finalCart.products.length; i++) {
        cartMercadoPago.push({
          image: finalCart.products[i].image,
          name: finalCart.products[i].name,
          size: finalCart.products[i].sizes,
          quantity: finalCart.products[i].quantity,
          price: finalCart.products[i].price,
        });
      }
      setTimeout(() => {
        dispatch(createSale(saleObj)).then((e) =>
          localStorage.setItem("saleObj", JSON.stringify(e._id))
        );
        dispatch(
          payment({
            products: cartMercadoPago,
            shipping: finalCart.shippingPrice,
          })
        ).then((e) => {
          window.location.assign(e);
        });
      }, 300);
    } else if (checked === "TB") {
      dispatch(createSale(saleObj)).then((e) =>
        localStorage.setItem("saleObj", e._id)
      );
      dispatch(getSaleById(localStorage.getItem("saleObj"))).then((e) =>
        dispatch(setSaleInReducer(e))
      );
      let order = sale.orderNumber;
      dispatch(
        saleTransfer({
          user: finalCart.buyerData,
          order: order,
          products: finalCart.products,
          shipping: finalCart.shippingPrice,
          discount: totalPrice * 0.1,
          total: totalPrice - totalPrice * 0.1 + finalCart.shippingPrice,
        })
      ).then(() => {
        setTimeout(() => {
          window.location.assign("/purchaseFinished");
        }, 500);
      });
    }
  };
  return (
    <div className="Choose-Payment">
      <h4 className="Choose-Header-Title">Elegí el método de pago</h4>
      <div className="Choose-Body">
        <div className="Choose-Body-Item" onClick={() => setChecked("TB")}>
          <input type="checkbox" checked={checked === "TB"} />
          <h4 className="Choose-Body-Item-Text">
            Transferencia Bancaria{`(10% OFF)`}
          </h4>
        </div>
        <div className="Choose-Body-Item" onClick={() => setChecked("MP")}>
          <input type="checkbox" checked={checked === "MP"} />
          <h4 className="Choose-Body-Item-Text">Mercado Pago</h4>
        </div>
      </div>
      <div className="Button-Payment-Container">
        <button
          className="Finish-Payment-Continue"
          onClick={() => {
            finishPurchase();
          }}
        >
          {loader ? <Spinner /> : "CONTINUAR"}
        </button>
      </div>
      <div>
        <h6>
          Continuando con la compra acepta los Terminos y Condiciones de
          Marbella y el uso de las cookies
        </h6>
      </div>
    </div>
  );
};

export default ChoosePayment;
