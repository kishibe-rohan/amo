import React,{useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
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
                 {product.name}
             </div>
        </div>
        </>
    )
}

export default SingleProduct;