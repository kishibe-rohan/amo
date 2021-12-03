import React,{useRef,useState,useEffect} from 'react' 
import { Link } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import styled from 'styled-components'
import {MailOutline,LockOpen,Face} from '@material-ui/icons'

import {login,register,clearErrors} from '../../actions/userAction'
import {mobile} from '../../responsive'

const Container = styled.div` 
width:100vw;
height:100vh;
background:linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
),url("https://cdn.pixabay.com/photo/2020/09/10/06/01/model-5559396_960_720.jpg") center;
background-size:cover;
display:flex;
align-items:center;
justify-content:center;
`

const Wrapper = styled.div`
width:25%;
padding:20px;
background-color:white;
${mobile({ width:"auto" , padding:"10px" })}
`

const Title = styled.h1` 
font-size: 24px;
font-weight: 300;
`
const Form = styled.form` 
display:flex;
flex-direction:column;
a{
    text-decoration:none;
    color:grey;
};
a:hover{
    color:blue;
}
`

const Input = styled.input`
flex:1;
min-width:40%;
margin:10px 0;
padding:10px;
border-radius:25px;
`

const Button = styled.button` 
width:40%;
border:none;
padding:15px 20px;
background-color:#2192BF;
color:white;
cursor:pointer;
margin-bottom:10px;
`


const InfoContainer = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
margin-top:10px;

`

const LoginSignup = () => {
    const dispatch = useDispatch();

    const {isAuthenticated,error,login} = useSelector((state) => state.user)

    const [loginEmail,setLoginEmail] = useState("");
    const [loginPassword,setLoginPassword] = useState("");

    const [user,setUser] = useState({
        name:"",
        email:"",
        password:""
    })

    const {name,email,password} = user;

    const [avatar,setAvatar] = useState("/Profile.png")
    const [avatarPreview,setAvatarPreview] = useState("/Profile.png")

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail,loginPassword))
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        dispatch(register(myForm));
    }

    const registerDataChange = (e) => {
        if(e.target.name === "avatar")
        {
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState === 2)
                {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        }else
        {
            setUser({...user,[e.target.name]:e.target.value})
        }
    }

    

    return (
    <>
     <Container>
     <Wrapper>
         <Title>SIGN IN</Title>
         <Form>
          <Input placeholder="Username" />
          <Input placeholder="Password" />
          <InfoContainer>
          <Button>LOGIN</Button>
          <Link to="/forgot">Forgot Password?</Link>
          <Link to="/register">Create a New Account</Link>
          </InfoContainer>
         </Form>
     </Wrapper>
    </Container>
    </>
    )
}

export default LoginSignup;