import "./App.css"
import React, { useState, useEffect, Component } from "react";
import {Link,useLocation, useParams } from "react-router-dom"
import { Circles } from 'react-loader-spinner'
import { bearerToken } from './index'
function ExposureType() {
  const [loading,setLoading] = useState(true);
  //const [exposuretypeid,setExposuretypeid] = useState(0);

  const location = useLocation()
  const exposuretypeid = location.state.id;

  const handleChange = (e) => {
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
//doau-kxei-vdby-ldsk
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
      <input type="text" name="ExposureTypeID" onChange={handleChange} value={data.ExposureTypeID} />
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
      <td>
      <input type="text" name="Description" onChange={handleChange} value={data.Description} />
      </td>
    </tr>
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
<td colSpan="2"><Link to="/exposuretypes">back</Link></td>
</tr>
      </table>
 </body>
    );
  }

export default ExposureType