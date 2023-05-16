import React, { createContext, useContext, useReducer } from "react";
import { ACTIONS } from "../helpers/const";

const cartContext = createContext();

export const useCart = () => useContext(cartContext);

const INIT_STATE = {
  cart: {
    products: [],
    totalPrice: 0,
  },
  cartLength: 0,
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case ACTIONS.cart:
      return { ...state, cart: action.payload };
    case ACTIONS.cartLength:
      return { ...state, cartLength: action.payload };
    default:
      return state;
  }
}

function getDataFromLS() {
  let data = JSON.parse(localStorage.getItem("cart"));
  if (!data) {
    data = {
      products: [],
      totalPrice: 0,
    };
  }
  return data;
}

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  function getCart() {
    const data = getDataFromLS();

    dispatch({
      type: ACTIONS.cart,
      payload: data,
    });
  }

  function addProductToCart(product) {
    let data = getDataFromLS();
    data.product.push({ ...product, count: 1, subPrice: +product.price });
  }

  const values = {
    cart: state.cart,
    getCart,
  };

  return <cartContext.Provider value={values}>{children}</cartContext.Provider>;
};

export default CartContextProvider;
