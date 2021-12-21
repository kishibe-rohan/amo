import React,{useEffect} from 'react'
import {useAlert} from 'react-alert'
import {DataGrid} from '@material-ui/data-grid'
import {useSelector,useDispatch} from 'react-redux'
import {clearErrors,myOrders} from '../../actions/orderAction'
import {Link} from 'react-router-dom'

import MetaData from '../layout/MetaData'
import Loading from '../layout/Loading'

import {Typography} from '@material-ui/core'
import {Launch} from '@material-ui/icons'
import styled from 'styled-components'

const MyOrdersPage = styled.div`
width:100vw;
max-width:100%;
padding:0 7vmax;
box-sizing:border-box;
background-color: white;
height: 100vh;
display: flex;
flex-direction: column;
`



const MyOrders = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const {loading,error,orders} = useSelector((state) => state.myOrders)
    const {user} = useSelector((state) => state.user)

    const columns = [
        {field:"id",headerName:"Order ID",minWidth:300,flex:1},
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
              return params.getValue(params.id, "status") === "Delivered"
                ? "green"
                : "red";
            },
        },
        {
            field:"itemsQty",
            headerName:"Items Qty",
            type:"number",
            minWidth:150,
            flex:0.3
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
                    <Link to={`/order/${params.getValue(params.id,"id")}`}>
                        <Launch/>
                    </Link>
                )
            }
        }
    ]

    const rows = [];

    orders && orders.forEach((item,index) => {
        rows.push({
            itemsQty: item.orderItems.length,
            id:item._id,
            status:item.orderStatus,
            amount:item.totalPrice
        })
    })

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
          }
      
          dispatch(myOrders());
    },[alert,error])

  return (
   <>
   <MetaData title={`${user?.name}'s Orders`}/>
   {
       loading? (
           <Loading/>
       ):(
           <MyOrdersPage>
               <Typography style={{textAlign:"center",font:"400 1.2vmax",padding:"0.5vmax"}}>
                   {user?.name}'s Orders
               </Typography>
               <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick autoHeight/>
           </MyOrdersPage>
       )
   }
   </>
  )
}

export default MyOrders
