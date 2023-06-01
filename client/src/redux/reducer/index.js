import { FaListAlt } from "react-icons/fa";
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
  SET_SALE,
} from "../actions/actionTypes";

const initialState = {
  products: [],
  product: {},
  productSearch: [],
  cart: [],
  users: {},
  user: {},
  logIn: false,
  sales: [],
  salesById: [],
  finalNoUser: [],
  sale: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case SEARCH_PRODUCTS:
      return {
        ...state,
        productSearch: action.payload,
      };
    case GET_BY_ID:
      return {
        ...state,
        product: action.payload,
      };
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case CHANGE_FROM_CART:
      return {
        ...state,
        cart: [
          ...state.cart.filter(
            (p) =>
              (p.sizes !== action.payload.sizes &&
                p.name === action.payload.name) ||
              p.name !== action.payload.name
          ),
          action.payload,
        ],
      };
    case DELETE_FROM_CART:
      return {
        ...state,
        cart: [
          ...state.cart.filter(
            (p) =>
              p.name !== action.payload.name ||
              (p.name === action.payload.name &&
                p.sizes !== action.payload.sizes)
          ),
        ],
      };
    case ADD_COUNT_PROD:
      return {
        ...state,
        // cart: [...state.cart.filter(p=> p.id !== action.payload.id), action.payload]
        cart: [
          ...state.cart,
          (state.cart[action.payload.lugar].quantity = action.payload.cantidad),
        ],
      };
    case CREATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case LOG_IN:
      return {
        ...state,
        logIn: true,
      };
    case LOG_OUT:
      return {
        ...state,
        logIn: false,
      };
    case GET_SALES:
      return {
        ...state,
        sales: action.payload,
      };
    case GET_SALES_ID:
      return {
        ...state,
        salesById: action.payload,
      };
    case CART_USER:
      return {
        ...state,
        cart: action.payload,
      };
    case EMPTY_CART:
      return {
        ...state,
        cart: [],
      };
    case FINAL_NO_USER:
      return {
        ...state,
        finalNoUser: action.payload,
      };
    case SET_SALE:
      return {
        ...state,
        sale: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
