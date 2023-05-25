import { useContext } from "react";
import "./Notification.css";
import { AppContext } from "../../AppContext/AppContext";
import ProductAdded from "./ProductAdded";
import ChooseSize from "./ChooseSize";
import CompleteData from "./CompleteData";
import Comment from "./Comment";

const Notification = () => {
  const {
    popUpNotification,
    popUpAdded,
    closePopUp,
    popUpSize,
    popUpForm,
    popUpComment,
  } = useContext(AppContext);
  if (popUpNotification) {
    setTimeout(() => {
      closePopUp({
        elementId: "Notification-Pop",
        classname: "Notification-Out",
        popUp: ["Notification"],
      });
    }, 2000);
  }
  return (
    <div className="Notification-Container" id="Notification-Pop">
      {popUpAdded && <ProductAdded />}
      {popUpSize && <ChooseSize />}
      {popUpForm && <CompleteData />}
      {popUpComment && <Comment />}
    </div>
  );
};

export default Notification;
