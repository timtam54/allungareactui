import './App.css';
import Series from './Series';
import React, { useState, useEffect, Component } from "react";
import Samples from './Samples';
import Box from '@mui/material/Box';
import {Link,useLocation, useParams } from "react-router-dom"
import ArrowBack from '@mui/icons-material/ArrowBack';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
const SplitSeries = ()=> {
  const location = useLocation()
  const seriesid = location.state.id;//.id

  const [value, setValue] = React.useState('1');


const handleChange = (event, newValue) => {
  setValue(newValue);
};
    return (
      
      <Box sx={{ width: '100%', typography: 'body1' }}>
      <table>
       <tr>
         <td>
         <Link to="/"><ArrowBack/>back</Link>
         </td>
         <td>
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         </td>
         <td> <h3 style={{color:'#944780'}}>New Series</h3>
           </td>
</tr>
       </table>  
      
        


<TabContext value={value}>
<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
<TabList onChange={handleChange} >
<Tab label="Series Detail" value="1" />
<Tab label="Samples" value="2" />
<Tab label="Complete" value="3" />
</TabList>
</Box>
<TabPanel value="1"><Series seriesID={seriesid} /></TabPanel>
<TabPanel value="2"><Samples  SeriesID={seriesid} /></TabPanel>
<TabPanel value="3">Split Nwo Button</TabPanel>
</TabContext>
     
</Box>


    );
  }

export default SplitSeries