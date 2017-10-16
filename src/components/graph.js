import React, { Component } from 'react';
import PropTypes from 'prop-types';

import WeekGraphBar from './week_graph_bar';
import DayGraphBar from './day_graph_bar';
import GraphScale from './graph_scale';

let containerHeight = window.innerHeight;

class Graph extends Component{


 	// ({todayDataSet, weekDataSet}) => {
 	constructor(props) {
 		super(props);
 		this.state = {};
 	}


 	//Iterates through input set and determines the max withdrawal and deposit amounts
 	findMax(set: []){
		let maxWithdrawal=0;
		let maxDeposit=0;
		
		set.map( (val) => {

			if(val.diff<0)
				maxWithdrawal = (val.diff<maxWithdrawal) ? val.diff : maxWithdrawal;
			else
				maxDeposit = (val.diff>maxDeposit) ? val.diff : maxDeposit;

		});

		return (Math.abs(maxWithdrawal) > Math.abs(maxDeposit)) ? Math.abs(maxWithdrawal) : Math.abs(maxDeposit);
	}


	//takes dollar amount (string) and outputs an object {withdrawal, deposit}
	getDiff(transaction){
		let withdep = this.getFloat(transaction);
		return withdep.deposit-withdep.withdrawal;
	}


	getFloat(val){

		let pattern=/[0-9]*\.[0-9]*/;
		let withdrawal = pattern.exec(val.withdrawal);	
		let deposit = pattern.exec(val.deposit);

		if(!withdrawal)
			withdrawal=0
		if(!deposit)
			deposit=0	
		
		return {'withdrawal': withdrawal, "deposit": deposit};
	}


	//create an object with the amount earned/spent per day
	generateWeekArray(weekDataSet){

		let prevDate='', weekArray=[], diff=0, currentDate	;

		weekDataSet.map( (data, index) => {
			if(index==0){
				currentDate=data.date;
				diff=this.getDiff(data);
			}
			else if(data.date==currentDate)
				diff+=this.getDiff(data);
			else{
				weekArray.push({date: currentDate, diff: diff});
				currentDate=data.date;
				diff=this.getDiff(data);
			}
		});

		return weekArray;

	}


	generateDayArray(dayDataSet){
		return {date: dayDataSet.date, diff: this.getDiff(dayDataSet)}
	}


	generateYesterdayArray(YesterdayDataSet){
		return {date: YesterdayDataSet.date, diff: this.getDiff(YesterdayDataSet)}
	}


	//returns the height of a bar element according to its dollar amount relative to the greatest dollar amount in the data set
	calcHeight(diff, maxVal, maxHeight){
		return Math.abs(maxHeight*0.75*diff/maxVal);
	}


 	render(){
 		console.log(this.props)
 		//Empty state until data is fetched
 		if(this.props.weekDataSet.length==0 || this.props.todayDataSet.length==0 || this.props.yesterdayDataSet.length==0){
			return <p>Loading...</p>;
		} else {

			//Get height of each cell in the graph grid
			let maxHeight = containerHeight*0.85;
			let maxVal=0;
			let weekArray = this.generateWeekArray(this.props.weekDataSet);
			let dayArray = this.generateDayArray(this.props.todayDataSet);
			let yesterdayArray = this.generateYesterdayArray(this.props.yesterdayDataSet);
			let weekMax = this.findMax(weekArray);
			let barId=0;

			let dayMax = (Math.abs(dayArray.diff) > Math.abs(yesterdayArray.diff))? Math.abs(dayArray.diff) : Math.abs(yesterdayArray.diff);
			let dayHeight = this.calcHeight(dayArray.diff, dayMax, maxHeight);
			let yesterdayHeight = this.calcHeight(yesterdayArray.diff, dayMax, maxHeight);

			let gridSize=Math.ceil(maxHeight/10);

			if(this.props.status=="day")
				maxVal=dayMax;
			else
				maxVal=weekMax;

			return([
					<GraphScale gridSize={gridSize} maxVal={maxVal}/>,
					<div className="graph" style={{"height": maxHeight+'px', "border": 
							"solid 2px", "display":"flex", "alignItems":"flex-end", "justifyContent":"space-around", "backgroundSize": gridSize +'px '+ gridSize + 'px'}}>
					{
						this.props.status=="week" ?
							(

								weekArray.map( (val) =>{
									barId++;
									let height=this.calcHeight(val.diff, weekMax, maxHeight);

									return (
										<div key={barId} className="bar-container">
											<WeekGraphBar barId={barId} height={height} weekDay={val}/>
										</div>
									)
								})
							) : (

								<DayGraphBar key="tyBar" tHeight={dayHeight} yHeight={yesterdayHeight} today={dayArray} yesterday={yesterdayArray} maxVal={dayMax}/>
							
							)
					}
					</div>
			])
		}
 	}
}


Graph.propTypes = {
	todayDataSet: PropTypes.object.isRequired,
	weekDataSet: PropTypes.array.isRequired,
	max: PropTypes.string.isRequired
}


export default Graph;