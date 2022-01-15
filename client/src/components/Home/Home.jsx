import React,{useEffect} from 'react'
import { CgMouse } from "react-icons/all";

import ProductCard from './ProductCard';
import Categories from '../Categories/Categories'
import Header from '../layout/Header/Header';
import Slider from '../layout/Slider'
import Footer from '../layout/Footer/Footer';
import "./Home.css";
import MetaData from '../layout/MetaData';
import Loading from '../layout/Loading'

import { getProducts,getFeaturedProducts } from '../../actions/productAction'
import {getCategories} from '../../actions/categoryAction'
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
        dispatch(getProducts());
        dispatch(getFeaturedProducts());
        dispatch(getCategories());
  
    },[dispatch])

    const {loading,error,products,featuredProducts} = useSelector((state) => state.products)
    const {categories} = useSelector((state) => state.categories);
    categories.splice(2,2);

  return (
    <>
    {
      loading? (
        <Loading/>
      ):(
        <>
        <MetaData title="amo | Crafted With Love" />
         
          <Slider sliderItems = {featuredProducts} />
          <Categories categories={categories} />
          <h2 className="home-header">Featured Fashion</h2>
          <div className="container" id="container">
             {products && products.map(product => (
                 <ProductCard product={product}/>
             ))}
          </div>      
        </>
      )
    }
    </> 
  )
}

export default Home
