import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { AppContext } from "../../AppContext/AppContext";
import * as AiIcons from "react-icons/ai";
import * as GrIcons from "react-icons/gr";
import * as IoIcons from "react-icons/io";

let Sidebar = () => {
  let { closePopUp, popUpSet } = useContext(AppContext);
  let [selector, setSelector] = useState(false);
  return (
    <div className="Sidebar" id="sidebarPop">
      <div className="Sidebar-Head">
        <AiIcons.AiOutlineUser className="Sidebar-Head-Icon" />
        <AiIcons.AiOutlineClose
          className="Sidebar-Head-Icon"
          onClick={() => {
            closePopUp({
              elementId: "sidebarPop",
              classname: "Sidebar-Out",
              popUp: ["Sidebar"],
            });
          }}
        />
      </div>
      <div className="Sidebar-Menu">
        <h4 className="Sidebar-Shop">SHOP</h4>
        <div
          className="Sidebar-Search"
          onClick={() => popUpSet("Search", true)}
        >
          <div className="Sidebar-Search-Block">
            <GrIcons.GrSearch className="Sidebar-Search-Icon" />
            Try a product
          </div>
        </div>
      </div>
      <div className="Sidebar-Selector">
        <div className="Sidebar-Products-Selector-Big">
          <div
            className="Sidebar-Products-Selector"
            onClick={() => setSelector(!selector)}
          >
            PRODUCTS
            <IoIcons.IoIosArrowDown className="Sidebar-Selector-Icon" />
          </div>
          <div
            className={
              selector
                ? "Sidebar-Selector-Options"
                : "Sidebar-Selector-Options-Off"
            }
          >
            <a href="/products" className="Sidebar-Selector-Option">
              All Products
            </a>
            <a className="Sidebar-Selector-Option">Remera Basic Negra</a>
            <a className="Sidebar-Selector-Option">Remera Basic Blanca</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
