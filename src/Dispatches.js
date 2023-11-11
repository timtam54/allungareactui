
import React, { useState, useEffect, Component } from "react";
import {Link,useLocation, useParams } from "react-router-dom"
import { Circles } from 'react-loader-spinner'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TheaterComedyOutlined } from "@mui/icons-material";
import { bearerToken } from './index'
import './App.css';

function Dispatches({SeriesID}) {
//  const SeriesID=`1211`;
  const [loading,setLoading] = useState(true);
const [status,setStatus]=useState("");
  useEffect(() => {


    fetchSample();

  }, []);
  const urlSample = `https://allungawebapi.azurewebsites.net/api/dispatches/`+SeriesID;
  const [dataSample, setDataSample] = useState([]);
  const fetchSample = async e=>{

    const token = await bearerToken()
  const headers = new Headers()
  const bearer = `Bearer ${token}`

  headers.append('Authorization', bearer)

  const options = {
    method: 'GET',
    headers: headers,
  }  
  const response = fetch(urlSample,options);
  var ee=await response;
  if (!ee.ok)
  {
    throw Error((ee).statusText);
  }
  const json=await ee.json();
  console.log(json);
  
  setDataSample(json);
  setLoading(false);
  }


  return (
    <body>

{loading ? 
     
     <Circles
     height="300"
     width="300"
     color="purple"
     ariaLabel="circles-loading"
     wrapperStyle={{}}
     wrapperClass=""
     visible={true}
   />
:
  <table   id="table1"> 
    <tr>
      <td colSpan={8}>
        {status}
      </td>
    </tr>
  <tr>
 

  <th><b>Staff </b></th>
  <th><b>Date</b></th>
    <th><b>Description</b></th>
    <th><b>Full Return</b></th>
    <th><b>Status</b></th>
    <th><b>By Request</b></th>
    <th><b>Re-exposure Date</b></th>
    <th><b>Comments</b></th>
  </tr>
  
  {
    dataSample.map((result,i)=>{
      return (
        <tr  key={i} >
        

  <td>{result.Staff}</td>
  <td>{new Date(result.Dte).toLocaleDateString()}</td>
          <td>{result.Description}</td>
          <td><input type="checkbox" name="FullReturn_ElsePart" checked={result.FullReturn_ElsePart} /></td>
          <td>{result.Status}</td>
            <td><input type="checkbox" name="FullReturn_ElsePart" checked={result.ByRequest} /></td>
  

          <td>{new Date(result.ReexposureDate).toLocaleDateString()}</td>
          <td>{result.Comments}</td>
         </tr>  
      )
    })
  }
</table>
}
</body>
);

}
export default Dispatches