import React,{useEffect,useState} from 'react'
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
import {Delete,Star} from '@material-ui/icons'
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
border-bottom:1px solid tomato;
`
const ReviewForm = styled.form`
width: 20rem;
display: flex;
flex-direction: column;
align-items: center;
margin: auto;
padding: 3vmax;
background-color: white;
`

const ReviewFormItem = styled.div`
display: flex;
width: 100%;
align-items: center;
margin: 2rem;

>input{
  padding:1vmax 4vmax;
  padding-right:1vmax;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.267);
  border-radius: 4px;
  font: 300 0.9vmax;
  outline: none;
}

>svg{
  position:absolute;
  transform:translateX(1vmax); 
  font-size:1.6vmax; 
  color:rgba(0,0,0,0.623); 
}
`


const ProductReviews = ({history}) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const {error,reviews,loading} = useSelector((state) => state.productReviews)
  const {error:deleteError,isDeleted} = useSelector((state) => state.review)


  const deleteReviewHandler = (id) => {
    dispatch(deleteReviews(id));
  }

  const [productId,setProductId] = useState("");

  const productReviewsHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId))
  }

  useEffect(() => {

    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }

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
         <ReviewForm onSubmit={productReviewsHandler}>
         <ReviewListHeading>PRODUCT REVIEWS</ReviewListHeading>
            <ReviewFormItem>
              <Star/>
              <input type="text" placeholder="Enter Product ID" required value={productId}  onChange={(e) => setProductId(e.target.value)}/>
            </ReviewFormItem>
            <Button type="submit" disabled={loading? true:false || productId === ""? true:false}/> 
         </ReviewForm>
         <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick autoHeight/>
       </ReviewListContainer>
     </Container>
    </>
  )
}

export default ProductReviews
