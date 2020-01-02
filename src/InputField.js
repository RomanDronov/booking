import React from 'react';
import logo from './logo.svg';
import './InputFiled.css';
import AutoFillMenu from "./AutoFillMenu";

class InputField extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      cities:null,
      isAutofillVisible:false,
    }
  }
  onNewLetter(e){
console.log(e.target.value);
this.getCity(e.target.value);
  }
  getCity(letters) {
this.getRequest(letters).then(response=>{
this.setState({cities:response})
});
  }
 async getRequest(letters){
    try {
      const json = await this.getRequestData('/scripts/airports?str='+letters);
      this.setState({isAutofillVisible:true});
      return json;
    } catch (error) {
      console.error(error);
    }
  }
  async getRequestData(url){
    const response = await fetch(url);
    if(response.ok) {
      console.log("response ok");
      return response.json();
    }
    else{
      alert("Mistake HTTP:"+response.status);
    }
  }
 autoFillOnClick(name,iata){
  this.setState({isAutofillVisible:false});
    document.getElementById("cityInput"+this.props.id).value=name+" "+iata;
    this.props.getCode(iata);
 }
  render() {
    let autofill=null;
    if(!this.state.isAutofillVisible){
      autofill=null;
    }
    if(this.state.cities!=null&&this.state.isAutofillVisible===true){
      autofill= <AutoFillMenu cities={this.state.cities} autoFillOnClick={(a,j)=>{this.autoFillOnClick(a,j)}}/>;
    }
    return(
        <div><input onInput={this.onNewLetter.bind(this)} id={"cityInput"+this.props.id}/>
       <div className={"dropdown"}>{autofill}</div>
        </div>
    );
  }
}

export default InputField;
