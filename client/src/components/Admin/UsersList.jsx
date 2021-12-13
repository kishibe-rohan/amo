import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import {DataGrid} from '@material-ui/data-grid'
import {useSelector,useDispatch} from 'react-redux'
import {useAlert} from 'react-alert'

import {getAllUsers,deleteUser,clearErrors} from '../../actions/userAction'
import { DELETE_USER_RESET } from '../../constants/userConstants'

import MetaData from '../layout/MetaData'
import Header from '../layout/Header/Header'
import Footer from '../layout/Footer/Footer'
import Sidebar from './Sidebar'

import styled from 'styled-components'
import {Delete,Edit} from '@material-ui/icons'
import { Button } from '@material-ui/core'

const Container = styled.div` 
width:100vw;
max-width:100%;
display:grid;
grid-template-columns:1fr 5fr;
position:absolute;
`

const UserListContainer = styled.div` 
width:100%;
box-sizing:border-box;
background-color: rgb(255, 255, 255);
display:flex;
flex-direction:column;
border-left: 1px solid rgba(0, 0, 0, 0.158);
height: 100vh;
`
const UserListHeading = styled.h1`{
font:400 2rem;
padding:0.5vmax; 
box-sizing:border-box;
color:rgba(0,0,0,0.637);
transition: all 0.5s;
margin: 2rem;
text-align: center;
}`


const UsersList = ({history}) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const {error,users} = useSelector((state) => state.allUsers)
  const {error:deleteError,isDeleted,message} = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id))
  }

  useEffect(() => {
    if(error)
    {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      history.push("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  },[dispatch,alert,error,deleteError,history,isDeleted,message])

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.5 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName:(params) => {
        return params.getValue(params.id,"role") === "admin"?"green":"red"
      }
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <Edit/>
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
            >
              <Delete/>
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
  <>
  <MetaData title={`Users - Admin`}/>
  <Header/>
  <Container>
    <Sidebar/>
    <UserListContainer>
      <UserListHeading>All Users</UserListHeading>
      <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick autoHeight/>
    </UserListContainer>
  </Container>
  <Footer/>
  </>
  )
}

export default UsersList
