import React from "react";
import "./MiniProductFinish.css";

let MiniProductFinish = ({ product }) => {
  return (
    <div className="MiniProductF">
      <div className="MiniProductF-Image-Container">
        <img
          src={product.image}
          alt={product.id}
          className="MiniProductF-Image"
        />
        <div className="MiniProductF-Quantity">{product.quantity}</div>
      </div>
      <div className="MiniProductF-Data">
        <div className="MiniProductF-Name">{product.name}</div>
        <div className="MiniProductF-Size">Talle: {product.sizes}</div>
      </div>
      <div className="MiniProductF-Price">${product.price},00</div>
    </div>
  );
};

export default MiniProductFinish;
