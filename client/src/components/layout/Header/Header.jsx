import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Badge } from '@material-ui/core'
import {Search,ShoppingCartOutlined} from '@material-ui/icons'

import {mobile} from '../../../responsive'
import logo from '../../../images/logo.png'

const Container = styled.div`
 width:100vw;
 display:flex;
 ${mobile({height:"50px"})}
`
const Wrapper = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
padding:10px 20px;
background-color:#C9048F;
width:100%;
${mobile({padding:"10px 0px"})}
`
const Left = styled.div` 
flex:1;
display:flex;
align-items:center;
`

const Logo = styled.h1`
font-weight:bold;
color:white;
${mobile({ fontSize: "24px" })}
`

const Center = styled.div`
flex:1;
`

const SearchContainer = styled.div`
border:2px solid lightgray;
border-radius:25px;
display:flex;
align-items:center;
justify-content:space-between;
margin-left: 25px;
padding:5px;
`

const Input = styled.input` 
border:none;
background:transparent;
color:white;
placeholder:{
  color:white;
};
${mobile({width:"50px"})};
&:focus{
  outline:none;
}
`


const Right = styled.div`
flex:1;
display: flex;
align-items: center;
justify-content: flex-end;
${mobile({ flex: 2, justifyContent: "center" })}
`

const MenuItem = styled.div` 
 font-size:14px;
 cursor:pointer;
 margin-left:25px;
 ${mobile({ fontSize: "12px", marginLeft: "10px" })};
 a{
   text-decoration:none;
   color:white;
 };
 a:hover{
   color:lightgray;
 }
`

const Header = () => {
  return (
    <Container>
      <Wrapper>
      <Left>
        <Logo>AMO</Logo>
      </Left>
      <Center>
      <SearchContainer>
        <Input placeholder = "Search for a product.." />
        <Search style={{color:"white",fontSize:16}} />
      </SearchContainer>
      </Center>
      <Right>
        <MenuItem>
        <Link to ="/products">
          Products
        </Link>
        </MenuItem>
        <MenuItem>
        <Link to ="/contact">
          Contact
        </Link>
        </MenuItem>
        <MenuItem>
        <Link to ="/about">
          About
        </Link>
        </MenuItem>
      </Right>
      </Wrapper>
    </Container>
      
  )
}


export default Header
