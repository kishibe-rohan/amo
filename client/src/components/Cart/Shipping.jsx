import React,{useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useAlert} from 'react-alert'

import {PinDrop,Home,LocationCity,Public,Phone,TransferWithinAStation} from '@material-ui/icons'
import styled from 'styled-components'
import { Country, State } from "country-state-city";

import { saveShippingInfo } from '../../actions/cartAction'
import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import Header from '../layout/Header/Header'
import Footer from '../layout/Footer/Footer'

const ShippingContainer = styled.div`
width:100vw;
max-width:100%;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
`

const ShippingBox = styled.div`
background-color:white;
width:25vw;
height:90vh;
box-sizing:border-box;
overflow:hidden;
`

const ShippingHeader = styled.h2` 
text-align: center;
color: tomato;
font: 400 1.3vmax;
padding: 1.3vmax;
border-bottom: 1px solid rgba(0, 0, 0, 0.205);
width: 50%;
margin: auto;
`

const ShippingForm = styled.form` 
display:flex;
flex-direction: column;
align-items: center;
margin: auto;
padding: 2vmax;
justify-content:space-evenly;
height:80%;
transition:all 0.5s;
`

const ShippingFormItem = styled.div` 
display:flex;
width:100%;
align-items:center;
>input,>select{
    padding:1vmax 4vmax;
    padding-right:1vmax;
    width:100%;
    box-sizing:border-box;
    border:1px solid rgba(0,0,0,0.267);
    border-radius:4px;
    font:300 0.9vmax;
    outline:none;
}
>svg{
    position:absolute;
    font-size:1.6vmax; 
    transform:translateX(1vmax);
    color:tomato;
}
`

const ShippingButton = styled.input` 
border:none;
background-color:tomato;
color:white;
font:300 1vmax;
width:100%;
padding:1vmax;
cursor:pointer;
transition: all 0.5s;
outline: none;
margin: 2vmax;

:hover{
    background-color: rgb(179, 66, 46);
}
`

const Shipping = ({history}) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {shippingInfo} = useSelector((state) => state.cart);

    const [address,setAddress] = useState(shippingInfo.storage);
    const [city,setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

    const shippingSubmit = (e) => {
        e.preventDefault();

        if(phoneNo.length<10 || phoneNo.length>10)
        {
            alert.error("Please enter a valid Phone Number");
            return;
        }

        dispatch(saveShippingInfo({address,city,state,country,pinCode,phoneNo}))

        history.push("/order/confirm")
    }

  return (
   <>
   <MetaData title="amo| Shipping Details"/>
   
   <CheckoutSteps activeStep={0} />
   <ShippingContainer>
       <ShippingBox>
           <ShippingHeader>Shipping Details</ShippingHeader>
           <ShippingForm encType="multipart/form-data" onSubmit={shippingSubmit}>
           <ShippingFormItem>
               <Home/>
               <input type="text" placeholder="Address" required value={address} onChange={(e) => setAddress(e.target.value)}/>
           </ShippingFormItem>
           <ShippingFormItem>
               <LocationCity/>
               <input type="text" placeholder="City" required value={city} onChange={(e) => setCity(e.target.value)}/>
           </ShippingFormItem>
           <ShippingFormItem>
               <PinDrop/>
               <input type="number" placeholder="Pin Code" required value={pinCode} onChange={(e) => setPinCode(e.target.value)}/>
           </ShippingFormItem>
           <ShippingFormItem>
               <Phone/>
               <input type="number" placeholder="Phone Number" required value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} size="10"/>
           </ShippingFormItem>
           <ShippingFormItem>
               <Public/>
               <select required value={country} onChange={(e) => setCountry(e.target.value)}>
                   <option value="">Country</option>
                   {
                       Country && Country.getAllCountries().map((item) => (
                           <option ley={item.isoCode} value={item.isoCode}>
                               {item.name}
                           </option>
                       ))
                   }
               </select>
           </ShippingFormItem>
           {
               country && (
                   <ShippingFormItem>
                       <TransferWithinAStation/>
                       <select required value={state} onChange={(e) => setState(e.target.value)}>
                           <option value="">State</option>
                           {
                               State && State.getStatesOfCountry(country).map((item) => (
                                   <option key={item.isoCode} value={item.isoCode}>
                                       {item.name}
                                   </option>
                               ))
                           }
                       </select>
                   </ShippingFormItem>
               )
           }

           <ShippingButton type="submit" value="Continue" disbaled={state?false:true}/>
           </ShippingForm>
       </ShippingBox>
   </ShippingContainer>
  
   </>
  )
}

export default Shipping
