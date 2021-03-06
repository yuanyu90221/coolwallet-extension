import React,{Component} from 'react';

class QRcode extends Component {
  
  constructor(props) {
    super(props);
    let {id} = this.props;
    this.state = {
      id:id,
      isShow: false
    };
  }
  toggleQRcode(text){
    let {id, isShow} = this.state;
    let me = this;
    let target = document.getElementById(id);
    if (isShow) {
      let ctx = target.getContext("2d");
      ctx.clearRect(0, 0, target.width, target.height);
      target.style="height:0;width:0;";
      me.setState({isShow:false});
    }
    else { //show the qrcode
      QRCode.toCanvas(target, text, function(err) {
        if(err) {
          console.error(err);
          return;
        }
        console.log(`success`);
        me.setState({isShow: true});
      })
    }
  }

  render() {
    let {id, text} = this.props;
    let {isShow} = this.state;
    return (
      <div style={{display:'flex', justifyContent:'center', fontSize:'.9em', background: isShow? '#aaaaaa':'#fff'}}>
        <canvas id={id} style={{height:'0px',width:'0px'}} onClick={this.toggleQRcode.bind(this,text)}></canvas>
        {!isShow&&<div onClick={this.toggleQRcode.bind(this,text)}>{text}</div>}
      </div>
    )
  }
}

export default QRcode;

