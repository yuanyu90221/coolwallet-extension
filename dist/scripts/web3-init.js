App = {
  web3Provider: null,
  contracts: {},
  initWeb3 :function() {
    console.log(Web3)
    console.log(typeof web3)
    if (typeof web3 !== 'undefined') {
      console.log(web3.currentProvider);
      App.web3Provider = web3.currentProvider;
    } else {
      App.web3Provider = new Web3.providers.HttpProvider('http://10.0.0.123:8540');
    }
    web3 = new Web3(App.web3Provider);
  },
  getAccounts: function() {
    if (web3) {
      web3.eth.getAccounts(function(err, accounts) {
        if (err) {
          console.error(err);
        }
        let accountsDiv = document.getElementById('accounts');
        console.log(accounts);
        if ( accountsDiv.childElementCount!== 0) {
          accountsDiv.removeChild(accountsDiv.childNodes);
        }
        if (accounts) {
          accounts.forEach((account, index) => {
            let accDOM = document.createElement("div");
            accDOM.innerText = account;
            accDOM.style = 'font-weight:bold;cursor:pointer;';
            accDOM.addEventListener('click',(event)=> {
              showTextIntoQRcode(document.getElementById('canvas'), account);
            });
            accountsDiv.appendChild(accDOM);
          })
        }
      })
    }
  }
}
App.initWeb3();
document.getElementById('btnShowAccts').addEventListener('click', function(event) {
  App.getAccounts();
})