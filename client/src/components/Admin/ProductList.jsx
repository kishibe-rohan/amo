import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import {DataGrid} from '@material-ui/data-grid'
import {useSelector,useDispatch} from 'react-redux'
import {useAlert} from 'react-alert'
import {
  clearErrors,
  deleteProduct,
  getAdminProducts,
} from "../../actions/productAction";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

import MetaData from '../layout/MetaData'
import Header from '../layout/Header/Header'
import Footer from '../layout/Footer/Footer'
import Sidebar from './Sidebar'

import styled from 'styled-components'
import {Button} from '@material-ui/core'
import {Edit,Delete} from '@material-ui/icons'


const Container = styled.div` 
width:100vw;
max-width:100%;
display:grid;
grid-template-columns:1fr 5fr;
position:absolute;
`

const ProductListContainer = styled.div` 
width:100%;
box-sizing:border-box;
background-color: rgb(255, 255, 255);
display:flex;
flex-direction:column;
border-left: 1px solid rgba(0, 0, 0, 0.158);
height: 100vh;
`
const ProductListHeading = styled.h1`{
font:400 2rem;
padding:0.5vmax; 
box-sizing:border-box;
color:rgba(0,0,0,0.637);
transition: all 0.5s;
margin: 2rem;
text-align: center;
}`


const ProductList = ({history}) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const {error,products} = useSelector((state) => state.products);
  const {error:deleteError,isDeleted} = useSelector((state) => state.product);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  }

  useEffect(() => {
    if(error)
    {
      alert.error(error);
      dispatch(clearErrors());
    }

    if(deleteError)
    {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if(isDeleted)
    {
      alert.success('Product Deleted Successfully')
      history.push("/admin/dashboard")
      dispatch({type: DELETE_PRODUCT_RESET})
    }

    dispatch(getAdminProducts());
  },[dispatch,alert,error,deleteError,history,isDeleted])

const columns = [
  {field:"id",headerName:"Product ID",minWidth:200,flex:0.5},
  {field:"name",headerName:"Name",minWidth:350,flex:1},
  {
    field: "stock",
    headerName: "Stock",
    type: "number",
    minWidth: 150,
    flex: 0.3,
  },

  {
    field: "price",
    headerName: "Price",
    type: "number",
    minWidth: 270,
    flex: 0.5,
  },
  {
    field:"actions",
    headerName:"Actions",
    flex:0.3,
    type:"number",
    mindWidth:150,
    sortable:false,
    renderCell:(params) => {
      return (
        <>
        <Link to={`/admin/product/${params.getValue(params.id,"id")}`}>
          <Edit/>
        </Link>
        <Button onClick={() => deleteProductHandler(params.getValue(params.id,"id"))}>
          <Delete/>
        </Button>
        </>
      )
    }
  }
]

const rows = [];

products && products.forEach((item) => {
  rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
  })
})

  return (
    <>
     <MetaData title={`All Products -Admin`}/>
     <Container>
       <Sidebar/>
       <ProductListContainer>
         <ProductListHeading>ALL PRODUCTS</ProductListHeading>
         <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick autoHeight/>
       </ProductListContainer>
     </Container>
    </>
  )
}

export default ProductList
