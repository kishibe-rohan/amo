import React,{useEffect,useState} from 'react'
import {useParams,useHistory} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {Rating} from '@material-ui/lab'

import { Add, Remove } from "@material-ui/icons";
import styled from 'styled-components'
import Header from '../layout/Header/Header'
import Footer from '../layout/Footer/Footer'
import Loading from '../layout/Loading'
import {mobile} from '../../responsive'

import {clearErrors,getProductDetails} from '../../actions/productAction'
import {AddItemsToCart} from '../../actions/cartAction'

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
const AddContainer = styled.div` 
width:50%;
display:flex;
align-items:center;
 justify-content: space-between;
  ${mobile({ width: "100%" })}
`

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const CartButton = styled.button` 
padding: 15px;
border:2px solid teal;
background-color:#C9048F;
color:white;
cursor:pointer;
font-weight:500;
:hover{
    background-color:tomato;
}
`
const Status = styled.p` 
font-weight:100;
color: ${(props) => props.color}
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
        value: product?.rating,
        readOnly: true,
        precision: 0.5,
      };

    const [quantity,setQuantity] = useState(1);
   
    
    const increaseQuantity = () => {
        if(product.stock <= quantity)
        return;

        const qty = quantity + 1;
        setQuantity(qty);
    }

    const decreaseQuantity = () => {
        if(quantity <= 1)
        return;

        const qty = quantity - 1;
        setQuantity(qty);
    }

    const addToCartHandler = () => {
        dispatch(AddItemsToCart(id,quantity))
    }

    useEffect(() => {
     if(error)
     {
         dispatch(clearErrors());
     }

     dispatch(getProductDetails)
    },[])

    return (
        <Container>
        
        
           {
               loading? (
                   <Loading/>
               ) : (
                <Wrapper>
                <ImgContainer>
                <Image src={product?.images?.[0].url} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{product?.name}</Title>
                    <div>
                        <Rating {...options}/>
                    </div>
                    <Desc>{product?.description}</Desc>
                    <Price>$ {product?.price} </Price>
                    <Status color={product?.Stock < 1? "red" : "green"}>
                        {
                            product?.Stock < 1? "Out Of Stock" : "In Stock"
                        }
                    </Status>
                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick={() => decreaseQuantity()}/>
                            <Amount>{quantity}</Amount>
                            <Add onClick={() => increaseQuantity()}/>
                        </AmountContainer>
                        <CartButton disabled={product?.Stock < 1? true:false} onClick={addToCartHandler}>
                            Add To Cart
                        </CartButton>
                    </AddContainer>
                </InfoContainer>
                </Wrapper>
               )
           }
       
       
        </Container>
    )
}

export default SingleProduct;