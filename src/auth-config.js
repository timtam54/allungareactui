import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
    auth:{
        clientId: '5a7e1820-1d77-41ee-9e80-97b144abca2b',//'b1764eb7-9b37-4301-be52-426848373f7c',//b1764eb7-9b37-4301-be52-426848373f7c
        authority:'https://login.microsoftonline.com/58f4e166-7a83-4d81-8e9d-05cf78a42ac0',//'https://login.microsoftonline.com/180b1916-5e88-4fad-80fb-9778c8412380',//
        redirectUri: '/',
        postLogoutRedirectUri:'/',
          navigateToLogInRequestUrl:false,
          },
          cache:{
            cacheLocation: "sessionStorage",
            storeAuthStateInCookie: false,
          },
          system: {
            loggerOptions: {
              loggerCallback: (
                level: LogLevel,
                message: string,
                containsPii: boolean
              ): void => {
                if (containsPii) {
                  return;
                }
                switch (level) {
                  case LogLevel.Error:
                    console.error(message);
                    return;
                  case LogLevel.Info:
                    console.info(message);
                    return;
                  case LogLevel.Verbose:
                    console.debug(message);
                    return;
                  case LogLevel.Warning:
                    console.warn(message);
                    return;
                }
              },
              piiLoggingEnabled: false,
            },
            windowHashTimeout: 60000,
            iframeHashTimeout: 6000,
            loadFrameTimeout: 0,
          },
        };

       //https://www.youtube.com/watch?v=ffCCpwzJMnQ
export const LoginRequest = {
    scopes: ["api://efca4e54-fb09-4c7a-8208-b5fd4fce926f/tasks.read","user.read"],//,"api://efca4e54-fb09-4c7a-8208-b5fd4fce926f/tasks.read"],
    //url: 'https://allungawebapi.azurewebsites.net/api/Params',
};


export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};