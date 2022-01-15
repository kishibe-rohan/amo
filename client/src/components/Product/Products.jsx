import React,{useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {clearErrors,getProducts} from '../../actions/productAction'
import {getCategories} from '../../actions/categoryAction'
import {useAlert} from 'react-alert'

import {Slider,Typography} from '@material-ui/core'
import Pagination from 'react-js-pagination'
import styled from 'styled-components'

import Loading from '../layout/Loading'
import ProductCard from '../Home/ProductCard'
import Header from '../layout/Header/Header'
import Footer from '../layout/Footer/Footer'
import MetaData from '../layout/MetaData'

import './Products.css'

const ProductsHeading = styled.h2`
margin:2vmax auto;
width:15vw;
border-bottom:1px solid rgba(255,0,0);
padding:2vmax;
color:rgba(0,0,0,0.678);
font:500 1.5vmax;
text-align:center;
`

const ProductsContainer = styled.div`
display:flex;
flex-wrap:wrap;
padding:0 5vmax;
justify-content:center;
min-height:30vh;
`

const FilterBox = styled.div` width: 10vmax;
position: absolute;
top: 10vmax;
left: 4vmax;
>fieldset{
  border:1px solid rgba(0,0,0,0.329)
}
`

const CategoryBox = styled.ul`padding: 0%;`

const CategoryLink = styled.li`
list-style:none;
color:rgba(0,0,0,0.61);
font:400 0.8vmax;
margin:0.4vmax;
cursor: pointer;
transition: all 0.5s;
:hover{
  color:tomato;
}
`

const PaginationBox = styled.div`
display: flex;
justify-content: center;
margin: 6vmax;`

const Products = ({match}) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage,setCurrentPage] = useState(1);
  const [price,setPrice] = useState([0,25000]);
  const [category,setCategory] = useState(match.params.category);
  const [ratings,setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultsPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const {categories} = useSelector((state) => state.categories);

  const keyword = match.params.keyword;

  const setPageHandler = (e) => {
    setCurrentPage(e);
  }

  const priceHandler = (event,newPrice) => {
    setPrice(newPrice)
  }

  let count = filteredProductsCount;

  useEffect(() => {
    if(error)
    {
      alert.error(error);
      dispatch(clearErrors())
    }

    dispatch(getCategories());
    dispatch(getProducts(keyword,currentPage,price,category,ratings))

    console.log(keyword);
  },[dispatch, keyword, currentPage, price, category, ratings, alert, error])
 
  return (
   <>
   
   {
     loading?(<Loading/>):(
       <>
       <MetaData title="amo| Explore Products"/>
       <ProductsHeading>Products</ProductsHeading>
       <ProductsContainer>
         {products && products.map((product) => (
           <ProductCard key={product._id} product={product}/>
         ))}
       </ProductsContainer>

       <FilterBox>
         <Typography>Price</Typography>
         <Slider value={price} onChange={priceHandler} valueLabelDisplay='auto' aria-labelledby="range-slider"
              min={0}
              max={25000}/>
          
          <Typography>Categories</Typography>
          <CategoryBox>
            {categories.map((category) => (
              <CategoryLink key={category} onClick={() => setCategory(category.cat)}>
                {category.title}
              </CategoryLink>
            ))}
          </CategoryBox>

          <fieldset>
            <Typography component="legend">Ratings Above</Typography>
            <Slider value={ratings} onChange={(e,newRating) => {
              setRatings(newRating)
            }}  aria-labelledby="continuous-slider"
            valueLabelDisplay="auto"
            min={0}
            max={5}/>
          </fieldset>
       </FilterBox>

       {resultsPerPage < count && (
         <PaginationBox>
           <Pagination activePage={currentPage} itemsCountPerPage={resultsPerPage} totalItemsCount={productsCount} onChange={setPageHandler}  nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"/>
         </PaginationBox>
       )}
       </>
     )
   }
  
   </>
  )
}

export default Products
