import "./App.css"
import React, { useState, useEffect, Component } from "react";
import {Link,useLocation, useParams } from "react-router-dom"
import AddIcon from '@mui/icons-material/Add';
import { Circles } from 'react-loader-spinner'

import { bearerToken } from './index';

function Reports({SeriesID}) {
    const [loading,setLoading] = useState(true);


    useEffect(() => {
      //setLoading(true);
      fetchReport();
    }, []);

  
    const [dataReport, setDataReport] = useState([]);
    const fetchReport = async e=>{


  setLoading(true);
  const token = await bearerToken()
  const headers = new Headers()
  const bearer = `Bearer ${token}`
  headers.append('Authorization', bearer)

  const options = {
    method: 'GET',
    headers: headers,
  }  
  const response = fetch('https://allungawebapi.azurewebsites.net/api/Reports/'+SeriesID,options);
  var ee=await response;
  if (!ee.ok)
  {
    throw Error((ee).statusText);
  }
  const json=await ee.json();
  console.log(json);
  setDataReport(json);
  setLoading(false);
  }
  
  const OpenReportMatrix = () => {
    //const val=e.target.name;
    //console.writeline(SeriesID);
    window.open('https://allungardlc.azurewebsites.net/MatrixMulti.aspx?SeriesID='+SeriesID);
  }

      return (
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
      <table id="table1">
        <tr>
        <th>Description</th>
          <th>Date</th>
          <th>Status</th>
          <th>book and page</th>
         <th>days in lab</th>
         <th style={{width:'500px'}}>Comments</th>
          
        </tr>
        {
          dataReport.map((result,i)=>{
            return (
              <tr className='result' key={i} >
                  <td> <Link
  to={"/reporttab"}
  state={{id: result.reportid,seriesid:SeriesID,dataReport:dataReport}}>
   {result.reportname}
</Link></td>
                  <td>{(new Date(result.date )).getDate()}-{(new Date(result.date )).getMonth() + 1}-{(new Date(result.date )).getFullYear()}</td>            
                <td>{result.status}</td>
                <td>{result.bookandpage}</td>
                <td>{result.DaysInLab}</td>
                <td>{result.comment}</td>
   
               </tr>  
            )
          })
        }
        <tr>
      
          <td><Link
  to={"/report"}>
    <AddIcon/>Add New
</Link></td>
<td><a href={'https://allungardlc.azurewebsites.net/MatrixMulti.aspx?SeriesID='+SeriesID} target="new">Report/Print</a>
              
          </td>
          
        </tr>
    </table>
}
    </body>
    
    );


}

export default Reports