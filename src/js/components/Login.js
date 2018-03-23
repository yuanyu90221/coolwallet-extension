import React, {Component} from 'react';
import ReactDom from 'react-dom';
import '../../css/Login.css'
class Login extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  render() {
    let {doLogin, onType} = this.props;
    return (
      <div style={{display:"flex", justifyContent:"center", alignItems:"center",flexDirection:"column", height:"600px"}}>
        <div id="company_ico"></div>
        <span style={{marginBottom:'1em', fontWeight:'bold', fontSize:'1.5em'}}>CoolWallet</span>
        <input type="password" onChange={onType} placeholder={'enter password'}/>
        <button onClick={doLogin}>login</button>
      </div>
    )
  }
}

export default Login;