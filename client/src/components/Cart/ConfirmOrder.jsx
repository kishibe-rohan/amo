import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

import { Typography } from '@material-ui/core'
import styled from 'styled-components'

import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import Header from '../layout/Header/Header'
import Footer from '../layout/Footer/Footer'

const ConfirmOrderPage = styled.div` 
height:100vh;
background-color:white;
display:grid;
grid-template-columns:6fr 3fr;
>div:last-child{
  border-left:1px solid rgba(0,0,0,0.247)
}
`

const ConfirmShippingArea = styled.div` 
padding:5vmax;
padding-bottom:0%;
>p{
  font:400 1.8vmax;
}
`

const ConfirmShippingAreaBox = styled.div`
margin:2vmax;
 `

const ConfirmShippingAreaBoxItem = styled.div` 
display:flex;
margin:1vmax 0;
>p{
  font:400 1vmax;
}
>span{
  margin:0 1vmax;
  font:100 1vmax;
  color:#575757;
}
`

const ConfirmCartItems = styled.div` 
padding:5vmax;
padding-top:2vmax;
`

const ConfirmCartItemsContainer = styled.div` 
max-heught:20vmax;
overflow:auto;
margin:2vmax;
`

const CartItem = styled.div` 
display:flex;
font:400 1vmax;
align-items: center;
justify-content: space-between;
margin: 2vmax 0;

>img{
  width:3vmax;
}

>a{
  color:#575757;
  margin:0 2vmax;
  width:60%;
  text-decoration:none;
}

>span{
  font:100 1vmax;
  color:#5e5e5e;
}
`

const OrderSummary = styled.div` 
padding: 7vmax;
>p{
  text-align:center;
  font:400 1.8vmax;
  border-bottom:1px solid rgba(0,0,0,0.267);
  padding:1vmax;
  width: 100%;
  margin: auto;
  box-sizing:border-box;

}
`
const OrderSummaryItem = styled.div` 
display: flex;
font: 300 1vmax;
justify-content: space-between;
margin: 2vmax 0;
`

const OrderSummaryTotal = styled.div` 
display:flex;
font:300 1vmax;
justify-content:space-between;
border-top:1px solid rgba(0,0,0,0.363);
padding:2vmax 0;
`
const OrderSummaryButton = styled.button` 
background-color:tomato;
color:white;
width:100%;
padding:1vmax;
border:none;
margin: auto;
cursor: pointer;
transition: 0.5s;
font: 400 1vmax;

:hover{
  background-color: rgb(192, 71, 50);
}
`

const ConfirmOrder = ({history}) => {

  const {shippingInfo,cartItems} = useSelector((state) => state.cart)

  const subtotal = cartItems.reduce((acc,item) => acc + item.quantity*item.price,0)
  const shippingCharges = subtotal > 1000?0:200;
  const tax = subtotal*0.18;
  const totalPrice = subtotal + shippingCharges + tax;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice
    }

    sessionStorage.setItem("orderInfo",JSON.stringify(data));

    history.push("/process/payment")

  }

  return (
    <>
    <MetaData title= "amo|Confirm Order"/>
    <Header/>
    <CheckoutSteps activeStep={1} />
    <ConfirmOrderPage>
      <div>
        <ConfirmShippingArea>
          <Typography>Shipping Info</Typography>
          <ConfirmShippingAreaBox>
            <ConfirmShippingAreaBoxItem>
              <p>Name:</p>
              <span>Adam Cole</span>
            </ConfirmShippingAreaBoxItem>
            <ConfirmShippingAreaBoxItem>
              <p>Phone:</p>
              <span>{shippingInfo.phoneNo}</span>
            </ConfirmShippingAreaBoxItem>
            <ConfirmShippingAreaBoxItem>
              <p>Address:</p>
              <span>{address}</span>
            </ConfirmShippingAreaBoxItem>
          </ConfirmShippingAreaBox>
        </ConfirmShippingArea>
        <ConfirmCartItems>
          <Typography>Your Cart Items:</Typography>
          <ConfirmCartItemsContainer>
            {cartItems && cartItems.map((item) => (
              <CartItem key={item.product}>
                <img src={item.image} alt={item.name}/>
                <Link to={`/product/${item.product}`}>
                  {item.name}
                </Link>
                <span>
                 {item.quantity} X ₹{item.price} ={" "}
                 <b>₹{item.price * item.quantity}</b>
                </span>
              </CartItem>
            ))}
          </ConfirmCartItemsContainer>
        </ConfirmCartItems>
      </div>
      <div>
      <OrderSummary>
        <Typography>Order Summary</Typography>
        <div>
          <OrderSummaryItem>
            <p>Subtotal:</p>
            <span>₹{subtotal}</span>
          </OrderSummaryItem>
          <OrderSummaryItem>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
          </OrderSummaryItem>
          <OrderSummaryItem>
                <p>GST:</p>
                <span>₹{tax}</span>
          </OrderSummaryItem>
        </div>

        <OrderSummaryTotal>
          <p>
            <b>Total:</b>
          </p>
          <span>₹{totalPrice}</span>
        </OrderSummaryTotal>

        <OrderSummaryButton onClick={proceedToPayment}>
          Proceed To Payment
        </OrderSummaryButton>
      </OrderSummary>
      </div>
    </ConfirmOrderPage>
    <Footer/>

    </>
  )
}

export default ConfirmOrder
