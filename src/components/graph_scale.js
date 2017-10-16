import React, { Component } from 'react';

class GraphScale extends Component {
	constructor(props){
		super(props);
	}

	render(){
		let maxVal=Math.ceil(this.props.maxVal)/0.75;
		let increment=(maxVal/10).toFixed(2);


		return(
			<div className="scale" style={{"marginBottom":Math.ceil(this.props.gridSize/2)-16/2+"px"}}>
				
				<p style={{"height": this.props.gridSize+"px"}}>${increment}</p>
				<p style={{"height": this.props.gridSize+"px"}}>${(increment*2).toFixed(2)}</p>
				<p style={{"height": this.props.gridSize+"px"}}>${(increment*3).toFixed(2)}</p>
				<p style={{"height": this.props.gridSize+"px"}}>${(increment*4).toFixed(2)}</p>
				<p style={{"height": this.props.gridSize+"px"}}>${(increment*5).toFixed(2)}</p>
				<p style={{"height": this.props.gridSize+"px"}}>${(increment*6).toFixed(2)}</p>
				<p style={{"height": this.props.gridSize+"px"}}>${(increment*7).toFixed(2)}</p>
				<p style={{"height": this.props.gridSize+"px"}}>${(increment*8).toFixed(2)}</p>
				<p style={{"height": this.props.gridSize+"px"}}>${(increment*9).toFixed(2)}</p>
				<p style={{"height": this.props.gridSize+"px"}}>${maxVal.toFixed(2)}</p>

			</div>
			
		)
	}
}

export default GraphScale