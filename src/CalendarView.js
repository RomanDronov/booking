import React from 'react';
import './CalendarView.css';
function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function firstDay(month, year) {
    return new Date(year, month, 1).getDay();
}

class CalendarView extends React.Component {
    constructor(props) {
        super(props);
        this.dateArray = CalendarView.setCurrentDate();
        this.getDate=this.props.getdate;
        //this.today = new Date();
        //this.currentMonth = this.today.getMonth();
        // this.currentYear = this.today.getFullYear();
        //this.daysCount = daysInMonth(this.currentMonth + 1, this.currentYear);
        //this.daysCount=new Date(this.currentYear, this.currentMonth, 0).getDate();
        console.log("dayCount" + this.daysCount);
        console.log("------------------------------------");
        this.stateHistory=[];
        this.state = {
            color: [{
                array: Array(daysInMonth(this.dateArray[0].getMonth() + 1, this.dateArray[0].getFullYear())).fill("white"),
                month: this.dateArray[0].getMonth(),
                colorText: Array(daysInMonth(this.dateArray[0].getMonth() + 1, this.dateArray[0].getFullYear())).fill("black"),
            }
                , {
                    array: Array(daysInMonth(this.dateArray[1].getMonth() + 1, this.dateArray[1].getFullYear())).fill("white"),
                    month: this.dateArray[1].getMonth(),
                    colorText: Array(daysInMonth(this.dateArray[1].getMonth() + 1, this.dateArray[1].getFullYear())).fill("black")
                }],
            previousButton:true,
        };
        this.dateRange = [];
        this.dateRangeHover = [];
        console.log(this.state.color);
    }
    changeCurrentDateBackward(){
        let dates = this.dateArray.slice();
        for (let i = 0; i < dates.length; i++) {
            dates[i].setMonth(this.dateArray[i].getMonth() -1);
        }
        this.dateArray = dates;
        console.log(this.dateArray);
        //DELETE IF WORKS
        /* let color = [{
             array: Array(daysInMonth(this.dateArray[0].getMonth() + 1, this.dateArray[0].getFullYear())).fill("white"),
             month: this.dateArray[0].getMonth(),
             colorText: Array(daysInMonth(this.dateArray[0].getMonth() + 1, this.dateArray[0].getFullYear())).fill("black"),
         }
             , {
                 array: Array(daysInMonth(this.dateArray[1].getMonth() + 1, this.dateArray[1].getFullYear())).fill("white"),
                 month: this.dateArray[1].getMonth(),
                 colorText: Array(daysInMonth(this.dateArray[1].getMonth() + 1, this.dateArray[1].getFullYear())).fill("black")
             }];*/
        let color=[this.IsSimilarMonth(this.dateArray[0]),this.IsSimilarMonth(this.dateArray[1])];
        console.log(color);
        this.setState({color: []});
        this.setState({color: color});
        setTimeout(() => console.log(this.state.color), 10000);
    }
    changeCurrentDateForward() {
        let currentDate=new Date();
        let dates = this.dateArray.slice();
        for (let i = 0; i < dates.length; i++) {
            dates[i].setMonth(this.dateArray[i].getMonth() + 1);
        }
        this.dateArray = dates;
        console.log(this.dateArray);
        //DELETE IF WORKS
        /* let color = [{
             array: Array(daysInMonth(this.dateArray[0].getMonth() + 1, this.dateArray[0].getFullYear())).fill("white"),
             month: this.dateArray[0].getMonth(),
             colorText: Array(daysInMonth(this.dateArray[0].getMonth() + 1, this.dateArray[0].getFullYear())).fill("black"),
         }
             , {
                 array: Array(daysInMonth(this.dateArray[1].getMonth() + 1, this.dateArray[1].getFullYear())).fill("white"),
                 month: this.dateArray[1].getMonth(),
                 colorText: Array(daysInMonth(this.dateArray[1].getMonth() + 1, this.dateArray[1].getFullYear())).fill("black")
             }];*/
        //isSimilarMonth also changes previous button state
        let color=[this.IsSimilarMonth(this.dateArray[0]),this.IsSimilarMonth(this.dateArray[1])];
        console.log(color);
        this.setState({color: []});
        this.setState({color: color});
        this.setState({previousButton:false});
        setTimeout(() => console.log(this.state.color), 10000);
    }
    IsSimilarMonth(date){
        let currentDate=new Date();
        for(let i=0;i<this.stateHistory.length;i++){
            if(this.stateHistory[i].month===date.getMonth()){
                var SavedState={
                    array:this.stateHistory[i].array,
                    month:date.getMonth(),
                    colorText:this.stateHistory[i].colorText,
                };
            }
        }
        let finalState=SavedState||{
            array: Array(daysInMonth( date.getMonth()+ 1, date.getFullYear())).fill("white"),
            month: date.getMonth(),
            colorText: Array(daysInMonth(date.getMonth() + 1, date.getFullYear())).fill("black"),
        };
        console.log("ISSIMILARMONTH");
        console.log(finalState);
        if(currentDate.getMonth()===date.getMonth()){
            this.setState({previousButton:true});
        }
        return finalState;
    }

