import React,{useEffect} from 'react'
import {DataGrid} from '@material-ui/data-grid'
import {useSelector,useDispatch} from 'react-redux'
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
import {Link} from 'react-router-dom'
import {useAlert} from 'react-alert'

import {Button} from '@material-ui/core'
import {Edit,Delete} from '@material-ui/icons'
import styled from 'styled-components'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

const Container = styled.div`
width:100vw;
max-width:100%;
display:grid;
grid-template-columns:1fr 5fr;
position:absolute;
`

const OrderListContainer = styled.div`
width:100%;
box-sizing:border-box;
background-color: rgb(255, 255, 255);
display:flex;
flex-direction:column;
border-left: 1px solid rgba(0, 0, 0, 0.158);
height: 100vh;
`

const OrderListHeading = styled.h1`
font:400 2rem;
padding:0.5vmax; 
box-sizing:border-box;
color:rgba(0,0,0,0.637);
transition: all 0.5s;
margin: 2rem;
text-align: center;
`


const OrderList = ({history}) => {

  const dispatch = useDispatch();
  const alert = useAlert();

  const {error,orders} = useSelector((state) => state.allOrders)
  const {error:deleteError,isDeleted} = useSelector((state) => state.order)


  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  }

  useEffect(() => {
    if(error)
    {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    
    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      history.push("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());


  },[dispatch,alert,error,deleteError,history,isDeleted])

  const columns = [
    {field:"id",headerName:"Order ID",minWidth:300,flex:1},
    {
      field:"status",
      headerName:"Status",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field:"itemsQty",
      headerName:"Items Qty",
      type:"number",
      minWidth:"150",
      flex:0.4
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field:"actions",
      flex:0.3,
      headerName:"Actions",
      minWidth:150,
      type:"number",
      sortable:false,
      renderCell:(params) => {
        return(
          <>
          <Link to={`/admin/order/${params.getValue(params.id,"id")}`}>
            <Edit/>
          </Link>
          <Button onClick={() => deleteOrderHandler(params.getValue(params.id,"id"))}>
            <Delete/>
          </Button>
          </>
        )
      }
    }
  ]
  const rows = [];

  orders && orders.forEach((item) => {
    rows.push({
      id:item._id,
      itemsQty: item.orderItems.length,
      amount: item.totalPrice,
      status: item.orderStatus,
    })
  })

  return (
    <>
    <MetaData title="All Orders - Admin"/>
    <Container>
       <Sidebar/>
       <OrderListContainer>
         <OrderListHeading>ALL ORDERS</OrderListHeading>
         <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick autoHeight/>
       </OrderListContainer>
     </Container>
    </>
  )
}

export default OrderList
