import React, { useEffect } from "react";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import WebFont from "webfontloader";

import Header from "./components/layout/Header/Header.js";
import Footer from "./components/layout/Footer/Footer";

import Home from "./components/Home/Home";
import SingleProduct from "./components/Product/SingleProduct";
import LoginSignup from "./components/User/LoginSignup";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <Router>
      <Header />
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={SingleProduct} />
      <Route exact path="/login" component={LoginSignup} />
      <Footer />
    </Router>
  );
}

export default App;
