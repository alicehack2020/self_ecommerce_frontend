import { GET_CART, UPDATE_CART } from "../type";

const initialState = {
  isCartOpen: false,
};

const generalReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        isCartOpen: false,
      };
    case UPDATE_CART:
      return {
        ...state,
        isCartOpen:!state.isCartOpen,
      };
    default:
      return state;
  }
};

export default generalReducer;
