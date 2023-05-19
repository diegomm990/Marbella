import React, { useContext, useState } from "react";
import "./Search.css";
import { AppContext } from "../../AppContext/AppContext";
import * as SlIcons from "react-icons/sl";
import * as AiIcons from "react-icons/ai";
import * as GrIcons from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../../redux/actions/actions";
import MiniProduct from "./MiniProdSearch";
let Search = () => {
  let dispatch = useDispatch();
  let { popUpSearch, popUpSet, closePopUp } = useContext(AppContext);
  let [recentlyViwed, setRecentlyViwed] = useState(true);
  let [search, setSearch] = useState(false);
  const inputHandler = (e) => {
    setSearch(e.target.value);
    dispatch(searchProducts(e.target.value));
  };
  let products = useSelector((state) => state.productSearch?.slice(0, 5));
  return (
    <div className="Search" id="searchPop">
      <div className="Search-Header">
        <SlIcons.SlArrowLeft
          className="Search-Arrow-Back"
          onClick={() => {
            closePopUp({
              elementId: "searchPop",
              classname: "Search-Out",
              popUp: ["Search", "Courtain"],
            });
          }}
        />
        <input
          type="text"
          name=""
          id=""
          className="Search-Search-Block"
          placeholder="Try a product"
          onChange={(e) => inputHandler(e)}
        />
        <AiIcons.AiOutlineClose
          className="Search-Cross-Icon"
          onClick={() => {
            if (search) {
              closePopUp({
                elementId: "searchPop",
                classname: "Search-Out-Products",
                popUp: ["Search", "Courtain"],
              });
            } else {
              closePopUp({
                elementId: "searchPop",
                classname: "Search-Out",
                popUp: ["Search", "Courtain"],
              });
            }
          }}
        />
      </div>
      {search ? (
        <div className="Search-Products">
          <div className="Search-Products-Names">
            <h4 className="Search-Products-Names-Title">SUGERENCIAS</h4>
            <div className="Products-Name-List">
              {products?.slice(0, 3).map((p) => {
                return (
                  <a href={`/products/${p._id}`} className="Listname-Name">
                    {p.name}
                  </a>
                );
              })}
            </div>
          </div>
          <div className="Search-Products-Body">
            <h4 className="Search-Products-Names-Title"> PRODUCTOS</h4>
            <div className="Search-Products-Products">
              {products?.map((p) => {
                return <MiniProduct p={p} />;
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="Search-Body">
          <div className="Search-Trending-Body">
            <div className="Search-Trending-Title">BUSQUEDAS FRECUENTES</div>
            <div className="Search-Trends">
              <a className="Search-Trend">BASIC NEGRA</a>
              <a className="Search-Trend">BASIC BLANCA</a>
            </div>
          </div>
          <div className="Search-Recently-Viwed">
            <div
              className={
                recentlyViwed ? "Search-Trending-Title" : "Visibility-Hidden"
              }
            >
              VISTO RECIENTEMENTE{" "}
              <button className="Search-Recently-Viwed-Clear">Borrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
