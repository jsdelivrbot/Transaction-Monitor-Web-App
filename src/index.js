import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Graph from './components/graph';



class GraphContainer extends Component {
	data: Object;
	todayDateStr: String ='';
	startOfWeek: String;
	yesterdayDateStr: String = '';

	constructor(props){
		super(props);
		this.state = { 
			todayTransactions: {},
			weekTransactions: [],
			yesterdayTransactions: {},
			status: 'day'
		};
		
	}


	//fetch json file from local folder
	fetchJSON(){
		fetch('/data/data.json')
			.then( (data) => data.json() )
			.then( (data) => {
				
				this.data = data;
				this.extractJSON();
				return;
			} );
	}

	//extract meaningful data from json file
	extractJSON(){
		let todayTransactions={}, weekTransactions = [], yesterdayTransactions={};
		this.data.map((val,index)=>{

			//create a new array with today's transactions
			if(val.date == this.todayDateStr){
				todayTransactions = val;
			} 

			//create array with yesterday's transactions
			if(val.date == this.yesterdayDateStr){
				yesterdayTransactions = val;
			}

			//create array with this week's transactions
			if(parseInt(val.date) <= parseInt(this.endOfWeek) && parseInt(val.date)>=parseInt(this.startOfWeek) ){
				weekTransactions.push(val);
			}
			
		});
		
		this.setState({
			todayTransactions: todayTransactions,
			weekTransactions: weekTransactions,
			yesterdayTransactions: yesterdayTransactions,
 			status: 'day'
		});
	}

	//strigifies today's date and the beginning and end of the week to form "mmddyyyy"
	getDateStr(){
		var today = new Date;
		var yesterday = new Date(Date.now() - 24*60*60*1000);
		
		this.yesterdayDateStr = ""+ ('0'+(yesterday.getMonth()+1)).slice(-2)+ ('0'+(yesterday.getDate())).slice(-2)+(yesterday.getYear()+1900);
		this.todayDateStr = ""+ ('0'+(today.getMonth()+1)).slice(-2)+ ('0'+(today.getDate())).slice(-2)+(today.getYear()+1900);
		
		var firstday = new Date(today.setDate(today.getDate() - today.getDay()));
		var lastday = new Date(today.setDate(today.getDate() - today.getDay()+6));
	
		this.startOfWeek = ""+ ('0'+(firstday.getMonth()+1)).slice(-2) + ('0'+(firstday.getDate())).slice(-2) +(firstday.getYear()+1900);
		this.endOfWeek = ""+ ('0'+(lastday.getMonth()+1)).slice(-2) + ('0'+(lastday.getDate())).slice(-2) +(lastday.getYear()+1900);
	}

	componentWillMount(){
		this.getDateStr();
		this.fetchJSON();
	}


	render(){
		return(
			//pass an array of today's transactions objects
			<div className="graph-container">
				<Graph status={this.state.status} todayDataSet={this.state.todayTransactions} yesterdayDataSet={this.state.yesterdayTransactions} weekDataSet={this.state.weekTransactions} max='2'/>
				<div className="graph-button-container">
					<button 
						className={"btn btn-sm " + (this.state.status=="day"? "btn-primary": "btn-default")} 
						onClick={() => this.setState({'status':'day'})}
					>
						Day
					</button>
					<button 
						className={"btn btn-sm " + (this.state.status=="week"? "btn-primary": "btn-default")} 
						onClick={() => this.setState({'status':'week'})}
					>
						Week
					</button>
				</div>
			</div>
		);
	}

	
}

ReactDOM.render(<GraphContainer />, document.querySelector('.container'));