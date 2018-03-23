import React, {Component} from 'react';
import ReactDom from 'react-dom';

class Login extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let {doLogin, onType} = this.props;
    return (
      <div style={{display:"flex", justifyContent:"center", alignItems:"center",flexDirection:"column", height:"600px"}}>
        <div id="company_ico"></div>
        <input type="password" onChange={onType}/>
        <button onClick={doLogin}>login</button>
      </div>
    )
  }
}

export default Login;