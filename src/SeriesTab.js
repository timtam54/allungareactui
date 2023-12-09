import React,{ useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { bearerToken } from './index'
import Series from './Series';
import Samples from './Samples';
import Dispatches from './Dispatches';
import Reports from './Reports';
import { Circles } from 'react-loader-spinner'
import {Link,useLocation, useParams } from "react-router-dom"
import ArrowBack from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';

export default function SeriesTab() {
  const [loading,setLoading] = useState(true);
  const location = useLocation()
  const seriesid = location.state.id;//.id
  const seriesname = location.state.name;

  const [dataParRepSeries, setDataParRepSeries] = useState([]);
  const [value, setValue] = React.useState('1');
  const reportid=1;
  
const handleSubmitParam = async e=>{
  e.preventDefault()


  const token = await bearerToken()
  const headers = new Headers()
  const bearer = `Bearer ${token}`
  headers.append('Authorization', bearer)
  const options = {
    method: 'PUT',
    body: JSON.stringify(dataParRepSeries),
    headers: headers,
  }
  const response = fetch(`https://allungawebapi.azurewebsites.net/api/ReportParams/`+seriesid,options);
 var ee=await response;
  if (!ee.ok)
  {
    throw Error((ee).statusText);
  }
 /* var rt=ret.map(t=>t.paramid);
  fetch(`https://allungawebapi.azurewebsites.net/api/ReportParams/int/`+seriesid, {
    method: "PUT",
    body: JSON.stringify(rt),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })    ;*/
  alert('saved');
}
const handleChangeRepPar= (e) => {
  const xx=e.target.name.split('~');
  const rid=Number(xx[0]);
  const pid=Number(xx[1]);
  const temp=[...dataParRepSeries];
  var dd=temp.find(i=>i.paramid===pid && i.reportid===rid);
  if (dd==null)
  {
    if (e.target.value)
    {
      const obj = {'paramid':pid, 'reportid':rid,'deleted':null};
      setDataParRepSeries([...temp, obj]);
    }
    else{
      ;//do nothing
    }
  }
  else
  {
    if (e.target.value)
    {
      dd.deleted=null;
    }
    else
    {
      dd.deleted=true;
    }
  setDataParRepSeries([...temp]);
  }
};

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
/*  const fetchParRepSeries = () => {
    const url = `https://allungawebapi.azurewebsites.net/api/ReportParams/int/`+seriesid;
    return fetch(url)
      .then((res) => res.json())
      .then((d) => setDataParRepSeries(d))
      .then(setLoading(false))
  }*/

  const fetchParRepSeries = async e=>{
    setLoading(true);
   //   e.preventDefault();
     
      const token = await bearerToken()
      const headers = new Headers()
      const bearer = `Bearer ${token}`
      headers.append('Authorization', bearer)
      const options = {
        method: 'GET',
        headers: headers,
      }
      const endPoint = `https://allungawebapi.azurewebsites.net/api/ReportParams/int/`+seriesid;
      const response = fetch(endPoint,options);
      var ee=await response;
      if (!ee.ok)
      {
        throw Error((ee).statusText);
      }
      const json=await ee.json();
      console.log(json);
      setDataParRepSeries(json);
      //setIsOpen(true);
      //setLoading(false);
    }

  const GetRepPar = (reportid,ParamID)=>
{
  var xx=dataParRepSeries.filter((i)=>i.paramid===ParamID && i.reportid===reportid );
  if (xx.length>0)
  {
return true;// '2';
}
return false;
}

  const [dataParams, setDataParams] = useState([]);
  const fetchParams = async e=>{


    const token = await bearerToken()
      const headers = new Headers()
      const bearer = `Bearer ${token}`
      headers.append('Authorization', bearer)
      const options = {
        method: 'GET',
        headers: headers,
      }
      const endPoint =`https://allungawebapi.azurewebsites.net/api/Params/`;
      const response = fetch(endPoint,options);
      var ee=await response;
      if (!ee.ok)
      {
        throw Error((ee).statusText);
      }
      const json=await ee.json();
      console.log(json);

     setDataParams(json);
  
  }

useEffect(() => {

  fetchParRepSeries();
  fetchParams();
  fetchReport();
}, []);

const [dataReport, setDataReport] = useState([]);
const fetchReport = async e=>{
  const token = await bearerToken()
  const headers = new Headers()
  const bearer = `Bearer ${token}`
  headers.append('Authorization', bearer)
  const options = {
    method: 'GET',
    headers: headers,
  }
  const endPoint ='https://allungawebapi.azurewebsites.net/api/Reports/'+seriesid;
  const response = fetch(endPoint,options);
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
//const [show, setShow] = useState(false);
//const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
             <table>
              <tr>
                <td>
                <Link to="/"><ArrowBack/>back</Link>
                </td>
                <td>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </td>
                <td> <h3 style={{color:'#944780'}}>Series Name:{seriesname}</h3>
                  </td>
</tr>
              </table>  
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} >
            <Tab label="Series Detail" value="1" />
            <Tab label="Samples" value="2" />
            <Tab label="Dispatch" value="3" />
            <Tab label="Reports" value="4" />
            <Tab label="Parameter/Test" value="5" />
    
            <Tab label="Wash/Photos" value="6" />
          </TabList>
        </Box>
        <TabPanel value="1"><Series seriesID={seriesid} /></TabPanel>
        <TabPanel value="2"><Samples  SeriesID={seriesid} /></TabPanel>
        <TabPanel value="3"><Dispatches  SeriesID={seriesid} /></TabPanel>
        <TabPanel value="4"><Reports  SeriesID={seriesid} /></TabPanel>
        <TabPanel value="5">
   
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
        <div>
      <Button type="submit" variant='outlined' onClick={handleSubmitParam}>
          Submit
        </Button>
        <table id="table1" > 
    <tr>
    <th>Parameters</th>
    {
    dataReport.map((result,i)=>{
      return (
          <th key={i}>{result.reportname} ({ (new Date(result.date)).getDate()}-{ (new Date(result.date)).getMonth()}-{ (new Date(result.date)).getFullYear()})</th>
      )
      })
    }
    </tr>
       {
    dataParams.map((result,i)=>{
      return (
        <tr className='result' key={i} >
          <td>{result.ParamName}</td>

          {
    dataReport.map((resrep,i)=>{
      return (
<td>
          <input type="checkbox" name={resrep.reportid+'~'+result.ParamID} onChange={handleChangeRepPar} checked= {GetRepPar(resrep.reportid,result.ParamID)} />
          </td>
      )
      })
    }
           </tr>
      )
      })
    }
    
  </table>
  </div>
}
          </TabPanel>
          
          <TabPanel value="6">
is this required
          </TabPanel>
      </TabContext>
    </Box>
  );
}

