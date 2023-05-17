import React, { createContext, useContext, useReducer } from "react";
import { ACTIONS, calcSubPrice, totalSumFunc } from "../helpers/const";
import { notify } from "../components/Toastify";

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
    let len = 0;
    data.products.forEach((item) => {
      len += item.count;
    });

    dispatch({
      type: ACTIONS.cart,
      payload: data,
    });

    dispatch({
      type: ACTIONS.cartLength,
      payload: len,
    });
  }

  function addProductToCart(product) {
    let data = getDataFromLS();

    const isInCart = data.products.some((item) => item.id === product.id);

    if (isInCart) {
      deleteFromCart(product.id);
      return;
    } else {
      data.products.push({ ...product, count: 1, subPrice: +product.price });
    }

    data.totalPrice = totalSumFunc(data.products);
    localStorage.setItem("cart", JSON.stringify(data));
    getCart();
    notify("Successfully added to cart");
  }

  function changeProductCount(count, id) {
    const cart = getDataFromLS();

    cart.products = cart.products.map((product) => {
      if (product.id === id) {
        product.count = count;
        product.subPrice = calcSubPrice(product);
      }
      return product;
    });
    cart.totalPrice = totalSumFunc(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));
    getCart();
  }

  function deleteFromCart(id) {
    const data = getDataFromLS();
    data.products = data.products.filter((item) => item.id !== id);

    data.totalPrice = totalSumFunc(data.products);
    localStorage.setItem("cart", JSON.stringify(data));
    getCart();
    notify("Successfully removed from cart");
  }

  function isAlreadyInCart(id) {
    const data = getDataFromLS();

    const isInCart = data.products.filter((item) => item.id === id);
    return isInCart.lenght > 0 ? true : false;
  }

  const values = {
    cart: state.cart,
    cartLength: state.cartLength,
    getCart,
    addProductToCart,
    changeProductCount,
    deleteFromCart,
    isAlreadyInCart,
  };

  return <cartContext.Provider value={values}>{children}</cartContext.Provider>;
};

export default CartContextProvider;
