import React from "react";
import "./ShippingContactInfo.css";
import { BsDisplay } from "react-icons/bs";

let ShippingContactInfo = ({ number }) => {
  let finalCart = JSON.parse(localStorage.getItem("finalCart"));
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
      <div
        className={
          number >= 3 ? "Shipping-Contact-Block-1" : "Shipping-Contact-Block"
        }
      >
        <div className="Shipping-Contact-Mail">
          <h4 className="Shipping-Contact-Title">Estado</h4>
          <h4 className="Shipping-Contact-Info-Block">Pendiente</h4>
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
