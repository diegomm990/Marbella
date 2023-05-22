import React, { useEffect, useState } from "react";
import "./ShippingContactInfo.css";
import { BsDisplay } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { getSaleById } from "../../redux/actions/actions";

let ShippingContactInfo = ({ number }) => {
  let dispatch = useDispatch();
  let finalCart = JSON.parse(localStorage.getItem("finalCart"));
  let [sale, setSale] = useState({});
  useEffect(() => {
    if (number === 4) {
      let saleObj = JSON.parse(localStorage.getItem("saleObj"));
      dispatch(getSaleById(saleObj._id)).then((e) => {
        setSale(e);
      });
    }
  }, []);
  return (
    <div className="Shipping-Contact-Info">
      <div className="Shipping-Contact-Block-1">
        <div className="Shipping-Contact-Mail">
          <h4 className="Shipping-Contact-Title">Contacto</h4>
          <h4 className="Shipping-Contact-Info-Block">
            {finalCart.buyerData.email}
          </h4>
        </div>
        <a
          href="/"
          className={number === 4 ? "Display-None" : "Shipping-Contact-Change"}
        >
          Cambiar
        </a>
      </div>
      <div
        className={
          number >= 3 ? "Shipping-Contact-Block-1" : "Shipping-Contact-Block"
        }
      >
        <div className="Shipping-Contact-Mail">
          <h4 className="Shipping-Contact-Title">Enviar a</h4>
          <h4 className="Shipping-Contact-Info-Block">
            {finalCart.buyerData.address.street}{" "}
            {finalCart.buyerData.address.number}{" "}
            {finalCart.buyerData.address.department}
          </h4>
        </div>
        <a
          href="/"
          className={number === 4 ? "Display-None" : "Shipping-Contact-Change"}
        >
          Cambiar
        </a>
      </div>
      <div className={number > 3 ? "Shipping-Contact-Block-1" : "Display-None"}>
        <div className="Shipping-Contact-Mail">
          <h4 className="Shipping-Contact-Title">Estado</h4>
          <h4 className="Shipping-Contact-Info-Block">
            {sale.approved ? "Aprobada" : "Pendiente"}
          </h4>
        </div>
      </div>
      <div className={number >= 3 ? "Shipping-Contact-Block" : "Display-None"}>
        <div className="Shipping-Contact-Shipping">
          <h4 className="Shipping-Contact-Title">Envio</h4>
          <h4 className="Shipping-Contact-Info-Block-1">
            Correo Argentino{"(5-8 dias habiles}"}
            {number !== 4 ? (
              ` - ${finalCart.shippingPrice}
            ,00`
            ) : (
              <></>
            )}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default ShippingContactInfo;
