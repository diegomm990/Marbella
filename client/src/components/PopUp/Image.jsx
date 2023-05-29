import { useSelector } from "react-redux";
import "./Image.css";
import { useContext, useState } from "react";
import { AppContext } from "../../AppContext/AppContext";

let ImageProduct = (direction) => {
  let { popUpSet } = useContext(AppContext);
  let product = useSelector((state) => state.product);
  let [image, setImage] = useState(0);
  let changeImage = (direction) => {
    if (direction === "right") {
      if (image < product.images.length - 1) {
        setImage(image + 1);
      }
    } else {
      if (image > 0) {
        setImage(image - 1);
      }
    }
  };
  return (
    <div className="Image-Big">
      <div className="Courtain-Image"></div>
      <button
        className="Button-Close-Pop-Up"
        onClick={() => popUpSet("Image", false)}
      >
        X
      </button>
      <button
        className="Button-Change-Image"
        onClick={() => changeImage("left")}
      >
        {"<"}
      </button>
      <button
        className="Button-Change-Image"
        onClick={() => changeImage("right")}
      >
        {">"}
      </button>
      <img src={product.images[image]} alt="" className="Image-Product-Big" />
    </div>
  );
};

export default ImageProduct;