    static setCurrentDate() {
        console.log("setCurrentDate");
        let dates = [];
        let date = new Date();
        dates.push(new Date());
        console.log(dates[0]);
        let date2 = new Date();
        date2.setMonth(date.getMonth() + 1);
        dates.push(date2);
        let date3 = new Date();
        date3.setMonth(date2.getMonth() + 1);
        dates.push(date3);
        return dates;
    }
//month----full date object
    getIDClick(i, j) {
        console.log("----------getIDClick");
        this.month = j.getMonth();
        this.year=j.getFullYear();
        console.log("i");
        console.log(i);
        console.log("j");
        console.log(j);
        this.dateRange.push({date: i, month: j,});
        this.dateRangeHover.push({date: i, month: j,});
        console.log(this.dateRange);
        let rangeLength = 0;
        // for (let key in this.dateRange) {
        //     rangeLength++;
        // }
        rangeLength += this.dateRange.length;
        console.log("rangeLength " + rangeLength);
        for (let a = 0; a < this.state.color.length; a++) {
            if (this.month === this.state.color[a].month) {
                if (rangeLength === 1) {

                    console.log("---------init111111");
                    let colorCopy = this.state.color;
                    let textColorChange = Array(daysInMonth(this.dateArray[a + 1].getMonth() + 1, this.dateArray[a + 1].getFullYear())).fill("black");
                    textColorChange[i] = "white";
                    let colorOne = Array(daysInMonth(this.dateArray[a + 1].getMonth() + 1, this.dateArray[a + 1].getFullYear())).fill("white");
                    colorOne[i] = "#8B0000";
                    colorCopy[a].array = colorOne;
                    colorCopy[a].colorText = textColorChange;
                    if (a === 0) {
                        colorCopy[a + 1].array = Array(daysInMonth(this.dateArray[a + 2].getMonth() + 1, this.dateArray[a + 2].getFullYear())).fill("white");
                        colorCopy[a + 1].colorText = Array(daysInMonth(this.dateArray[a + 2].getMonth() + 1, this.dateArray[a + 2].getFullYear())).fill("black");
                    } else {
                        colorCopy[a - 1].array = Array(daysInMonth(this.dateArray[a].getMonth() + 1, this.dateArray[a].getFullYear())).fill("white");
                        colorCopy[a - 1].colorText = Array(daysInMonth(this.dateArray[a].getMonth() + 1, this.dateArray[a].getFullYear())).fill("black");
                    }
                    console.log("colorCopy");
                    console.log(colorCopy);
                    this.setState({
                        color: colorCopy,
                    })

                }

                if (rangeLength === 2) {
                    console.log("---------init");
                    console.log(this.month);
                    let textColorChange = this.state.color[a].colorText.slice();
                    console.log(textColorChange);
                    textColorChange[i] = "white";
                    console.log(textColorChange);
                    console.log("longdateRange " + this.dateRange.length);
                    let colorCopy = this.state.color;
                    colorCopy[a].colorText = textColorChange;
                    this.setState({
                        color: colorCopy,
                    });
                    console.log(this.state.color);
                    this.highlightPeriod(this.dateRange, true);
                    this.getDate(this.dateRange);
                    this.dateRange = [];
                    this.dateRangeHover = [];
                }
            }
            //
        }

    }

