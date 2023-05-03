import { combineReducers } from "redux";
import  getProductData from "../reducer/productReducer"
import  generalReducer from "../reducer/generalReducer"
const rootReducer = combineReducers({ getProductData,generalReducer})

export default rootReducer;