import React, { Component } from 'react';


class DayGraphBar extends Component {

	constructor(props) {
		super(props);
		this.props = props;
	}

	render(){

		return [
			<div key="today">
				<p>Today - {this.props.today.diff }</p>
				<div 
					style={{'height': 0+'px'}}
					ref={x => this.tBar = x}
					id="tDayBar"
					className={"bar " + (this.props.today.diff > 0 ? 'netGain' : 'netLoss')}>
				</div>
			</div>,
			<div key="yesterday">
				<p>Yesterday - {this.props.yesterday.diff }</p>
				<div 
					style={{'height': 0+'px'}}
					ref={x => this.yBar = x}
					id="yDayBar"
					className={"bar " + (this.props.yesterday.diff > 0 ? 'netGain' : 'netLoss')}>
				</div>
			</div>
		]
	}

	componentDidMount() {

		//Add height property to trigger transition animation
		const self = this;
		window.setTimeout(function(){
			self.tBar.style.height = `${self.props.tHeight}px`;
			self.yBar.style.height = `${self.props.yHeight}px`;	
		}, 100);

	}
}

export default DayGraphBar