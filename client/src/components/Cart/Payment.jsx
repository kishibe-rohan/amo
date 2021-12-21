import React,{useEffect,useRef} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useAlert} from 'react-alert'

import MetaData from '../layout/MetaData'
import CheckoutSteps from '../Cart/CheckoutSteps'

import axios from 'axios'
import {createOrder,clearErrors} from '../../actions/orderAction'

import {Typography} from '@material-ui/core'
import {CreditCard,Event,VpnKey} from '@material-ui/icons'
import styled from 'styled-components'

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import './payment.css'

const PaymentContainer = styled.div`
display:grid;
place-items:center;
background-color: rgb(255, 255, 255);
  height: 65vh;
  margin: 2vmax;
`

const PaymentForm = styled.form`
width: 30%;
height: 100%;
>p{
  font:400 2vmax;
  color:rgba(0,0,0,0.753);
  border-bottom:1px solid tomato;
  padding:1vmax 0;
  text-align: center;
  width: 50%;
  margin: auto;
}
`

const PaymentFormItem = styled.div`
display:flex;
align-items: center;
margin: 2vmax 0;
>svg{
  position: absolute;
  transform: translateX(1vmax);
  font-size: 1.6vmax;
  color: rgba(0, 0, 0, 0.623);
}
`

const PaymentFormBtn = styled.input`
border:none;
background-color:tomato;
color:white;
font:300 0.9vmax;
width:100%;
padding: 0.8vmax;
cursor: pointer;
transition: all 0.5s;
outline: none;
`

const inputStyle = {
  padding:"1vmax 4vmax",
  paddingRight:"1vmax",
  width:"100%",
  boxSizing:"border-box",
  border:"1px solid rgba(0,0,0,0.267)",
  borderRadius:"4px",
  outline:"none"
}

const Payment = ({history}) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))

  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice*100)
  }

  const order =  {
    shippingInfo,
    orderItems:cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  }


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  const submitHandler = async(e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    try{
      const config = {
        headers:{
          "Content-Type":"application/json"
        }
      }

      const {data} = await axios.post('/api/v1/payment/process',paymentData,config)
      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret,{
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      })

      if(result.error)
      {
        payBtn.current.disabled = false;
        alert.error(result.error.message)
      }else{
        if(result.paymentIntent.status === "succeeded")
        {
          order.paymentInfo = {
            id:result.paymentIntent.id,
            status: result.paymentIntent.status,
          }

          dispatch(createOrder(order))
          history.push('/success')
        }else{
          alert.error('Error while processing payment.. Please Try Again')
        }
      }

    }
    catch(error)
    {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message)
    }
  }

  return (
   <>
   <MetaData title="Payment"/>
   <CheckoutSteps activeStep={2}/>
   <PaymentContainer>
     <PaymentForm onSubmit={(e) => submitHandler(e)}>
       <Typography>Card Info</Typography>
       <PaymentFormItem>
         <CreditCard/>
         <CardNumberElement className="paymentInput"/>
       </PaymentFormItem>
       <PaymentFormItem>
           <Event/>
          <CardExpiryElement className="paymentInput"/>
       </PaymentFormItem>
       <PaymentFormItem>
            <VpnKey/>
            <CardCvcElement className="paymentInput"/>
       </PaymentFormItem>
       <PaymentFormBtn type="submit" value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`} ref={payBtn}/>
     </PaymentForm>
   </PaymentContainer>
   </>
  )
}

export default Payment
