import React from "react";
import "./PurchaseCart.css";

let PurchaseCart = () => {
  let saleObj = JSON.parse(localStorage.getItem("saleObj"));
  return (
    <div className="Purchase-Cart">
      <h4 className="Purchase-Cart-Title">TU COMPRA</h4>
      <div className="Purchase-Cart-Products">
        {saleObj.products.map((p) => {
          return (
            <div className="Purchase-Cart-Product">
              <div className="Purchase-Cart-Product-Image-Container">
                <img
                  src={p.image}
                  alt={p.name}
                  className="Purchase-Cart-Product-Image"
                />
                <div className="Purchase-Cart-Product-Quantity">
                  {p.quantity}
                </div>
              </div>
              <div className="Purchase-Cart-Product-Info">
                <h5 className="Purchase-Cart-Product-Name">{p.name}</h5>
                <h5 className="Purchase-Cart-Product-Size">Talle: {p.sizes}</h5>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PurchaseCart;
