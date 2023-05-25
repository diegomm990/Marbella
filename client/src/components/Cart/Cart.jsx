import React, { useContext } from "react";
import "./Cart.css";
import { AppContext } from "../../AppContext/AppContext";
import * as AiIcons from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getCartByUser } from "../../redux/actions/actions";
import CartProduct from "./CartProduct";

const Cart = () => {
  let dispatch = useDispatch();
  let { closePopUp } = useContext(AppContext);
  let cart = useSelector((state) => state.cart);
  let user = localStorage.getItem("user");
  let loged = localStorage.getItem("logIn");
  // useEffect(() => {
  if (loged && cart.length === 0) {
    let userId = JSON.parse(user)._id;
    dispatch(getCartByUser(userId));
  }
  // });
  let totalQuantity = 0;
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalQuantity += cart[i].quantity;
    totalPrice += cart[i].price * cart[i].quantity;
  }
  return (
    <div className="Cart-Container" id="cartPop">
      <div className="Cart">
        <div className="Cart-Head">
          <div className="Display-Hidden">X</div>
          <div className="Cart-Head-Title">TU CARRITO</div>
          <AiIcons.AiOutlineClose
            className="Cart-Cross-Icon"
            onClick={() => {
              closePopUp({
                elementId: "cartPop",
                classname: "Cart-Out",
                popUp: ["Cart", "Courtain"],
              });
            }}
          />
        </div>
        {cart.length ? (
          <div className="Cart-Body">
            <div className="Cart-Summary">
              RESUMEN DE TU COMPRA
              <div className="Cart-Summary-Subototals">
                <div className="Cart-Summary-Products">
                  <div className="Cart-Summary-Block">
                    {totalQuantity} productos
                  </div>
                  <div className="Cart-Summary-Block">${totalPrice},00</div>
                </div>
                <div className="Cart-Summary-Subtotal">
                  <div className="Cart-Summary-Block-Subtotal">Subtotal</div>
                  <div className="Cart-Summary-Block-Subtotal">
                    ${totalPrice},00
                  </div>
                </div>
              </div>
            </div>
            <div className="Cart-Product-List">
              {cart?.map((p) => {
                return <CartProduct product={p} />;
              })}
            </div>
            <div className="Cart-Footer">
              <button
                className="Cart-Button-Submit"
                onClick={() => window.location.assign("/finishPurchase")}
              >
                CHECKOUT
              </button>
            </div>
          </div>
        ) : (
          <div className="Cart-Body-Empty">
            <img
              src="https://row.shop.gymshark.com/empty-bag.svg"
              alt="cart"
              className="Cart-Bag"
            />
            <div className="Cart-Body-Title">TU CARRITO ESTA VACIO</div>
            <div className="Cart-Body-Text">No hay productos en el carrito</div>
            <button
              className="Cart-Button-Empty"
              onClick={() => window.location.assign("/products")}
            >
              COMPRAR AHORA
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
