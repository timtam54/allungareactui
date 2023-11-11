import "./App.css"
import React, { useState, useEffect, Component } from "react";
import {Link, BrowserRouter, Routes, Route} from "react-router-dom";
import { bearerToken } from './index';
import { Circles } from 'react-loader-spinner'


function Params() {
  const [loading,setLoading] = useState(true);

  useEffect(() => {
  // setLoading(true);

    fetchExposureType();

  }, []);

  const [data, setData] = useState([]);
  const fetchExposureType = async e=>{


    const url = `https://allungawebapi.azurewebsites.net/api/Params/`;
    const token = await bearerToken()

    const headers = new Headers()
    const bearer = `Bearer ${token}`
  
    headers.append('Authorization', bearer)
  
    const options = {
      method: 'GET',
      headers: headers,
    }  
    const response = fetch(url,options);
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
         <h3 style={{color:'#944780'}}>Parameters</h3>
  <table style={{width:"100%"}}  id="table1">
  <tr>
    <td><b>ID</b></td>
    <td><b>Name</b></td>
    <td><b>Unit</b></td>
    <td><b>Value Range</b></td>
    <td><b>Equivalent Values</b></td>
    <td><b>Ordering</b></td>
    <td><b>Visual No Readings</b></td>
   
  </tr>
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
  
    data.map((result,i)=>{
      return (
        <tr className='result' key={i} >
          <td>{result.ParamID}</td>
          <td><Link
to={"/param"}
state={{id: result.ParamID}}>{result.ParamName}
</Link>
</td>
          <td>{result.Unit}</td>
          <td>{result.ValueRange}</td>
          <td>{result.EquivalentValues}</td>
          <td>{result.Ordering}</td>
          <td>{result.VisualNoReadings}</td>
        
         </tr>  
      )
    })
  }

</table>
</body>);

}
export default Params