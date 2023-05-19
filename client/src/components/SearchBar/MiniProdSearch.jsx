import React, { useState } from "react";
import "./MiniProdSearch.css";
import * as TbIcons from "react-icons/tb";

const MiniProduct = (p) => {
  let prod = p.p;
  let params = window.location.pathname;
  let par = params.split("/");
  let link = () => {
    if (par[par.length - 2] === "products") {
      return `${prod._id}`;
    } else {
      return `products/${prod._id}`;
    }
  };

  return (
    <div className="Mini-Product">
      {prod ? (
        <a href={link()} className="MiniProduct-Product">
          <div className="MiniProduct-Image-Box">
            <img
              src={prod.images[0]}
              alt={prod.name}
              className="MiniProduct-Image"
            />
          </div>
          <div className="MiniProduct-Name">{prod.name}</div>
          <div className="MiniProduct-Price">${prod.price},00</div>
        </a>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default MiniProduct;
