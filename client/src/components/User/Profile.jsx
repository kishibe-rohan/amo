import React,{useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

import MetaData from '../layout/MetaData'
import Header from '../layout/Header/Header'
import Footer from '../layout/Footer/Footer'
import Loading from '../layout/Loading'

const ProfileContainer = styled.div` 
display:flex;
height:100vh;
width:100vw;
max-width:100%;
background-color:white;
`
const ProfileHeader = styled.div` 
display:flex;
height:100vh;
width:100vw;
max-width:100%;
flex-direction: column;
justify-content: center;
align-items: center;
>h1{
    color:rgba(0,0,0,0.555);
    font:500 2.2vmax;
    transform:translateX(-10vmax) translateY(-2vmax)
};
>img{
    width:20vmax;
    border-radius:100%;
    transition:all 0.5s;
};
>a{
    border: none;
    background-color: tomato;
    font: 400 1vmax;
    color: white;
    text-decoration: none;
    padding: 0.5vmax;
    width: 30%;
    margin: 4vmax;
    text-align: center;
    transition: all 0.5s;
}
`
const ProfileInfo = styled.div` 
display:flex;
height:100vh;
width:100vw;
max-width:100%;
flex-direction: column;
justify-content: center;
align-items: center;
`

const ProfileInfoItem = styled.div` 
justify-content:space-evenly;
align-items:flex-start;
padding:5vmax;
box-sizing:border-box;
>h4{
    color:black;
    font:400 1.2vmax;
    text-align:center;
};
>p{
    color:rgba(0,0,0,0.418);
    font:400 1vmax;
    margin:0.2vmax;
}
`

const ProfileFooter = styled.div` 
display:flex;
flex-direction:column;
width:60%;
>a{
    border:none;
    background-color:rgb(68,68,68);
    font:400 1vmax;
    color:white;
    text-decoration:none;
    padding: 0.5vmax;
    text-align: center;
    transition: all 0.5s;
    margin: 1vmax 0;
}
`

const Profile = ({history}) => {
    const {user,loading,isAuthenticated} = useSelector((state) => state.user)

    useEffect(() => {
        if(isAuthenticated === false)
        {
            history.push("/login")
        }
    },[history,isAuthenticated])

    return (
        <>
        {loading? (
            <Loading/>
        ):(
            <>
            <MetaData title={`${user?.name}'s Profile`}/>
            
            <ProfileContainer>
                <ProfileHeader>
                    <h1>My Profile</h1>
                    <img src={user?.avatar?.url} alt={user?.name}/>
                    <Link to="/me/update">Edit Profile</Link>
                </ProfileHeader>
                <ProfileInfo>
                    <ProfileInfoItem>
                        <h4>Full Name</h4>
                        <p>{user?.name}</p>
                    </ProfileInfoItem>
                    <ProfileInfoItem>
                        <h4>Email</h4>
                        <p>{user?.email}</p>
                    </ProfileInfoItem>
                    <ProfileInfoItem>
                        <h4>Joined On</h4>
                        <p>{String(user?.createdAt)?.substr(0,10)}</p>
                    </ProfileInfoItem>
                    <ProfileFooter>
                        <Link to="/orders">My Orders</Link>
                        <Link to="/password/update">Change Password</Link>
                    </ProfileFooter>
                </ProfileInfo>
            </ProfileContainer>
           
            </>
        )}
        </>
    )
}

export default Profile;