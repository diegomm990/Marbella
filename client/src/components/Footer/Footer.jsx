import React, { useEffect, useState } from "react";
import "./Footer.css";
import * as BsIcons from "react-icons/bs";

let Footer = () => {
  let params = window.location.href.split("/");
  let link = params[params.length - 1];
  let [footer, setFooter] = useState(true);
  useEffect(() => {
    if (
      link === "signIn" ||
      link === "finishPurchase" ||
      link === "shipping" ||
      link === "payment" ||
      link === "purchaseFinished"
    ) {
      setFooter(false);
    }
  });
  return (
    <div className={footer ? "Footer-Footer" : "Display-None"}>
      <div className="Footer-Categories">
        <h3 className="Footer-Category-Title">CATEGORIAS</h3>
        <div className="Footer-Category">
          <a href="/" className="Footer-Category-Name">
            HOME
          </a>
        </div>
        <div className="Footer-Category">
          <a href="/products" className="Footer-Category-Name">
            PRODUCTOS
          </a>
        </div>
        <div className="Footer-Category">
          <a href="/contact" className="Footer-Category-Name">
            CONTACTO
          </a>
        </div>
      </div>
      <div className="Footer-Redes">
        <h3 className="Footer-Category-Title">SEGUINOS EN INSTAGRAM</h3>
        <a
          href="https://www.instagram.com/marbellaargg"
          target="_blank"
          className="Footer-Category"
        >
          <div className="Footer-Icon">
            <BsIcons.BsInstagram />
          </div>
        </a>
      </div>
    </div>
  );
};

export default Footer;
