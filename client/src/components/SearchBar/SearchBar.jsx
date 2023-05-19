import React, { useEffect, useState } from "react";
import "./SearchBar.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, searchProducts } from "../../redux/actions/actions";
import MiniProduct from "./MiniProdSearch";


const SearchBar = () => {
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getAllProducts());
    },[dispatch])
    const products = useSelector((state)=> state.products);
    function getRandom1(min, max) {
        min = Math.ceil(0);
        max = Math.floor(1);
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
      function getRandom2(min, max) {
        min = Math.ceil(2);
        max = Math.floor(3);
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
    const someProducts = [products[getRandom1()], products[getRandom2()]]
    const inputHandler = (e) => {
        // if (e.target.value === "") {
        //   clearInput();
        // }
        setInput(e.target.value);
        dispatch(searchProducts(e.target.value))
      };
      let filteredProd = useSelector((state)=> state.productSearch);
      if(filteredProd?.length > 4){
        filteredProd = filteredProd.slice(0,4)
      }
    return (
        <div className="SearchBar">
            <input type="text" placeholder="Search" className="SearchBar-Input" value={input} onChange={(e) => inputHandler(e)}/>
            <div className="Search-Drop">
                {input.length > 1 ?
                <div className="Search-Some-Box">
                    <p className="Search-Some">Busqueda</p>
                    <div>
                        {filteredProd?.map((p)=> {
                            return <MiniProduct p={p} />
                        })}         
                    </div>
                </div>
                :
                <div className="Search-Some-Box">
                    <p className="Search-Some">Algunos productos</p>
                    <div>
                        {someProducts?.map((p)=> {
                            return <MiniProduct p={p} />
                        })}         
                    </div>
                </div>
                } 
            </div>
        </div>
    )
}

export default SearchBar;