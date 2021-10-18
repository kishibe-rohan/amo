import React from 'react'
import { CgMouse } from "react-icons/all";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="banner">
          <h1>AMO</h1>
          <p>Welcome to your one stop fashion destination</p>

          <a href="#container">
              <button>
                  Scroll <CgMouse/>
              </button>
          </a>
      </div>

      <h2 className="home-header">Featured Fashion</h2>
      <div className="container" id="container">
          Products
      </div>
    </>
  )
}

export default Home
