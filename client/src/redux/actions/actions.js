import axios from "axios";
import {
  GET_PRODUCTS,
  GET_BY_ID,
  ADD_TO_CART,
  CHANGE_FROM_CART,
  ADD_COUNT_PROD,
  DELETE_FROM_CART,
  SEARCH_PRODUCTS,
  CREATE_USER,
  GET_USER,
  LOG_IN,
  LOG_OUT,
  GET_SALES,
  GET_SALES_ID,
  CART_USER,
  EMPTY_CART,
  FINAL_NO_USER,
} from "./actionTypes";

export const getAllProducts = () => {
  return async (dispatch) => {
    const products = await axios.get(`http://localhost:3001/products`);
    dispatch({
      type: GET_PRODUCTS,
      payload: products.data,
    });
  };
};

export const searchProducts = (search) => {
  return async (dispatch) => {
    const products = await axios.get(
      `http://localhost:3001/products?search=${search}`
    );
    dispatch({
      type: SEARCH_PRODUCTS,
      payload: products.data,
    });
  };
};

export const getById = (id) => {
  return async (dispatch) => {
    const product = await axios.get(`http://localhost:3001/products/${id}`);
    dispatch({
      type: GET_BY_ID,
      payload: product.data,
    });
  };
};

export const addToCart = (payload) => {
  return {
    type: ADD_TO_CART,
    payload,
  };
};

export const changeFromCart = (payload) => {
  return {
    type: CHANGE_FROM_CART,
    payload,
  };
};

export const addCount = (payload) => {
  return {
    type: ADD_COUNT_PROD,
    payload,
  };
};

export const deleteFromCart = (payload) => {
  return {
    type: DELETE_FROM_CART,
    payload,
  };
};

export const createUser = (paylaod) => {
  return async (dispatch) => {
    const user = await axios.put(
      `http://localhost:3001/users/createUser`,
      paylaod
    );
    dispatch({
      type: CREATE_USER,
      payload: user.data,
    });
  };
};

export const logedUser = (payload) => {
  return {
    type: GET_USER,
    payload,
  };
};

export const logIn = () => {
  return {
    type: LOG_IN,
  };
};

export const logOut = () => {
  return {
    type: LOG_OUT,
  };
};

export const payment = (payload) => {
  return async function () {
    try {
      const pago = await axios.post(`http://localhost:3001/payment`, payload);
      return pago.data;
    } catch (error) {
      return error.response;
    }
  };
};

export const getAllSales = () => {
  return async function (dispatch) {
    try {
      const sales = await axios.get("http://localhost:3001/sales");
      dispatch({
        type: GET_SALES,
        payload: sales.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getSaleById = (payload) => {
  return async function () {
    try {
      const sale = await axios.get(
        `http://localhost:3001/sales/getById/${payload}`
      );
      return sale.data;
    } catch (error) {
      console.log(error);
    }
  };
};

export const getSaleByUser = (payload) => {
  return async function (dispatch) {
    try {
      const sales = await axios.get(
        `http://localhost:3001/sales/getSalesByUser/${payload}`
      );
      dispatch({
        type: GET_SALES_ID,
        payload: sales.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const createSale = (payload) => {
  return async function () {
    try {
      const sale = await axios.post(
        `http://localhost:3001/sales/createSale`,
        payload
      );
      return sale.data;
    } catch (error) {
      console.log(error);
    }
  };
};

export const approveSale = (payload) => {
  return async function () {
    try {
      const saleApp = await axios.post(
        `http://localhost:3001/sales/approveSale/${payload}`
      );
      return saleApp;
    } catch (error) {
      console.log(error);
    }
  };
};

export const createCart = (payload) => {
  return async function () {
    try {
      const cart = await axios.post(
        "http://localhost:3001/cart/createCart",
        payload
      );
      return cart.data;
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCartByUser = (payload) => {
  return async function (dispatch) {
    try {
      const userCart = await axios.get(
        `http://localhost:3001/cart/getCartByUser/${payload}`
      );
      dispatch({
        type: CART_USER,
        payload: userCart.data[0].products,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCartById = (payload) => {
  return async function (dispatch) {
    try {
      const userCart = await axios.get(
        `http://localhost:3001/cart/getCartById/${payload}`
      );
      dispatch({
        type: CART_USER,
        payload: userCart.data.products,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const logInUpdateCart = (payload) => {
  return async function () {
    try {
      const updated = await axios.post(
        `http://localhost:3001/cart/logIn`,
        payload
      );
      return updated;
    } catch (error) {
      console.log(error);
    }
  };
};

export const manageCart = (payload) => {
  return async function (dispatch) {
    try {
      let updated = await axios.post(
        `http://localhost:3001/cart/manageCart`,
        payload
      );
      dispatch({
        type: CART_USER,
        payload: updated.data.products,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteFromCartDB = (payload) => {
  return async function (dispatch) {
    try {
      let deleted = await axios.post(
        `http://localhost:3001/cart/deleteFromCart`,
        payload
      );
      dispatch({
        type: CART_USER,
        payload: deleted.data.products,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const substractStock = (payload) => {
  return async function () {
    try {
      let substracted = await axios.post(
        "http://localhost:3001/stock/manageStock",
        payload
      );
      return substracted.data;
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCartIdByUser = (payload) => {
  return async function () {
    try {
      const userCart = await axios.get(
        `http://localhost:3001/cart/getCartByUser/${payload}`
      );
      return userCart.data[0]._id;
    } catch (error) {
      console.log(error);
    }
  };
};

export const checkSale = (payload) => {
  return async function () {
    try {
      let saleChecked = await axios.post(
        `http://localhost:3001/cart/checkSale/${payload}`
      );
      return saleChecked.data;
    } catch (error) {
      console.log(error);
    }
  };
};

export const emptyCart = () => {
  return {
    type: EMPTY_CART,
  };
};

export const replaceCart = (payload) => {
  return async function (dispatch) {
    try {
      let cart = await axios.post(
        `http://localhost:3001/cart/replaceCart/`,
        payload
      );
      dispatch({
        type: CART_USER,
        payload: cart.data.products,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getHomeBlocks = () => {
  return async function (dispatch) {
    try {
      let homeBlocks = await axios.get("http://localhost:3001/homeBlock");
      return homeBlocks.data;
    } catch (error) {
      console.log(error);
    }
  };
};

export const addInfoSale = (payload) => {
  return async function (dispatch) {
    try {
      let info = await axios.post(
        "http://localhost:3001/cart/addInfoToCart",
        payload
      );
      localStorage.setItem("finalCart", JSON.stringify(info.data));
      dispatch({
        type: FINAL_NO_USER,
        payload: info.data,
      });
    } catch (error) {}
  };
};