    getIDMouseEnter(i, j) {
        if (this.dateRange.length === 1) {
            console.log("MOUSEENTER");
            this.dateRange[1] = {date: i, month: j};
            this.highlightPeriod(this.dateRange);
            this.dateRange = this.dateRange.splice(0, 1);

            console.log("array size " + this.dateRange.length);
            console.log(this.dateRange[0]);
        }
    }

    //dateRange.push({date:x,month:Date})
    highlightPeriod(range, date2) {
        console.log(range);
        let colorCopy = this.state.color;
        console.log("HP");
        console.log(range[0].date);
        if (range[0].month.getMonth() === range[1].month.getMonth()) {
            let colorLocal = Array(daysInMonth(range[0].month.getMonth() + 1, range[0].month.getFullYear())).fill("white");
            colorLocal[range[0].date] = "#8B0000";
            for (let i = range[0].date + 1; i <= range[1].date; i++) {
                colorLocal[i] = "#ededed";
            }
            if (date2 === true) {
                console.log("if2");
                console.log(range[1].date);
                colorLocal[range[1].date] = "#8B0000";
            }
            for (let a = 0; a < this.state.color.length; a++) {
                if (range[0].month.getMonth() === this.state.color[a].month) {
                    console.log("a " + a);
                    console.log(colorCopy);
                    colorCopy[a].array = colorLocal;
                    if (a === 0) {
                        colorCopy[a + 1].array = Array(daysInMonth(range[a + 1].month.getMonth() + 1, range[a + 1].month.getFullYear())).fill("white");
                    }
                    if (a === 1) {
                        colorCopy[a - 1].array = Array(daysInMonth(range[a - 1].month.getMonth() + 1, range[a - 1].month.getFullYear())).fill("white");
                    }
                }
            }
            console.log("colorLocal");
            console.log(colorCopy);
            this.setState({
                color: colorCopy,
            });
            this.stateHistory=colorCopy.slice();
            console.log(this.state.color);
        }
        if (range[0].month.getMonth() !== range[1].month.getMonth()) {
            console.log("---------2!=");
            let colorLocal = [];
            colorLocal.push(Array(daysInMonth(range[0].month.getMonth() + 1, range[0].month.getFullYear())).fill("white"));
            colorLocal.push(Array(daysInMonth(range[1].month.getMonth() + 1, range[1].month.getFullYear())).fill("white"));
            for (let a = 0; a < this.state.color.length; a++) {
                if (range[a].month.getMonth() === this.state.color[a].month) {
                    if (a === 0) {
                        colorLocal[a][range[a].date] = "#8B0000";
                        for (let i = range[a].date + 1; i <= daysInMonth(range[a].month.getMonth() + 1, range[a].month.getFullYear()); i++) {
                            console.log(colorLocal[a].length);
                            console.log("--------1");
                            colorLocal[a][i] = "#ededed";
                        }
                        console.log("colorLocal if1-0");
                        console.log(colorLocal);
                    }
                    if (a === 1) {
                        for (let i = 0; i <= range[a].date; i++) {
                            console.log("--------2");
                            colorLocal[a][i] = "#ededed";
                        }
                        console.log("colorLocal if1-1");
                        console.log(colorLocal);
                    }
                    if (date2 === true) {
                        console.log("if2-2");
                        console.log("date2" + date2);
                        console.log(range[1].date);
                        console.log("a " + a);
                        colorLocal[1][range[1].date] = "#8B0000";
                    }
                    let colorCopy = this.state.color;
                    colorCopy[0].array = colorLocal[0];
                    colorCopy[1].array = colorLocal[1];
                    this.setState({
                        color: colorCopy,
                    });

                }
                console.log(colorLocal);
            }
        }


    }

