import React,{useEffect} from 'react'
import { CgMouse } from "react-icons/all";

import ProductCard from './ProductCard';
import Header from '../layout/Header/Header';
import Footer from '../layout/Footer/Footer';
import "./Home.css";
import MetaData from '../layout/MetaData';

import { getProducts } from '../../actions/productAction'
import {useSelector,useDispatch} from 'react-redux'

const product = {
    name: 'Black Hoodie',
    price:"$300",
    _id:"skult",
    images:[{url:"https://5.imimg.com/data5/ZZ/CZ/GG/SELLER-40281611/plain-black-hoodie-500x500.jpg"}]
}
const Home = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts())
    },[dispatch])

    const {loading,error,products} = useSelector((state) => state.products)

  return (
    <>
    <MetaData title="amo | Crafted With Love" />
      <Header/>

      <h2 className="home-header">Featured Fashion</h2>
      <div className="container" id="container">
         {products && products.map(product => (
             <ProductCard product={product}/>
         ))}
      </div>

      <Footer/>
      
    </>
  )
}

export default Home
