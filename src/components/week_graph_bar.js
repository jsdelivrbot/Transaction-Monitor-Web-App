import React, { Component } from 'react';



let props;


class WeekGraphBar extends Component {

	constructor(props) {
		super(props);
		this.props = props;
	}

	formatDate(date){
		return date.substring(0,2)+"/"+date.substring(2,4)+"/"+date.substring(4,8);
	}

	formatDiff(val){
		return "$"+Math.abs(val);
	}
	render(){
		return ([

			<p>{this.formatDate(this.props.weekDay.date)} - {this.formatDiff(this.props.weekDay.diff)}</p>,
			<div 
				ref={x => this.node = x}
				id={'bar'+this.props.barId}
				className={"bar " + (this.props.weekDay.diff > 0 ? 'netGain' : 'netLoss')}>
			</div>

		])
	}

	componentDidMount() {

		//Add height property to trigger transition animation
		const self = this;
		window.setTimeout(function(){
			self.node.style.height = `${self.props.height}px`;			
		}, 100)

	}
}

export default WeekGraphBar;