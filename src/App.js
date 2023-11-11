import './App.css';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, MsalProvider} from '@azure/msal-react'
import logo from './logo.png';
import React,{ useState} from 'react';
import LoginIcon from '@mui/icons-material/Login';
import {LoginRequest} from './auth-config'

import {Link, BrowserRouter, Routes, Route,useRoutes } from "react-router-dom";
import HomeSearch from './HomeSearch';
import About from './About';
import Users from './Users';
import Header from './Header';
import AddSeries from './AddSeries';
import ExposureTypes from './ExposureTypes';
import ExposureType from './ExposureType';
import SeriesTab from './SeriesTab';
import Series from './Series';
import Client from './Client';
import Samples from './Samples';
import Dispatches from './Dispatches';
import ClientSearch from './ClientSearch';
import ReportTab from './ReportTab';
import ExposureConfirmationRpt from './ExposureConfirmationRpt'
import RptRack from './RptRack'
import SplitSeries  from './SplitSeries';
import MergeSeries  from './MergeSeries';
import Sample from './Sample';
import RptSampleOnSites from './RptSampleOnSites';
import SeriesProjectedWork from './SeriesProjectedWork';
import Params from './Params';
import Param from './Param';
import Rprt from './rprt.tsx';

const WrappedView = () => {
  const {instance} = useMsal();
  const activeAccount = instance.getActiveAccount();

  const handleRedirect = () =>
  {

    instance
    .loginRedirect({
      ...LoginRequest,prompt:'create',
    })
    .catch((error)=>console.log(error));
  };
//https://www.google.com/search?q=react+authentication+via+azure+ad+msal&sca_esv=571342877&biw=1358&bih=654&tbm=vid&sxsrf=AM9HkKnN7y1M4e3PEcKaTg8dyflVNYPaqQ%3A1696639518853&ei=HqogZYrmM46r-QaBkILADw&ved=0ahUKEwiK7dTe2uKBAxWOVd4KHQGIAPgQ4dUDCA0&uact=5&oq=react+authentication+via+azure+ad+msal&gs_lp=Eg1nd3Mtd2l6LXZpZGVvIiZyZWFjdCBhdXRoZW50aWNhdGlvbiB2aWEgYXp1cmUgYWQgbXNhbDIFECEYoAEyBRAhGKABMggQIRgWGB4YHUj7IFDGF1jFHXAAeACQAQCYAekBoAGeCaoBBTAuNS4xuAEDyAEA-AEBwgIEECMYJ8ICBxAhGKABGAqIBgE&sclient=gws-wiz-video#fpstate=ive&vld=cid:84b79c83,vid:6_wgB8GO1GM,st:0
const imgMyimageexample = require('./background.jpg');
const divStyle = {
  width:window.innerWidth,// '100%',
height:window.innerHeight,//'800px',
  backgroundImage: `url(${imgMyimageexample})`,
  backgroundSize: 'cover' ,
  verticalAlign:'top', 

};
  return (
    
   
    <body>
      <AuthenticatedTemplate>
        
        {
        activeAccount?(
          <p>
         <BrowserRouter>
         <Header/>
    <Routes>
    <Route path="/" element={<HomeSearch/>}></Route>
       <Route path="/about" element={<About/>}></Route>
       <Route path="/addseries" element={<AddSeries/>}></Route>
       <Route path="/users" element={<Users/>}></Route>
       <Route path="/exposuretypes" element={<ExposureTypes/>}></Route>
       <Route path="/seriestab" element={<SeriesTab/>}></Route>
       <Route path="/series" element={<Series/>}></Route>
       <Route path="/client" element={<Client/>}></Route>
       <Route path="/samples" element={<Samples/>}></Route>
       <Route path="/dispatches" element={<Dispatches/>}></Route>
       <Route path="/clients" element={<ClientSearch/>}></Route>
       <Route path="/reporttab" element={<ReportTab/>}></Route>
       <Route path="/exposureconfirmationrpt" element={<ExposureConfirmationRpt/>}></Route>
       <Route path="/rptrack" element={<RptRack/>}></Route>
       <Route path="/splitseries" element={<SplitSeries/>}></Route>
       <Route path="/mergeseries" element={<MergeSeries/>}></Route>
       <Route path="/sample" element={<Sample/>}></Route>
       <Route path="/rptsampleonsites" element={<RptSampleOnSites/>}></Route>
       <Route path="/parameters" element={<Params/>}></Route>
       <Route path="/param" element={<Param/>}></Route>
       <Route path="/seriesprojectedwork" element={<SeriesProjectedWork/>}></Route>
       <Route path="/exposuretype" element={<ExposureType/>}></Route>
       <Route path="/rprt" element={<Rprt/>}></Route>
       
   </Routes>
   </BrowserRouter>
          </p>

        )
        :
        <p>Not authenticated</p>
        }
      </AuthenticatedTemplate>
        <UnauthenticatedTemplate style={{verticalAlign:'top'}} >
        <div width="100%" style={divStyle} verticalAlign='top' > 
        <table style={{width:'100%'}}>
<tr verticalAlign="top">
<td verticalAlign='top'> <img verticalAlign='top' src={logo} width={300} height={80} /></td>
  <td>
          <button title='Sign in' onClick={handleRedirect}>

          <LoginIcon/>
          </button>
</td>
</tr>
<tr>
  <td></td>
</tr>
<tr>
  <td></td>
</tr>
<tr>
  <td></td>
</tr>
<tr>
  <td></td>
</tr>
<tr>
  <td></td>
</tr>
<tr>
  <td></td>
</tr>
<tr>
  <td></td>
</tr>
<tr>
  <td></td>
</tr>
<tr>
  <td></td>
</tr>
<tr>
  <td></td>
</tr>
<tr>
  <td></td>
</tr>
<tr>
  <td></td>
</tr>
<tr>
  <td></td>
</tr>
<tr>
  <td></td>
</tr>
<tr>
  <td></td>
</tr>
<tr>
  <td align='center' >
    <div style={{backgroundColor:"#944780",width:"1020px",align: "center",border: "1px solid #000000"}}  align='center'>
     <br/>
     <div style={{color:"white",width:"640px",align: "left"}} align='left'>
    
      <h2>Allunga Exposure Reporting system</h2>

    <br/>
    This web app manages all Client's Samples, Series, site Exposure, Reporting, and transfers.
      <br/>
      This cloud based application is written in the following technologies
      <br/>

      <ul>
        <li>The User interface is written in Reactjs</li>
        <br/>
        <li>The Data tier is an asp.net core Web API</li>
        <br/>
        <li>The Database is SQL Azure</li>
        <br/>
        <li>Secured by Azure active directory and MSAL/JWT - MFA</li>
      </ul>
     
      <br/>
      Click<button title='Sign in' onClick={handleRedirect}>

<LoginIcon/>
</button> to sign in 
    </div>
    <br/>
    </div>
  </td>
  </tr>

</table>

  <br/>
  <br/>
  <br/>
  <br/>  <br/>
  <br/>  <br/>
  <br/>
  
</div>
        </UnauthenticatedTemplate>
    </body>
  
  );
};

const App = ({instance}) => {

 

  return (
    <div >
    <MsalProvider instance={instance}>
      <WrappedView/>
    </MsalProvider>
    </div>
  );
};

export default App;
