import React from 'react';

class editShop extends React.Component  {

	constructor(props){
		super(props);
		this.state = {
			id : ""	
		}
	}

	componentDidMount(){
		const urlParams = new URLSearchParams(window.location.search);
		const myParam = urlParams.get('id');
		this.setState({
			id : myParam
		})
	}

	handleSubmit(event) {
		event.preventDefault();
		
	}

	render() {
		return (
			<>
				<div className="container">
					<form onSubmit={this.handleSubmit.bind(this)}>
					</form>
				</div>
			</>
		)
	}
}

export default editShop;