import React, { useState } from "react";
import "./AdminPanel.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllSales } from "../../redux/actions/actions";

let AdminPanel = () => {
  let dispatch = useDispatch();
  let user = JSON.parse(localStorage.getItem("user"));
  let admin = user.admin;
  let [sales, setSales] = useState(false);
  let ventas = () => {
    dispatch(getAllSales());
    setSales(true);
  };
  let salesArray = useSelector((state) => state.sales);
  return (
    <div className="AdminPanel">
      {admin ? (
        <div className="AdminPanel-True">
          <button onClick={() => ventas()}>Ver todas las ventas</button>
          {sales ? (
            <div className="AdminPanel-Sales-True">
              <h1>Ventas:</h1>
              {salesArray?.map((sale) => {
                return (
                  <div>
                    <h4>Orden: #{sale.orderNumber}</h4>
                    <h4>Estado: {sale.approved ? "Aprobada" : "Pendiente"}</h4>
                    <h4>Envio: En Proceso</h4>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="AdminPanel-Sales-False"></div>
          )}
        </div>
      ) : (
        <div className="AdminPanel-False">
          <h1>No eres administrador</h1>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
