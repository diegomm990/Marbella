import { useContext } from "react";
import Search from "../SearchBar/Search";
import { AppContext } from "../../AppContext/AppContext";
import Cart from "../Cart/Cart";
import Sidebar from "../Sidebar/Sidebar";
import Notification from "./Notification";
import ImageProduct from "./Image";
import SizeGuide from "./SizeGuide";

const PopUp = () => {
  const {
    popUpSearch,
    popUpCart,
    popUpSidebar,
    popUpNotification,
    popUpImage,
    popUpSizeGuide,
  } = useContext(AppContext);
  return (
    <>
      {popUpSearch && <Search />}
      {popUpCart && <Cart />}
      {popUpSidebar && <Sidebar />}
      {popUpNotification && <Notification />}
      {popUpImage && <ImageProduct />}
      {popUpSizeGuide && <SizeGuide />}
    </>
  );
};

export default PopUp;
