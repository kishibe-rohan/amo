import React,{useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import Carousel from 'react-material-ui-carousel'
import {Rating} from '@material-ui/lab'

import {clearErrors,getProductDetails} from '../../actions/productAction'

const SingleProduct = ({match}) => {
    const dispatch = useDispatch();

    const {product,loading,error} = useSelector(
        (state) => state.product
    )

    useEffect(() => {
     if(error)
     {
         dispatch(clearErrors());
     }

     dispatch(getProductDetails)
    },[])

    return (
        <>
        <div className="productDetails">
             <div>
                 <Carousel>
                     {product.images.map((item,i) => (
                         <img className = "CarouselImage" key={i} src={item.url} alt={`${i} Slide`} />
                     ))}
                 </Carousel>
             </div>
        </div>
        </>
    )
}

export default SingleProduct;