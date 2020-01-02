import React from 'react';
import './App.css';
import CalendarView from './CalendarView';
import InputField from './InputField';

class App extends React.Component{
  constructor(props){
    super(props);
    this.departureDate=new Date();
    this.returnDate=new Date();
    this.departure=null;
    this.destination=null;

  }
  getDate(dateArray){
console.log("getDate");
console.log(dateArray);
    this.departureDate={
      day:dateArray[0].date+1,
      month:dateArray[0].month.getMonth()+1,
    year:dateArray[0].month.getFullYear(),
    toString() {
        return this.year+"-"+this.month+"-"+this.day;
    }};
    this.returnDate={day:dateArray[1].date,
      month:dateArray[1].month.getMonth(),
      year:dateArray[1].month.getFullYear()};

}
  searchButtonClicked(){
    //let originValue=document.getElementById("origin").value;
    //let destinationValue=document.getElementById("destination").value;
    let originValue=this.departure;
    let destinationValue=this.destination;
    emitSearch(originValue,destinationValue,this.departureDate);
  }
  setOrigin(iata){
    this.departure=iata;
  }
  setDestination(iata){
    this.destination=iata;
  }
  render() {
    return(<div>
      <InputField id={"1"} getCode={(i)=>this.setOrigin(i)}/>
      <InputField id={"2"} getCode={(i)=>this.setDestination(i)}/>
      <CalendarView getdate={(a)=>this.getDate(a)}/>
      <button onClick={()=>this.searchButtonClicked()}></button>
    </div>);
  }
}
function emitSearch(origin,destination,departureDate) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', '/scripts?origin='+origin+'&destination='+destination+'&departureDate='+departureDate.toString());
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
  //  console.log("-------------RESPOND--------------")
  //  console.log(xhr.responseText);
    alert("check!");
  };
  xhr.send()
}
//<input id={"origin"}/>
//<input id={"destination"}/>
export default App;
