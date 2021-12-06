import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'

import {Typography} from '@material-ui/core'
import styled from 'styled-components'
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart'

import {AddItemsToCart,removeItemsFromCart} from '../../actions/cartAction'

import CartItem from './CartItem'
import Header from '../layout/Header/Header'
import Footer from '../layout/Footer/Footer'

const EmptyCart = styled.div` 
margin:auto;
text-align:center;
padding:10vmax;
height:50vh;
display:flex;
flex-direction:column;
justify-content: center;
align-items: center;
`

const CartPage = styled.div` 
padding:5vmax;
`

const CartHeader = styled.div` 
background-color:tomato;
width:90%;
box-sizing:border-box;
margin:auto;
color:white;
display:grid;
grid-template-columns: 4fr 1fr 1fr;
font:300 0.7vmax;
>p{
    margin:10px;
};
>p:last-child{
    text-align:end;
}
`
const CartContainer = styled.div` 
width:90%;
margin:auto;
display:grid;
grid-template-columns:4fr 1fr 1fr;
`

const CartInputContainer = styled.div` 
display:flex;
align-items:center;
height:8vmax;
`

const CartInputButton = styled.button` 
border:none;
background-color: rgba(0, 0, 0, 0.616);
padding:0.5vmax;
cursor:pointer;
color:white;
transition: all 0.5s;

:hover{
    background-color: rgba(0, 0, 0, 0.767);
}
`

const CartInputQty = styled.input` 
border:none;
padding:0.5vmax;
width:1vmax;
text-align:center;
outline:none;
font:400 0.8vmax;
color: rgba(0, 0, 0, 0.74);;
`

const CartSubtotal = styled.div` 
display:flex;
padding:0.5vmax;
height:8vmax;
align-items:center;
box-sizing:border-box;
font:300 1vmax;
justify-content: flex-end;
`
const CartTotal = styled.div` 
display:grid;
grid-template-columns:2fr 1.2fr;
`

const CartTotalBox = styled.div`
border-top: 3px solid tomato;
margin:1vmax 4vmax;
box-sizing:border-box;
padding:2vmax 0;
font:300 1vmax;
display:flex;
justify-content: space-between; 
`


const CheckoutButtonContainer = styled.div`
display:flex;
justify-content:flex-end;
`

const CheckoutButton = styled.button` 
background-color:tomato;
color:white;
border:none;
padding:0.8vmax 4vmax;
width:50%;
font:300 0.8vmax;
margin:1vmax 4vmax;
cursor:pointer;
border-radius:30px;
`


const Cart = ({history}) => {
    const dispatch = useDispatch();
    const {cartItems} = useSelector((state) => state.cart)

    const increaseQty = (id,quantity,stock) => {
        const newQty = quantity + 1;
        if(stock <= quantity)
        return;

        dispatch(AddItemsToCart(id,newQty))
    }

    const decreaseQty = (id,quantity) => {
        const newQty = quantity - 1;
        if(quantity <= 1)
        return;

        dispatch(AddItemsToCart(id,newQty))
    }

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id))
    }

    const checkoutHandler = () => {
        history.push("/login?redirect=shipping")
    }

  return (
   <>
   {cartItems.length === 0 ? (
      <>
      <Header/>
      <EmptyCart>
          <RemoveShoppingCartIcon/>
          <Typography>No Items In Your Cart</Typography>
          <Link to="/products">Explore</Link>
      </EmptyCart>
      <Footer/>
      </>
   ):(
       <>
       <CartPage>
           <CartHeader>
               <p>Product</p>
               <p>Quantity</p>
               <p>Subtotal</p>
           </CartHeader>
           {
               cartItems && cartItems.map((item) => (
              <CartContainer key={item.product}>
                <CartItem item={item} deleteCartItems={deleteCartItems}/>
                <CartInputContainer>
                    <CartInputButton onClick={() => decreaseQty(item.product,item.quantity)}>-</CartInputButton>
                    <CartInputQty type="number" value={item.quantity} readOnly/>
                    <CartInputButton onClick={() => increaseQty(item.product,item.quantity,item.stock)}>+</CartInputButton>
                </CartInputContainer>
                <CartSubtotal>
                {`₹${
                    item.price * item.quantity
                  }`}
                </CartSubtotal>
                
              </CartContainer>
               ))
           }

      <CartTotal>
        <div></div>
        <CartTotalBox>
            <p>Total</p>
            <p>{`₹ ${cartItems.reduce((acc,item) => acc + item.quantity * item.price,0)}`}</p>
        </CartTotalBox>
        <div></div>
        <CheckoutButtonContainer>
         <CheckoutButton onClick={checkoutHandler}>
             CHECK OUT
         </CheckoutButton>
        </CheckoutButtonContainer>
        </CartTotal>
       </CartPage>

       </>
   )}
   </>
  )
}

export default Cart
