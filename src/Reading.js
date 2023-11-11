import "./Header.css"
import React, { useState, useEffect, Component } from "react";
import {Link,useLocation, useParams } from "react-router-dom"

function Reading({SeriesReport}) {
  const [loading,setLoading] = useState(true);


  useEffect(() => {
    setLoading(true);
    fetchSample();
    
  }, []);
 
  const [dataSample, setDataSample] = useState([]);
  const fetchSample = async e=>{
    const urlSample = `https://allungawebapi.azurewebsites.net/api/Samples/`+SeriesReport.SeriesID;
  const response = fetch(urlSample);
  console.log(response);
  var ee=await response;
  if (!ee.ok)
  {
    throw Error((ee).statusText);
  }
  const json=await ee.json();

  setDataSample(json);
  fetchReading();
  }


  const [dataParam, setDataParam] = useState([]);
  const fetchParam = async e=>{
    const urlParam = `https://allungawebapi.azurewebsites.net/api/Params/int/`+SeriesReport.ReportID;
  const response = fetch(urlParam);
  console.log(response);
  var ee=await response;
  if (!ee.ok)
  {
    throw Error((ee).statusText);
  }
  const json=await ee.json();

  setDataParam(json);
  setLoading(false);

  
}
const GetReading = (ParamID,SampleID)=>
{
  var xx=dataReading.filter((i)=>i.Paramid===ParamID && i.sampleid===SampleID );
  if (xx.length>0)
  {
return xx[0].value;// '2';
}
return '';
}

const [dataReading, setDataReading] = useState([]);
const fetchReading = async e=>{
  const urlReading = `https://allungawebapi.azurewebsites.net/api/Readings/`+SeriesReport.ReportID;
const response = fetch(urlReading);
console.log(response);
var ee=await response;
if (!ee.ok)
{
  throw Error((ee).statusText);
}
const json=await ee.json();

setDataReading(json);
fetchParam();
 
  }

  return (
    <body>
  <table className="results" border={1}>
  <tr>
    <td><b>Number</b></td>
    {
    dataParam.map((result,i)=>{
      return (
          <td key={i} >{result.ParamName}</td>
        )
    })
  }
  </tr>
  {
    dataSample.map((result,i)=>{
      return (
        <tr className='result' key={i} >
          <td>{result.Number}</td>
          {
    dataParam.map((paramresult,i)=>{
      return (
          <td key={i} >
           { GetReading(paramresult.ParamID,result.SampleID)}

            </td>
        )
    })
  }
         </tr>  
      )
    })
  }
 
</table>
</body>);

}
export default Reading