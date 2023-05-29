import React, { useContext, useEffect, useState } from "react";
import "./Products.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from "reactstrap";
import * as TbIcons from "react-icons/tb";
import * as IoIcons from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  createCart,
  getCartById,
  getCartByUser,
} from "../../redux/actions/actions";
import { AppContext } from "../../AppContext/AppContext";

const MiniProduct = (product) => {
  let dispatch = useDispatch();
  let { popUpNotification, popUpAdded, popUpSet } = useContext(AppContext);
  let imagen1 = product.product.images[0];
  let imagen2 = product.product.images[1];
  let stockM = product.product.stockM.quantity;
  let stockL = product.product.stockL.quantity;
  let stockXL = product.product.stockXL.quantity;
  let [imagen, setImagen] = useState(imagen1);
  let [loader, setLoader] = useState(true);
  let [discount, setDiscount] = useState(false);
  let [percentege, setPercentege] = useState("");
  let [off, setOff] = useState(false);
  let [addToBag, setAddToBag] = useState(false);
  let loged = useSelector((state) => state.logIn);
  if (product.product.discount !== "" && discount === false) {
    setDiscount(true);
    setOff(true);
    setPercentege(
      Math.round((product.product.discount * 100) / product.product.price)
    );
  }
  let user = useSelector((state) => state.user);
  let cartId = localStorage.getItem("id");

  let addToCart = (size) => {
    let productForm = {
      _id: product.product._id,
      name: product.product.name,
      price: product.product.price - product.product.discount,
      sizes: size,
      quantity: 1,
      image: product.product.images[0],
      stock: product.product[`stock${size}`].quantity,
    };
    if (loged && user._id) {
      dispatch(createCart({ user: user._id, products: [productForm] })).then(
        setTimeout(() => {
          dispatch(getCartByUser(user._id));
        }, 200)
      );
    } else if (cartId) {
      dispatch(createCart({ id: cartId, products: [productForm] })).then(
        setTimeout(() => {
          dispatch(getCartById(cartId));
        }, 200)
      );
    } else {
      dispatch(createCart({ products: [productForm] })).then((e) => {
        localStorage.setItem("id", e._id);
        setTimeout(() => {
          dispatch(getCartById(e._id));
        }, 200);
      });
    }
  };
  return (
    <div
      className="Products-Big"
      onMouseOver={() => {
        setOff(false);
        setAddToBag(true);
      }}
      onMouseLeave={() => {
        setOff(true);
        setAddToBag(false);
      }}
    >
      <ul className={loader ? "loaders" : "Display-None"}>
        <li className="loader">
          <span className="animation"></span>
          <span className="animation"></span>
          <span className="animation"></span>
        </li>
      </ul>
      <div className="Products-Product-Image-Cont">
        <img
          src={imagen}
          alt={product.product.name}
          className="Products-Product-Image"
          onLoad={() => setLoader(false)}
          onClick={() =>
            window.location.replace(`/products/${product.product._id}`)
          }
        />
        <div
          className={
            product.product.discount !== 0
              ? "Products-Product-Image-Cont-Discount"
              : "Display-None"
          }
        >
          <TbIcons.TbDiscount className="Discount-Icon" /> {percentege}% OFF
        </div>
        <div className={addToBag ? "Product-Add-To-Bag" : "Display-None"}>
          <div className="Opacity"></div>
          <div className="Add-To-Bag-Header">
            <IoIcons.IoBagAddOutline className="Add-To-Bag-Icon" />
            QUICK ADD
          </div>
          <div className="Buttons-Add-To-Bag">
            <div
              className={stockM === 0 ? "Button-No-Add" : "Button-Add-To-Bag"}
              onClick={() => {
                if (stockM !== 0) {
                  addToCart("M");
                  popUpSet("Added", true);
                  popUpSet("Notification", true);
                } else {
                  alert("No hay stock");
                }
              }}
            >
              M
            </div>
            <div
              className={stockL === 0 ? "Button-No-Add" : "Button-Add-To-Bag"}
              onClick={() => {
                if (stockL !== 0) {
                  addToCart("L");
                  popUpSet("Added", true);
                  popUpSet("Notification", true);
                } else {
                  alert("No hay stock");
                }
              }}
            >
              L
            </div>
            <div
              className={stockXL === 0 ? "Button-No-Add" : "Button-Add-To-Bag"}
              onClick={() => {
                if (stockXL !== 0) {
                  addToCart("XL");
                  popUpSet("Added", true);
                  popUpSet("Notification", true);
                } else {
                  alert("No hay stock");
                }
              }}
            >
              XL
            </div>
          </div>
        </div>
      </div>
      <a
        className="Products-Product"
        key={product.product._id}
        href={`/products/${product.product._id}`}
      >
        <h3 className="Products-Product-Name">{product.product.name}</h3>
        <h3 className="Products-Product-Category">
          {product.product.category}
        </h3>
        <div className="Products-Product-Prices">
          <h4
            className={
              product.product.discount !== 0
                ? "Products-Product-Price"
                : "Products-Product-Discount"
            }
          >
            $ {product.product.price},00
          </h4>
          <h4
            className={
              product.product.discount !== 0
                ? "Products-Product-Discount"
                : "Display-None"
            }
          >
            $ {product.product.price - product.product.discount},00
          </h4>
        </div>
      </a>
    </div>
  );
};

export default MiniProduct;
