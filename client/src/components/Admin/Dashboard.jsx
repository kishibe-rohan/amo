import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { Typography } from '@material-ui/core'
import styled from 'styled-components'


import { getAdminProducts } from '../../actions/productAction'
import { getAllUsers } from '../../actions/userAction'
import {getAllOrders} from '../../actions/orderAction'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

const DashboardPage = styled.div` 
width:100vw;
max-width:100%;
display:grid;
grid-template-columns:1fr 5fr;
position:absolute;
`

const DashboardContainer = styled.div` 
border-left:1px solid rgba(0,0,0,0.13); 
background-color: rgb(255, 255, 255);
padding: 3rem 0;
>h1{
    color:rgba(0,0,0,0.733);
    font:300 2rem;
    text-align:center;
    width:50%;
    padding:1.3rem;
    margin:auto;
}
`

const DashboardSummary = styled.div` 
margin:2rem 0;
>div{
    display:flex;
    background-color:white;
    justify-content:center;
}
>div>p{
  background-color: rgba(70, 117, 218, 0.932);
  color: white;
  font: 300 3rem;
  text-align: center;
  padding: 1.5rem;
  width: 100%;
  margin: 0 2rem;
}
`
const DashboardSummaryBox = styled.div` 
>a{
    display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
 color:rgb(0,0,0);
 font:300 2rem;
 text-align:center;
 background-color: rgb(255, 233, 174);
  text-decoration: none;
  padding: 1.5rem;
  width: 10vmax;
  height: 10vmax;
  margin: 2rem;
  border-radius: 100%;

}

  > a:first-child {
    background-color: rgb(255, 110, 110);
    color: rgb(255, 255, 255);
  }

  a:last-child {
  background-color: rgb(51, 51, 51);
  color: rgb(255, 255, 255);
}
`

const Dashboard = () => {
    const dispatch = useDispatch();

    const {products} = useSelector((state) => state.products);
    const {orders} = useSelector((state) => state.allOrders);
    const {users} = useSelector((state) => state.allUsers);

    let outOfStock = 0;
    products && products.forEach((item) => {
        if(item.Stock === 0){
            outOfStock += 1;
        }
    })

    let totalAmount = 0;
    orders && orders.forEach((item) => {
        totalAmount += item.totalPrice;
    })

    useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
    },[dispatch]);

    let total = 0;
    orders &&
      orders.forEach((item) => {
        total += item.totalPrice;
      });

 
    

  return (
    <>
  
    <DashboardPage>
    <MetaData title="Dashboard - Admin Panel"/>
    <Sidebar/>
    <DashboardContainer>
        <Typography component="h1">Dashboard</Typography>
        <DashboardSummary>
            <div>
                <p>Total Amount <br/> ₹{totalAmount} </p>
            </div>
            <DashboardSummaryBox>
                <Link to="/admin/products">
                    <p>Product</p>
                    <p>{products && products.length}</p>
                </Link>
                <Link to="/admin/orders">
                    <p>Orders</p>
                    <p>{orders && orders.length}</p>
                </Link>
                <Link to="/admin/users">
                    <p>Users</p>
                    <p>{users && users.length}</p>
                </Link>
            </DashboardSummaryBox>
           
        </DashboardSummary>  
    </DashboardContainer>
    </DashboardPage>
   
    </>
  )
}

export default Dashboard
