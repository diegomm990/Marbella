import React, { useEffect, useState } from "react";
import "./Products.css";
import data from "./../../data";
import { useDispatch, useSelector } from "react-redux";
import MiniProduct from "./Product-Mini";
import { getAllProducts } from "../../redux/actions/actions";

let Products = () => {
  // const [currentPage, setCurrentPage] = useState(0);

  // let nextPage = () => {
  //     if( data.length <= currentPage + 6){
  //         setCurrentPage(currentPage);
  //     }else {
  //           setCurrentPage(currentPage + 6)
  //     }
  // };
  // let prevPage = () => {
  //     if (currentPage < 9) {
  //       setCurrentPage(0);
  //     } else {
  //       setCurrentPage(currentPage - 6);
  //     }
  //   };
  //   const firstPage = () => {
  //     setCurrentPage(0);
  //   };

  //   const lastPage = () => {
  //     setCurrentPage(data.length - 6);
  // };

  //   useEffect(() => {
  //     firstPage()
  //   }, [data]);

  //   let filteredC = data.slice(currentPage, currentPage + 6);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getAllProducts("H"));
  }, [dispatch]);

  return (
    <div className="background">
      {/* <div className="Products-Buttons">
                <button onClick={firstPage} className="Products-Button">  {'<<'}  </button>
                <button onClick={prevPage} className="Products-Button">  {'<'}   </button>
                <button onClick={nextPage} className="Products-Button">  {'>'}   </button>
                <button onClick={lastPage} className="Products-Button">  {'>>'} </button>
            </div> */}
      <div className="Products">
        {products.map((p) => {
          return <MiniProduct product={p} key={p._id} />;
        })}
      </div>

      {/* <div className="Products-Buttons">
                <button onClick={firstPage} className="Products-Button">  {'<<'}  </button>
                <button onClick={prevPage} className="Products-Button">  {'<'}   </button>
                <button onClick={nextPage} className="Products-Button">  {'>'}   </button>
                <button onClick={lastPage} className="Products-Button">  {'>>'} </button>
            </div> */}
    </div>
  );
};

export default Products;
