import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {DataGrid} from '@material-ui/data-grid'
import {
  deleteReviews,
  getAllReviews,
  clearErrors,
} from "../../actions/productAction";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";
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

const ReviewListContainer = styled.div`
width:100%;
box-sizing:border-box;
background-color: rgb(255, 255, 255);
display:flex;
flex-direction:column;
border-left: 1px solid rgba(0, 0, 0, 0.158);
height: 100vh;
`

const ReviewListHeading = styled.h1`
font:400 2rem;
padding:0.5vmax; 
box-sizing:border-box;
color:rgba(0,0,0,0.637);
transition: all 0.5s;
margin: 2rem;
text-align: center;
`



const ProductReviews = ({history}) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const {error,reviews} = useSelector((state) => state.productReviews)
  const {error:deleteError,isDeleted} = useSelector((state) => state.review)


  const deleteReviewHandler = (id) => {
    dispatch(deleteReviews(id));
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
      alert.success("Review Deleted Successfully");
      history.push("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }

    dispatch(getAllReviews());


  },[dispatch,alert,error,deleteError,history,isDeleted])

  const columns = [
    {field:"id",headerName:"Review ID",minWidth:200,flex:0.5},
    {
      field:"user",
      headerName:"User",
      minWidth: 200,
      flex: 0.6,
    },
    {
      field:"comment",
      headerName:"Comment",
      minWidth:"350",
      flex:1
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,
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
          <Button onClick={() => deleteReviewHandler(params.getValue(params.id,"id"))}>
            <Delete/>
          </Button>
          </>
        )
      }
    }
  ]

  const rows = [];

  reviews && reviews.forEach((item) => {
    rows.push({
      id:item._id,
      rating:item.rating,
      comment:item.comment,
      user:item.name,
   })
  })

  return (
    <>
    <MetaData title="Product Reviews - Admin"/>
    <Container>
       <Sidebar/>
       <ReviewListContainer>
         <ReviewListHeading>PRODUCT REVIEWS</ReviewListHeading>
         <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick autoHeight/>
       </ReviewListContainer>
     </Container>
    </>
  )
}

export default ProductReviews
