import React, { useState } from "react";
import "./AddressExists.css";

let AddressExists = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  let cart = JSON.parse(localStorage.getItem("cart"));
  let [addressSelected, setAddressSelected] = useState("none");
  let [finalCart, setFinalCart] = useState({
    user,
    cart,
    address: "",
  });
  let chechboxHandler = (value, obj) => {
    setAddressSelected(value);
    setFinalCart({
      ...finalCart,
      address: obj,
    });
  };
  let continuar = () => {
    localStorage.setItem("finalCart", JSON.stringify(finalCart));
    window.location.replace("/reviewData");
  };
  return (
    <div className="Address-Exists">
      {user.address[0] === "" ? (
        <h3>No hay direcciones</h3>
      ) : (
        <div>
          {user.address?.map((a) => {
            return (
              <div className="Address-Checkbox">
                <input
                  type="checkbox"
                  checked={addressSelected === `${a.street}`}
                  onChange={() => chechboxHandler(`${a.street}`, a)}
                  className="Address-Check"
                />
                <h4 className="Address-Checkbox-Text">
                  {a.street} {a.number} - CP: {a.zipCode} - {a.province}
                </h4>
              </div>
            );
          })}
        </div>
      )}
      <a href="/addressForm" className="Add-Address">
        Agregar una direccion
      </a>
      <button
        className={
          addressSelected === "none"
            ? "Address-No-Selected"
            : "Address-Selected"
        }
        onClick={() => continuar()}
      >
        Continuar
      </button>
    </div>
  );
};

export default AddressExists;
