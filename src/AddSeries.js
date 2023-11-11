import './App.css';
import Series from './Series';
import Box from '@mui/material/Box';
import {Link,useLocation, useParams } from "react-router-dom"
import ArrowBack from '@mui/icons-material/ArrowBack';


  export default function AddSeries(SeriesID) {
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
         <td> <h3 style={{color:'#944780'}}>New Series</h3>
           </td>
</tr>
       </table>  
        <Series seriesID={0} />
        
     
      </Box>
    );
  }

