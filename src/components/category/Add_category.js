import React from 'react';
// import axios from '../../axios';
import { Redirect } from 'react-router';
import validator from '../../validation/category/category_validation';

class AddCategory extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			data : [],
			cat_name : [""],
			sub_category_name: [],
			sub_category_error: [],
			redirect : false
		}
	}

	componentDidMount(){
		
	}

	handleSubmit(event){
		event.preventDefault();
		let response = validator.validate_sub_array(this.state.sub_category_name);
		if(this.state.cat_name[0] !== "" && response.length === 0){
			let data = {
				category_name : this.state.cat_name,
				sub_category : this.state.sub_category_name	
			}
			console.log(data);
		} else {
			this.setState({
				sub_category_error : response
			})
		}
	}

	handleText = i => e => {
	    let sub_category_name = [...this.state.sub_category_name]
	    sub_category_name[i] = e.target.value
	    this.setState({
	      sub_category_name
	    })
	}

	handleCatName = i => e => {
	    let category_name = e.target.value
	    this.setState({
	      cat_name : category_name
	    })
	}

	handleDelete = i => e => {
	    e.preventDefault();
	    let sub_category_name = [
	      ...this.state.sub_category_name.slice(0, i),
	      ...this.state.sub_category_name.slice(i + 1)
	    ]
	   	let sub_category_error = [
	      ...this.state.sub_category_error.slice(0, i),
	      ...this.state.sub_category_error.slice(i + 1)
	    ]
	    this.setState({
	      sub_category_name,
	      sub_category_error
	    })
	}

	addQuestion = e => {
	    e.preventDefault();
	    if(this.state.sub_category_name.indexOf("") === -1){
		    let sub_category_name = this.state.sub_category_name.concat([''])
		    let sub_category_error = this.state.sub_category_error.concat([''])
		    this.setState({
		      sub_category_name,
		      sub_category_error
		    })
	    } else {
	    	this.setState({
	    		custom_interval_error : "Please Fill The Fileds To Add More"
	    	})
	    }
	}

	render(){
		if (this.state.redirect) {
	    	return <Redirect to='/category/manage_category' />;
	    }
		return(
			<>
			<div className="container">
				<form onSubmit={ this.handleSubmit.bind(this) }>
					<div style={{ marginTop : '30px' }} className=" form-group row">
						<label className="col-sm-2 col-form-label">Categoty Name</label>
						<div className="col-sm-6 input-group">
							<input
					            type="text"
					            onChange={this.handleCatName(0)}
					            value={this.state.cat_name}
					            className ="form-control"
					        />&nbsp;&nbsp;	
				        	<button style={{ fontSize : '18px' }} title="Add Category" className="btn btn-outline-success btn-sm" onClick={this.addQuestion}>+</button>
				        </div>
				    </div>
			        {this.state.sub_category_name.map((question, index) => (
			          <div className=" form-group row" key={index}>
			          	<label className="col-sm-2 col-form-label">Sub Categoty Name </label>
			            <div className="col-sm-6 input-group">
				            <input
				              type="text"
				              onChange={this.handleText(index)}
				              value={question}
				              className ="form-control"
				            />&nbsp;&nbsp;
			            	<button title="Remove" className="btn btn-outline-danger btn-sm" onClick={this.handleDelete(index)}>X</button>
			            </div>
			          	<p style={{color:"red",margin : 'auto auto auto 0px'}} >{ this.state.sub_category_error[index] }</p>
			          </div>
			        ))}
			        <br />
				    <div className="form-group row">
					    <div className="col-sm-6" style={{ margin:'auto' }}>
					      <input type="submit" className="btn btn-outline-primary" />
					    </div>
					</div>
			    </form>
		    </div>
			</>
		)
	}
}

export default AddCategory