
import "./App.css"
import moment from 'moment';
import React, { useState, useEffect, Component } from "react";
import {Link,useLocation, useParams } from "react-router-dom"
import { Circles } from 'react-loader-spinner'
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
//import 'react-calendar/dist/Calendar.css';
import { bearerToken } from './index'
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import ReactModal from 'react-modal';
import Popup from './Popup.js';
import ExposureEndDate from './ExposureEndDate.js';
//import SampleHistory from './SampleHistory.js';
//import {useFormik} from 'formik';

function Series({seriesID}) {
  const [SeriesID,setSeriesID]=useState(seriesID);
  const [loading,setLoading] = useState(true);
  const [DateIn, setDateIn] = useState(new Date());
  const [ExposureEnd, setExposureEnd] = useState(new Date());
  const [LogBookLetterDate,setLogBookLetterDate] = useState(new Date());
  const [units,setUnits] = useState(["Hours", "Days", "Weeks", "Months", "Years", "Langleys", "TNR Langleys", "MJ/m2", "GJ/m2", "EverSummer", "See Below", "Specified In Sample"]);
  const urlExp = `https://allungawebapi.azurewebsites.net/api/ExposureTypes/`;
  const [exp, setExp] = useState([]);
  const [site,setSite] =useState([]);
  const [client, setClient] = useState([]);
  const [dataSeriesEvent,setdataSeriesEvent]= useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [vldtAllungaReference,setvldtAllungaReference] = useState('');
  const [vldtShortDescription,setvldtShortDescription] = useState('');
  const [vldtExposureDurationVal,setvldtExposureDurationVal] = useState('');
  const [vldtReturnsFrequencyVal,setvldtReturnsFrequencyVal] = useState('');

  function validatePage() {
    var vld=true;
    setvldtAllungaReference('');
    if (data.AllungaReference==null) {
      setvldtAllungaReference('Please Enter an AEL Ref');
      vld=false;
    }
    else
    {
    if (data.AllungaReference=='') {
      setvldtAllungaReference('Please Enter an AEL Ref');
      vld=false;
    }
  }

  setvldtExposureDurationVal('');
    if (data.ExposureDurationVal==null) {
      setvldtExposureDurationVal('Please Enter Exposure Duration');
      vld=false;
    }
    else
    {
    if (data.ExposureDurationVal=='') {
      setvldtExposureDurationVal('Please Enter Exposure Duration');
      vld=false;
    }
  }

  setvldtShortDescription('');
  if (data.ShortDescription==null) {
    setvldtShortDescription('Please Enter Short Description');
    vld=false;
  }
  else
  {
  if (data.ShortDescription=='') {
    setvldtShortDescription('Please Enter Short Description');
    vld=false;
  }
}


setvldtReturnsFrequencyVal('');
if (data.ReturnsFrequencyVal==null) {
  setvldtReturnsFrequencyVal('Please Enter Returns Frequency');
  vld=false;
}
else
{
if (data.ReturnsFrequencyVal=='') {
  setvldtReturnsFrequencyVal('Please Enter Returns Frequency');
  vld=false;
}
}

    return vld;
  };
  


  const fetchExp = async e=>{
    const token = await bearerToken()
    const headers = new Headers()
    const bearer = `Bearer ${token}`
    headers.append('Authorization', bearer)
    const options = {
      method: 'GET',
      headers: headers,
    }
    const endPoint = urlExp;
    const response = fetch(endPoint,options);
    var ee=await response;
    if (!ee.ok)
    {
      throw Error((ee).statusText);
    }
    const json=await ee.json();
    console.log(json);
    setExp(json);
    fetchSite();
  }

  const fetchSite = async e=>{
    const token = await bearerToken()
    const headers = new Headers()
    const bearer = `Bearer ${token}`
    headers.append('Authorization', bearer)
    const options = {
      method: 'GET',
      headers: headers,
    }
    const endPoint = `https://allungawebapi.azurewebsites.net/api/Sites/`;
    const response = fetch(endPoint,options);
    var ee=await response;
    if (!ee.ok)
    {
      throw Error((ee).statusText);
    }
    const json=await ee.json();
    console.log(json);
    setSite(json);
    fetchClient();
  }

  const fetchClient = async e=>{
    const token = await bearerToken()
    const headers = new Headers()
    const bearer = `Bearer ${token}`
    headers.append('Authorization', bearer)
    const options = {
      method: 'GET',
      headers: headers,
    }
    const endPoint = 'https://allungawebapi.azurewebsites.net/api/Clients';
    const response = fetch(endPoint,options);
    var ee=await response;
    if (!ee.ok)
    {
      throw Error((ee).statusText);
    }
    const json=await ee.json();
    
    setClient(json);
    fetchSeries();
  }

  //const url = `https://allungawebapi.azurewebsites.net/api/Series/int/`+SeriesID;
  const [data, setData] = useState([]);
 
  const fetchSeries = async e=>{
//todotim set serieslock
//remove all series locks on close
  /*  Sub SetLock()
    Dim sql As String = "update Series set Lock_ComputerName='" & System.Net.Dns.GetHostName() & "', Lock_DateTime='" & DateTime.Now.ToString("yyyy/MM/dd H:mm") & "' where seriesid=" & SeriesID.ToString()
    AllungaData.globals.ExecuteScalar(sql)
End Sub
*/
    if (SeriesID!=0)
    {
    const token = await bearerToken()
    const headers = new Headers()
    const bearer = `Bearer ${token}`
    headers.append('Authorization', bearer)
    const options = {
      method: 'GET',
      headers: headers,
    }
    const endPoint = `https://allungawebapi.azurewebsites.net/api/Series/int/`+SeriesID;
    const response = fetch(endPoint,options);
    var ee=await response;
    if (!ee.ok)
    {
      throw Error((ee).statusText);
    }
    const json=await ee.json();
    console.log(json);
    await setData(json);
    if (json.Lock_ComputerName!='' && json.Lock_ComputerName!=null)
    {
      alert('locked by '+json.Lock_ComputerName);
    }
    var xx=moment(json.DateIn).toDate();
    setDateIn(xx);
    if (json.ExposureEnd!=null)
    {
    setExposureEnd(moment(json.ExposureEnd).toDate());
    }
    if (json.LogBookLetterDate!=null)
    {
      setLogBookLetterDate(moment(json.LogBookLetterDate).toDate());
    }
  }
    fetchSeriesEvent();
    }
  

    const fetchSeriesEvent = async e=>{
      if (SeriesID==0)
      {
        setLoading(false);
        return;
      }
      const token = await bearerToken()
      const headers = new Headers()
      const bearer = `Bearer ${token}`
      headers.append('Authorization', bearer)
      const options = {
        method: 'GET',
        headers: headers,
      }
      const endPoint = `https://allungawebapi.azurewebsites.net/api/SeriesEvent/`+SeriesID;
      const response = fetch(endPoint,options);
      var ee=await response;
      if (!ee.ok)
      {
        throw Error((ee).statusText);
      }
      const json=await ee.json();
      console.log(json);
      setdataSeriesEvent(json);
      setLoading(false);
      }

      
  useEffect(() => {
    setLoading(true);
    fetchExp();

} , []);///*,[hasChanged]*/


function handleOnChange()
{
  //setHasChanged(true);
}

const handleChangeNum = (e) => {
  setData({ ...data, [e.target.name]: e.target.value.replace(/\D/g, '') });
}
    const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  if (SeriesID==0)
  {
    if (e.target.name=='clientid')
    {
      var allref=data.AllungaReference;
      if (allref==null)
      {
        var cli=client.filter(ii => ii.clientid== e.target.value);
       const abbr=cli[0].abbreviation;
        var AllungaReference=(new Date()).getDate() + GetMonth((new Date()).getMonth()+1) + (new Date()).getFullYear() + abbr;
        setData({ ...data, ['AllungaReference']: AllungaReference });

      }
      else if (allref=='')
      alert('set new allunga ref');
    }
    
  }
  else
  {
   ;// validatePage();
  }
  };
 function GetMonth(mn)
 {
  if (mn==1)
  return 'A';
  if (mn==2)
  return 'B';
  if (mn==3)
  return 'C';
  if (mn==4)
  return 'D';
  if (mn==5)
  return 'E';
  if (mn==6)
  return 'F';
  if (mn==7)
  return 'G';
  if (mn==8)
  return 'H';
  if (mn==9)
  return 'I';
  if (mn==10)
  return 'J';
  if (mn==11)
  return 'K';
return 'L';
 }
  const setExpTypeValue = (val) => {
    data.ExposureTypeID= val ;
  }
  const handleCheck = (e) => {
    if (e.target.checked)
    {
    setData({ ...data, [e.target.name]: true});
    }
  else{
    setData({ ...data, [e.target.name]: false});
  }
  if (SeriesID!=0)
  {
    validatePage();
  }
 };

