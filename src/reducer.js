export const initialState = {
  basket: [],
  authTokens: localStorage.getItem("amazone-authTokens")
    ? JSON.parse(localStorage.getItem("amazone-authTokens"))
    : null,
  user: null,
};

export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => amount + item.price, 0);

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };
    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(`Cant remove product with id ${action.id}`);
      }

      return {
        ...state,
        basket: newBasket,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_AUTH_TOKENS":
      localStorage.setItem("amazone-authTokens", JSON.stringify(action.tokens));

      return {
        ...state,
        authTokens: action.tokens,
      };
    default:
      return state;
  }
};

export default reducer;
