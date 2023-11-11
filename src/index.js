import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { msalConfig,LoginRequest } from './auth-config';
import {PublicClientApplication, EventType} from '@azure/msal-browser'

const msalInstance =new PublicClientApplication(msalConfig);


// Handle the redirect flows
msalInstance
  .handleRedirectPromise()
  .then((tokenResponse) => {
    // Handle redirect response
   // const acctok = tokenResponse.accessToken;
  })
  .catch((error) => {
    console.error(error.message);
  });



if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0)
{
  msalInstance.setActiveAccount(msalInstance.getActiveAccount()[0]);
}

msalInstance.addEventCallback((event)=>{
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account)
  {
    const account = event.payload.account;
    msalInstance.setActiveAccount(account);
  }
});

export async function bearerToken() {
  const account = msalInstance.getActiveAccount()
  if (!account) {
    throw Error(
      'No active account! Verify a user has been signed in and setActiveAccount has been called.'
    )
  }

  const response = await msalInstance.acquireTokenSilent({
    ...LoginRequest,
    account: account,
  })

  return response.accessToken
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App instance={msalInstance} />
);


