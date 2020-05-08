import React from 'react';

class addShop extends React.Component  {

	constructor(props){
		super(props);
		this.state = {
			id : "",
			shop_name : ''	
		}
	}

	handleSubmit(event) {
		event.preventDefault();
	}

	handleChange(event){
		let name = event.target.name;
		this.state({
			[name] : event.target.value
		})
	}

	render() {
		return (
			<>
				<div className="container">
					<form onSubmit={this.handleSubmit.bind(this)}>
						<div style={{ marginTop : '30px' }} className=" form-group row">
							<label className="col-sm-2 col-form-label">Shop Name</label>
							<div className="col-sm-6">
								<div className="input-group">
									<input title="Shop Name" type="text" className='form-control' onChange={this.handleChange.bind(this)} name="shop_name" value={this.state.shop_name} placeholder="Shop Name" />
					        	</div>
				        	</div>
				    	</div>
				    	<div className=" form-group row" >
				    		<label className="col-sm-2 col-form-label">Shop Location</label>
				    		<div className="col-sm-6">
								<div style={{ backgroundColor : 'pink',height : '400px' }} className="input-group">
									
					        	</div>
				        	</div>
				    	</div>
					</form>
				</div>
			</>
		)
	}
}

export default addShop;