    render() {
        console.log("CalendarRender");
        console.log(this.dateArray);
        let options={month:'long',};
        return (
            <div>
                <button onClick={()=>this.changeCurrentDateBackward()} disabled={this.state.previousButton}>Previous</button>
                <button onClick={() => this.changeCurrentDateForward()}>Next</button>
                <div className={"Calendar"}>  <div>{this.dateArray[0].toLocaleString('default', options)}</div>
                    <Calendar color={this.state.color[0]} date={this.dateArray[0]}
                              getIDClick={(i, j) => this.getIDClick(i, j)}
                              getIDMouseEnter={(i, j) => this.getIDMouseEnter(i, j)}/></div>
                <div className={"Calendar"}><div>{this.dateArray[1].toLocaleString('default', options)}</div>
                    <Calendar color={this.state.color[1]} date={this.dateArray[1]}
                              getIDClick={(i, j) => this.getIDClick(i, j)}
                              getIDMouseEnter={(i, j) => this.getIDMouseEnter(i, j)}/></div>
            </div>
        )
    }
}


class Calendar extends React.Component {
    constructor(props) {
        //constructor is not running when redeclaring props
        super(props);
        /*this.currentDate = this.props.date;
        console.log("CALENDARCONSTRUCTOR");
        console.log(this.currentDate);
        this.currentDay = this.currentDate.getDate();
        this.currentMonth = this.currentDate.getMonth();
        this.currentYear = this.currentDate.getFullYear();
        this.getIDClick = this.props.getIDClick;
        this.getIDMouseEnter = this.props.getIDMouseEnter;
        //should be change for ur dates
        this.daysCount = daysInMonth(this.currentMonth + 1, this.currentYear);
        //should be change for ur dates
        this.firstDate = firstDay(this.currentMonth, this.currentYear);
        this.dateRange = [];
        this.dateRangeHover = [];*/
    }

    toggleHighLightPeriod() {
        this.setState({
            color: Array(this.daysCount).fill("white"),
        })
    }
    isWekeend(year,month,day){
        let date=new Date(year,month,day);
        let weekDay=date.getDay();
        let isweekend=(weekDay===5)||(weekDay===6);

        return isweekend;
    }

    renderDay() {
        this.currentDate = this.props.date;
        console.log("CALENDARCONSTRUCTOR");
        console.log(this.currentDate);
        this.currentDay = this.currentDate.getDate();
        this.currentMonth = this.currentDate.getMonth();
        this.currentYear = this.currentDate.getFullYear();
        this.getIDClick = this.props.getIDClick;
        this.getIDMouseEnter = this.props.getIDMouseEnter;
        //should be change for ur dates
        this.daysCount = daysInMonth(this.currentMonth + 1, this.currentYear);
        //should be change for ur dates
        this.firstDate = firstDay(this.currentMonth, this.currentYear);
        const calendar = [];
        console.log("renderDay");
        console.log(this.currentMonth);
        //should be change for ur dates
        let pastDate = new Date(this.currentYear, this.currentMonth, 0).getDate() - this.firstDate;
        for (let i = 0; i < this.firstDate; i++) {
            calendar.push(<Day day={pastDate}/>);
            console.log(pastDate);
            pastDate++;
        }
        for (let j = 0; j < (this.daysCount); j++) {
            let textColor;
            let weekend=this.isWekeend(this.currentYear,this.currentMonth,j);
            if((weekend===true)&&(this.props.color.array[j]==="white")){
                textColor="red";
                console.log("It's a weekend");
            }
            else{
                textColor=this.props.color.colorText[j];
            }
            calendar.push(<Day day={j} color={this.props.color.array[j]} textColor={textColor}
                               onclk={() => this.getIDClick(j, this.currentDate)}
                               onenter={() => this.getIDMouseEnter(j, this.currentDate)}/>);
        }
        return (<div className="calendarRow">{calendar}</div>);
    }

    render() {
        return (
            <div>
                {this.renderDay()}
            </div>
        )
    }
}

class Day extends React.Component {
    constructor(props) {
        super(props);
        /*this.date = (props.day + 1) || 3;
        this.price = 4;*/
    }

    render() {
        this.date = (this.props.day + 1) || 3;
        this.price = 4;
        console.log("Day");
        console.log(this.date);
        return (
            <button onClick={this.props.onclk} id={this.date}
                    style={{backgroundColor: this.props.color, color: this.props.textColor}}
                    onMouseEnter={this.props.onenter} onMouseLeave={this.props.onleave}>
                <div>{this.date}</div>
                <div>{this.price}</div>
            </button>
        );
    }
}
export default CalendarView;
