import React, { useState, useContext, useReducer, useEffect } from "react";
import cartItems from "./data";
import reducer from "./reducer";

const url = "https://course-api.com/react-useReducer-cart-project";
const AppContext = React.createContext();

const initialState = {
  loading: false,
  //cartItems is an array of objects from data.js.
  cart: [],
  total: 0,
  amount: 0,
};
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const remove = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  //increase and decrease dispatch functions
  // const increase = (id) => {
  //   dispatch({ type: "INCREASE", payload: id });
  // };

  // const decrease = (id) => {
  //   dispatch({ type: "DECREASE", payload: id });
  // };

  //fetch data
  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    const response = await fetch(url);
    const cart = await response.json();
    //whatever we get back from the API, we use it as a payload for dispatch: DISPLAY_ITEMS
    dispatch({ type: "DISPLAY_ITEMS", payload: cart });
  };

  const toggleAmount = (id, type) => {
    dispatch({ type: "TOGGLE_AMOUNT", payload: { id, type } });
  };
  //we want to trigger our fetchData only when our app renders, so we set up another useEffect because there is no limit for useEffects
  useEffect(() => {
    fetchData();
  }, []);

  //we want to set up a useEffect, that will trigger a function call whenever the state.cart changes: this is to set up the display of the total price of all the items.
  useEffect(() => {
    dispatch({ type: "GET_TOTALS" });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        //this is spreading out all the state values from reducer
        ...state,
        clearCart,
        remove,
        // increase,
        // decrease,
        toggleAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
