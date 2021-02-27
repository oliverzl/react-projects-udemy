import App from "./App";

const reducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }
  if (action.type === "REMOVE") {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
    };
  }

  //THIS IS THE REFACTORING OF DECREASE AND INCREASE INTO ONE SINGLE FUNCTION, INSTEAD OF HAVING TWO DISTINCT ACTION.TYPES

  // ------------ INCREASE DISPATCH HERE -----------------
  // if (action.type === "INCREASE") {
  //   let tempCart = state.cart.map((cartItem) => {
  //     if (cartItem.id === action.payload) {
  //       return { ...cartItem, amount: cartItem.amount + 1 };
  //     }
  //     return cartItem;
  //   });
  //   return { ...state, cart: tempCart };
  // }

  //for the decrease, we also want to add the functionality that if we decrease BELOW ONE, we just delete the item entirely from the cart.

  // ------------ DECREASE DISPATCH HERE -----------------
  // if (action.type === "DECREASE") {
  //   let tempCart = state.cart
  //     .map((cartItem) => {
  //       if (cartItem.id === action.payload) {
  //         return { ...cartItem, amount: cartItem.amount - 1 };
  //       }
  //       return cartItem;
  //     })
  //     .filter((cartItem) => cartItem.amount !== 0);
  //   return { ...state, cart: tempCart };
  // }

  // GET_TOTALS:    this action type deals with the icon on the top right corner, showcasing the quantity of all the items inside the cart, and the bottom right corner, where it displays the PRICE.
  if (action.type === "GET_TOTALS") {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;

        cartTotal.total += price * amount;
        cartTotal.amount += amount;
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    total = parseFloat(total.toFixed(2));

    return { ...state, total, amount };
  }

  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }

  if (action.type === "DISPLAY_ITEMS") {
    return { ...state, cart: action.payload, loading: false };
  }

  //this is the updated action.type, for increase and decrease to be in the same dispatch.
  if (action.type === "TOGGLE_AMOUNT") {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          if (action.payload.type === "inc") {
            return { ...cartItem, amount: cartItem.amount + 1 };
          }
          if (action.payload.type === "dec") {
            return { ...cartItem, amount: cartItem.amount - 1 };
          }
        } else return cartItem;
      })
      .filter((cartItem) => cartItem.amount <= 0);
    //after subtracting or adding the cartItems, we then filter out the list. the filter above will only RETURN THE CARTITEMS AMOUNT THAT'S NOT 0. IF IT IS 0, IT IS REMOVED FROM THE CART.
    return { ...state, cart: tempCart };
  }
  return state;
};

export default reducer;
