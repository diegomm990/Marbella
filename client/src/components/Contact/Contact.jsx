import React from "react";
import './Contact.css';

const Contact = () => {
    return (
        <div className="Contact-Main">
            <div className="Contact-Contact">
                <h1>CONTACTO</h1>
                <div className="Contact-Form">
                    <div className="Contact-Form-1">
                        <input type="text" placeholder="Nombre" className="Contact-Form-Block-1"/>
                        <input type="text" placeholder="Número de teléfono"  className="Contact-Form-Block-1"/>
                    </div>
                    <div className="Contact-Form-2">
                        <input type="text" placeholder="Correo Electronico" className="Contact-Form-Block-2"/>
                    </div>
                    <div className="Contact-Form-3">
                        <textarea type="text" placeholder="Comentario" className="Contact-Form-Block-3"/>
                    </div>
                    <button className="Contact-Form-Button">Enviar</button>
                </div>
            </div>
        </div>
    )
}

export default Contact;