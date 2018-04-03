console.log('load authorizes.js');
const REDIRECT_URL = chrome.identity.getRedirectURL();
console.log(REDIRECT_URL);
const CLIENT_ID = "325329452020-ml902b9cpum7mqsd081u1uho51q622d5.apps.googleusercontent.com";
const SCOPES = ["openid", "email", "profile"];
const AUTH_URL =
`https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URL)}&scope=${encodeURIComponent(SCOPES.join(' '))}`;
const VALIDATION_BASE_URL="https://www.googleapis.com/oauth2/v3/tokeninfo";

function extractAccessToken(redirectUri) {
  console.log(redirectUri);
  let m = redirectUri.match(/[#?](.*)/);
  if (!m || m.length < 1)
    return null;
  let params = new URLSearchParams(m[1].split("#")[0]);
  return params.get("access_token");
}

/**
Validate the token contained in redirectURL.
This follows essentially the process here:
https://developers.google.com/identity/protocols/OAuth2UserAgent#tokeninfo-validation
- make a GET request to the validation URL, including the access token
- if the response is 200, and contains an "aud" property, and that property
matches the clientID, then the response is valid
- otherwise it is not valid
Note that the Google page talks about an "audience" property, but in fact
it seems to be "aud".
*/
function validate(redirectURL) {
  const accessToken = extractAccessToken(redirectURL);
  if (!accessToken) {
    throw "Authorization failure";
  }
  const validationURL = `${VALIDATION_BASE_URL}?access_token=${accessToken}`;
  const validationRequest = new Request(validationURL, {
    method: "GET"
  });
  
  function checkResponse(response) {
    console.log(response);
    return new Promise((resolve, reject) => {
      if (response.status != 200) {
        reject("Token validation error");
      }
      response.json().then((json) => {
        if (json.aud && (json.aud === CLIENT_ID)) {
          resolve(accessToken);
        } else {
          reject("Token validation error");
        }
      });
    });
  }

  return fetch(validationRequest).then(checkResponse);
}

/**
Authenticate and authorize using browser.identity.launchWebAuthFlow().
If successful, this resolves with a redirectURL string that contains
an access token.
*/
const identity = asyncWrapper(chrome.identity.launchWebAuthFlow);
function authorize() {
  return browser.identity.launchWebAuthFlow({
    interactive: true,
    url: AUTH_URL
  });
  // return identity({
  //   interactive: true,
  //   url: AUTH_URL
  // });
}


/**
 * asyncWrapper turn callback function into Promise
 * @param {*} asycFunc 
 */
function asyncWrapper(asycFunc) {
  return function(arg) {
    return new Promise((resolve, reject) => {
      asycFunc(arg, (e, data) => e? reject(e): resolve(data));
    })
  }
}

function getAccessToken() {
  return authorize().then(validate);
}