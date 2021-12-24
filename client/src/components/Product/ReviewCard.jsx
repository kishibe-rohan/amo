import React from 'react'
import {Rating} from '@material-ui/lab'
import profilePng from '../../images/Profile.png'
import styled from 'styled-components'

const Review = styled.div`
box-shadow:0 0 5px rgba(0,0,0,0.226); 
border:1px solid rgba(56,56,56,0.116);
width:30vmax;
display:flex;
flex-direction:none; 
align-items: center;
margin: 1vmax;
padding: 3vmax;

>img{
    width:5vmax;
}

>p{
    color:rgba(0,0,0,0.836);
    font:600 0.9vmax;
}
`

const ReviewComment = styled.div`
color: rgba(0, 0, 0, 0.445);
font: 300 0.8vmax;
padding-left:10px;
`


const ReviewCard = ({review}) => {
    const options = {
        value:review.rating, 
        readOnly:true,
        precision:0.5
    }

    return (
        <Review>
            <img src={profilePng} alt="User"/>
            <p>{review.name}</p>
            <Rating {...options} />
            <ReviewComment>
                {review.comment}
            </ReviewComment>
        </Review>
    )
    
}


export default ReviewCard;