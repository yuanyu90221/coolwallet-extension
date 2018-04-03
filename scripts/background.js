// loading first log
console.log("background script is loading");
console.log("second line");


function onError(error) {
  console.error(`Error: ${error}`);
}

const notifications = asyncWrapper(chrome.notifications.create);
function notifyUser(user) {
  // chrome.notifications.create({
  //   "type": "basic",
  //   "title": "Google info",
  //   "message": `Hi ${user.name}`
  // })
  // browser.notifications.create({
  //   "type": "basic",
  //   "title": "Google info",
  //   "message": `Hi ${user.name}`
  // });
  notifications({
    "type": "basic",
    "title": "Google info",
    "message": `Hi ${user.name}` 
  }).then(() => {
    return {'test':'finish'};
  })

}

function logError(error) {
  console.error(`Error: ${error}`);
}

const onMessageHdr = (req,sender, sendResponse)=>{
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
};

// browser.runtime.onMessage.addListener(onMessageHdr);

chrome.runtime.onMessage.addListener(onMessageHdr);