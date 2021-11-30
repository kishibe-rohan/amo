import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productsReducer,
  productDetailsReducer,
} from "./reducers/productReducer";

import {
  userReducer,
  profileReducer,
  userDetailsReducer,
  forgotPasswordReducer,
  allUsersReducer,
} from "./reducers/userReducer";

const reducer = combineReducers({
  products: productsReducer,
  product: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  userDetails: userDetailsReducer,
  forgotPassword: forgotPasswordReducer,
  users: allUsersReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
