import { combineReducers } from "redux";
import  getCryptoData from "../reducer/cryptoReducer"
const rootReducer = combineReducers({ getCryptoData})

export default rootReducer;