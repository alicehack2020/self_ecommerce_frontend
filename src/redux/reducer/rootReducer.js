import { combineReducers } from "redux";
import getProductData from "../reducer/productReducer"
import generalReducer from "./generalReducer";
import getBascketData from "./cartReducer"

const rootReducer = combineReducers({
  getProductData,
  generalReducer,
  getBascketData
});

export default rootReducer;