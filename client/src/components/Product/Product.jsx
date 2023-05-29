import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Product.css";
import {
  getById,
  addToCart,
  changeFromCart,
  createCart,
  getCartByUser,
  getCartById,
  getAllProducts,
} from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import MiniProduct from "../Products/Product-Mini";
import { AppContext } from "../../AppContext/AppContext";

const Product = () => {
  let { popUpSet } = useContext(AppContext);
  let dispatch = useDispatch();
  let paramsId = useParams();
  let product = useSelector((state) => state.product);
  let products = useSelector((state) => state.products);
  let user = useSelector((state) => state.user);
  let loged = useSelector((state) => state.logIn);
  let cart = useSelector((state) => state.cart);
  let [imagen, setImagen] = useState("hola.jpg");
  if (imagen === "hola.jpg") {
    if (product.images) {
      setImagen(product.images[0]);
    }
  }
  useEffect(() => {
    dispatch(getById(paramsId.id));
    dispatch(getAllProducts());
  }, [dispatch]);

  let [counter, setCounter] = useState(1);
  let counterUp = () => {
    if (counter !== product[`stock${productData.sizes}`]?.quantity) {
      setCounter(counter + 1);
      setProductData({
        ...productData,
        quantity: productData.quantity + 1,
      });
    }
  };
  let counterDown = () => {
    if (counter > 1) {
      setCounter(counter - 1);
      setProductData({
        ...productData,
        quantity: productData.quantity - 1,
      });
    }
  };
  let [productData, setProductData] = useState({
    sizes: "-",
    quantity: 1,
  });
  let [size, setSize] = useState(true);
  let [quant, setQuant] = useState(false);

  const setDataHandler = (e) => {
    e.preventDefault();
    if (e.target.value === "-") {
      setQuant(false);
    }
    if (e.target.value !== "-") {
      setQuant(true);
      if (product[`stock${e.target.value}`].quantity > 0) {
        setSize(true);
      } else {
        setSize(false);
      }
      setProductData({
        ...productData,
        [e.target.name]: e.target.value,
      });
    }
  };
  let payload = {
    user: user._id,
    products: [],
  };
  const submitForm = () => {
    // e.preventDefault();
    if (productData.sizes === "-") {
      popUpSet("Size", true);
      popUpSet("Notification", true);
    } else {
      let productForm = {
        _id: product._id,
        name: product.name,
        price: product.price - product.discount,
        sizes: productData.sizes,
        quantity: productData.quantity,
        image: product.images[0],
        stock: product[`stock${productData.sizes}`].quantity,
      };
      payload = {
        ...payload,
        products: [productForm],
      };
      if (loged) {
        dispatch(createCart(payload)).then(
          setTimeout(() => {
            dispatch(getCartByUser(user._id));
          }, 200)
        );
      } else {
        if (!localStorage.getItem("id")) {
          dispatch(createCart({ products: [productForm] })).then((e) => {
            localStorage.setItem("id", e._id);
            setTimeout(() => {
              dispatch(getCartById(e._id));
            }, 200);
          });
        } else {
          let id = localStorage.getItem("id");
          dispatch(createCart({ id: id, products: [productForm] })).then(
            (e) => {
              dispatch(getCartById(id));
            }
          );
        }
      }
    }
  };
  let changeImage = (i) => {
    setImagen(i);
  };
  let otherProd = products.filter((p) => p.name !== product.name);
  return (
    <div className="Product">
      <div className="Product-Product">
        <div className="Product-Image-Box">
          <div className="Product-Images-Mini">
            {product.images?.map((i) => {
              return (
                <img
                  src={i}
                  alt=""
                  className="Product-Image-Mini"
                  onMouseOver={() => changeImage(i)}
                  onClick={() => changeImage(i)}
                />
              );
            })}
          </div>
          <img
            src={imagen}
            alt={product.name}
            className="Product-Image"
            onClick={() => popUpSet("Image", true)}
          />
        </div>
        <div className="Product-Description-Box">
          <h2 className="Product-Name">{product.name}</h2>
          <p className="Product-Category">{product.category}</p>
          <div className="Product-Prices">
            <h4
              className={
                product.discount === 0
                  ? "Product-Price-No-Discount"
                  : "Product-Price"
              }
            >
              ${product.price},00{" "}
            </h4>
            <h4
              className={
                product.discount === 0
                  ? "Display-None"
                  : "Product-Price-Discount"
              }
            >
              ${product.price - product.discount},00
            </h4>
          </div>
          <p>Talle:</p>
          <select
            name="sizes"
            id="sizes"
            className="Product-Sizes-Selector"
            onChange={setDataHandler}
          >
            <option value="-">-</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
          <button
            className="Size-Guide"
            onClick={() => popUpSet("SizeGuide", true)}
          >
            Guia de talles
          </button>
          <p>Cantidad:</p>
          <div className="Product-Quantity">
            <div className="Product-Quantity-Block-1">
              <button
                className="Product-Quantity-Button"
                onClick={() => {
                  counterDown();
                }}
              >
                -
              </button>
              <h3 className="Product-Quantity-Counter">{counter}</h3>
              <button
                className="Product-Quantity-Button"
                onClick={() => {
                  counterUp();
                }}
              >
                +
              </button>
            </div>
          </div>
          <input
            type="submit"
            value={size ? "Agregar al carrito" : "No hay stock"}
            className={size ? "Product-Cart-Button" : "Product-Cart-Button-No"}
            onClick={() => submitForm()}
          />
          <p className="Product-Discount">
            10% de descuento pagando con Transferencia Bancaria
          </p>
        </div>
      </div>
      <div className="Products-Like">
        <h3>PRODUCTS YOU MAY LIKE:</h3>
        <div className="Products-Other">
          {otherProd.slice(0, 2).map((p) => {
            return <MiniProduct product={p} key={p._id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Product;
