import React, {Component} from 'react';
import ReactDom from 'react-dom';
// for QRcode Show
import QRcode from './components/QRcode';
// 主要的app邏輯
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      provider: null,
      web3: undefined
    }
  }
  componentDidMount() {
    //setup web3
    console.log('load');
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
  
  render() {
    return (
      <div> 
        <QRcode id={"canvas"} text="test"/>
        <button onClick={this.loadAccounts.bind(this)}>Load accounts</button>
      </div>
    )
  }
}

ReactDom.render(<App/>, document.getElementById('app'));

