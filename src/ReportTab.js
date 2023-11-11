import React, { useState, useEffect, Component } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Circles } from 'react-loader-spinner'
import './App.css';
import { Link, useLocation, useParams } from "react-router-dom"
import { bearerToken } from './index'
import ArrowBack from '@mui/icons-material/ArrowBack';
import moment from 'moment';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import Button from '@mui/material/Button';
export default function ReportTab() {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = React.useState('1');
  const location = useLocation()
  const [reportid, setReportid] = useState(location.state.id);//.id
  const [reportDate, setReportDate] = useState(new Date());
  const [completedDate, setCompletedDate] = useState(new Date());
  const seriesid = location.state.seriesid;//.id
  const dataReport = location.state.dataReport;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const [data, setData] = useState([]);

  const fetchInfo = async e => {
    setLoading(true);
    const token = await bearerToken()
    const headers = new Headers()
    const bearer = `Bearer ${token}`
    headers.append('Authorization', bearer)
    const options = {
      method: 'GET',
      headers: headers,
    }
    const response = fetch(`https://allungawebapi.azurewebsites.net/api/Reports/int/` + reportid, options);
    var ee = await response;
    if (!ee.ok) {
      throw Error((ee).statusText);
    }
    const json = await ee.json();
    console.log(json);
    var xx = moment(json.date).toDate();
    setReportDate(xx);
    if (json.completeddate != null) {
      var yy = moment(json.completeddate).toDate();
      setCompletedDate(yy);
    }
    else {
      setCompletedDate(null);
    }
    setData(json);
    fetchParamsAll();
  }

  const handleChangeReport = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleCheckReport = (e) => {
    if (e.target.checked) {
      setData({ ...data, [e.target.name]: true });
    }
    else {
      setData({ ...data, [e.target.name]: false });
    }
  };
  const handleSubmit = async e => {
    e.preventDefault()
    data.date = moment(reportDate).format("YYYY-MM-DD HH:mm:ss");
    setData({ ...data, 'date': moment(reportDate).format("YYYY-MM-DD HH:mm:ss") });

    data.completeddate = moment(completedDate).format("YYYY-MM-DD HH:mm:ss");
    setData({ ...data, 'completeddate': moment(completedDate).format("YYYY-MM-DD HH:mm:ss") });


    const token = await bearerToken()
    const headers = new Headers()
    const bearer = `Bearer ${token}`
    headers.append('Authorization', bearer)
    headers.append('Content-type', "application/json; charset=UTF-8")

    const options = {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: headers,
    }

    const response = fetch(`https://allungawebapi.azurewebsites.net/api/Reports/` + reportid, options);
    var ee = await response;
    if (!ee.ok) {
      throw Error((ee).statusText);
    }
    alert('saved');
  }


  useEffect(() => {

    fetchInfo();

    //fetchSample();
  }, []);
  const selectreport = async (_reportid) => {
    //function selectreport(reportid) {
    setReportid(_reportid);
    setLoading(true);
    fetchInfo();

    //;
    return false;
  }


  const [dataParamsAll, setDataParamsAll] = useState([]);

  const fetchParamsAll = async e => {
    const url = `https://allungawebapi.azurewebsites.net/api/ReportParams/` + reportid;
    const token = await bearerToken()
    const headers = new Headers()
    const bearer = `Bearer ${token}`
    headers.append('Authorization', bearer)
    const options = {
      method: 'GET',
      headers: headers,
    }
    const response = fetch(url, options);
    var ee = await response;
    if (!ee.ok) {
      throw Error((ee).statusText);
    }
    const json = await ee.json();
    console.log(json);
    setDataParamsAll(json);
    fetchSample();

  }
  const handleSubmitParam = (e) => {
    e.preventDefault()
    var ret = dataParamsAll.filter(x => x.selected == true);
    var rt = ret.map(t => t.paramid);
    fetch(`https://allungawebapi.azurewebsites.net/api/ReportParams/` + reportid, {
      method: "PUT",
      body: JSON.stringify(rt),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    alert('saved');
  }

  const handleSubmitReading = (e) => {
    e.preventDefault();
    fetch(`https://allungawebapi.azurewebsites.net/api/Readings/` + reportid, {
      method: "PUT",
      body: JSON.stringify(dataReading),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    alert('saved');
  }
  const handleChangeReading = (e) => {
    const xx = e.target.name.split('~');
    const pid = Number(xx[0]);
    const sid = Number(xx[1]);
    const temp = [...dataReading];
    var dd = temp.find(i => i.Paramid === pid && i.sampleid === sid);
    dd.value = e.target.value;

    setDataReading([...temp]);
  };

  const handleCheckParams = (e) => {
    const temp = [...dataParamsAll];
    var dd = temp.find(i => i.paramid.toString() == e.target.name);

    if (e.target.checked) {
      dd.selected = true;

    }
    else {
      dd.selected = false;

    }

    setDataParamsAll([...temp]);
  };

  const [dataSample, setDataSample] = useState([]);
  const fetchSample = async e => {


    const urlSample = `https://allungawebapi.azurewebsites.net/api/Samples/report/` + reportid;

    const token = await bearerToken()
    const headers = new Headers()
    const bearer = `Bearer ${token}`
    headers.append('Authorization', bearer)
    const options = {
      method: 'GET',
      headers: headers,
    }
    const response = fetch(urlSample, options);
    var ee = await response;
    if (!ee.ok) {
      throw Error((ee).statusText);
    }
    const json = await ee.json();
    console.log(json);
    setDataSample(json);
    fetchReading();
  }


  const [dataParam, setDataParam] = useState([]);
  const fetchParam = async e => {
    const urlParam = `https://allungawebapi.azurewebsites.net/api/Params/int/` + reportid;
    const token = await bearerToken()
    const headers = new Headers()
    const bearer = `Bearer ${token}`
    headers.append('Authorization', bearer)
    const options = {
      method: 'GET',
      headers: headers,
    }
    const response = fetch(urlParam, options);
    var ee = await response;
    if (!ee.ok) {
      throw Error((ee).statusText);
    }
    const json = await ee.json();
    console.log(json);
    setDataParam(json);

    setLoading(false);

  }
  const GetReading = (ParamID, SampleID) => {
    var xx = dataReading.filter((i) => i.Paramid === ParamID && i.sampleid === SampleID);
    if (xx.length > 0) {
      return xx[0].value;// '2';
    }
    return '';
  }

  const [dataReading, setDataReading] = useState([]);
  const fetchReading = async e => {
    const urlReading = `https://allungawebapi.azurewebsites.net/api/Readings/` + reportid;
    const token = await bearerToken()
    const headers = new Headers()
    const bearer = `Bearer ${token}`
    headers.append('Authorization', bearer)
    const options = {
      method: 'GET',
      headers: headers,
    }
    const response = fetch(urlReading, options);
    var ee = await response;
    if (!ee.ok) {
      throw Error((ee).statusText);
    }
    const json = await ee.json();
    console.log(json);
    setDataReading(json);

    fetchParam();

  }
  ///////////
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Link
        to={"/seriestab"}
        state={{ id: seriesid, name: '' }}><ArrowBack />back</Link>
      {
        dataReport.map((result, i) => {
          return (

            <td key={i} align='center' >
              {(result.reportid == reportid) ?
                <Button variant="contained">{new Date(result.date).toLocaleDateString()} | {result.bookandpage}<br />{result.reportname}</Button>
                :
                <Button variant="outlined" onClick={() => selectreport(result.reportid)}>{new Date(result.date).toLocaleDateString()} | {result.bookandpage}<br />{result.reportname}</Button>
              }
            </td>
          )
        })
      }
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label="Report Detail" value="1" />
            <Tab label="Parameters" value="2" />
            <Tab label="Readings" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
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
            <table>
              <tr>
                <th>Report Date:</th>
                <td>
                  <DatePicker format="dd/MM/yyyy" onChange={setReportDate} value={reportDate} />

                </td>
              </tr>
              <tr>
                <th>Name:</th><td><input type="text" name="reportname" onChange={handleChangeReport} value={data.reportname} /></td>
              </tr>
              <tr>
                <th>Book & Page:</th><td><input type="text" name="bookandpage" onChange={handleChangeReport} value={data.bookandpage} /></td>
              </tr>
              <tr>
                <th>Report Status:</th><td><input type="text" name="reportstatus" onChange={handleChangeReport} value={data.reportstatus} /></td>
              </tr>
              <tr>
                <th>Return (else Report)</th><td><input type="checkbox" name="return_elsereport" onChange={handleCheckReport} checked={data.return_elsereport} /></td>
              </tr>
              <tr>
                <th>Deleted:</th><td><input type="checkbox" name="deleted" onChange={handleCheckReport} checked={data.deleted} /></td>
              </tr>
              <tr>
                <th>Comment:</th><td><textarea cols={120}  style={{width:'100%'}}  name="comment" onChange={handleChangeReport} value={data.comment} /></td>
              </tr>
              <tr>
                <th>Completed Date</th><td>
                  <DatePicker format="dd/MM/yyyy" onChange={setCompletedDate} value={completedDate} />
                </td>
              </tr>
              <tr><td colSpan={2}>
                <Button variant="outlined" onClick={handleSubmit}>
                  Submit
                </Button>
              </td>
              </tr>
            </table>
          }
        </TabPanel>


        <TabPanel value="2">
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
              <Button variant="outlined" onClick={handleSubmitParam}>
                Submit
              </Button><br />

              <table id="table1" >

                {
                  dataParamsAll.map((result, i) => {
                    return (
                      <tr key={i} >
                        <td>{result.paramname}</td>
                        <td><input type="checkbox" name={result.paramid} onChange={handleCheckParams} checked={result.selected} /></td>
                      </tr>
                    )
                  })
                }

              </table>
            </div>
          }
        </TabPanel>
         <TabPanel value="3">
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
            <table id="table1" >
              <tr>
                <th><b>Sample No</b></th>
                <th><b>Sample Name</b></th>
                {
                  dataParam.sort((a, b) => a.ParamName > b.ParamName).map((result, i) => {
                    return (
                      <th key={i} style={{ width: `50px` }} >{result.ParamName}</th>
                    )
                  })
                }
              </tr>
              {
                dataSample.map((result, i) => {
                  return (
                    <tr key={i} >
                      <td>{result.Number}</td>
                      <td>{result.description}</td>
                      {
                        dataParam.sort((a, b) => a.ParamName > b.ParamName).map((paramresult, i) => {
                          return (
                            <td key={i} >
                              <input type="text" name={paramresult.ParamID + '~' + result.SampleID} onChange={handleChangeReading} value={GetReading(paramresult.ParamID, result.SampleID)} />


                            </td>
                          )
                        })
                      }
                    </tr>
                  )
                })
              }
              <tr>
                <td colSpan={2}>
                  <Button variant="outlined" onClick={handleSubmitReading}>
                    Submit
                  </Button>
                </td>
              </tr>
            </table>
          }
        </TabPanel>



      </TabContext>
    </Box>
  );
}