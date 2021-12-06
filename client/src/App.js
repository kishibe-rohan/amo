import React, { useEffect } from "react";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import SingleProduct from "./components/Product/SingleProduct";
import LoginSignup from "./components/User/LoginSignup";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import OrderSuccess from "./components/Cart/OrderSuccess";
import ConfirmOrder from "./components/Cart/ConfirmOrder";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={SingleProduct} />
      <Route exact path="/login" component={LoginSignup} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/shipping" component={Shipping} />
      <Route exact path="/success" component={OrderSuccess} />
      <Route exact path="/order/confirm" component={ConfirmOrder} />
    </Router>
  );
}

export default App;
