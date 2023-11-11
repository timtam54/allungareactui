import React,{ useState } from 'react';
import './App.css';
import { LoginRequest ,graphConfig} from './auth-config';

//import { Circles } from 'react-loader-spinner'
//import SearchIcon from '@mui/icons-material/Search';
//import { ProfileData } from './components/ProfileData';

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
function Users() { 
  const { instance, accounts } = useMsal();
//const [loading,setLoading] = useState(false);
//const [search,setSearch] = useState("");
const [graphData, setGraphData] = useState(null);


function RequestProfileData() {
  // Silently acquires an access token which is then attached to a request for MS Graph data
  instance
      .acquireTokenSilent({
          ...LoginRequest,
          account: accounts[0],
      })
      .then((response) => {
          callMsGraph(response.accessToken)
          .then((response) => setGraphData(response));
      });
}



async function callMsGraph(accessToken) {
   const headers = new Headers();
   const bearer = `Bearer ${accessToken}`;

   headers.append("Authorization", bearer);

   const options = {
       method: "GET",
       headers: headers
   };

   return fetch(`https://graph.microsoft.com/v1.0/me`, options)
       .then(response => response.json())
       .catch(error => console.log(error));
}

/*const handleSearch = async e=>{
setLoading(true);


  //e.preventDefault();
 // if (search == '') return;

  const token = await bearerToken()

  const headers = new Headers()
  const bearer = `Bearer ${token}`

  headers.append('Authorization', bearer)

  const options = {
    method: 'GET',
    headers: headers,
  }


  const endPoint = `https://graph.microsoft.com/v1.0/users`;
  const response = fetch(endPoint,options);
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
*/

return (
  <>
      <h5 className="profileContent">Welcome {accounts[0].name}</h5>
      {graphData ? (
         <div>
          <div id="profile-div">
            <p><strong>First Name: </strong> {graphData.givenName}</p>
            <p><strong>Last Name: </strong> {graphData.surname}</p>
            <p><strong>Email: </strong> {graphData.userPrincipalName}</p>
            <p><strong>Id: </strong> {graphData.id}</p>
        </div>
         </div>
      ) : (
        <button variant="secondary" onClick={RequestProfileData}>
        Request Profile
    </button>
      )}
  </>
);
}

export default Users;
