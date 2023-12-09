import "./App.css"
import React, { useState, useEffect, Component } from "react";
import {Link, BrowserRouter, Routes, Route} from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { Circles } from 'react-loader-spinner'
import { bearerToken } from './index'

function ExposureTypes() {
  const [loading,setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);

    fetchExposureType();

  }, []);
  const endPoint = `https://allungawebapi.azurewebsites.net/api/ExposureTypes/`;
 
  const fetchExposureType = async e=>{

  const token = await bearerToken()

  const headers = new Headers()
  const bearer = `Bearer ${token}`

  headers.append('Authorization', bearer)

  const options = {
    method: 'GET',
    headers: headers,
  }  
  const response = fetch(endPoint,options);
  var ee=await response;
  if (!ee.ok)
  {
    throw Error((ee).statusText);
  }
  const json=await ee.json();
  console.log(json);
  setData(json);
  setLoading(false);
}

  return (
    <body>
<table width="50%"><tr>
          <td>
          <h3 style={{color:'#944780'}}>Exposure Types</h3>

          </td>

          <td><Link
  to={"/exposuretype"} state={{id: 0}}>  
    <AddIcon/>Add New
</Link></td>
</tr>
</table>
  <table id="table1">
  <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Description</th>
    
    <th>SortOrder</th>
    
  </tr>
  {loading ? 
     
     <Circles
     height="300"
     width="300"
     color="#944780"
     ariaLabel="circles-loading"
     wrapperStyle={{}}
     wrapperClass=""
     visible={true}
   />
:
  
    data.map((result,i)=>{
      return (
        <tr  key={i} >
          <td>{result.ExposureTypeID}</td>
          <td>
         <Link
to={"/exposuretype"}
state={{id: result.ExposureTypeID}}>
{result.Name}
</Link>
         </td>
          <td>{result.Description}</td>
       
          <td>{result.SortOrder}</td>
       
         </tr>  
      )
    })
  }

</table>
</body>);

}
export default ExposureTypes