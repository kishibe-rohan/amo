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
 background-color: pink;
`

const ImgContainer = styled.div` 
height:100%;
flex:1;
`

const Image = styled.img`
height:100%;
`

const InfoContainer = styled.div` 
flex:1;
padding:50px;
`
const Title = styled.h1` 
font-size:70px;
`

const Desc = styled.div` 
margin:50px 0px;
font-size:20px;
font-weight:500;
letter-spacing:3px;
`
const Slider = ({sliderItems}) => {
    const [itemIndex,setItemIndex] = useState(0);
    const handleClick = (direction) => {
        if(direction === "left")
        {
            setItemIndex(itemIndex > 0 ? itemIndex - 1 : sliderItems?.length - 1);
        }
        else
        {
            setItemIndex(itemIndex < 2 ? itemIndex + 1 : 0);
        }
    }

    return (
        <Container>
          <Arrow direction="left" onClick={() => handleClick("left")}>
                <ArrowLeftOutlined/>
          </Arrow>
          <Wrapper itemIndex = {itemIndex}>
             {sliderItems.map((item) => (
                 <Item key={item.id}>
                     <ImgContainer>
                     <Image src={item.images[0].url}/>
                     </ImgContainer>
                     <InfoContainer>
                         <Title>{item.name}</Title>
                         <Desc>{item.description}</Desc>
                         
                     </InfoContainer>
                </Item>
             ))}
          </Wrapper>
          <Arrow direction="right"  onClick={() => handleClick("right")}>
          <ArrowRightOutlined/>
          </Arrow>
        </Container>
      )
}

export default Slider;