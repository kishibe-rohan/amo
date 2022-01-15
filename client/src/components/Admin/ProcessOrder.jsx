import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useAlert} from 'react-alert'

import {useSelector,useDispatch} from 'react-redux'
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";

import MetaData from '../layout/MetaData'
import Loading from '../layout/Loading'
import Sidebar from './Sidebar'

import styled from 'styled-components'
import {Typography,Button} from '@material-ui/core'
import { AccountTree } from '@material-ui/icons';


const Container = styled.div`
width:100vw;
max-width:100%;
display:grid;
grid-template-columns:1fr 5fr;
`

const UpdateOrderContainer = styled.div`
width:100%;
box-sizing:border-box;
background-color: rgb(221,221,221);
border-left: 1px solid rgba(0,0,0,0.158);
display:flex;
flex-direction:column;
`

const UpdateOrderPage = styled.div`
background-color:white
`

const UpdateOrderInfo = styled.div``

const ConfirmShippingArea = styled.div`
padding: 5vmax;
padding-bottom: 0%;
> p {
  font: 400 1.8vmax;
}
`

const OrderDetailsContainerBox = styled.div`
margin: 2vmax;
` 

const OrderDetailsItem = styled.div`
display:flex;
margin:1vmax 0;
`

const ConfirmCartItems = styled.div`
padding:5vmax;
padding-top:2vmax;
`

const ConfirmCartItemsContainer = styled.div`
max-height: 20vmax;
overflow-y: auto;
`

const CartItem = styled.div`
  display: flex;
  font: 400 1vmax;
  align-items: center;
  justify-content: space-between;
  margin: 2vmax 0;
  >img{
    width:3vmax;
  }
  >a{
    color: #575757;
    margin: 0 2vmax;
    width: 60%;
    text-decoration: none;
  }
  `

const UpdateOrderFormContainer = styled.div`

`

const UpdateOrderForm = styled.form`
margin: 5vmax 0;
padding: 3vmax;
background-color: white;
`

const FormItem = styled.div`
display: flex;
width: 100%;
align-items: center;

> select {
  padding: 1vmax 4vmax;
  margin: 2rem 0;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.267);
  border-radius: 4px;
  font: 300 0.9vmax;
  outline: none;
}

> svg {
  position: absolute;
  transform: translateX(1vmax);
  font-size: 1.6vmax;
  color: rgba(0, 0, 0, 0.623);
}
`


const ProcessOrder = ({history,match}) => {

  const dispatch = useDispatch();
  const alert = useAlert();

  const [status, setStatus] = useState("");
  const {order,error,loading} = useSelector((state) => state.orderDetails)
  const {error:updateError,isUpdated} = useSelector((state) => state.order)

  const updateOrderHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("status",status)

    dispatch(updateOrder(match.params.id,myForm))
  }

  useEffect(() => {
    if(error)
    {
      alert.error(error);
      dispatch(clearErrors());
    }

    if(updateError)
    {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if(isUpdated)
    {
      alert.success("Order Updated Successfully");
      dispatch({type: UPDATE_ORDER_RESET})
    }

    dispatch(getOrderDetails(match.params.id))
  },[dispatch,alert,error,match.params.id,isUpdated,updateError])

  

  return (
  <>
  <MetaData title="Process Order - Admin"/>
  <Container>
    <Sidebar/>
    <UpdateOrderContainer>
      {loading?(
        <Loading/>
      ):(
        <UpdateOrderPage style={{display:order.orderStatus === "Delivered"?"block":"grid"}}>
           <UpdateOrderInfo>
             <ConfirmShippingArea>
               <Typography>Shipping Info</Typography>
               <OrderDetailsContainerBox>
                 <OrderDetailsItem>
                   <p>Name:</p>
                   <span>{order.user && order.user.name}</span>
                 </OrderDetailsItem>
                 <OrderDetailsItem>
                   <p>Phone:</p>
                   <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                 </OrderDetailsItem>
                 <OrderDetailsItem>
                   <p>Address:</p>
                   <span> {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}</span>
                 </OrderDetailsItem>
               </OrderDetailsContainerBox>

               <Typography>Payment</Typography>
               <OrderDetailsContainerBox>
                 <OrderDetailsItem>
                   <p style={{color:order.paymentInfo && order.paymentInfo.status === "succeeded"?"green":"red"}}>
                   {order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                   </p>
                 </OrderDetailsItem>
               </OrderDetailsContainerBox>
             </ConfirmShippingArea>

             <ConfirmCartItems>
               <Typography>Cart Items:</Typography>
               <ConfirmCartItemsContainer>
                 {
                   order.orderItems && order.orderItems.map((item) => (
                     <CartItem key={item.product}>
                       <img src={item.image} alt="Product"/>
                       <Link to={`/product/${item.product}`}>
                         {item.name}
                       </Link>{" "}
                       <span>
                            {item.quantity} X ₹{item.price} ={" "}
                            <b>₹{item.price * item.quantity}</b>
                       </span>
                     </CartItem>
                   ))
                 }
               </ConfirmCartItemsContainer>
             </ConfirmCartItems>
           </UpdateOrderInfo>

           <UpdateOrderFormContainer style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}>
              <UpdateOrderForm onSubmit={updateOrderHandler}>
                 <h1>Process Order</h1>
                 <FormItem>
                   <AccountTree/>
                   <select onChange={(e) => setStatus(e.target.value)}>
                     <option value="">Update Status</option>
                     {
                       order.orderStatus === "Processing" && (
                         <option value="Shipped">Shipped</option>
                       )
                     }

                     {
                       order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )
                     }
                   </select>
                 </FormItem>
                 <Button type="submit" style={{backgroundColor:"tomato",color:"white",cursor:'pointer'}} disabled={loading ? true : false || status === "" ? true : false}>
                   Process
                 </Button>
              </UpdateOrderForm>
            </UpdateOrderFormContainer>
        </UpdateOrderPage>
      )}
    </UpdateOrderContainer>
  </Container>
  </>
  )
}

export default ProcessOrder
