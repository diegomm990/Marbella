import React, { useContext, useState } from "react";
import "./Contact.css";
import { contactMail } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
import { AppContext } from "../../AppContext/AppContext";

const Contact = () => {
  let { popUpSet } = useContext(AppContext);
  let dispatch = useDispatch();
  let [contactForm, setContactForm] = useState({
    name: "",
    lastname: "",
    cellphone: "",
    email: "",
    comment: "",
  });
  let [nameError, setNameError] = useState(false);
  let [lastnameError, setLastnameError] = useState(false);
  let [emailError, setEmailError] = useState(false);
  let [contactError, setContactError] = useState(false);
  let emptyForm = () => {
    setContactForm({
      name: "",
      lastname: "",
      cellphone: "",
      email: "",
      comment: "",
    });
  };
  let inputHandler = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };
  let submitHandler = () => {
    let form = true;
    if (nameError) {
      setNameError(true);
      form = false;
    }
    if (lastnameError) {
      setLastnameError(true);
      form = false;
    }
    if (emailError) {
      setEmailError(true);
      form = false;
    }
    if (contactError) {
      setContactError(true);
      form = false;
    }
    if (!form) {
      popUpSet("Form", true);
      popUpSet("Notification", true);
    } else {
      dispatch(contactMail(contactForm)).then(() => {
        popUpSet("Comment", true);
        popUpSet("Notification", true);
      });
      emptyForm();
    }
  };
  return (
    <div className="Contact-Main">
      <div className="Contact-Contact">
        <h1>CONTACTO</h1>
        <div className="Contact-Name">
          <h5>Nombre</h5>
          <input
            type="name"
            name="name"
            value={contactForm.name}
            placeholder="Ingresa tu nombre"
            className={
              nameError ? "Contact-Name-Input-Wrong" : "Contact-Name-Input"
            }
            onChange={(e) => inputHandler(e)}
          />
          <h5>Apellido</h5>
          <input
            type="lastname"
            name="lastname"
            value={contactForm.lastname}
            placeholder="Ingresa tu apellido"
            className={
              lastnameError ? "Contact-Name-Input-Wrong" : "Contact-Name-Input"
            }
            onChange={(e) => inputHandler(e)}
          />
          <h5>Email</h5>
          <input
            type="email"
            name="email"
            value={contactForm.email}
            placeholder="Ingresa tu email"
            className={
              emailError ? "Contact-Name-Input-Wrong" : "Contact-Name-Input"
            }
            onChange={(e) => inputHandler(e)}
          />
          <h5>Celular</h5>
          <input
            type="number"
            name="cellphone"
            value={contactForm.cellphone}
            placeholder="Ingresa tu celular (Opcional)"
            className="Contact-Name-Input"
            onChange={(e) => inputHandler(e)}
          />
          <h5>Comentario</h5>
          <textarea
            name="comment"
            value={contactForm.comment}
            placeholder="Ingresa el comentario o pregunta"
            className={
              contactError ? "Contact-Text-Input-Wrong" : "Contact-Text-Input"
            }
            onChange={(e) => inputHandler(e)}
          />
          <button
            className="Contact-Contact-Button"
            onClick={() => submitHandler()}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
