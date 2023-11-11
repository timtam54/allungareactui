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
    
      return (
        <body>

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
          <td>
          <td><Link
  to={"/report"}>
    <AddIcon/>Add New
</Link></td>
          </td>
        </tr>
    </table>
}
    </body>
    
    );


}

export default Reports