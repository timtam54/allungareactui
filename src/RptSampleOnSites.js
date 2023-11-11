import "./App.css"
import React, { useState, useEffect, Component } from "react";
import {Link,useLocation, useParams } from "react-router-dom"
import { Circles } from 'react-loader-spinner'
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';

function RptSampleOnSites() {
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

   fetchSample();
  }, []);
  //const urlSample = `https://allungawebapi.azurewebsites.net/api/SeriesNextEvent?from=2000-01-01&to=2010-01-01`+`/`;

 

  const [dataSample, setDataSample] = useState([]);
  const fetchSample = async e=>{
  
  
    const urlSample =`https://allungawebapi.azurewebsites.net/api/Rprts/SampleOnSite`
  const response = fetch(urlSample);
  console.log(response);
  var ee=await response;
  if (!ee.ok)
  {
    throw Error((ee).statusText);
  }
  const json=await ee.json();
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
  <h3>Samples on site</h3>
  </header>
  <table className="results" border={1}>
  
  <tr>
    <th>ClientName</th>
    <th>SeriesName</th>
    <th>MonthNo</th>
    <th>Year</th>

    <th>EquivSampleCount</th>
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
  state={{id: result.SeriesID}}>{result.SeriesName}</Link>
  </td>
          <td>{result.MonthNo}</td>
        
          <td> {result.Year}</td>
  
   <td> {result.EquivSampleCount}</td>
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
export default RptSampleOnSites