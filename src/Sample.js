
import React, { useState, useEffect, Component } from "react";
import {Link,useLocation, useParams } from "react-router-dom"
import { Circles } from 'react-loader-spinner'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import { bearerToken } from './index'
import Button from '@mui/material/Button';

export const Sample  = ({  closePopup, sampleid,SeriesID }) => {
  const [loading,setLoading] = useState(false);
  const [value, setValue] = useState(`1`);

  //const location = useLocation()
  const [SampleID,setSampleID] = useState(sampleid);

  //const SeriesID = location.state.seriesid;//.id

  const [exp, setExp] = useState([]);

  const fetchExp = async e=>{
    setLoading(true);
    const urlExp = `https://allungawebapi.azurewebsites.net/api/ExposureTypes/`;
    const token = await bearerToken()
    const headers = new Headers()
    const bearer = `Bearer ${token}`
    headers.append('Authorization', bearer)
    const options = {
      method: 'GET',
      headers: headers,
    }  
    const response = fetch(urlExp,options);
    var ee=await response;
    if (!ee.ok)
    {
      throw Error((ee).statusText);
    }
    const json=await ee.json();
    console.log(json);  
    setExp(json);
    fetchSample();
  }

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const [data, setData] = useState([]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
 }

  /*const fetchInfo = () => {

    return fetch(url)
      .then((res) => res.json())
      .then((d) => setData(d))
      //.then(data.seriesid=SeriesID)
       .then (fetchHistory());
  }
*/
  const fetchSample = async e=>{
  
    
    const urlSample = `https://allungawebapi.azurewebsites.net/api/Samples/int/`+SampleID;
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
    setData(json);
    fetchHistory();
  
  
    }
  
  useEffect(() => {
  if (loading)
   { return;
   }
    fetchExp();
//fetchInfo()   ; 

  }, []);

  const [dataHistory, setDataHistory] = useState([]);

  const fetchHistory = async e=>{
    const urlSample = `https://allungawebapi.azurewebsites.net/api/SampleHistories/`+SampleID;
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
    
  setDataHistory(json);
  setLoading(false);
  }
  
  const handleCheck = (e) => {
    if (e.target.checked)
    {
    setData({ ...data, [e.target.name]: true});
    }
  else{
    setData({ ...data, [e.target.name]: false});
  }
  };


 const handleSubmit = async (e) => {
  setLoading(true);
    e.preventDefault()

    if (SampleID==0)
    {
      data.seriesid=SeriesID;

      const token = await bearerToken()
      const headers = new Headers()
      const bearer = `Bearer ${token}`
      headers.append('Authorization', bearer)
      headers.append('Content-type', "application/json; charset=UTF-8")
  
      const options = {
        method: 'PUT',
        body: JSON.stringify(data),
       headers: headers,
      }  

      const response = fetch(`https://allungawebapi.azurewebsites.net/api/Samples/`,options);
      var ee=await response;
      if (!ee.ok)
      {
        throw Error((ee).statusText);
      }
      
      const json=await ee.json();
      setSampleID( json.SampleID);
      setData(json);
      fetchHistory();
    }
    else
    {
      const token = await bearerToken()
      const headers = new Headers()
      const bearer = `Bearer ${token}`
      headers.append('Authorization', bearer)
      headers.append('Content-type', "application/json; charset=UTF-8")
  
      const options = {
        method: 'PUT',
        body: JSON.stringify(data),
       headers: headers,
      }  

      const response = fetch(`https://allungawebapi.azurewebsites.net/api/Samples/`+SampleID,options);
      var ee=await response;
      if (!ee.ok)
      {
        throw Error((ee).statusText);
      }
    }
  setLoading(false);
  }


    return (

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
          <h3>Sample  Details</h3>
          <Button variant="outlined"  onClick={closePopup}>Close X</Button>
          <TabList onChange={handleChangeTab}>
            <Tab label="Sample Detail" value="1" />
            <Tab label="History" value="2" />
          </TabList>
        </Box>
        <TabPanel  value="1">
      <body>
        {loading ? 
    <div class="container">
    <Circles
    height="200"
    width="200"
    color="silver"
    ariaLabel="circles-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  />
  </div>
:
<div>
      <table>
        <tr>
          <th>ID:</th>
          <td>
          {data.SampleID}
          </td>
        </tr>
        <tr>
          <th>Client ID:</th>
          <td>
          <input type="text" name="description" onChange={handleChange} value={data.description} />
          </td>
        </tr>
        <tr>
          <th>AEL Ref:</th>
          <td>
          <input type="text" name="Number" onChange={handleChange} value={data.Number} />
          </td>
        </tr>
        <tr>
          <th>Description:</th>
          <td>
          <input type="text" name="longdescription" onChange={handleChange} value={data.longdescription} />
          </td>
        </tr>
        <tr>
          <th>Equivalent Samples:</th>
          <td>
          <input type="text" name="EquivalentSamples" onChange={handleChange} value={data.EquivalentSamples} />
          </td>
        </tr>
        <tr>
          <th>Exposure Type:</th><td> 
          <select name="ExposureTypeID"  onChange={handleChange}>
          {
          exp.map((ep,i)=>{
            return (
              <option value={ep.ExposureTypeID} selected={(ep.ExposureTypeID==data.ExposureTypeID)?true:false}>{ep.Name}</option>
            )})
          }
          </select>
      </td>
        </tr>
        <tr>
          <th>Reportable:</th>
          <td>
          <input type="checkbox" onChange={handleCheck}  name="Reportable" checked={data.Reportable} />
          </td>
        </tr>
        <tr>
          <th>Deleted:</th>
          <td>
          <input type="checkbox" onChange={handleCheck}  name="Deleted" checked={data.Deleted} />
          </td>
        </tr>
        
        
        
        <tr>
          <th>SampleOrder:</th>
          <td>
          <input type="text" name="SampleOrder" onChange={handleChange} value={data.SampleOrder} />
          </td>
        </tr>

  </table>

  <Button type="submit" variant="outlined" onClick={handleSubmit}>
          Submit
        </Button>
 </div>
    
     

}


 </body>
 </TabPanel>

<TabPanel  value="2">
{loading ? 

<Circles
height="200"
width="200"
color="#944780"
ariaLabel="circles-loading"
wrapperStyle={{}}
wrapperClass=""
visible={true}
/>
:
<table border="1">
  <tr>

</tr>

{
dataHistory.map((result,i)=>{
return (
<tr  style={{backgroundColor:result.Action?`green`:`red`}} className='result' key={i} >
  <td>{(new Date(result.DTE )).getDate()}-{(new Date(result.DTE )).getMonth() + 1}-{(new Date(result.DTE )).getFullYear()}</td>
   <td >{result.Action?`onsite`:`offsite`}</td>
  </tr>
)
})
}

</table>
}
  </TabPanel>

</TabContext>

    );
  }

export default Sample