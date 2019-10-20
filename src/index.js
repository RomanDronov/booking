import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//import App from './App';

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
        //this.today = new Date();
        //this.currentMonth = this.today.getMonth();
        // this.currentYear = this.today.getFullYear();
        //this.daysCount = daysInMonth(this.currentMonth + 1, this.currentYear);
        //this.daysCount=new Date(this.currentYear, this.currentMonth, 0).getDate();
        console.log("dayCount" + this.daysCount);
        console.log("------------------------------------");
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
        };
        this.dateRange = [];
        this.dateRangeHover = [];
        console.log(this.state.color);
    }

    changeCurrentDate() {
        let dates = this.dateArray.slice();
        for (let i = 0; i < dates.length; i++) {
            dates[i].setMonth(this.dateArray[i].getMonth() + 1);
        }
        this.dateArray = dates;
        console.log(this.dateArray);
        let color = [{
            array: Array(daysInMonth(this.dateArray[0].getMonth() + 1, this.dateArray[0].getFullYear())).fill("white"),
            month: this.dateArray[0].getMonth(),
            colorText: Array(daysInMonth(this.dateArray[0].getMonth() + 1, this.dateArray[0].getFullYear())).fill("black"),
        }
            , {
                array: Array(daysInMonth(this.dateArray[1].getMonth() + 1, this.dateArray[1].getFullYear())).fill("white"),
                month: this.dateArray[1].getMonth(),
                colorText: Array(daysInMonth(this.dateArray[1].getMonth() + 1, this.dateArray[1].getFullYear())).fill("black")
            }];
        console.log(color);
        this.setState({color: []});
        this.setState({color: color});
        setTimeout(() => console.log(this.state.color), 10000);
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

    getIDClick(i, j) {
        console.log("----------getIDClick");
        this.month = j.getMonth();
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
                        colorLocal[1][range[1].date] = "#232d8b";
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
        return (
            <div>
                <button onClick={() => this.changeCurrentDate()}>Next</button>
                <Calendar color={this.state.color[0]} date={this.dateArray[0]}
                          getIDClick={(i, j) => this.getIDClick(i, j)}
                          getIDMouseEnter={(i, j) => this.getIDMouseEnter(i, j)}/>
                <Calendar color={this.state.color[1]} date={this.dateArray[1]}
                          getIDClick={(i, j) => this.getIDClick(i, j)}
                          getIDMouseEnter={(i, j) => this.getIDMouseEnter(i, j)}/>
            </div>
        )
    }
}


class Calendar extends React.Component {
    constructor(props) {
        //constructor is not running when redeclaring props
        super(props);
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
        this.dateRange = [];
        this.dateRangeHover = [];
    }

    toggleHighLightPeriod() {
        this.setState({
            color: Array(this.daysCount).fill("white"),
        })
    }

    renderDay() {
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
            calendar.push(<Day day={j} color={this.props.color.array[j]} textColor={this.props.color.colorText[j]}
                               onclk={() => this.getIDClick(j, this.currentDate)}
                               onenter={() => this.getIDMouseEnter(j, this.currentDate)}/>);
        }
        return (<div className="calendarRow">{calendar}</div>);
    }

    render() {
        console.log("calendar");
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
        this.date = (props.day + 1) || 3;
        this.price = 4;
    }

    render() {
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

ReactDOM.render(<CalendarView/>, document.getElementById('root'));




