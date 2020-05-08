import React from 'react';
import axios from '../../axios';
import { Redirect } from 'react-router';
import validator from '../../validation/category/category_validation';

let id = "";
class EditCategory extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data : [],
			cat_name : [""],
			sub_category_name: [],
			name_error : '',
			sub_category_error: [],
			redirect : false,
			main_category_array : [],
			main_category : '',
			main_category_error : '',
			main_category_value : '',
			main_category_label : 'Select Main Category' 
		}
	}

	componentDidMount(){
		// const url = window.location.href;
		// id = url.split("/");
		// id = id[5];

		const urlParams = new URLSearchParams(window.location.search);
		id = urlParams.get('id');
		
		axios.get(`/category/edit/${id}`).then((result)=>{
			if(result.data.status){
				let response = result.data.data['category_details'][0]
				this.setState({
					cat_name : response['category_name'],
					main_category : response['main_category_name'][0]['_id'],
					main_category_value : response['main_category_name'][0]['_id'],
					main_category_label : response['main_category_name'][0]['category_name'],
					sub_category_name : response['sub_category'],
					main_category_array : result.data.data['main_category']
				})
			} else {
				console.log(result.data.data)
			}
		}).catch((err)=>{
			console.log(err);
		})
	}

	handleSubmit(event){
		event.preventDefault();
		let response = validator.validate_sub_array(this.state.sub_category_name);
		if(this.state.cat_name !== "" && response.length === 0 && this.state.main_category !== ""){
			let data = {
				category_name : this.state.cat_name,
				sub_category : this.state.sub_category_name,
				main_category : this.state.main_category,
				id : id	
			}
			axios.patch(`/category/edit/${id}`,data , { headers: {'Accept': 'application/json'}}).then((result)=>{
				if(result.data.status === 1){
					this.setState({
						redirect : true
					})
				} else {
					if(result.data.status === 4){
						this.setState({
							name_error : result.data.data.message
						})
					}
				}
			}).catch((err)=>{
				console.log(err);
			})
		} else {
			let name_error = '';
			let main_category_error = '';
			if(this.state.cat_name === ''){
				name_error = 'Filed must not be empty';
			}
			if(this.state.main_category.trim() === ""){
				main_category_error = "Please select the main category"
			}
			this.setState({
				sub_category_error : response,
				name_error : name_error,
				main_category_error : main_category_error
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
	    this.setState({
	      sub_category_name
	    })
	}

	addQuestion = e => {
	    e.preventDefault();
	    if(this.state.sub_category_name.indexOf("") === -1){
		    let sub_category_name = this.state.sub_category_name.concat([''])
		    this.setState({
		      sub_category_name
		    })
	    } else {
	    	this.setState({
	    		custom_interval_error : "Please Fill The Fileds To Add More"
	    	})
	    }
	}

	handleChange(event){
		let name = event.target.name;
		if(name === 'main_category'){
			this.setState({
				[name] : event.target.value,
				main_category_value : '',
				main_category_label : 'Select Main Category'
			})
		} else {
			this.setState({
				[name] : event.target.value 
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
						<label className="col-sm-2 col-form-label">Main Category</label>
						<div className="col-sm-6">
							<div className="input-group">
								<select title="Recipe Category" name="main_category" onChange = { this.handleChange.bind(this) } className="form-control">
								  	<option value={this.state.main_category_value}>{this.state.main_category_label}</option>
								  	{
								  		this.state.main_category_array.map((data,index) =>
								  			data['category_name'] !== this.state.main_category_label &&
								  			<option key={ index } value={data['_id']}>{ data['category_name'] }</option>
								  		)
								  	}
								</select>
					        </div>
					        <p style={{color:"red",margin : 'auto auto auto auto'}} >{this.state.main_category_error}</p>
				        </div>
				    </div>
					<div className=" form-group row">
						<label className="col-sm-2 col-form-label">Categoty Name</label>
						<div className="col-sm-6">
						<div className="input-group">
							<input
					            type="text"
					            onChange={this.handleCatName(0)}
					            value={this.state.cat_name}
					            className ="form-control"
					        />&nbsp;&nbsp;
				        	<button style={{ fontSize : '18px' }} title="Add Category" className="btn btn-outline-success btn-sm" onClick={this.addQuestion}>+</button>
				        </div>
				        <p style={{color:"red",margin : 'auto auto auto auto'}} >{this.state.name_error}</p>
				    	</div>
				    </div>
			        {this.state.sub_category_name.map((question, index) => (
			          <div className=" form-group row" key={index}>
			          	<label className="col-sm-2 col-form-label">Sub Categoty Name </label>
			            <div className="col-sm-6">
			            <div className="input-group">
				            <input
				              type="text"
				              onChange={this.handleText(index)}
				              value={question}
				              className ="form-control"
				            />&nbsp;&nbsp;
			            	<button title="Remove" className="btn btn-outline-danger btn-sm" onClick={this.handleDelete(index)}>X</button>
			            </div>
			            <p style={{color:"red",margin : 'auto auto auto auto'}} >{ this.state.sub_category_error[index] }</p>
			          </div>
			          </div>
			        ))}
			        <br />
				    <div className="form-group row">
					    <div className="col-sm-6" style={{ margin:'auto' }}>
					      <input type="submit" className="btn btn-outline-primary " />
					    </div>
					</div>
			    </form>
		    </div>
			</>
		)
	}
}

export default EditCategory