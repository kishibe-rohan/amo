import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productsReducer,
  productDetailsReducer,
  newProdcutReducer,
  newReviewReducer,
  productReducer,
  productReviewsReducer,
  reviewReducer,
} from "./reducers/productReducer";

import {
  userReducer,
  profileReducer,
  userDetailsReducer,
  forgotPasswordReducer,
  allUsersReducer,
} from "./reducers/userReducer";

import { cartReducer } from "./reducers/cartReducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/orderReducer";

import { categoriesReducer } from "./reducers/categoryReducer";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  categories: categoriesReducer,
  user: userReducer,
  profile: profileReducer,
  userDetails: userDetailsReducer,
  forgotPassword: forgotPasswordReducer,
  allUsers: allUsersReducer,
  newReview: newReviewReducer,
  newProduct: newProdcutReducer,
  product: productReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  orderDetails: orderDetailsReducer,
  myOrders: myOrdersReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("amoCartItems")
      ? JSON.parse(localStorage.getItem("amoCartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
