import { useContext } from "react";
import "./ProductAdded.css";
import { AppContext } from "../../AppContext/AppContext";

let ProductAdded = () => {
  let { popUpSet } = useContext(AppContext);
  return (
    <div className="Product-Added">
      Producto agregado al carrito.
      <button
        className="Product-Added-Button"
        onClick={() => {
          popUpSet("Cart", true);
          popUpSet("Courtain", true);
        }}
      >
        Ver Carrito
      </button>
    </div>
  );
};

export default ProductAdded;
