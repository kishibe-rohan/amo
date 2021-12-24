import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {useAlert} from 'react-alert'
import { getOrderDetails, clearErrors } from "../../actions/orderAction";

import {Typography} from '@material-ui/core' 
import styled from 'styled-components'

import MetaData from '../layout/MetaData'
import Loading from '../layout/Loading'

const OrderDetailsPage = styled.div`
background-color:white;
`

const OrderDetailsContainer = styled.div`
padding:5vmax; 
padding-bottom:0%;
>h1{
    font:600 3vmax;
    margin:4vmax 0;
    color:tomato;
    border-bottom: 1px solid rgba(0,0,0,0.164)
}
>p{
    font:400 1.8vmax;
}
`

const OrderDetailsContainerBox = styled.div`
margin: 2vmax;
display:flex;
margin:1vmax 0;
`

const OrderDetailsCartItemsContainer = styled.div`
margin: 2vmax;
`

const OrderDetailsCartItems = styled.div`
padding:2vmax 5vmax;
border-top: 1px solid rgba(0,0,0,0.164)
>p{
    font:400 1.8vmax;
}
`

const OrderDetailsItem = styled.div`
display:flex;
margin:1vmax 0;
>p{
    font:400 1vmax;
    color:black;
}
>span{
    margin:0 1vmax;
    font:100 1vmax;
    color:#575757;
}
`

const OrderItem = styled.div`
display:flex;
font:400 1vmax;
align-items:center;
margin:2vmax 0;
>img{
    width:3vmax;
}
>a{
  color: #575757;
  margin: 0 2vmax;
  width: 60%;
  text-decoration: none;
}
>span{
    font:100 1vmax;
    color:#5e5e5e;
}

`

const OrderDetails = ({match}) => {
    const {order,error,loading} = useSelector((state => state.orderDetails))

    const dispatch = useDispatch();
    const alert = useAlert();

    useEffect(() => {
        if(error)
        {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getOrderDetails(match.params.id))
    },[dispatch,error,match.params.id,alert])

  return (
    <>
    {
        loading?(
        <Loading/>
        ): order?(
            <>
            
            <MetaData title="Order Details"/>
            <OrderDetailsPage>
                <OrderDetailsContainer>
                    <Typography component="h1">
                        ORDER #{order && order._id}
                    </Typography>
                    <Typography>Shipping Info</Typography>
                    <OrderDetailsContainerBox>
                        <OrderDetailsItem>
                            <p>Name:</p>
                            <span>{order?.user && order.user.name}</span>
                        </OrderDetailsItem>
                        <OrderDetailsItem>
                        <p>Phone:</p>
                        <span>
                            {order?.shippingInfo && order.shippingInfo.phoneNo}
                        </span>
                        </OrderDetailsItem>
                        <OrderDetailsItem>
                            <p>Address:</p>
                            <span>  {order?.shippingInfo &&
                      `${order?.shippingInfo.address}, ${order?.shippingInfo.city}, ${order?.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order?.shippingInfo.country}`} </span>
                        </OrderDetailsItem>
                    </OrderDetailsContainerBox>
                    <Typography>Payment</Typography>
                    <OrderDetailsContainerBox>
                        <OrderDetailsItem>
                            <p>Order Status:</p>
                            <span>{order?.paymentInfo &&
                    order?.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}</span>
                        </OrderDetailsItem>
                        <OrderDetailsItem>
                        <p>Amount:</p>
                        <span>{order?.totalPrice && order?.totalPrice}</span>
                        </OrderDetailsItem>
                    </OrderDetailsContainerBox>
                </OrderDetailsContainer>

                <OrderDetailsCartItems>
                    <Typography>Order Items:</Typography>
                    <OrderDetailsCartItemsContainer>
                        {
                            order?.orderItems && order?.orderItems.map((item) => (
                                <OrderItem key={item.product}>
                                    <img src={item.image} alt="Product"/>
                                    <Link to={`/product/${item.product}`}>
                                        {item.name}
                                    </Link>{" "}
                                    <span>
                                    {item.quantity} X ₹{item.price} ={" "}
                                    <b>₹{item.price * item.quantity}</b>
                                    </span>
                                </OrderItem>
                            ))
                        }
                    </OrderDetailsCartItemsContainer>
                </OrderDetailsCartItems>
            </OrderDetailsPage>
            </>

        ):(
           <>
          
           </> 
        )
    }
    </>
  )
}

export default OrderDetails
