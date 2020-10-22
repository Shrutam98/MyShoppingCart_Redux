import { combineReducers } from "redux";
import { categoryList } from "reducers/categoryList";
import { productList } from "reducers/productList";

export const reducers = combineReducers({
  categoryList,
  productList,
});
