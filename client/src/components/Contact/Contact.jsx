import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  let [nameError, setNameError] = useState(false);
  let [lastnameError, setLastnameError] = useState(false);
  let [emailError, setEmailError] = useState(false);
  let [contactError, setContactError] = useState(false);
  return (
    <div className="Contact-Main">
      <div className="Contact-Contact">
        <h1>CONTACTO</h1>
        <div className="Contact-Name">
          <h5>Nombre</h5>
          <input
            type="name"
            name="name"
            placeholder="Ingresa tu nombre"
            className={
              nameError ? "Contact-Name-Input-Wrong" : "Contact-Name-Input"
            }
          />
          <h5>Apellido</h5>
          <input
            type="lastname"
            name="lastname"
            placeholder="Ingresa tu apellido"
            className={
              lastnameError ? "Contact-Name-Input-Wrong" : "Contact-Name-Input"
            }
          />
          <h5>Email</h5>
          <input
            type="email"
            name="email"
            placeholder="Ingresa tu email"
            className={
              emailError ? "Contact-Name-Input-Wrong" : "Contact-Name-Input"
            }
          />
          <h5>Comentario</h5>
          <textarea
            name="textarea"
            placeholder="Ingresa el comentario o pregunta"
            className={
              contactError ? "Contact-Text-Input-Wrong" : "Contact-Text-Input"
            }
          />
          <button className="Contact-Contact-Button">Enviar</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
