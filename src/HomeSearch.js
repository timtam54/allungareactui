import React,{ useState, useEffect } from 'react';
import './App.css';
import {Link, BrowserRouter, Routes, Route} from "react-router-dom";
import { Circles } from 'react-loader-spinner'
import SearchIcon from '@mui/icons-material/Search';
import { bearerToken } from './index'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import { useIsRTL } from 'react-bootstrap/esm/ThemeProvider';
import Button from '@mui/material/Button';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
function HomeSearch() { 
  const [fields,setFields] = useState("All");
  const [fieldlist] = useState(["All","AllungaRef","BookPage","Client","ClientRef","Exposure"]);
  
const [loading,setLoading] = useState(false);
const [search,setSearch] = useState("");
const [results,setResults] = useState([]);
 const [isOpen, setIsOpen] = useState(false);
 const [actives,setActives] = useState(true);
 const [inactives,setInactives] = useState(false);
 const [sortedx,setsortedx]=useState("SeriesID");
const handleSearch = async e=>{

  e.preventDefault();
  
 ssearch(actives,inactives,fields);
}

const ssearch = async (act,del,flds) =>{  
  setLoading(true);

  const token = await bearerToken()
  const headers = new Headers()
  const bearer = `Bearer ${token}`
  headers.append('Authorization', bearer)
  const options = {
    method: 'GET',
    headers: headers,
  }
  var endPoint='';

  if (search=='')
    endPoint = `https://allungawebapi.azurewebsites.net/api/Series/~,` + (act?`1`:`0`)+`,`+ (del?`1`:`0`)+`,`+flds;
  else
    endPoint = `https://allungawebapi.azurewebsites.net/api/Series/`+search + `,` + (act?`1`:`0`)+`,`+ (del?`1`:`0`)+`,`+flds;
  
  const response = fetch(endPoint,options);
  var ee=await response;
  if (!ee.ok)
  {
    throw Error((ee).statusText);
  }
  const json=await ee.json();
  console.log(json);
  setResults(json);
  setIsOpen(true);
  setLoading(false);
}
useEffect(() => {
  ssearch(actives,inactives,fields);
}, []);
const handledel = (e) => {

  setActives(e.target.checked);

  ssearch(e.target.checked,inactives,fields);
}

const handlefield= (e) => {

  setFields(e.target.value);

  ssearch(actives,inactives,e.target.val,e.target.value);
}

const handleinact= (e) => {

  setInactives(e.target.checked);

  ssearch(actives,e.target.checked,fields);
}

const setsorted = (e) => {
  const val=e.target.name;
  setsortedx(val);
  const sorted = results.sort((a, b) => b[val] < a[val]);
  console.log(sorted);
  setResults(sorted);

}

const onDelete = async id=>{
  const confirm = {
    title: 'Delete',
    message: 'Are you sure you wish to delete this series',
    buttons: [
      {
        label: 'Yes',
        onClick: () => DeleteSeries(id)
      },
      {
        label: 'No',
        onClick: () => alert('Delete Cancelled')
      }
    ],
    closeOnEscape: true,
    closeOnClickOutside: true,
    keyCodeForClose: [8, 32],
    willUnmount: () => {},
    afterClose: () => {},
    onClickOutside: () => {},
    onKeypress: () => {},
    onKeypressEscape: () => {},
    overlayClassName: "overlay-custom-class-name"
  };
  
  confirmAlert(confirm);
}

const DeleteSeries = async id=>{
  setLoading(true);
  //const id='6048';
  const token = await bearerToken()
  const headers = new Headers()
  const bearer = `Bearer ${token}`
  headers.append('Authorization', bearer)
  const options = {
    method: 'DELETE',
    headers: headers,
  }
  const endPoint= `https://allungawebapi.azurewebsites.net/api/Series/`+id;
  
  const response = fetch(endPoint,options);
  var ee=await response;
  if (!ee.ok)
  {
    throw Error((ee).statusText);
  }
  const json=await ee.json();
  await ssearch(actives,inactives,fields);
  
  return false;
}
const colourstyle = (active, complete,dteNextRpt,dteNextRtrn,CntSamplesOnSite,locked) => 
{
  const dte=new Date();
  if (active)
  {
    if (locked!=null)
    {
      return 'LockedSearch'
    }
    if (complete)
    {
      return 'CmpltSearch'
    }
    if (dteNextRpt!=null)
    {
    if (moment(dteNextRpt)<moment(dte))//,dteNextRtrn
    {
      return 'SearchOvrdu'
    }
  }
    if (dteNextRtrn!=null)
    {
    if (moment(dteNextRtrn)<moment(dte))//,dteNextRtrn
    {
      return 'SearchOvrdu'
    }
  }
    if (CntSamplesOnSite==0)//,dteNextRtrn
    {
      return 'SearchOffSite'
    }
    return 'SearchActive'
  }
  return 'SearchInactive'
}
  return (   
<div className="search">
<br/>
  <form onSubmit={handleSearch}>
        <table style={{border:"0px"}}>
       
         <tr>
            <td>
          <h3 style={{color:'#944780'}}>Search Client Series</h3>
          </td>
          <td width={60}></td>
          <td><Link  title='Add New Series' to='/addseries'><AddIcon/></Link></td>
          <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>

          <td>
          <select name="Fields" onChange={handlefield}>
          {
          fieldlist.map((ep,i)=>{
            return (
              <option value={ep} selected={(ep==fields)?true:false} >{ep}</option>
            )})
          }
          </select>
      </td>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
<td>
        <input type='text' placeholder="-Search Client/Series-" value={search} onChange={e=>setSearch(e.target.value)} />
        </td>
        <td><SearchIcon title="click to search" onClick={handleSearch} /></td>
        <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
        <td>
        <table border={1}>
            <tr>

        <th>
          Active
        </th>
        <td>
          <input type="CheckBox" onClick={handledel} checked={actives}></input>
          </td>
          </tr>
          <tr>

<th style={{backgroundColor:'black',color:'white'}} >
  Inactive
</th>
<td style={{backgroundColor:'black',color:'white'}} >
  <input type="CheckBox" onClick={handleinact} checked={inactives}></input>
  </td>
  </tr>
          </table>
        </td>
        <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
          <td style={{fontSize:'8'}}>
            <table border={1}>
              <tr>
              <td style={{backgroundColor:'rgb(247, 179, 147)'}}><b>Return / Report overdue</b>
         </td>
         <td style={{backgroundColor:'yellow'}}><b>Locked</b></td>
         <td rowSpan={2} style={{backgroundColor:'#aef3a8',color:'black'}} ><b>
          Return / Report<br/>Complete</b>
         </td>
        
              </tr>
              <tr>
              <td style={{backgroundColor:'rgb(243, 233, 233)',color:'black'}}><b>
          All Samples off site</b>
         </td><td style={{backgroundColor:'black',color:'white'}}><b>
         Inactive</b>
         </td>
              </tr>
            </table>
          </td>
        
              </tr>
        </table>
        <br/>
        </form>
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
     
      <table style={{width:"100%"}} id="table2">
        {isOpen?
       <tbody>
         <tr>
          <th><Button variant="outline" onClick={() => {alert("This button marks Series as deleted only if there are no samples or reports referencing the series");}}>?</Button></th>
        <th style={{backgroundColor:"#aef3a8",color:"black"}}>Complete</th>
        <th  style={{color:(sortedx=="companyname"?"red":"black")}}><Button style={{fontWeight:'bold'}} variant="outline" onClick={setsorted} name="companyname">Company Name</Button></th>
          <th  style={{color:(sortedx=="Abbreviation"?"red":"black")}}><Button style={{fontWeight:'bold'}}  variant="outline" onClick={setsorted} name="Abbreviation">Code</Button></th>
          <th  style={{color:(sortedx=="AllungaReference"?"red":"black")}}><Button style={{fontWeight:'bold'}}  variant="outline" onClick={setsorted} name="AllungaReference">Allunga Series</Button></th>
          <th  style={{color:(sortedx=="clientreference"?"red":"black")}}><Button style={{fontWeight:'bold'}} variant="outline" onClick={setsorted} name="clientreference">Client<br/>Series</Button></th>
       
          <th style={{backgroundColor:"rgb(243, 233, 233)",color:"black",color:(sortedx=="CntSamplesOnSite"?"red":"black")}}><Button variant="outline" onClick={setsorted} name="CntSamplesOnSite">No of Samples On Site</Button></th>
          <th style={{backgroundColor:"rgb(243, 233, 233)",color:"black",color:(sortedx=="EquivalentSamples"?"red":"black")}}><Button variant="outline" onClick={setsorted} name="EquivalentSamples">Equiv Samples</Button></th>
          
          <th   style={{backgroundColor:"rgb(247, 179, 147)",color:(sortedx=="DateNextReport"?"red":"black")}}><Button variant="outline" onClick={setsorted} name="DateNextReport">Next Report</Button></th>
          <th   style={{backgroundColor:"rgb(247, 179, 147)",color:(sortedx=="DateNextReturn"?"red":"black")}}><Button variant="outline" onClick={setsorted} name="DateNextReturn">Next Return</Button></th>
    
          <th style={{color:(sortedx=="ShortDescription"?"red":"black")}}><Button variant="outline" onClick={setsorted} name="ShortDescription">Short Descriptions</Button></th>
          <th  style={{backgroundColor:"black",color:"white"}}>Active</th>
          <th style={{color:(sortedx=="DateIn"?"red":"black")}}><Button variant="outline" onClick={setsorted} name="DateIn">Date In</Button></th>
          
          <th style={{color:(sortedx=="ReturnsReq"?"red":"black")}}><Button variant="outline" onClick={setsorted} name="ReturnsReq">Returns Req</Button></th>
          <th style={{color:(sortedx=="ExposureType"?"red":"black")}}><Button variant="outline" onClick={setsorted} name="ExposureType">Exposure</Button></th>
          <th style={{color:(sortedx=="RackNo"?"red":"black")}}><Button variant="outline" onClick={setsorted} name="RackNo">Rack No</Button></th>
   
          <th  style={{backgroundColor:"yellow"}}>Site Name</th>
          <th   style={{backgroundColor:"yellow"}}>Locked</th>
        
        </tr>

        </tbody>
        :
        <div style={{color:'red'}}>--populate series search and hit enter--</div>
}
        {
          results.map((result,i)=>{
            return (
              <tr key={i} className={colourstyle(result.Active,result.Complete,result.DateNextReport,result.DateNextReturn,result.CntSamplesOnSite,result.Locked)} >
                <td align='center'><div style={{border:'none'}} onClick={() => onDelete(result.seriesid)}><DeleteIcon/></div></td>
                <td align='center'><input type='checkbox' checked={result.Complete}/></td>
                <td>{result.companyname}</td>
                <td>{result.Abbreviation}</td>
                <td> <Link
  to={"/seriestab"}
  state={{id: result.seriesid,name:result.AllungaReference }}>{result.AllungaReference}</Link></td>
                <td>{result.clientreference}</td>
               
                <td>{result.CntSamplesOnSite}</td>
                <td>{result.EquivalentSamples}</td>
                {(result.DateNextReport==null)?<td></td>:
                (new Date(result.DateNextReport ).getFullYear()==2100)?<td></td>:
                <td>{new Date(result.DateNextReport ).toLocaleDateString()}</td>
            }

{(result.DateNextReturn==null)?<td></td>:(new Date(result.DateNextReport ).getFullYear()==2100)?<td></td>:
                <td>{new Date(result.DateNextReturn ).toLocaleDateString()}</td>
          }
                <td>{result.ShortDescription}</td>      
                  <td><input type='checkbox' checked={result.Active}/></td>    
                <td>{new Date(result.DateIn ).toLocaleDateString()}</td>
              
                <td><input type='checkbox' checked={result.ReturnsReq}/></td>
                <td>{result.ExposureType}</td>
                <td>{result.RackNo}</td>
                <td>{result.SiteName}</td>   
                <td>{result.Locked}</td>        
              </tr>  
            )
          })
        }
        
      </table>
}
    </div>
  );
}

export default HomeSearch;
