import React,{useEffect,useState} from 'react'
import {useParams,useHistory} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {Rating} from '@material-ui/lab'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
  } from "@material-ui/core";

import { Add, Remove } from "@material-ui/icons";
import styled from 'styled-components'

import Loading from '../layout/Loading'
import ReviewCard from './ReviewCard';
import {mobile} from '../../responsive'

import {newReview,clearErrors,getProductDetails} from '../../actions/productAction'
import {AddItemsToCart} from '../../actions/cartAction'
import { NEW_REVIEW_RESET } from "../../constants/productConstants";


const Container = styled.div``

const Wrapper = styled.div` 
display:flex;
padding:50px;
${mobile({padding:"10px",flexDirection:'column'})}
`

const ImgContainer = styled.div` 
flex:1;
`

const Image = styled.img` 
width:100%;
height:90vh;
object-fit:cover;
${mobile({height:"40vh"})}
`
const InfoContainer = styled.div` 
flex:1;
padding:0px 50px;
${mobile({ padding: "10px" })}
`

const Title = styled.h1` 
font-weight:200;
`

const Desc = styled.p` 
margin:20px 0px;
`

const Price = styled.span` 
font-weight:100;
font-size:40px;
`
const AddContainer = styled.div` 
width:50%;
display:flex;
align-items:center;
 justify-content: space-between;
  ${mobile({ width: "100%" })}
`

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const CartButton = styled.button` 
padding: 15px;
border:2px solid teal;
background-color:white;
cursor:pointer;
font-weight:500;
:hover{
    background-color:tomato;
    color:white;
}
`
const Status = styled.p` 
font-weight:100;
color: ${(props) => props.color}
`

const ReviewButton = styled.button`
padding: 15px;
background-color:#C9048F;
color:white;
cursor:pointer;
:hover{
    background-color:tomato;
    color:white;
}
`

const ReviewsHeading = styled.h3`
font:500 1.4vmax;
text-align:center;
border-bottom: 1px solid tomato;
padding:1vmax;
width:20vmax;
margin: auto;
margin-bottom: 4vmax;
` 

const SubmitReviewTextArea = styled.textarea`
border:1px solid rgba(0,0,0,0.082);
margin:1vmax 0;
outline:none;
padding:1rem;
font:300 1rem;
`

const Reviews = styled.div`
display:flex;
overflow:auto;
`

const NoReviews = styled.div`
font:400 1.3vmax;
text-align:center;
color:rgba(0,0,0,0.548);
`

const ReviewButtonContainer = styled.div`
display:flex;
align-items:center;
padding-top:1vmax;
`

const SingleProduct = ({match}) => {
    const dispatch = useDispatch();
    const {id} = useParams();
    
    useEffect(() => {
        dispatch(getProductDetails(id))
    },[dispatch,id])


    const {product,loading,error} = useSelector(
        (state) => state.productDetails
    )

    const {user} = useSelector(
        (state) => state.user
    )

    const options = {
        size: "large",
        value: product?.rating,
        readOnly: true,
        precision: 0.5,
      };

    const [quantity,setQuantity] = useState(1);
    const [open,setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
   
    
    const increaseQuantity = () => {
        console.log(quantity);

        if(product.stock <= quantity)
        return;

        const qty = quantity + 1;
        setQuantity(qty);

       
    }

    const decreaseQuantity = () => {

        console.log(quantity);

        if(quantity <= 1)
        return;

        const qty = quantity - 1;
        setQuantity(qty);

       
    }

    const addToCartHandler = () => {
        dispatch(AddItemsToCart(id,quantity))
    }

    const submitReviewToggle = () => {
        open? setOpen(false):setOpen(true);
    }

    const reviewSubmitHandler = () => {
        const myForm = new FormData();
        myForm.set("rating",rating);
        myForm.set("comment",comment);
        myForm.set("productId",match.params.id);

        dispatch(newReview(myForm));
        setOpen(false);
    }

    useEffect(() => {
     if(error)
     {
         dispatch(clearErrors());
     }

     dispatch(getProductDetails)
    },[])

    return (
        <>
        
        
           {
               loading? (
                   <Loading/>
               ) : (
                <Container>
                <Wrapper>
                <ImgContainer>
                <Image src={product?.images?.[0].url} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{product?.name}</Title>
                    <div>
                        <Rating {...options}/>
                    </div>
                    <Desc>{product?.description}</Desc>
                    <Price>$ {product?.price} </Price>
                    <Status color={product?.Stock < 1? "red" : "green"}>
                        {
                            product?.Stock < 1? "Out Of Stock" : "In Stock"
                        }
                    </Status>
                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick={decreaseQuantity}/>
                            <Amount>{quantity}</Amount>
                            <Add onClick={increaseQuantity}/>
                        </AmountContainer>
                        <CartButton disabled={product?.Stock < 1? true:false} onClick={addToCartHandler}>
                            Add To Cart
                        </CartButton>
                    </AddContainer>
                    { user && 
                     <ReviewButtonContainer>
                     <ReviewButton onClick={submitReviewToggle}>
                             Rate This Product
                         </ReviewButton>
                     </ReviewButtonContainer>
                     }     
                </InfoContainer>
                </Wrapper>
                <ReviewsHeading> Product Reviews </ReviewsHeading>
                <Dialog aria-labelledby='simple-dialog-title' open={open} onClose={submitReviewToggle}>
                    <DialogTitle style={{textAlign:'center'}}>Submit Review</DialogTitle>
                    <DialogContent style={{display:'flex', flexDirection:'column'}}>
                        <Rating style={{alignItems:'center',justifyContent:'center'}} onChange={(e) => setRating(e.target.value)} value={rating} size="large"/>
                        <SubmitReviewTextArea cols="30" rows="5" value={comment} onChange={(e) => setComment(e.target.value)}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={submitReviewToggle} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={reviewSubmitHandler} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>

                {product.reviews && product.reviews[0] ? (
                    <Reviews>
                        {product.reviews && product.reviews.map((review) => (
                            <ReviewCard key={review._id} review={review}/>
                        ))}
                    </Reviews>
                ):(
                    <NoReviews>
                        No Reviews Yet
                    </NoReviews>
                )}
                </Container>

                
               )

               
           }
       
       
        </>
    )
}

export default SingleProduct;