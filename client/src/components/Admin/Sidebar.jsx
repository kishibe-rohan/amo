import React from "react";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

import styled from 'styled-components'
import { TreeView, TreeItem } from "@material-ui/lab";
import {ExpandMore,PostAdd,Add,ImportExport,ListAlt,Dashboard,People,RateReview} from '@material-ui/icons'

const SidebarContainer = styled.div` 
background-color: rgb(255, 255, 255);
display: flex;
flex-direction: column;
padding: 4rem 0;

> a:first-child {
    padding: 0;
  }

  > a > img {
    width: 100%;
    transition: all 0.5s;
  }

  a {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.493);
    padding: 2rem;
    transition: all 0.5s;
    
  }

  a:hover {
    color: tomato;
    transform: scale(1.1);
  }

  a > p {
    display: flex;
    align-items: center;
  }

  a > p > svg {
    margin-right: 0.5rem;
  }

  .MuiTypography-root {
    background-color: #fff !important;
  }

`


const Sidebar = () => {
  return (
    <SidebarContainer>
      <Link to="/">
        <img src={logo} alt="amo" />
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <Dashboard /> Dashboard
        </p>
      </Link>
      <a>
        <TreeView
          defaultCollapseIcon={<ExpandMore/>}
          defaultExpandIcon={<ImportExport/>}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem nodeId="2" label="All" icon={<PostAdd/>} />
            </Link>

            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<Add/>} />
            </Link>
          </TreeItem>
        </TreeView>
       </a>
      <Link to="/admin/orders">
        <p>
          <ListAlt/>
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <People/> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReview/>
          Reviews
        </p>
      </Link>
    </SidebarContainer>
  );
};

export default Sidebar;