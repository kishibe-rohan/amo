import React from 'react'
import { CgMouse } from "react-icons/all";

import ProductCard from './ProductCard';
import logo from '../../images/logo.png'
import "./Home.css";
import MetaData from '../layout/MetaData';

const product = {
    name: 'Black Hoodie',
    price:"$300",
    _id:"skult",
    images:[{url:"https://5.imimg.com/data5/ZZ/CZ/GG/SELLER-40281611/plain-black-hoodie-500x500.jpg"}]
}
const Home = () => {
  return (
    <>
    <MetaData title="amo | Crafted With Love" />
      <div className="banner">
          <img src={logo} alt="amo" />
          <p>Welcome to your one stop fashion destination</p>

          <a href="#container">
              <button>
                  Scroll <CgMouse/>
              </button>
          </a>
      </div>

      <h2 className="home-header">Featured Fashion</h2>
      <div className="container" id="container">
          <ProductCard product={product} />
          <ProductCard product={product} />
          <ProductCard product={product} />
      </div>
    </>
  )
}

export default Home
