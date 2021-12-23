import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {clearErrors,forgotPassword} from '../../actions/userAction'
import { useAlert } from 'react-alert'

import Loading from '../layout/Loading'
import MetaData from '../layout/MetaData'

import { MailOutline } from '@material-ui/icons'
import styled from 'styled-components'

const ForgotPasswordContainer = styled.div`
width:100vw;
height:100vh;
max-width:100%;
display:flex;
justify-content: center;
align-items: center;

`

const ForgotPasswordBox = styled.div`
background-color: white;
width: 25vw;
height: 40vh;
box-sizing: border-box;

`

const ForgotPasswordHeading = styled.h2`
text-align:center;
color:rgba(0,0,0,0.664);
font:400 1.3vmax;
padding:1.3vmax;
border-bottom:1px solid tomato;
width: 50%;
margin: auto;
`

const ForgotPasswordForm = styled.form`
display:flex;
flex-direction: column;
align-items: center;
margin: auto;
padding: 2vmax;
justify-content: space-evenly;
height: 70%;
`

const ForgotPasswordEmail = styled.div`
display:flex;
width: 100%;
align-items: center;
>input{
    padding:1vmax 4vmax;
    padding-right:1vmax;
    width:100%;
    box-sizing:border-box;
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

const ForgotPasswordBtn = styled.input`
border:none;
background-color:tomato;
color:white;
font:300 0.9vmax;
width:100%;
padding:0.8vmax;
cursor:pointer;
border-radius: 4px;
outline: none;
box-shadow: 0 2px 5px rgba(0, 0, 0, 0.219);
`

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const {error,message,loading} = useSelector((state) => state.forgotPassword)

    const [email,setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("email",email);
        dispatch(forgotPassword(myForm))
    }

    useEffect(() => {
        if(error)
        {
            alert.error(error);
            dispatch(clearErrors());
        }

        if(message)
        {
            alert.error(message)
        }
    },[dispatch,error,alert,message])



  return (
    <>
      {
          loading?(
              <Loading/>
          ):(
              <>
              <MetaData title="Forgot Password"/>
              <ForgotPasswordContainer>
                  <ForgotPasswordBox>
                      <ForgotPasswordHeading>Forgot Password</ForgotPasswordHeading>
                      <ForgotPasswordForm onSubmit={forgotPasswordSubmit}>
                          <ForgotPasswordEmail>
                              <MailOutline/>
                              <input type="email" placeholder="Enter your E-mail" required name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                          </ForgotPasswordEmail>
                          <ForgotPasswordBtn type="submit" value="Submit"/>
                      </ForgotPasswordForm>
                  </ForgotPasswordBox>
              </ForgotPasswordContainer>
              </>
          )
      }
    </>
  )
}

export default ForgotPassword
