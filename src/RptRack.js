
import React, { useState, useEffect, Component } from "react";
import {Link,useLocation, useParams } from "react-router-dom"
import { Circles } from 'react-loader-spinner'
import { bearerToken } from './index'

function RptRack() {
  const [loading,setLoading] = useState(true);
 // const [status,setStatus]=useState("");
 //const [dateFrom,setDateFrom]=useState(new Date());
// const [dateTo,setDateTo]=useState(new Date());
  useEffect(() => {
    /*let df = new Date();
    df.setDate(df.getDate() - 1500);
    setDateFrom(df);

    let dt = new Date();
    dt.setDate(dt.getDate() + 1200);
    setDateTo(dt);*/

   fetchRack();
  }, []);
  //const urlSample = `https://allungawebapi.azurewebsites.net/api/SeriesNextEvent?from=2000-01-01&to=2010-01-01`+`/`;

 

  const [dataSample, setDataSample] = useState([]);
  const fetchRack = async e=>{


  const endPoint =`https://allungawebapi.azurewebsites.net/api/Rprts/Rack/`
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
<div className="search">

<header>
<h3 style={{color:'#944780'}}>Rack Report</h3>
  </header>
  <table style={{width:"100%"}} id="table1">
  
  <tr>
  <th>Client </th>
    <th>Allunga Reference</th>
    
    <th>Client Reference</th>
    <th>Samples</th>
    <th>Rack</th>

  </tr>
  
  {
    dataSample.map((result,i)=>{
      return (
        <tr className='result' key={i} >
          <td> <Link
  to={"/client"}
  state={{id: result.ClientID}}>{result.ClientName}</Link></td>
  
          <td> <Link
  to={"/seriestab"}
  state={{id: result.SeriesID}}>{result.AllungaReference}</Link>
  </td>
          <td>{result.ClientReference}</td>
        
          <td> {result.Samples}</td>
  
   <td> {result.RackNo}</td>
         </tr>  
      )
    })
  }
</table>
</div>
}
</body>
);

}
export default RptRack