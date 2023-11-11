import "./App.css"
import React, { useState, useEffect, Component } from "react";
import {Link,useLocation, useParams } from "react-router-dom"
import { Circles } from 'react-loader-spinner'
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import { bearerToken } from './index'
function SeriesProjectedWork() {
  const [loading,setLoading] = useState(true);
 // const [status,setStatus]=useState("");
 const [dateFrom,setDateFrom]=useState(new Date());
 const [dateTo,setDateTo]=useState(new Date());
  useEffect(() => {
    let df = new Date();
    df.setDate(df.getDate() - 1500);
    setDateFrom(df);

    let dt = new Date();
    dt.setDate(dt.getDate() + 1200);
    setDateTo(dt);

   fetchSample();
  }, []);
  //const urlSample = `https://allungawebapi.azurewebsites.net/api/SeriesNextEvent?from=2000-01-01&to=2010-01-01`+`/`;

  function frmt(date   = new Date())
  {
    const yearf = date.toLocaleString('default', {year: 'numeric'});
    const monthf = date.toLocaleString('default', {
      month: '2-digit',
    });
    const dayf = date.toLocaleString('default', {day: '2-digit'});
    const frm= [yearf, monthf, dayf].join('-');
    return frm;
  }

  const [dataSample, setDataSample] = useState([]);
  const fetchSample = async e=>{
    const yearf = dateFrom.toLocaleString('default', {year: 'numeric'});
    const monthf = dateFrom.toLocaleString('default', {
      month: '2-digit',
    });
    const dayf = dateFrom.toLocaleString('default', {day: '2-digit'});
    const frm= [yearf, monthf, dayf].join('-');

    const year = dateTo.toLocaleString('default', {year: 'numeric'});
    const month = dateTo.toLocaleString('default', {
      month: '2-digit',
    });
    const day = dateTo.toLocaleString('default', {day: '2-digit'});
    const to= [year, month, day].join('-');
  //
    const urlSample =`https://allungawebapi.azurewebsites.net/api/seriesnextevent?frm=`+frm+`&to=`+to;

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
<div>
  <table>
    <tr>
    <td><b>From</b></td>
    <td>
    <DatePicker selected={dateFrom} onChange={(date) =>  setDateFrom(date) } dateFormat="dd-MM-yyyy" ></DatePicker>
    </td>
    <td><b>To</b></td>
    <td>
    <DatePicker selected={dateTo} onChange={(date) =>  setDateTo(date) } dateFormat="dd-MM-yyyy" ></DatePicker>
    </td>
    <td>
      <button onClick={fetchSample}>Get</button>
    </td>
  </tr>
  </table>
  <table className="results" border={1}>
  
  <tr>
    <td><b>Date</b></td>
    <td><b>Report/Return</b></td>
    <td><b>Report Name</b></td>
    <td><b>Series Allunga Ref</b></td>
    <td><b>Client Name</b></td>
  </tr>
  
  {
    dataSample.map((result,i)=>{
      return (
        <tr className='result' key={i} >

          <td>{(new Date(result.NextEventDate)).toString("dd-MMM-yyyy").substring(0, 15)}</td>
          <td> <Link
  to={"/seriestab"}
  state={{id: result.seriesid}}>{result.EventType}</Link>
  </td>
          <td>{result.NextEventName}</td>
        
          <td> <Link
  to={"/seriestab"}
  state={{id: result.seriesid}}>{result.AllungaRef}</Link>
  </td>
  <td> <Link
  to={"/client"}
  state={{id: result.ClientID}}>{result.ClientName}</Link></td>
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
export default SeriesProjectedWork