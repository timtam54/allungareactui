import './App.css';
import logo from './logo.png';
import tag from './tagline.png';
import exposureicon from './images/ExposureIcon.GIF';
import testicon from './images/TestIcon.GIF';
import React,{ useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Divider } from '@mui/material';
import {  useMsal} from '@azure/msal-react'
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import HelpIcon from '@mui/icons-material/Help';
import PeopleIcon from '@mui/icons-material/People';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import GroupsIcon from '@mui/icons-material/Groups';
import CalculateIcon from '@mui/icons-material/Calculate';
import {Link} from "react-router-dom"
import { DropdownDivider, DropdownItem } from 'react-bootstrap';
//import HomeSearch from './HomeSearch';
//import About from './About';
//import Users from './Users';


function Header() {
  const { instance, accounts } = useMsal();
 // const {instance} = useMsal();
  const logout = async e=>{
    alert('logout');
    instance.logout();
  }

  /*
  <Divider></Divider>
        <Dropdown.Item href="/about">
          <HelpIcon/>About</Dropdown.Item>
        <Divider></Divider>
       
        <Dropdown.Item href="/users"><PeopleIcon/>Users</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </td>
  
    <td>
  <Dropdown>
      <Dropdown.Toggle variant='Active' className="dropdown-button" >
        Data<br/>
      </Dropdown.Toggle>
      <Dropdown.Menu >
      <Dropdown.Item href="/parameters"><img src={testicon} />Parameters</Dropdown.Item>

<Divider></Divider>
        <Dropdown.Item href="/exposuretypes">
        <img src={exposureicon} />Exposure Types</Dropdown.Item>
        <Divider></Divider>
        <Dropdown.Item href="/clients">
      
        <GroupsIcon />Clients
        </Dropdown.Item>




         <td>
    <Dropdown>
     
    </td>
    <td>
    <Dropdown>
      <Dropdown.Toggle variant='Active' className="dropdown-button" >
        Settings<br/>
      </Dropdown.Toggle>
      <Dropdown.Menu >       
        <Dropdown.Item href="/RecalcSchedule"><CalculateIcon/>Calculate Schedule</Dropdown.Item>
        <Divider></Divider>
       
        <Dropdown.Item href="/users"><PeopleIcon/>Users</Dropdown.Item>
        
      </Dropdown.Menu>
    </Dropdown>
    </td>
    */    
    return (
      <body>
     

<link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossorigin="anonymous"
    />
<table className="header"> 

<tr>
<td> <a href="/"><img src={logo} width={300} height={80} /></a></td>
  
    <td>
    <Dropdown>
      <Dropdown.Toggle style={{backgroundColor:'black',color:'white'}} >
      Home
      </Dropdown.Toggle>
      <Dropdown.Menu >
      <Dropdown.Item href="/"><SearchIcon />Series Search</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </td>
    <td>
    <Dropdown>
    <Dropdown.Toggle variant='Active'  style={{backgroundColor:'black',color:'white'}} >
     Data
      </Dropdown.Toggle>
      <Dropdown.Menu >
      <Dropdown.Item as={Link}  to="/clients">
      <GroupsIcon />Clients</Dropdown.Item>
    
      <DropdownDivider></DropdownDivider>  
      <Dropdown.Item as={Link}  to="/exposuretypes">
        <img src={exposureicon} />Exposure Types</Dropdown.Item>

      </Dropdown.Menu>
      </Dropdown>
    </td>
   <td>
   <Dropdown>
   <Dropdown.Toggle variant='Active' style={{backgroundColor:'black',color:'white'}} >
        Reports
      </Dropdown.Toggle>
      <Dropdown.Menu >
        <Dropdown.Item  as={Link}  to="/rptrack">
          <MenuBookIcon/>Rack Report</Dropdown.Item>

          <Divider></Divider> 
          <Dropdown.Item  as={Link} to="/rptsampleonsites"><ImportContactsIcon/>Sample On Site Report</Dropdown.Item>
          <Divider></Divider> 
          <Dropdown.Item  as={Link} to="/seriesprojectedwork"><ImportContactsIcon/>Series Projected Work</Dropdown.Item>
          <Divider></Divider> 
          <Dropdown.Item  as={Link} to="/Rprt">Excel</Dropdown.Item>
      
      </Dropdown.Menu>
    </Dropdown>
   </td>
    <td> <img src={tag} width={380} height={20} /></td>
    <td>
     {accounts[0].name}
    </td>
    <td><button className="dropdown-button" onClick={logout}><LogoutIcon/></button></td>
  </tr>
</table>

</body>    
    );
  }

export default Header