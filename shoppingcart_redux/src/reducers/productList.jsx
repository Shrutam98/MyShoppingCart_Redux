import { ACTION_TYPES } from "actions/productList";
const initialState = {
  list: [],
};

export const productList = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_ALL_PRODUCT:
      return {
        ...state,
        list: [...action.payload],
      };
    case ACTION_TYPES.CREATE_PRODUCT:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case ACTION_TYPES.UPDATE_PRODUCT:
      return {
        ...state,
        list: state.list.map((x) =>
          x.productId === action.payload.id ? action.payload : x
        ),
      };
    case ACTION_TYPES.DELETE_PRODUCT:
      return {
        ...state,
        list: state.list.filter((x) => x.productId !== action.payload),
      };

    default:
      return state;
  }
};
