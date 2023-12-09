import "./App.css"
import React, { useState, useEffect, Component } from "react";
import {Link,useLocation, useParams } from "react-router-dom"
import { Circles } from 'react-loader-spinner'
import { bearerToken } from './index'
import { TextareaAutosize } from "@mui/material";
import Button from '@mui/material/Button';

function ExposureType() {
  const [loading,setLoading] = useState(true);
  //const [exposuretypeid,setExposuretypeid] = useState(0);

  const location = useLocation()
  const exposuretypeid = location.state.id;

  const handleChange = (e) => {
  let ree=data;
    setData({ ...data, [e.target.name]: e.target.value });
 }


  const endPoint = `https://allungawebapi.azurewebsites.net/api/ExposureTypes/`+exposuretypeid;
  const [data, setData] = useState([]);

  const fetchInfo  = async e=>{

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
  

  useEffect(() => {
    setLoading(true);
    fetchInfo();
  
  }, []);



  
 const handleSubmit = async (e) => {

    e.preventDefault();
   
 setLoading(true);
   const token = await bearerToken()
  const headers = new Headers()
  const bearer = `Bearer ${token}`
  headers.append('Authorization', bearer)
  headers.append('Content-type', "application/json; charset=UTF-8")
  if (exposuretypeid==0)
  {
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: headers,
    }  
    const response = fetch(`https://allungawebapi.azurewebsites.net/api/ExposureTypes/`+exposuretypeid,options);
   var ee=await response;
    if (!ee.ok)
    {
      throw Error((ee).statusText);
    }
    const json=await ee.json();
    console.log(json);
    //setSeriesID(json.SeriesID);
    await setData(json);
    
  }
  else
  {
  const options = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: headers,
  }  

  const response = fetch(`https://allungawebapi.azurewebsites.net/api/ExposureTypes/`+exposuretypeid,options);
 var ee=await response;
  if (!ee.ok)
  {
    throw Error((ee).statusText);
  }

  }
  setLoading(false);
  }
/*
<tr>
      <th>DateCreated:</th>
      <td>
      <input type="text" name="DateCreated" onChange={handleChange} value={data.DateCreated} />
      </td>
    </tr>
    <tr>
      <th>DateLastModified:</th>
      <td>
      <input type="text" name="DateLastModified" onChange={handleChange} value={data.DateLastModified} />
      </td>
    </tr>
    <tr>
      <th>ExposureSampleRateGroupsID:</th>
      <td>
      <input type="text" name="ExposureSampleRateGroupsID" onChange={handleChange} value={data.ExposureSampleRateGroupsID} />
      </td>
    </tr>
    <tr>
      <th>OnSiteRateStandard:</th>
      <td>
      <input type="text" name="OnSiteRateStandard" onChange={handleChange} value={data.OnSiteRateStandard} />
      </td>
    </tr>
    <tr>
      <th>OnSiteRateDiscount:</th>
      <td>
      <input type="text" name="OnSiteRateDiscount" onChange={handleChange} value={data.OnSiteRateDiscount} />
      </td>
    </tr>
    */
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
  <table border="1">
    <tr>
      <th>ID:</th>
      <td>
     {data.ExposureTypeID}
      </td>
    </tr>
    <tr>
      <th>Name:</th>
      <td>
      <input type="text" name="Name" onChange={handleChange} value={data.Name} />
      </td>
    </tr>
    <tr>
      <th>Description:</th>
    </tr>
    <tr>  
    <td colSpan={2} width="100%">
        <textarea cols={120}  style={{width:'100%'}} name="Description" onChange={handleChange} value={data.Description} />
      </td>
    </tr>
    
    <tr>
      <th>SortOrder:</th>
      <td>
      <input type="text" name="SortOrder" onChange={handleChange} value={data.SortOrder} />
      </td>
    </tr>
    </table>

    }
<table>
        <tr>
<td><Link to="/exposuretypes">back</Link></td>
<td> <Button variant="outlined" onClick={handleSubmit}>
          Submit
        </Button></td>
</tr>
      </table>
 </body>
    );
  }

export default ExposureType