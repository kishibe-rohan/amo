import React from 'react'
import {Link} from 'react-router-dom'

import {Typography} from '@material-ui/core'
import styled from 'styled-components'
import { CheckCircle } from '@material-ui/icons'

const Container = styled.div` 
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin:auto;
text-align:center;
padding:10vmax;
height:50vh;

>svg{
  color:tomato;
  font-size:7vmax;
}

>p{
  font-size:2vmax;
}

>a{
  background-color: rgb(51, 51, 51);
  color: white;
  border: none;
  padding: 1vmax 3vmax;
  cursor: pointer;
  font: 400 1vmax;
  text-decoration: none;
  margin: 2vmax;
}

`
const OrderSuccess = () => {
  return (
   <Container>
     <CheckCircle/>
     <Typography>Your Order Has Been Placed Successfully.</Typography>
     <Link to="/orders">View Your Orders</Link>
   </Container>
  )
}

export default OrderSuccess
