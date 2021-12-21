import React,{useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { useAlert } from 'react-alert'

import { UPDATE_USER_RESET } from '../../constants/userConstants'
import { getUserDetails,updateUser,clearErrors } from '../../actions/userAction'

import MetaData from '../layout/MetaData'
import Header from '../layout/Header/Header'
import Sidebar from './Sidebar'
import Loading from '../layout/Loading'

import {MailOutline,Person,VerifiedUser} from '@material-ui/icons'
import styled from 'styled-components'

const Container = styled.div`
width:100vw;
max-width:100%;
display:grid;
grid-template-columns:1fr 5fr;
position:absolute;`

const UpdateUserContainer = styled.div`
width:100%;
box-sizing:border-box;
background-color: rgb(221,221,221);
border-left: 1px solid rgba(0,0,0,0.158);
display:flex;
flex-direction:column;
height:100vh;
`

const UpdateUserForm = styled.form`
display: flex;
flex-direction: column;
align-items: center;
margin: auto;
padding: 3vmax;
justify-content: space-evenly;
height: 70%;
width: 40vh;
background-color: white;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.267);`

const UpdateUserHeading = styled.h1`
color:rgba(0,0,0,0.733);
font:300 2rem;
text-align:center;`

const UpdateUserFormItem = styled.div`
display: flex;
width: 100%;
align-items: center;

>input,>select,>textarea{
  padding:1vmax 4vmax;
  padding-right:1vmax;
  width:100%;
  box-sizing:border-box;
  border:1px solid rgba(0,0,0,0.267);
  border-radius:4px;
  font:300 0.9vmax;
  outline:none;
};

>svg{
  position: absolute;
  transform: translateX(1vmax);
  font-size: 1.6vmax;
  color: rgba(0, 0, 0, 0.623);
}`

const UpdateUserButton = styled.button`
border: none;
background-color: tomato;
color: white;
font: 300 0.9vmax;
width: 100%;
padding: 0.8vmax;
cursor: pointer;
transition: all 0.5s;
border-radius: 4px;
outline: none;
box-shadow: 0 2px 5px rgba(0, 0, 0, 0.219);`

const UpdateUser = ({history,match}) => {
  const dispatch = useDispatch();
  const {loading,error,user} = useSelector((state) => state.userDetails)

  const {loading:updateLoading,error:updateError,isUpdated} = useSelector((state) => state.profile)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = match.params.id;

  useEffect(() => {
    if(user && user._id!==userId)
    {
      dispatch(getUserDetails(userId))
    }else{
      setName(user.name);
      setEmail(user.email);
      setRole(user.role)
    }
    if(error)
    {
      alert.error(error);
      dispatch(clearErrors())
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if(isUpdated)
    {
      alert.success("user Updated Successfully");
      history.push("/admin/users");
      dispatch({type:UPDATE_USER_RESET})
    }
  },[dispatch, alert, error, history, isUpdated, updateError, user, userId])

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name",name);
    myForm.set("email",email);
    myForm.set("role",role);

    dispatch(updateUser(userId,myForm));
  }
  return (
    <>
    <MetaData title="Update User - Admin"/>
    
    <Container>
      <Sidebar/>
      <UpdateUserContainer>
    {loading?(<Loading/>):(
      <UpdateUserForm onSubmit={updateUserSubmitHandler}>
         <UpdateUserHeading>Update User</UpdateUserHeading>
         <UpdateUserFormItem>
           <Person/>
           <input type="text" placeholder="Name" required value={name} onChange={(e) => setName(e.target.value)}/>
         </UpdateUserFormItem>
         <UpdateUserFormItem>
           <MailOutline/>
           <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
         </UpdateUserFormItem>
         <UpdateUserFormItem>
           <VerifiedUser/>
           <select value={role} onChange={(e) => setRole(e.target.value)}>
             <option value="">Choose Role</option>
             <option value="admin">Admin</option>
             <option value="user">User</option>
           </select>
         </UpdateUserFormItem>
         <UpdateUserButton type="submit" disabled={updateLoading?true:false || role===""?true:false}>
           Update
         </UpdateUserButton>
      </UpdateUserForm>
    )}
      </UpdateUserContainer>
    </Container>
    </>
  )
}

export default UpdateUser
