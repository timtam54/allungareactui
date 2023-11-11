import "./App.css"
import React, { useState, useEffect, Component } from "react";
import {Link, BrowserRouter, Routes, Route} from "react-router-dom";
import { bearerToken } from './index';
import { Circles } from 'react-loader-spinner'
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

import ArrowBack from '@mui/icons-material/ArrowBack';


function ClientSearch()
{
const [loading,setLoading] = useState(false);
const [search,setSearch] = useState("");
const [results,setResults] = useState([]);

const handleSearch = async e=>{

  e.preventDefault();
  if (search == '')
  { setSearch('~');
}
  setLoading(true);
  const token = await bearerToken()
  const headers = new Headers()
  const bearer = `Bearer ${token}`

  headers.append('Authorization', bearer)

  const options = {
    method: 'GET',
    headers: headers,
  }  
  const response = fetch(`https://allungawebapi.azurewebsites.net/api/Clients/`+search,options);
  var ee=await response;
  if (!ee.ok)
  {
    throw Error((ee).statusText);
  }
  const json=await ee.json();
  console.log(json);
  setResults(json);
  setLoading(false);
}
  return (   
<div className="search">
      <header>

      <table>
              <tr>
                <td>
                <Link to="/"><ArrowBack/>back</Link>
                </td>
                <td>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </td>
                <td> <h3 style={{color:'#944780'}}>Search Clients</h3>
                  </td>
</tr>
              </table>  


        <form className="search-box" onSubmit={handleSearch}>
        <table><tr>
        <td><Link  title='Add New Client' to={"/client"}
  state={{id: 0}}><AddIcon/></Link></td>
<td>
        <input type='text' placeholder="-Search Clients-" value={search} onChange={e=>setSearch(e.target.value)} />
        </td>
        <td>   <SearchIcon title="click to search" onClick={handleSearch} />
        </td></tr>
        </table>

        </form>
       </header>
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
      <table style={{width:"100%"}} id="table1">
        <tr>
          <td><b>company name</b></td>
          <td><b>Group Name</b></td>
          <td><b>contact name</b></td>
          <td><b>Address</b></td>
          <td><b>Description</b></td>
          <td><b>Abbreviation</b></td>
          <td><b>TechnicalPhone</b></td>
          <td><b>TechnicalEmail</b></td>
          <td><b>AccountingContact</b></td>
          <td><b>AccountingEmail</b></td>
        </tr>
        {
          results.map((result,i)=>{
            return (
              <tr className='result' key={i} >
                <td> <Link
  to={"/client"}
  state={{id: result.clientid}}>{result.companyname}</Link></td>
                <td>{result.GroupName}</td>
                <td>{result.contactname}</td>
                <td>{result.Address}</td>
                <td>{result.Description}</td>
                <td>{result.Abbreviation} </td>
                <td>{result.TechnicalPhone} </td>
                <td>{result.TechnicalEmail} </td>
                <td>{result.AccountingContact} </td>
                <td>{result.AccountingEmail} </td>
              </tr>  
            )
          })
        }
       
      </table>
}
    </div>
  );
}

export default ClientSearch