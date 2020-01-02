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
//let array=response.slice(0,10);
this.setState({cities:response})
});

  }
  async getRequest(letters){
    try {
      // const json = await this.getRequestData('/scripts?origin='+origin+'&destination='+destination+'&departureDate='+departureDate);
      //const json = await this.getRequestData(urlGET);
      const json=await this.getRequestData('airports.json');
      console.log("json");
      console.log(json.length);
      console.log("-----------------");
      let searchResults=[];
      for(let i in json){
        let lnt=letters.length;
        let objTmp={};
        let jsonCityStr=json[i].city.slice(0,lnt);
        let jsonIATAStr;
        let jsonAirportStr=json[i].name.slice(0,lnt);
        if(json[i].iata!=null) {
         jsonIATAStr = json[i].iata.slice(0, lnt);
        }
        if(letters===jsonCityStr||letters===jsonIATAStr||letters===jsonAirportStr){
          if(json[i].iata!="") {
            objTmp.name=json[i].name;
           objTmp.city=json[i].city;
            objTmp.iata=json[i].iata;
            searchResults.push(objTmp);
          }
        }

      }

      console.log("-----------------");
      if("errors" in json){
        //this.setState({error:true});
        console.log("errorSet");
      }
      else {
       // console.log("dataSet");
       // this.setState({data: true});
      }
      this.setState({isAutofillVisible:true});
      return searchResults;
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