const handleChangeSeriesEvent= (e) => {
  const et=e.target.name;
  const temp=[...dataSeriesEvent];
  var dd=temp.find(i=>i.EventType===et);
  if (e.target.checked)
    dd.FrequencyVal=0;
  else
    dd.FrequencyVal=-1;
  
    setdataSeriesEvent([...temp]);
};


 const handleSubmit = async (e) => {
  if (!validatePage())
      return;
    e.preventDefault();
    const dtfrmt="YYYY-MM-DDT00:00:00";
  data.DateIn = moment(DateIn).format(dtfrmt);
  data.ExposureEnd =  moment(ExposureEnd).format(dtfrmt);
   data.LogBookLetterDate =  moment(LogBookLetterDate).format(dtfrmt);
 setLoading(true);
   const token = await bearerToken()
  const headers = new Headers()
  const bearer = `Bearer ${token}`
  headers.append('Authorization', bearer)
  headers.append('Content-type', "application/json; charset=UTF-8")
  if (SeriesID==0)
  {
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: headers,
    }  
    const response = fetch(`https://allungawebapi.azurewebsites.net/api/Series`,options);
   var ee=await response;
    if (!ee.ok)
    {
      throw Error((ee).statusText);
    }
    const json=await ee.json();
    console.log(json);
    setSeriesID(json.SeriesID);
    await setData(json);
    fetchSeriesEvent();
  }
  else
  {
  const options = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: headers,
  }  

  const response = fetch(`https://allungawebapi.azurewebsites.net/api/Series/`+SeriesID,options);
 var ee=await response;
  if (!ee.ok)
  {
    throw Error((ee).statusText);
  }

}

