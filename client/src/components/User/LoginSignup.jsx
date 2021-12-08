import React,{useEffect,useState,useRef} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loading from '../layout/Loading'

import useStyles from './styles'
import {Box,Typography,TextField,Button} from '@material-ui/core'
import { clearErrors,login,register } from '../../actions/userAction'
import { useAlert } from 'react-alert'

const LoginSignup = ({history,location}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const alert = useAlert();

    const {error,loading,isAuthenticated} = useSelector((state) => state.user)

    const [loginEmail,setLoginEmail] = useState("");
    const [loginPassword,setLoginPassword] = useState("");
    const [status,setStatus] = useState('login')

    const [user,setUser] = useState({
        name:"",
        email:"",
        password:"",
    })

    const {name,email,password} = user;

    const [avatar,setAvatar] = useState("/Profile.png");
    const [avatarPreview,setAvatarPreview] = useState("/Profile.png")

    const handleLogin = (e) => {
      e.preventDefault();
      console.log(loginEmail,loginPassword);
      dispatch(login(loginEmail,loginPassword))
    }

    const handleSignup = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);

        console.log(myForm);
        dispatch(register(myForm));
    }

    const handleChange = (e) => {
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

            reader.readAsDataURL(e.target.files[0])
        }else{
            setUser({...user,[e.target.name]:e.target.value})
        }
    }

    const toggleStatus = (e) => {
        e.preventDefault();
        if(status==='login')
        setStatus('signup')
        else if(status === 'signup')
        setStatus('login')
    }

    const redirect = location.search ? location.search.split("=")[1] : "/account";

    useEffect(() => {
        if(error)
        {
            alert.error(error);
            dispatch(clearErrors());
        }

        if(isAuthenticated)
        history.push(redirect);
    },[dispatch,alert,error,history,isAuthenticated,redirect])

   
  return (
    <div className={classes.container}>
      <Box style={{display:"flex"}} className={classes.wrapper}>
          <Box className={classes.image}>
              <Typography variant="h5">
                  {status === "login" ? 'Login' : 'Sign Up'}
              </Typography>
              <Typography style={{marginTop:20}}>
                  Explore the best fashion brands and find your fit!
              </Typography>
          </Box>
          {
              status === 'login' ? <Box className={classes.login}>
                  <TextField  onChange={(e) => setLoginEmail(e.target.value)} label="Email" />
                  <TextField onChange={(e) => setLoginPassword(e.target.value)} label="Password" type="password" />
                  <Button onClick = {handleLogin}  className={classes.loginBtn}>Login</Button>
                  <Typography className={classes.text}>Not a member yet? Create An Account!</Typography>
                  <Button onClick={toggleStatus} className={classes.signupBtn}>Sign Up</Button>
              </Box> : <Box className={classes.login}>
              <TextField onChange = {(e) => handleChange(e)} name="name" label="Username" />
              <TextField onChange = {(e) => handleChange(e)} name="email" label="Email" />
              <TextField onChange = {(e) => handleChange(e)} name="password" label="Password" type="password" />
              <div className={classes.avatar}>
                  <img src={avatarPreview} className={classes.avatarImg} alt="Avatar Preview"/>
                  <input className={classes.avatarInput} type="file" name="avatar" accept="image/*" onChange={(e) => handleChange(e)} />
              </div>
              <Button onClick={handleSignup} className={classes.signupBtn}>Sign Up</Button>
              <Typography className={classes.loginText}>Already have an account? Sign In!</Typography>
              <Button onClick={toggleStatus} className={classes.loginBtn}>Login</Button>

              </Box>
          }
      </Box>
    </div>
  )
}

export default LoginSignup
