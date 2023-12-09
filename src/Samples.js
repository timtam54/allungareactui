
import React, { useState, useEffect, Component } from "react";
import {Link,useLocation, useParams } from "react-router-dom"
import { Circles } from 'react-loader-spinner'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { bearerToken } from './index'
import './App.css';
import ReactModal from 'react-modal';
import { SampleHistory } from "./SampleHistory";
import {SampleExplode} from "./SampleExplode";
import {Sample} from "./Sample";
function Samples({SeriesID}) {
  const [isOpenHist, setIsOpenHist] = useState(false);
  const [isOpenExplode, setIsOpenExplode] = useState(false);
  const [isOpenSample, setIsOpenSample] = useState(false);
  const [loading,setLoading] = useState(true);
  const [deleted,setDeleted] = useState(false);
  const [SampleID,setSampleID]=useState(0);
const [status,setStatus]=useState("Active Samples");
  useEffect(() => {
    fetchSample();
  }, []);
  
  const [dataSample, setDataSample] = useState([]);
const fetchSample = async e=>{
  
  setLoading(true);
  const urlSample = `https://allungawebapi.azurewebsites.net/api/Samples/`+SeriesID+`~`+((deleted)?1:0);
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
  setDataSample(json);
  setLoading(false);


  }

  function setSampleOpen(SampleID)
  { setIsOpenSample(true);
    setSampleID(SampleID);
  }

function getcolour(del)
{
  if (del)
    return 'pink';
  return 'lightgreen';
}
const setDeletedfn= async e=>{

  setDeleted(e.target.checked);
  fetchSample();
  
}
  const onDelete = async id=>{

    setLoading(true);
    const response =fetch(`https://allungawebapi.azurewebsites.net/api/Samples/`+id, {
      method: "DELETE"//,
    
    });
    var ee=await response;
    await fetchSample();
    setStatus('Delete successful');
    setLoading(false);
    return false;
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
  <table className="results" id="table1" style={{backgroundColor:getcolour(deleted)}}>
    <tr>
      <td>Deleted</td>
      <td><input type="checkbox" id="del" checked={deleted} onChange={setDeletedfn}></input></td>
      <td colSpan={8} align="center">
        {status}
      </td>
    </tr>
  <tr>
  <th>
  <Button variant="outlined" onClick={() => setIsOpenSample(true)}>
  <AddIcon/>
      </Button>
    

      <ReactModal
        isOpen={isOpenSample}
        contentLabel="Sample Detail"
        onRequestClose={() => setIsOpenSample(false)} >
       <Sample closePopup={() => setIsOpenSample(false)}  sampleid={SampleID} SeriesID={SeriesID} />
      </ReactModal> 

</th>
    <th><b>AEL Ref</b></th>
    <th><b>Client id</b></th>
    <th><b>Description</b></th>
    <th><b>Equiv Samples / Alltrack cms</b></th>
    <th><b>Exposure Type</b></th>
    <th><b>Reportable</b></th>
    <th><b>Sample Order</b></th>
    <th><b>History</b></th>
    <th><b>Explode</b></th>
  </tr>
  
  {
    dataSample.map((result,i)=>{
      return (
        <tr className='super-app-theme' key={i} >
          <td>
<a href="" onClick={() => onDelete(result.SampleID)}><DeleteIcon/></a>
</td>
          <td>{result.Number}</td>
          <td>


          <Button variant="outlined" onClick={() => setSampleOpen(result.SampleID)}>
          {result.description}
      </Button>
      
         </td>
         <td>
    {result.longdescription}
         </td>
         <td>{result.EquivalentSamples}</td>
          <td>{result.ExposureType}</td>
          <td><input type="checkbox" checked={result.Reportable} input/></td>
          <td>{result.SampleOrder}</td>
          <td>  <Button variant="outlined" onClick={() => setIsOpenHist(true)}>
          History
      </Button>
      <ReactModal
        isOpen={isOpenHist}
        contentLabel="Sample History"
        onRequestClose={() => setIsOpenHist(false)}
      >
       <SampleHistory text="Sample History" closePopup={() => setIsOpenHist(false)} sampleid={result.SampleID} />
      </ReactModal></td>
      
      
         <td> <Button variant="outlined" onClick={() => setIsOpenExplode(true)}>
          Explode
      </Button>
      <ReactModal
        isOpen={isOpenExplode}
        contentLabel="Sample Explode"
        onRequestClose={() => setIsOpenExplode(false)}
      >
       <SampleExplode text="Sample Explode" closePopup={() => setIsOpenExplode(false)} />
      </ReactModal></td>
         </tr>  
      )
    })
  }
</table>
}
</body>
);

}
export default Samples