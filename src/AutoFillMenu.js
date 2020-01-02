import React from 'react';
import AutoFillStr from "./AutoFillStr";
import "./AutoFillMenu.css";

class AutoFillMenu extends React.Component{
    render() {
        let cities=this.props.cities;
        let citiesArray=[];
        let length=(cities.length<50)?cities.length:50;
        for(let i=0;i<length;i++){
            citiesArray.push(<AutoFillStr city={cities[i]} autoFillOnClick={()=>this.props.autoFillOnClick(cities[i].city,cities[i].iata)}/>);
        }
        return(<div className={"window"}>{citiesArray}</div>);
    }
}
export default AutoFillMenu;