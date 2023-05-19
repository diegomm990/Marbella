import React from "react";
import "./ReviewData.css";
import { useDispatch, useSelector } from "react-redux";
import SignIn from "../SignIn/SignIn";
import FinishCart from "../FinishPurchase/FinishCart";
import {
  createSale,
  getCartByUser,
  getCartIdByUser,
  payment,
} from "../../redux/actions/actions";

let ReviewData = () => {
  let dispatch = useDispatch();
  let finalCart = JSON.parse(localStorage.getItem("finalCart"));
  let loged = useSelector((state) => state.logIn);
  let user = useSelector((state) => state.user);
  let newCart = [];
  for (let i = 0; i < finalCart.cart.length; i++) {
    if (finalCart.cart[i].name) {
      newCart.push(finalCart.cart[i]);
    }
  }
  let suma = 0;
  for (let i = 0; i < newCart.length; i++) {
    suma = suma + newCart[i].quantity * newCart[i].price;
  }
  let cartMercadoPago = [];
  for (let i = 0; i < newCart.length; i++) {
    cartMercadoPago.push({
      image: newCart[i].image,
      name: newCart[i].name,
      size: newCart[i].sizes,
      quantity: newCart[i].quantity,
      price: newCart[i].price,
    });
  }
  let saleObj = {
    user: finalCart.user._id,
    address: finalCart.address,
    products: finalCart.cart,
  };
  let finalizar = () => {
    dispatch(createSale(saleObj)).then((e) =>
      localStorage.setItem("saleObj", JSON.stringify(e))
    );
    localStorage.removeItem("cart");
    dispatch(getCartIdByUser(user._id));
    dispatch(payment({ products: cartMercadoPago })).then((e) => {
      window.location.replace(e);
    });
  };
  return (
    <div className="Review-Data">
      {loged ? (
        <div className="Review-Data-Loged">
          <h1>Datos de envío</h1>
          <h3 className="Purchase-Form-Loged-Text">
            {" "}
            {user.name} {user.lastname}
          </h3>
          <h3 className="Purchase-Form-Loged-Text"> {user.email}</h3>
          <h3 className="Purchase-Form-Loged-Text">
            {" "}
            {finalCart.address.street} {finalCart.address.number} -{" "}
            {finalCart.address.department}
          </h3>
          <h3 className="Purchase-Form-Loged-Text">
            {" "}
            {finalCart.address.province} - CP: {finalCart.address.zipCode}
          </h3>
          <a href="/addressExists">Editar envio</a>
          <h1>Carrito</h1>
          {newCart?.map((p) => {
            return (
              <div className="Review-Cart">
                <p>{p.quantity}</p>
                <img src={p.image} alt={p.name} className="Review-Cart-Image" />
                <p>{p.name}</p>
                <p>{p.sizes}</p>
              </div>
            );
          })}
          <h2>Total ${suma},00</h2>
          <button
            className={
              suma !== 0 ? "Review-Data-Loged-Btn" : "Review-Data-Loged-Btn-No"
            }
            onClick={() => finalizar()}
          >
            Finalizar compra
          </button>
        </div>
      ) : (
        <div>
          <SignIn />
        </div>
      )}
    </div>
  );
};

export default ReviewData;
