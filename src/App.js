import React from 'react';
import './App.css';
import CalendarView from './CalendarView';

class App extends React.Component{
  constructor(props){
    super(props);
    this.departureDate=new Date();
    this.returnDate=new Date();

  }
  getDate(dateArray){

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
    let originValue=document.getElementById("origin").value;
    let destinationValue=document.getElementById("destination").value;
    emitSearch(originValue,destinationValue,this.departureDate);

  }
  render() {
    return(<div>
      <input id={"origin"}/>
      <input id={"destination"}/>
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
    console.log("-------------RESPOND--------------")
    console.log(xhr.responseText);
    alert("check!");
  };
  xhr.send()
}
export default App;
