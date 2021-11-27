import React,{useRef,useState,useEffect} from 'react' 
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {MailOutline,LockOpen,Face} from '@material-ui/icons'

import {login,register,clearErrors} from '../../actions/userAction'
import { isUint16Array } from 'util/types'

const LoginSignup = () => {
    const dispatch = useDispatch();

    const {isAuthenticated,error,login} = useSelector((state) => state.user)

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

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

    const redirect = location.search?location.search.split("=")[1]:"/account"

    useEffect(() => {
    if(error)
    {
        dispatch(clearErrors());
    }

    if(isAuthenticated)
    {
        history.push(redirect)
    }
    },[dispatch,error,history,isAuthenticated,redirect])

    return (
    <>
    <div className="LoginSignupContainer">
        <div className="LoginSignupBox">
            <div>
                <div className="login_signup_toggle">
                   Login
                </div>
            </div>
        </div>
    </div>
    </>
    )
}

export default LoginSignup;