import './App.css';
import {Link,useLocation, useParams } from "react-router-dom"
import Box from '@mui/material/Box';

import ArrowBack from '@mui/icons-material/ArrowBack';
const ExposureConfirmationRpt = ()=> {
  const location = useLocation()
const seriesid=location.state.seriesid;//.id
  const imgMyimageexample = require('./background.jpg');
const divStyle = {
  width: '100%',
  height: '800px',
  backgroundImage: `url(${imgMyimageexample})`,
  backgroundSize: 'cover' ,
  verticalAlign:'top', 
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
         <td> <h3 style={{color:'#944780'}}>New Series{seriesid}</h3>
           </td>
</tr>
       </table>  
      
        
     
      </Box>
    );
  }

export default ExposureConfirmationRpt