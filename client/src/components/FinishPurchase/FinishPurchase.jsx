import React, { useContext, useEffect, useState } from "react";
import "./FinishPurchase.css";
import FinishProgress from "../FinishProgress/FinishProgress";
import { useDispatch, useSelector } from "react-redux";
import {
  addInfoSale,
  getCartById,
  getCartIdByUser,
} from "../../redux/actions/actions";
import FinishSectionCart from "../FinishSectionCart/FinishSectionCart";
import OrderSummary from "../OrderSummary/OrderSummary";
import { AppContext } from "../../AppContext/AppContext";

let FinishPurchase = () => {
  let { popUpSet } = useContext(AppContext);
  let dispatch = useDispatch();
  let [userLoged, setUserLoged] = useState(false);
  let [user, setUser] = useState({});
  let id = localStorage.getItem("id");
  let [cartAvailable, setCartAvailable] = useState(false);
  // let [orderSummary, setOrderSummary] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("user") && !userLoged) {
      setUser(JSON.parse(localStorage.getItem("user")));
      setUserLoged(true);
    }
    if (cart.length === 0) {
      if (user._id) {
        dispatch(getCartIdByUser(user._id));
      } else if (!cartAvailable) {
        dispatch(getCartById(id));
        setCartAvailable(true);
      }
    }
  });
  let cart = useSelector((state) => state.cart);
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price * cart[i].quantity;
  }
  let discount = totalPrice * 0.1;
  let [checkStreet, setChecked] = useState(false);
  let [userInfo, setUserInfo] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
  });
  let [shippingInfo, setShippingInfo] = useState({
    street: "",
    number: "",
    department: "",
    province: "",
    locality: "",
    zipCode: "",
  });

  let inputHandler = (objName, e) => {
    if (objName === "user") {
      setUserInfo({
        ...userInfo,
        [e.target.name]: e.target.value,
      });
    } else if (objName === "shipping") {
      setShippingInfo({
        ...shippingInfo,
        [e.target.name]: e.target.value,
      });
    }
  };
  let [nameError, setNameError] = useState(false);
  let [lastnameError, setLastnameError] = useState(false);
  let [emailError, setEmailError] = useState(false);
  let [streetError, setStreetError] = useState(false);
  let [numberError, setNumberError] = useState(false);
  let [provinceError, setProvinceError] = useState(false);
  let [localityError, setLocalityError] = useState(false);
  let [zipCodeError, setZipCodeError] = useState(false);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  let submitHandler = () => {
    if (userLoged) {
      if (checkStreet) {
        let obj = {
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          address: shippingInfo,
        };
        // console.log({ user: user._id, buyerData: obj });
        dispatch(
          addInfoSale({
            user: user._id,
            buyerData: obj,
            total: totalPrice,
            discount,
          })
        );
        setTimeout(() => {
          window.location.assign("/shipping");
        }, 300);
      } else {
        alert("Falta elegir direccion");
      }
    } else {
      let form = true;
      if (userInfo.name.length < 3) {
        form = false;
        setNameError(true);
      }
      if (userInfo.lastname.length < 3) {
        form = false;
        setLastnameError(true);
      }
      if (!isValidEmail(userInfo.email)) {
        form = false;
        setEmailError(true);
      }
      if (shippingInfo.street.length < 3) {
        form = false;
        setStreetError(true);
      }
      if (shippingInfo.number.length < 1) {
        form = false;
        setNumberError(true);
      }
      if (shippingInfo.province === "-") {
        form = false;
        setProvinceError(true);
      }
      if (shippingInfo.locality.length < 3) {
        form = false;
        setLocalityError(true);
      }
      if (!shippingInfo.zipCode.length) {
        form = false;
        setZipCodeError(true);
      }
      if (form) {
        setNameError(false);
        setLastnameError(false);
        setEmailError(false);
        setStreetError(false);
        setNumberError(false);
        setProvinceError(false);
        setLocalityError(false);
        setZipCodeError(false);

        let obj = {
          ...userInfo,
          address: {
            ...shippingInfo,
          },
        };
        dispatch(
          addInfoSale({ id, buyerData: obj, total: totalPrice, discount })
        );
        setTimeout(() => {
          window.location.assign("/shipping");
        }, 300);
      } else {
        popUpSet("Form", true);
        popUpSet("Notification", true);
      }
    }
  };
  return (
    <div className="Finish-Purchase">
      {userLoged ? (
        <div className="Finish-Account-Information">
          <FinishProgress number={1} />
          <OrderSummary />
          <h4>INFORMACION DE COMPRA</h4>
          <div className="Finish-Account-Info">
            <div className="Finish-Account-Name">
              <div className="Finish-Account-Name-Logo">
                {user.name.charAt(0)}
                {user.lastname.charAt(0)}
              </div>
              <div className="Finish-Account-Name-Info">
                <div className="Finish-Account-Name-Complete">
                  {user.name.toUpperCase()} {user.lastname.toUpperCase()}
                </div>
                <div className="AccoFinish-Accountunt-Name-Email">
                  {user.email}
                </div>
              </div>
            </div>
            <div className="Finish-Account-Addresses">
              <h4 className="Finish-Account-Addresses-Title">
                TUS DIRECCIONES
              </h4>
              {user.address.length ? (
                user.address.map((a) => {
                  return (
                    <div className="Finish-Account-Address">
                      <input
                        type="checkbox"
                        checked={checkStreet === `${a.street}`}
                        className="Finish-Account-Checkbox"
                        onChange={() => {
                          setChecked(`${a.street}`);
                          setShippingInfo({
                            street: a.street,
                            number: a.number,
                            department: a.department,
                            province: a.province,
                            locality: a.locality,
                            zipCode: a.zipCode,
                          });
                        }}
                      />
                      <h5>
                        Calle: {a.street} {a.number} || Departamento:{" "}
                        {a.department}
                      </h5>
                    </div>
                  );
                })
              ) : (
                <div className="Finish-Account-No-Address">
                  <h4>Todavia no tienes direcciones</h4>
                </div>
              )}
              <button
                className="Finish-Add-Address"
                onClick={() => {
                  window.location.assign("/addressForm");
                }}
              >
                AGREGAR UNA DIRECCION
              </button>
            </div>
          </div>
          <div className="Button-Finish-Container">
            <button
              className="Finish-Purchase-Continue"
              onClick={() => submitHandler()}
            >
              CONTINUAR
            </button>
          </div>
          <div>
            <h6>
              Continuando con la compra acepta los Terminos y Condiciones de
              Marbella y el uso de las cookies
            </h6>
          </div>
        </div>
      ) : (
        <div className="Finish-No-User">
          <FinishProgress number={1} />
          <OrderSummary />
          <h4>DATOS DEL CLIENTE</h4>
          <div className="Form-Name">
            <h5>Nombre</h5>
            <input
              type="name"
              name="name"
              placeholder="Ingresa tu nombre"
              className={
                nameError ? "Form-Name-Input-Wrong" : "Form-Name-Input"
              }
              onChange={(e) => inputHandler("user", e)}
            />
            <h5>Apellido</h5>
            <input
              type="lastname"
              name="lastname"
              placeholder="Ingresa tu apellido"
              className={
                lastnameError ? "Form-Name-Input-Wrong" : "Form-Name-Input"
              }
              onChange={(e) => inputHandler("user", e)}
            />
            <h5>Email</h5>
            <input
              type="email"
              name="email"
              placeholder="Ingresa tu email"
              className={
                emailError ? "Form-Name-Input-Wrong" : "Form-Name-Input"
              }
              onChange={(e) => inputHandler("user", e)}
            />
            <h5>Celular</h5>
            <input
              type="phonenumber"
              name="phone"
              placeholder="Ingresa tu número de celular"
              className="Form-Name-Input"
              onChange={(e) => inputHandler("user", e)}
            />
          </div>
          <h4>DATOS DE ENVIO</h4>
          <div className="Form-Shipping">
            <h5>Calle</h5>
            <input
              type="street"
              name="street"
              placeholder="Ingresa tu direccion"
              className={
                streetError ? "Form-Name-Input-Wrong" : "Form-Name-Input"
              }
              onChange={(e) => inputHandler("shipping", e)}
            />
            <h5>Número</h5>
            <input
              type="number"
              name="number"
              placeholder="Ingresa la altura"
              className={
                numberError ? "Form-Name-Input-Wrong" : "Form-Name-Input"
              }
              onChange={(e) => inputHandler("shipping", e)}
            />
            <h5>Departamento {"(Opcional)"}</h5>
            <input
              type="text"
              name="department"
              placeholder="Ingresa el numero de piso y departamento"
              className={
                numberError ? "Form-Name-Input-Wrong" : "Form-Name-Input"
              }
              onChange={(e) => inputHandler("shipping", e)}
            />
            <h5>Provincia</h5>
            <select
              name="province"
              id=""
              className={
                provinceError ? "Form-Name-Select-Wrong" : "Form-Name-Select"
              }
              type="province"
              onChange={(e) => inputHandler("shipping", e)}
            >
              <option value="-">-</option>
              <option value="Capital Federal" name="Capital Federal">
                Capital Federal
              </option>
              <option value="Buenos Aires" name="Buenos Aires">
                Buenos Aires
              </option>
              <option value="Salta" name="Salta">
                Salta
              </option>
              <option value="Cordoba" name="Cordoba">
                Cordoba
              </option>
              <option value="Tucuman" name="Tucuman">
                Tucuman
              </option>
              <option value="Jujuy" name="Jujuy">
                Jujuy
              </option>
            </select>
            <h5>Localidad</h5>
            <input
              type="text"
              name="locality"
              placeholder="Ingresa la localidad de envío"
              className={
                localityError ? "Form-Name-Input-Wrong" : "Form-Name-Input"
              }
              onChange={(e) => inputHandler("shipping", e)}
            />
            <h5>Código Postal</h5>
            <input
              type="number"
              name="zipCode"
              placeholder="Ingresa tu código postal"
              className={
                zipCodeError ? "Form-Name-Input-Wrong" : "Form-Name-Input"
              }
              onChange={(e) => inputHandler("shipping", e)}
            />
          </div>
          <div className="Button-Finish-Container">
            <button
              className="Finish-Purchase-Continue"
              onClick={() => {
                submitHandler();
              }}
            >
              CONTINUAR
            </button>
          </div>
          <div>
            <h6>
              Continuando con la compra acepta los Terminos y Condiciones de
              Marbella y el uso de las cookies
            </h6>
          </div>
        </div>
      )}
      <FinishSectionCart number={1} />
    </div>
  );
};

export default FinishPurchase;
