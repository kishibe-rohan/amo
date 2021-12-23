import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./App.css";

import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";

import Home from "./components/Home/Home";
import SingleProduct from "./components/Product/SingleProduct";
import Products from "./components/Product/Products";
import LoginSignup from "./components/User/LoginSignup";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import OrderSuccess from "./components/Cart/OrderSuccess";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/Payment";
import Profile from "./components/User/Profile";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Dashboard from "./components/Admin/Dashboard";
import ProductList from "./components/Admin/ProductList";
import AddProduct from "./components/Admin/AddProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UsersList from "./components/Admin/UsersList";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductReviews from "./components/Admin/ProductReviews";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";

import store from "./store";
import { loadUser } from "./actions/userAction";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
    // console.log(stripeApiKey);
  }, []);

  return (
    <Router>
      <Header user={isAuthenticated && user} />
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Route exact path="/process/payment" component={Payment} />
        </Elements>
      )}

      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={SingleProduct} />
      <Route exact path="/products" component={Products} />
      <Route exact path="/login" component={LoginSignup} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/shipping" component={Shipping} />
      <Route exact path="/success" component={OrderSuccess} />
      <Route exact path="/order/confirm" component={ConfirmOrder} />
      <Route exact path="/account" component={Profile} />
      <Route exact path="/me/update" component={UpdateProfile} />
      <Route exact path="/password/update" component={UpdatePassword} />
      <Route exact path="/password/forgot" component={ForgotPassword} />
      <Route exact path="/password/reset/:token" component={ResetPassword} />
      <Route exact path="/orders" component={MyOrders} />
      <Route exact path="/order/:id" component={OrderDetails} />
      <Route exact path="/admin/dashboard" component={Dashboard} />
      <Route exact path="/admin/products" component={ProductList} />
      <Route exact path="/admin/product" component={AddProduct} />
      <Route exact path="/admin/product/:id" component={UpdateProduct} />
      <Route exact path="/admin/orders" component={OrderList} />
      <Route exact path="/admin/order/:id" component={ProcessOrder} />
      <Route exact path="/admin/users" component={UsersList} />
      <Route exact path="/admin/user/:id" component={UpdateUser} />
      <Route exact path="/admin/reviews" component={ProductReviews} />

      <Footer />
    </Router>
  );
}

export default App;
