import React, { useEffect } from "react";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import SingleProduct from "./components/Product/SingleProduct";
import LoginSignup from "./components/User/LoginSignup";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={SingleProduct} />
      <Route exact path="/login" component={LoginSignup} />
    </Router>
  );
}

export default App;
