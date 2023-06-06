import React, { useEffect } from "react";
import "./PurchaseCart.css";
import { useDispatch, useSelector } from "react-redux";
import { getSaleById, setSaleInReducer } from "../../redux/actions/actions";

let PurchaseCart = () => {
  let dispatch = useDispatch();
  let saleObj = useSelector((state) => state.sale);
  useEffect(() => {
    dispatch(getSaleById(localStorage.getItem("saleObj"))).then((e) => {
      dispatch(setSaleInReducer(e));
    });
  }, []);
  return (
    <div className="Purchase-Cart">
      <h4 className="Purchase-Cart-Title">TU COMPRA</h4>
      <div className="Purchase-Cart-Products">
        {saleObj?.products?.map((p) => {
          return (
            <div className="Purchase-Cart-Product">
              <div className="Purchase-Cart-Product-Image-Container">
                <img
                  src={p.image}
                  alt={p.name}
                  className="Purchase-Cart-Product-Image"
                />
                <div className="Purchase-Cart-Product-Quantity">
                  {p.quantity}
                </div>
              </div>
              <div className="Purchase-Cart-Product-Info">
                <h5 className="Purchase-Cart-Product-Name">{p.name}</h5>
                <h5 className="Purchase-Cart-Product-Size">Talle: {p.sizes}</h5>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PurchaseCart;
