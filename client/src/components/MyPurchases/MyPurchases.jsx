import React, {  useState } from "react";
import './MyPurchases.css';
import { useDispatch, useSelector } from "react-redux";
import {  getSaleByUser } from "../../redux/actions/actions";

let MyPurchases = () => {
    let dispatch = useDispatch();
    let user = JSON.parse(localStorage.getItem('user'));
    let id = user._id;
    let sales = useSelector((state)=> state.salesById);
    let [ventas , setVentas] = useState(false)
    let salesById = ()=> {  
        dispatch(getSaleByUser(id));
        setVentas(!ventas)
    }
    return (
        <div className="MyPurchases">
            <button onClick={()=> salesById()} className="MyPur-Button">Ver tus compras</button>
            <div className={ventas ? "MyPurchases-Block" : "MyPurchases-Block-No"} >
                {
                    sales?.map((sale)=> {
                         return <div className="MiniSale-MyPur">
                            <h4>Orden: #{sale.orderNumber}</h4>
                            <h4>Estado: {sale.approved? "Aprobada" : "Pendiente"}</h4>
                            <h4>Envio: En Proceso</h4>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default MyPurchases