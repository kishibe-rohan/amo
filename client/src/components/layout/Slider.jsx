import React,{useState} from 'react'
import { ArrowLeftOutlined,ArrowRightOutlined } from '@material-ui/icons'
import styled from 'styled-components'

import {mobile} from '../../responsive'

const Container = styled.div` 
width:100%;
height:100vh;
display:flex;
position:relative;
overflow:hidden;
margin-top:10px;
 ${mobile({display:"none"})}
`
const Arrow = styled.div` 
width:50px;
height:50px;
background-color:#fff7f7;
border-radius:50%;
display:flex;
align-items:center;
justify-content: center;
 position:absolute;
 margin:auto;
 cursor:pointer;
 opacity:0.5;
 z-index:2;
 top:0;
 bottom:0;
 left:${(props) => props.direction === "left" && "10px" };
 right:${(props) => props.direction === "right" && "10px"}

 `

 const Wrapper = styled.div` 
 height:100%;
 display:flex;
 transition:all 1.5s ease;
 transform: translateX(${(props) => props.itemIndex * - 100}vw);
 `

 
const Item = styled.div`
 width:100vw;
 height:100vh;
 display:flex;
 align-itmes:center;
 background-color:#${(props) => props.bg};
`

