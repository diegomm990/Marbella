import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Product from "./components/Product/Product";
import Footer from "./components/Footer/Footer";
import Contact from "./components/Contact/Contact";
import Account from "./components/Account/Account";
import FinishPurchase from "./components/FinishPurchase/FinishPurchase";
import AddressForm from "./components/AddressForm/AddressForm";
import ReviewData from "./components/ReviewData/ReviewData";
import ApprovingSale from "./components/ApprovingSale/ApprovingSale";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import MyPurchases from "./components/MyPurchases/MyPurchases";
import NavBar from "./components/Nav/NavBar";
import Sign from "./components/SignIn/Sign";
import AppContextComponent from "./AppContext/AppContext";
import PopUp from "./components/PopUp/PopUp";
import Shipping from "./components/Shipping/Shipping";
import Payment from "./components/Payment/Payment";
import PurchaseFinished from "./components/PurchaseFinished/PurchaseFinished";

function App() {
  return (
    <AppContextComponent>
      {/* <Nav/> */}
      <NavBar />
      <PopUp />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signIn" element={<Sign />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/account" element={<Account />} />
        <Route path="/finishPurchase" element={<FinishPurchase />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/addressForm" element={<AddressForm />} />
        <Route path="/purchaseFinished" element={<PurchaseFinished />} />
        <Route path="/reviewData" element={<ReviewData />} />
        <Route path="/approvingSale" element={<ApprovingSale />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="/myPurchases" element={<MyPurchases />} />
      </Routes>
      <Footer />
    </AppContextComponent>
  );
}

export default App;
