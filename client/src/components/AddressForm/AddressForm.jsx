import React, { useEffect, useState } from "react";
import "./AddressForm.css";
import axios from "axios";

let AddressForm = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  let [address, setAddress] = useState(false);
  useEffect(() => {
    if (user.address.street !== "") {
      setAddress(true);
    }
  });
  // if(user.address.street !== ""){
  //     setAddress(true)
  // }
  let [userAddress, setUserAddress] = useState({
    email: user.email,
    address: {
      street: "",
      number: 0,
      department: "",
      province: "",
      locality: "",
      zipCode: "",
    },
    phone: 0,
  });
  let inputHandler = (e) => {
    setUserAddress({
      ...userAddress,
      address: {
        ...userAddress.address,
        [e.target.name]: e.target.value,
      },
    });
  };
  let submitHandler = async (e) => {
    // e.preventDefault();
    let form = true;
    if (userAddress.address.street.length < 3) {
      form = false;
      setStreetError(true);
    }
    if (userAddress.address.number.length < 1) {
      form = false;
      setNumberError(true);
    }
    if (userAddress.address.province === "-") {
      form = false;
      setProvinceError(true);
    }
    if (userAddress.address.locality.length < 3) {
      form = false;
      setLocalityError(true);
    }
    if (!userAddress.address.zipCode.length) {
      form = false;
      setZipCodeError(true);
    }
    if (form) {
      setStreetError(false);
      setNumberError(false);
      setProvinceError(false);
      setLocalityError(false);
      setZipCodeError(false);
      try {
        const { data } = await axios.post(
          "http://localhost:3001/users/updateUser",
          userAddress
        );
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data));
        window.location.assign("/finishPurchase");
      } catch (error) {
        console.log(error);
      }
      // console.log(obj);
    } else {
      alert("Completa todos los campos");
    }
  };

  let [streetError, setStreetError] = useState(false);
  let [numberError, setNumberError] = useState(false);
  let [provinceError, setProvinceError] = useState(false);
  let [localityError, setLocalityError] = useState(false);
  let [zipCodeError, setZipCodeError] = useState(false);
  return (
    <div className="Address-Main">
      <div className="Address-Address">
        <h1>DIRECCIÓN DE ENVÍO</h1>
        <div className="Address-Shipping">
          <h5>Calle</h5>
          <input
            type="street"
            name="street"
            placeholder="Ingresa tu direccion"
            className={
              streetError ? "Address-Name-Input-Wrong" : "Address-Name-Input"
            }
            onChange={(e) => inputHandler(e)}
          />
          <h5>Número</h5>
          <input
            type="number"
            name="number"
            placeholder="Ingresa la altura"
            className={
              numberError ? "Address-Name-Input-Wrong" : "Address-Name-Input"
            }
            onChange={(e) => inputHandler(e)}
          />
          <h5>Departamento {"(Opcional)"}</h5>
          <input
            type="text"
            name="department"
            placeholder="Ingresa el numero de piso y departamento"
            className={
              numberError ? "Address-Name-Input-Wrong" : "Address-Name-Input"
            }
            onChange={(e) => inputHandler(e)}
          />
          <h5>Provincia</h5>
          <select
            name="province"
            id=""
            className={
              provinceError
                ? "Address-Name-Select-Wrong"
                : "Address-Name-Select"
            }
            type="province"
            onChange={(e) => inputHandler(e)}
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
              localityError ? "Address-Name-Input-Wrong" : "Address-Name-Input"
            }
            onChange={(e) => inputHandler(e)}
          />
          <h5>Código Postal</h5>
          <input
            type="number"
            name="zipCode"
            placeholder="Ingresa tu código postal"
            className={
              zipCodeError ? "Address-Name-Input-Wrong" : "Address-Name-Input"
            }
            onChange={(e) => inputHandler(e)}
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
      </div>
    </div>
  );
};

export default AddressForm;