handleSubmitSeriesEvent();

  }


  const onDelete = async id=>{
    ;
  }

  const handleChangeSeriesEventVal= (e) => {
   
    const EventType=e.target.name;
   
    const temp=[...dataSeriesEvent];
    var dd=temp.find(i=>i.EventType===EventType);
    dd.FrequencyVal=e.target.value;
    setdataSeriesEvent([...temp]);
  };
  
  const handleChangeSeriesEventUnits= (e) => {
   
    const EventType=e.target.name;
   
    const temp=[...dataSeriesEvent];
    var dd=temp.find(i=>i.EventType===EventType);
    dd.FrequencyUnit=e.target.value;
    setdataSeriesEvent([...temp]);
  };
  const handleSubmitSeriesEvent  = async (e) => {
    //setLoading(true);
    const token = await bearerToken()
   const headers = new Headers()
   const bearer = `Bearer ${token}`
   headers.append('Authorization', bearer)
   headers.append('Content-type', "application/json; charset=UTF-8")
   const options = {
    method: 'PUT',
    body: JSON.stringify(dataSeriesEvent),
    headers: headers,
    
   }
  const response = fetch(`https://allungawebapi.azurewebsites.net/api/SeriesEvent/`+SeriesID,options);
 var ee=await response;
  if (!ee.ok)
  {
    throw Error((ee).statusText);
  }
  const json=await ee.json();
  console.log(json);
  setdataSeriesEvent(json);
  setLoading(false);
     alert('saved');
   }

   const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

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
<form onChange={handleOnChange}>
      <table>
        <tr>
          <th><Link
  to={"/client"}
  state={{id: data.clientid}}><Button variant="outlined">Client:</Button></Link></th><td colspan={2}> 
          <select name="clientid" onChange={handleChange}>
          {
          client.map((ep,i)=>{
            return (
              <option value={ep.clientid} selected={(ep.clientid==data.clientid)?true:false}>{ep.companyname}</option>
            )})
          }
          </select>
      </td>
      <td>
      <Link to={"/clients"}>Client Search</Link>
    </td>
        
        </tr>
        <tr>
          <th>Allunga Reference:</th>
          <td>
          <input type="text" name="AllungaReference" onChange={handleChange} value={data.AllungaReference} />
          </td>
          <span style={{color:'red'}}>{vldtAllungaReference}</span>
          <th>Client Ref:</th><td><input type="text" name="clientreference" onChange={handleChange} value={data.clientreference} />
      
      </td>
 
         
            <td>
            <div>
           
     
      <a href={'https://allungardlc.azurewebsites.net/ExposureConfirmation.aspx?SeriesID='+SeriesID} target="new">    
      <Button variant="outlined">Exposure Confirmation  Report</Button>
      </a>
      <ReactModal
        isOpen={isOpen}
        contentLabel="Example Modal"
        onRequestClose={() => setIsOpen(false)}
      >
       <Popup text="Hello there!" closePopup={() => setIsOpen(false)} />
      </ReactModal>
    </div>
              </td>
        </tr>
         <tr>
          <th>Short Description:</th><td colSpan={5}><textarea  name="ShortDescription" width='600px' cols={120} onChange={handleChange} value={data.ShortDescription} />
         
          <span style={{color:'red'}}>{vldtShortDescription}</span> </td>
          <td>
          <Link
  to={"/splitseries"}
  state={{id: data.seriesid }}><Button variant="outlined" >Split Series</Button></Link><br/>
    <Link
  to={"/mergeseries"}
  state={{id: data.seriesid }}><Button variant="outlined" >Merge Series</Button></Link>
          </td>
        </tr>
        <tr>
          <th>RackNo:</th><td>   <input type="text" name="RackNo" onChange={handleChange} value={data.RackNo} />
      </td>
      <th>Active:</th><td>   <input type="checkbox" name="Active" onChange={handleCheck} value={data.Active} />
      </td>
        </tr>
        <tr>
          <th>Exposure Duration:</th><td>    <input type="text" name="ExposureDurationVal" onChange={handleChangeNum} value={data.ExposureDurationVal} />
          <span style={{color:'red'}}>{vldtExposureDurationVal}</span>
      </td>
  
          <td>
          <select name="ExposureDurationUnit" onChange={handleChange}>
          {
          units.map((ep,i)=>{
            return (
              <option value={ep} selected={(ep==data.ExposureDurationUnit)?true:false}>{ep}</option>
            )})
          }
          </select>
      </td>
      <th>Date Exposed:</th>

          <td>
          <DatePicker format="dd/MM/yyyy"  onChange={setDateIn} value={DateIn} />
                  
