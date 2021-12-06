import React,{useEffect,useState} from 'react'
import {useParams,useHistory} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {Rating} from '@material-ui/lab'

import styled from 'styled-components'
import Header from '../layout/Header/Header'
import Footer from '../layout/Footer/Footer'
import {mobile} from '../../responsive'

import {clearErrors,getProductDetails} from '../../actions/productAction'

const Container = styled.div``

const Wrapper = styled.div` 
display:flex;
padding:50px;
${mobile({padding:"10px",flexDirection:'column'})}
`

const ImgContainer = styled.div` 
flex:1;
`

const Image = styled.img` 
width:100%;
height:90vh;
object-fit:cover;
${mobile({height:"40vh"})}
`
const InfoContainer = styled.div` 
flex:1;
padding:0px 50px;
${mobile({ padding: "10px" })}
`

const Title = styled.h1` 
font-weight:200;
`

const Desc = styled.p` 
margin:20px 0px;
`

const Price = styled.span` 
font-weight:100;
font-size:40px;
`



const SingleProduct = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const history = useHistory();

    useEffect(() => {
        dispatch(getProductDetails(id))
    },[dispatch,id])


    const {product,loading,error} = useSelector(
        (state) => state.productDetails
    )

    const options = {
        size: "large",
        value: product.rating,
        readOnly: true,
        precision: 0.5,
      };

    useEffect(() => {
     if(error)
     {
         dispatch(clearErrors());
     }

     dispatch(getProductDetails)
    },[])

    return (
        <Container>
        <Header/>
        <Wrapper>
            <ImgContainer>
            <Image src={product?.images?.[0]?.url} />
            </ImgContainer>
            <InfoContainer>
                <Title>{product?.name}</Title>
                <div>
                    <Rating {...options}/>
                </div>
                <Desc>{product?.description}</Desc>
                <Price>$ {product?.price} </Price>
            </InfoContainer>
        </Wrapper>
        <Footer/>
        </Container>
    )
}

export default SingleProduct;