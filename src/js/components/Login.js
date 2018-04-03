import React, {Component} from 'react';
import ReactDom from 'react-dom';
import '../../css/Login.css'
class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {doLogin, onType, isLogin} = this.props;
    const {showAll} = styles;
    return (
      <div style={showAll}>
        {!isLogin&&<div id="company_ico"></div>}
        {!isLogin&&<span style={{marginBottom:'1em', fontWeight:'bold', fontSize:'1.5em'}}>CoolWallet</span>}
        {!isLogin&&<input type="password" onChange={onType} placeholder={'enter password'}/>}
        <button onClick={doLogin}>{!isLogin?'login':'logout'}</button>
      </div>
    )
  }
}

const styles = {
  showAll: {
    display:"flex", 
    justifyContent:"center", 
    alignItems:"center",
    flexDirection:"column", 
    height:"600px"
  }
}

export default Login;