</td>
<th>Exposure End:</th><td>  
          <DatePicker format="dd/MM/yyyy"  onChange={setExposureEnd} value={ExposureEnd} />
 
      </td>
<td>
<div>
            <Button variant="outlined" onClick={() => setIsOpen(true)}>
            Exposure End Date
      </Button>
      <ReactModal
        isOpen={isOpen}
        contentLabel="Exposure End Date"
        onRequestClose={() => setIsOpen(false)}
      >
       <ExposureEndDate StartDate={data.DateIn} DurationVal={data.ExposureDurationVal} DurationUnit={data.ExposureDurationUnit} text="Exposure End Date" closePopup={() => setIsOpen(false)} />
      </ReactModal>
    </div>
</td>

        </tr>
        
        <tr>
          <th>Exposure Type:</th><td colspan={2}> 
          <select name="ExposureTypeID" onChange={handleChange}>
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
          <th>Returns Interval:</th><td>   <input type="text" name="ReturnsFrequencyVal" onChange={handleChangeNum} value={data.ReturnsFrequencyVal} />
          <span style={{color:'red'}}>{vldtReturnsFrequencyVal}</span>
            </td>
       <td> 
            
          <select name="ReturnsFrequencyUnit" onChange={handleChange}>
          {
          units.map((ep,i)=>{
            return (
              <option value={ep} selected={(ep==data.ReturnsFrequencyUnit)?true:false}>{ep}</option>
            )})
          }
          </select>
            
      </td>
        </tr>
