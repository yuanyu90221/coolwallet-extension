import React, {Component} from 'react';
import ReactDom from 'react-dom';
// for QRcode Show
import QRcode from './components/QRcode';
// for login Component
import Login from './components/Login';

// 主要的app邏輯
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      provider: null,
      web3: undefined,
      isLogin: false,
      passwd:null
    }
  }

  componentDidMount() {
    //setup web3
    console.log('initialize web3');
    let {web3} = this.state;
    let me = this;
    if (typeof web3 !== 'undefined') {
      // App.provider = web3.currentProvider;
      this.setState({provider: web3.currentProvider});
    } else {
      // App.provider = new Web3.providers.HttpProvider('http://10.0.0.123:8540');
      console.log(Web3);
      const provider = new Web3.providers.HttpProvider('http://10.0.0.123:8540');
      let web3 = new Web3(provider);
      console.log('else loop')
      console.log(provider);
      this.setState({ web3,provider:provider});
    }
    
  }
  componentWillMount() {
    // set up localStorage
    browser.storage.local.get().then(results => {
      console.log( `storage content`,results);
      if(results.isLogin===undefined) {
        console.log(`set isLogin`)
        browser.storage.local.set({isLogin:false}).then(()=>{
          console.log(`test`);
        });      
      }
      else {
        console.log(results.isLogin);
        this.setState({isLogin: results.isLogin});
      }
    })
  }
  loadAccounts() {
    let {web3} = this.state;
    let me = this;
    if (web3) {
      web3.eth.getAccounts(function(err, accounts) {
        if (err) {
          console.log(`some err:`)
          console.error(err);
        }
        console.log(accounts);
        me.setState({accounts});
      })
    }
  }
  
  handleResponse(message) {
    // console.log(this.state);
    this.setState({isLogin: true});
    console.log(`handle messsage end`);
    browser.storage.local.set({isLogin:true}).then(() => {
      console.log(`final setup`);
    });
    // console.log(`Message from the background script:  ${message.response}`);
    
  }
  
  handleError(error) {
    console.log(`Error: ${error}`);
  }
  
  doLogin() {
    const {passwd, isLogin} = this.state;
    const me = this;
    const sendMessage = asyncWrapper(chrome.runtime.sendMessage);
    if(!isLogin) {    
      sendMessage({
        action:'do-auth'
      }).then(me.handleResponse.bind(me),me.handleError);
    } else {
      browser.storage.local.set({isLogin:false});
      me.setState({isLogin:false});
    }
  }

  onType(evt) {
    // console.log(evt.target.value);
    this.setState({passwd:evt.target.value});
  }
  renderAccounts() {
    let {accounts} = this.state;
    return accounts.map((account,index) => {
      return (
        <QRcode id={'canvas'+index} key={index} text={account}/>
      );
    });
  }
  render() {
    let {accounts, isLogin} = this.state;
    let text = isLogin? 'logout':'login';
    return (
      <div>
        {isLogin&&<button onClick={this.loadAccounts.bind(this)}>Load accounts</button>}
        {isLogin&&this.renderAccounts()}
        {<Login doLogin={this.doLogin.bind(this)} onType={this.onType.bind(this)} isLogin={isLogin}/>}
      </div>
    )
  }
}
 
ReactDom.render(<App/>, document.getElementById('app'));

