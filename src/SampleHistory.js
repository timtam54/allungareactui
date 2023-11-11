import React, { useState, useEffect } from "react";
import { Circles } from 'react-loader-spinner'
import { bearerToken } from './index'
export const SampleHistory = ({ text, closePopup,sampleid }) => {
   const [loading,setLoading] = useState(true);
   const [data, setData] = useState([]);

     useEffect(() => {
    setLoading(true);

    fetchSampleHistory();

  }, []);

 
  const fetchSampleHistory = async e=>{
    const endPoint = `https://allungawebapi.azurewebsites.net/api/SampleHistories/`+sampleid;
  const token = await bearerToken()

  const headers = new Headers()
  const bearer = `Bearer ${token}`

  headers.append('Authorization', bearer)

  const options = {
    method: 'GET',
    headers: headers,
  }  
  const response = fetch(endPoint,options);
  var ee=await response;
  if (!ee.ok)
  {
    throw Error((ee).statusText);
  }
  const json=await ee.json();
  console.log(json);
  setData(json);
  setLoading(false);
}

  return (
    <div className="popup-container">
     <div className="popup-body">
      <h1>{text}</h1>
      <button onClick={closePopup}>Close X</button>

      <body>

  <table id="table1">
  <tr>
    <th>Date</th>
    <th>Action</th>
    
  </tr>
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
  
    data.map((result,i)=>{
      return (
        <tr className='result' key={i} >
          <td>{new Date(data.DTE ).toLocaleDateString()}</td>
          {data.Action ? <td>On-Site</td>:
          <td>off-site</td>}
       
         </tr>  
      )
    })
  }

</table>
</body>);

     </div>
    </div>
  );
};

export default SampleHistory