import React from "react";
import "./AutoFillStr.css"
class AutoFillStr extends React.Component{
    render() {
        let city=this.props.city.city;
        let airport=this.props.city.name;
        let iata=this.props.city.iata;
        return(<div className={"border"} onClick={this.props.autoFillOnClick}>
            <div>{city}</div>
            <div>{airport}</div>
            <div>{iata}</div>
        </div>);
    }
}
export default AutoFillStr;