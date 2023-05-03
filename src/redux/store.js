// import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer/rootReducer";
import { applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

// const store = createStore(rootReducer)
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})
export default store;