<tr  >
  <td colSpan={5} >
  <table className="results" id="table1" width='100%'>
  <tr>
    <th colSpan={2}><b></b></th>
    <th colSpan={1}><b>Frequency</b></th>
  </tr>
  {
    dataSeriesEvent.map((result,i)=>{
      return (
        <tr className='super-app-theme' key={i} >
            
          <td>{result.EventDesc}</td>
          <td>
            <input type="checkbox" name={result.EventType} onChange={handleChangeSeriesEvent} checked={result.FrequencyVal!=-1}></input>
           
          </td>
          {(result.FrequencyVal!=-1)?
          <td> <input type="text" name={result.EventType}  onChange={e=>handleChangeSeriesEventVal(e)} value={result.FrequencyVal} />
          
          <select name={result.EventType}  onChange={e=>handleChangeSeriesEventUnits(e)} >
          {
          units.map((ep,i)=>{
            return (
              <option value={ep} selected={(ep==result.FrequencyUnit)?true:false}>{ep}</option>
            )})
          }
          </select>
          </td>
          :
          <td>
            Disabled
          </td>
    }
         </tr>  
      )
    })
  }
   </table>
    </td>
  <td>
    <table  id="table1" >
      <tr>
        <td>head</td>
        </tr>
      <tr className='super-app-theme' >
        <td>Visual Reporting</td>
        <td><input type="checkbox" name="VisualReporting" onChange={handleCheck} value={data.VisualReporting} /></td>
      </tr>
      <tr className='super-app-theme' >
        <td>&nbsp</td>
      </tr>
      <tr className='super-app-theme' >
        <td>Photos</td>
        <td><input type="checkbox" name="Photos" onChange={handleCheck} value={data.Photos} /></td>
    
      </tr>
    </table>
  </td>
</tr>
   <tr>
          <th>Deleted:</th><td>   <input name="Deleted" type="checkbox" onChange={handleCheck} value={data.Deleted} />
      </td>
     
          <th>SamplesReturned:</th><td>
          <input name="SamplesReturned" type="checkbox" onChange={handleCheck} value={data.SamplesReturned} />
      
      </td>
        </tr>
        <tr>
          <th>Letter Ref Date</th>
          <td>  
          <DatePicker format="dd/MM/yyyy"  onChange={setLogBookLetterDate} value={LogBookLetterDate} />
        </td>
          <th>Communication Type</th>
          <td>
         
            <input type="text" name="LogBookCorrespType" onChange={handleChange} value={data.LogBookCorrespType } />
      </td>
          <th>Site</th>
          <td>
          <select name="Site" onChange={handleChange}>
          {
          site.map((ep,i)=>{
            return (
              <option value={ep.SiteID} selected={(ep.SiteID==data.Site)?true:false}>{ep.SiteName}</option>
            )})
          }
          </select>
      
      </td>
          </tr>

        <tr>
          <th>Exposure Spec:</th><td colSpan={8}><textarea width='600px' rows={10} cols={120}  name="ExposureSpecification" onChange={handleChange} value={data.ExposureSpecification} />
      </td>
        </tr>
      
<tr><td colSpan={2}>
 <Button variant="outlined" onClick={handleSubmit}>
          Submit
        </Button>
        </td>
        </tr>
  </table>
  </form>
        }
 </body>
    );
  }

export default Series