import React from "react";
import logo from "../../../images/logo.png";
import playStore from "../../../images/playStore.png";

import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer-left">
        <h4>COMING SOON!</h4>
        <p>Arriving on the Google Play Store</p>
        <img src={playStore} alt="playstore" />
      </div>
      <div className="footer-mid">
        <img src={logo} alt="logo" />
        <h1>Your one stop fashion destination</h1>
        <p>Copyrights 2021 &copy; All products are for demo purposes only</p>
      </div>
      <div className="footer-right">
        <h4>Connect with me!</h4>
        <a href="https://github.com/kishibe-rohan">Github</a>
        <a href="https://instagram.com/kishibe-rohan">Instagram</a>
      </div>
    </footer>
  );
};

export default Footer;
