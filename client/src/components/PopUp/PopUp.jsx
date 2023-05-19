import { useContext } from "react";
import Search from "../SearchBar/Search";
import { AppContext } from "../../AppContext/AppContext";
import Cart from "../Cart/Cart";
import Sidebar from "../Sidebar/Sidebar";

const PopUp = () => {
  const { popUpSearch, popUpCart, popUpSidebar } = useContext(AppContext);
  return (
    <>
      {popUpSearch && <Search />}
      {popUpCart && <Cart />}
      {popUpSidebar && <Sidebar />}
    </>
  );
};

export default PopUp;
