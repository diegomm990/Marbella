import { useContext } from "react";
import "./SizeGuide.css";
import { AppContext } from "../../AppContext/AppContext";

let SizeGuide = () => {
  let { popUpSet } = useContext(AppContext);

  return (
    <div className="SizeGuide">
      <div className="Courtain-Guide"></div>
      <button
        className="Button-Close-Guide"
        onClick={() => popUpSet("SizeGuide", false)}
      >
        X
      </button>
      <img
        src="https://firebasestorage.googleapis.com/v0/b/marbelladb-ee6df.appspot.com/o/SizeGuide.jpg?alt=media&token=ac34d159-01c2-43b2-b901-87033358d228"
        alt="sizeguide"
        className="SizeGuide-Image"
      />
    </div>
  );
};

export default SizeGuide;
