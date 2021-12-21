import React,{useState} from 'react'
import {useAlert} from 'react-alert'
import { Link,useHistory } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {logout} from '../../../actions/userAction'

import { Backdrop } from '@material-ui/core'
import {SpeedDial,SpeedDialAction} from '@material-ui/lab'
import {Search,ShoppingCart,ListAlt,ExitToApp,Person,Dashboard, PersonAddDisabled} from '@material-ui/icons'
import styled from 'styled-components'

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
background-color:tomato;
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

const Header = ({user}) => {
  const {cartItems} = useSelector((state) => state.cart);

  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();

  function dashboard() {
    history.push("/admin/dashboard");
  }

  function orders() {
    history.push("/orders");
  }
  function account() {
    history.push("/account");
  }
  function cart() {
    history.push("/cart");
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("Logged Out Successfully");
  }

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
        <ShoppingCart onClick={cart} style={{color:"white"}}/>
        </MenuItem>
        <MenuItem>
        <Person onClick={account} style={{color:"white"}}/>
        </MenuItem>
        <MenuItem>
        <ListAlt onClick={orders} style={{color:"white"}}/>
        </MenuItem>
        <MenuItem>
        {
          user && <ExitToApp onClick={logoutUser} style={{color:"white"}}/>
        }
        </MenuItem>
        <MenuItem>
        {user && <img src={user.avatar.url} style={{height:"28px",width:"28px",borderRadius:"50%"}}/> }
        </MenuItem>
        <MenuItem>
        {
          user?.role === "admin" && <Dashboard onClick={dashboard} style={{color:"white"}}/>
        }
        </MenuItem>
      </Right>
      </Wrapper>
    </Container>
      
  )
}


export default Header
