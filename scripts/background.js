// loading first log
console.log("background script is loading");
console.log("second line");

function onError(error) {
  console.error(`Error: ${error}`);
}
function notifyUser(user) {
  browser.notifications.create({
    "type": "basic",
    "title": "Google info",
    "message": `Hi ${user.name}`
  });}

function logError(error) {
  console.error(`Error: ${error}`);
}

browser.runtime.onMessage.addListener((req,sender, sendResponse)=>{
  // console.log(req);
  console.log("Message from the content script: " +
    req.action);
  getAccessToken()
    .then(getUserInfo)
    .then(notifyUser) 
    .then(()=> {
      sendResponse({response: "Response from background script"});
    })
    .catch(logError)
})