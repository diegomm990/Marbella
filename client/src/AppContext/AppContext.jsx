import { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextComponent = ({ children }) => {
  const [popUpSidebar, setPopUpSidebar] = useState(false);
  const [popUpSearch, setPopUpSearch] = useState(false);
  const [popUpCart, setPopUpCart] = useState(false);
  const [popUpCourtain, setPopUpCourtain] = useState(false);
  const [popUpNotification, setPopUpNotification] = useState(false);
  const [popUpAdded, setPopUpAdded] = useState(false);
  const [popUpSize, setPopUpSize] = useState(false);
  const [popUpForm, setPopUpForm] = useState(false);
  const [popUpComment, setPopUpComment] = useState(false);
  const popUpSet = (popUp, state) => {
    eval(`setPopUp${popUp}(${state})`);
  };
  const closePopUp = async ({ elementId, classname, popUp }) => {
    const element = document.getElementById(elementId);
    if (element) element.classList.add(classname);
    setTimeout(() => {
      for (let i = 0; i < popUp.length; i++) {
        popUpSet(popUp[i], false);
      }
    }, 400);
  };
  const closePopUpCourtain = async () => {
    let elementId = "";
    let classname = "";
    let popUp = "";

    if (popUpCart) {
      elementId = "cartPop";
      classname = "Cart-Out";
      popUp = "Cart";
    }
    if (popUpSearch) {
      elementId = "searchPop";
      classname = "Search-Out";
      popUp = "Search";
    }
    if (popUpSidebar) {
      elementId = "sidebarPop";
      classname = "Sidebar-Out";
      popUp = "Sidebar";
    }
    const element = document.getElementById(elementId);
    if (element) element.classList.add(classname);
    setTimeout(() => {
      popUpSet(popUp, false);
      popUpSet("Courtain", false);
    }, 500);
  };
  return (
    <AppContext.Provider
      value={{
        popUpSet,
        popUpSidebar,
        popUpSearch,
        popUpCart,
        popUpCourtain,
        popUpNotification,
        popUpAdded,
        popUpSize,
        popUpForm,
        popUpComment,
        closePopUp,
        closePopUpCourtain,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextComponent;
