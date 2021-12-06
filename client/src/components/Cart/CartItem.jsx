import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const CartItemCard = styled.div` 
display:flex;
padding:1vmax;
height:8vmax;
align-items: flex-start;
box-sizing: border-box;
`

const CartItemImage = styled.img` 
width:5vmax;
`

const CartItemInfo = styled.div` 
display:flex;
margin:0.3vmax 1vmax;
flex-direction:column;
>a{
    font: 300 0.9vmax;
    color:#37BDAE;
    text-decoration:none;
}
>span{
  font: 300 0.9vmax;
  color: rgba(24, 24, 24, 0.815);
}
>p{
    color:tomato;
    cursor:pointer;
    font:100 0.8vmax;
}
`



const CartItem = ({item,deleteCartItems}) => {
  return (
    <CartItemCard>
    <CartItemImage src={item.image} alt={item.name}/>
    <CartItemInfo>
        <Link to={`/product/${item.product}`}>
            {item.name}
        </Link>
        <span>{`Price: ₹${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
    </CartItemInfo>
    </CartItemCard>
  )
}

export default CartItem
