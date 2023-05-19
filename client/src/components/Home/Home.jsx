import React, { useEffect, useState } from "react";
import "./Home.css";
import Photo2 from "./Wallpaper2.jpg";
import data from "../../data";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getHomeBlocks } from "../../redux/actions/actions";
import { Spinner } from "reactstrap";
import MiniProduct from "../Products/Product-Mini";

const Home = () => {
  let dispatch = useDispatch();
  let [homeBlocks, setHomeBlocks] = useState([]);
  let products = useSelector((state) => state.products);
  useEffect(() => {
    if (!homeBlocks.length) {
      dispatch(getHomeBlocks()).then((e) => setHomeBlocks(e));
    }
    if (!products.length) {
      dispatch(getAllProducts());
    }
  });
  return (
    <div className="Home">
      <div className="Home-Header">
        <img
          src={homeBlocks[0]?.image.desktop}
          alt=""
          className="Home-Image-Big"
        />
        <img
          src={homeBlocks[0]?.image.phone}
          alt=""
          className="Home-Image-Mini"
        />
        <div className="Home-Header-Text">
          <h1 className="Home-Header-Title">{homeBlocks[0]?.title}</h1>
          <h4 className="Home-Header-Description">
            {homeBlocks[0]?.description[0]}
          </h4>
          <h4 className="Home-Header-Description">
            {homeBlocks[0]?.description[1]}
          </h4>
          <button className="Home-Header-Button">
            {homeBlocks[0]?.linkText}
          </button>
        </div>
      </div>
      <div className="Some-Products">
        <h4 className="Some-Title">ALGUNOS PRODUCTOS</h4>
        <div className="Some-Products-Block">
          {products.slice(0, 4).map((p) => {
            return <MiniProduct product={p} key={p._id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
