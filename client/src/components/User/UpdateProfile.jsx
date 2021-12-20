import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import styled from 'styled-components'

import {MailOutline,Face} from '@material-ui/icons'
import {clearErrors,updateProfile,loadUser} from '../../actions/userAction'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants'

import Loading from '../layout/Loading'
import MetaData from '../layout/MetaData'
import Header from '../layout/Header/Header'
import Footer from '../layout/Footer/Footer'

const UpdateProfileContainer = styled.div` 
width:100vw;
height:100vh;
max-width:100%;
display:flex;
justify-content:center;
align-items: center;
background-color:rgb(231,231,231);
`

const UpdateProfileBox = styled.div`
background-color:white;
width:25vw;
height:70vh;
box-sizing:border-box;
overflow:hidden;
`

const UpdateProfileHeader = styled.h2` 
text-align:center;
color:rgba(0,0,0,0.664);
font:400 1.3vmax;
padding:1.3vmax;
border-bottom:1px solid rgba(0,0,0,0.205);
width:50%;
margin:auto;
`

const UpdateProfileForm = styled.form` 
display:flex;
flex-direction: column;
align-items:center;
justify-content:space-evenly;
margin: auto;
padding: 2vmax;
height: 70%;
>div{
    display:flex;
    align-items:center;
    width:100%;
}
`

const UpdateProfileName = styled.div` 
>svg{
    position:absolute;
    transform: translateX(1vmax);
    font-size:1.6vmax;
    color:rgba(0,0,0,0.623);
}
`
const UpdateProfileEmail = styled.div` 
>svg{
    position:absolute;
    transform: translateX(1vmax);
    font-size:1.6vmax;
    color:rgba(0,0,0,0.623);
`
const UpdateProfileImage = styled.div` 
>img{
    width:3vmax;
    border-radius:100%;
    margin:1vmax;
}
>input{
    display:flex;
    padding:0%;
}
`

const UpdateProfileInput = styled.input` 
padding:1vmax 4vmax;
padding-right:1vmax;
width:100%;
box-sizing:border-box;
border:1px solid rgba(0,0,0,0.267);
border-radius:4px;
font:300 0.9vmax;
outline:none; 
`

const UpdateProfileButton = styled.input` 
border:none;
background-color:tomato;
color:white;
font:300 0.9vmax;
width: 100%;
  padding: 0.8vmax;
  cursor: pointer;
  border-radius: 4px;
  outline: none;
  box-shadow:0 2px 5px rgba(0,0,0,0.219);
`

const UpdateProfile = ({history}) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const {user} = useSelector((state) => state.user);
    const {error,isUpdated,loading} = useSelector((state) => state.profile);

    const [name,setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("/Profile.png");
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name",name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));
    }

    const updateProfileAvatar = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if(reader.readyState === 2)
            {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        }

        reader.readAsDataURL(e.target.files[0]);
    }

    useEffect(() => {
        if(user)
        {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url)
        }

        if(error)
        {
            alert.error(error);
            dispatch(clearErrors());
        }

        if(isUpdated)
        {
            alert.success("Profile Updated Successfully");
            dispatch(loadUser());
            history.push('/account');
            
            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }
    },[dispatch,error,alert,history,user,isUpdated,])

  return (
    <>
    {
        loading? (
            <Loading/>
        ):(
      <>
      <MetaData title={"amo| Update Profile"}/>
      <Header/>
      <UpdateProfileContainer>
      <UpdateProfileBox>
          <UpdateProfileHeader>
              Update Profile
          </UpdateProfileHeader>
          <UpdateProfileForm encType="multiform/form-data" onSubmit={updateProfileSubmit}>
              <UpdateProfileName>
                   <Face/>
                   <UpdateProfileInput type="text" placeholder="Name" required name="name" value={name} onChange={(e) => setName(e.target.value)}/>
              </UpdateProfileName>
              <UpdateProfileEmail>
                  <MailOutline/>
                  <UpdateProfileInput type="email" placeholder="Email" required name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
              </UpdateProfileEmail>
              <UpdateProfileImage>
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input type="file" name="avatar" accept="image/*" onChange={updateProfileAvatar}/>
              </UpdateProfileImage>
              <UpdateProfileButton type="submit" value="Update"/>
          </UpdateProfileForm>
      </UpdateProfileBox>
      </UpdateProfileContainer>

      <Footer/>
      </>
        )
    }
      
    </>
  )
}

export default UpdateProfile
