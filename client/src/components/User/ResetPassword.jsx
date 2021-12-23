import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {useAlert} from 'react-alert'
import {clearErrors,resetPassword} from '../../actions/userAction'

import styled from 'styled-components'
import Loading from '../layout/Loading'
import MetaData from '../layout/MetaData'

import {LockOpen,Lock} from '@material-ui/icons'

const ResetPasswordContainer = styled.div`
width:100vw;
height:100vh;
max-width:100%;
display:flex;
justify-content: center;
align-items: center;`

const ResetPasswordBox = styled.div`
background-color: white;
width: 25vw;
height: 40vh;
box-sizing: border-box;`

const ResetPasswordHeading = styled.h2`
text-align:center;
color:rgba(0,0,0,0.664);
font:400 1.3vmax;
padding:1.3vmax;
border-bottom:1px solid tomato;
width: 50%;
margin: auto;`

const ResetPasswordForm = styled.form`
display:flex;
flex-direction: column;
align-items: center;
margin: auto;
padding: 2vmax;
justify-content: space-evenly;
height: 70%;
`

const FormItem = styled.div`
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
    font: 500 0.9vmax;
    outline: none;
}
>svg{
    position:absolute;
    transform:translateX(1vmax);
    font-size:1.6vmax;
    color:rgba(0,0,0,0.623);
}`

const ResetPasswordBtn = styled.input`
border:none;
background-color:tomato;
color:white;
font:300 0.9vmax;
width:100%;
padding:0.8vmax;
cursor:pointer;
border-radius: 4px;
outline: none;
box-shadow: 0 2px 5px rgba(0, 0, 0, 0.219);`

const ResetPassword = ({history,match}) => {
    const dispatch = useDispatch();
    const alert = useAlert();
  
    const { error, success, loading } = useSelector(
      (state) => state.forgotPassword
    );
  
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("password",password);
        myForm.set("confirmPassword",confirmPassword)

        dispatch(resetPassword(match.params.token,myForm))
    };

    useEffect(() => {
        if(error)
        {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Password Updated Successfully");
      
            history.push("/login");
          }
    },[dispatch,error,alert,history,success]);

  return (
   <>
   {
       loading?(
           <Loading/>
       ):(
           <>
           <MetaData title="Change Password"/>
           <ResetPasswordContainer>
               <ResetPasswordBox>
                   <ResetPasswordHeading>Change Password</ResetPasswordHeading>
                   <ResetPasswordForm onSubmit={resetPasswordSubmit}>
                       <FormItem>
                           <LockOpen/>
                           <input type="password" placeholder="New Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                       </FormItem>
                       <FormItem>
                           <Lock/>
                           <input type="password" placeholder="Confirm Password" required  value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}/>
                       </FormItem>
                       <ResetPasswordBtn type="submit" value="Submit"/>
                   </ResetPasswordForm>
               </ResetPasswordBox>
           </ResetPasswordContainer>
           </>
       )
   }
   </>
  )
}

export default ResetPassword
