import { useContext } from "react";
import Search from "../SearchBar/Search";
import { AppContext } from "../../AppContext/AppContext";
import Cart from "../Cart/Cart";
import Sidebar from "../Sidebar/Sidebar";
import Notification from "./Notification";

const PopUp = () => {
  const { popUpSearch, popUpCart, popUpSidebar, popUpNotification } =
    useContext(AppContext);
  return (
    <>
      {popUpSearch && <Search />}
      {popUpCart && <Cart />}
      {popUpSidebar && <Sidebar />}
      {popUpNotification && <Notification />}
    </>
  );
};

export default PopUp;
