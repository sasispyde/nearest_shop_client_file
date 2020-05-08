import React from 'react';
import validator from '../../validation/country/country_validation';
import axios from '../../axios';
import { Redirect } from 'react-router';

let id = "";

class EditCountry extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			country_name : "",
			country_image : null,
			image_name : 'Choose File...',
			image_preview : '',
			redirect : false,
			error : {
				country_name_error : "",
				country_image_error : ''
			}
		}
	}

	componentDidMount(){
		const urlParams = new URLSearchParams(window.location.search);
		id = urlParams.get('id');

		axios.get('/country/edit/'+id).then((result)=>{
			this.setState({
				country_name : result.data.data[0]['country_name'],
				image_preview : result.data.data[0]['image'],
				image_name : result.data.data[0]['image_name'],
			})
		}).catch((err)=>{
			console.log(err);
		})
	}

	handleSubmit(event){
		event.preventDefault();
		let data = [];
		data[0] = this.state.country_name;
		data[1] = this.state.country_image;
		let validation = validator.validate_edit_country_form(data);
		if (Object.keys(validation).length > 0) {
			this.setState({
				error : validation
			})
		} else {
			const formData = new FormData();
	        formData.append('myImage',this.state.country_image);
	        formData.append('name',this.state.country_name);
	        const config = {
	            headers: {
	                'content-type': 'multipart/form-data'
	            }
	        };
	        axios.patch('/country/edit/'+id,formData,config).then((response) => {
	                if(response.data.status === 0){
	                	let error = {
							country_name_error : response.data.data.message,
							country_image_error : ''
						}
	                	this.setState({
	                		error : error
	                	})
	                } else {
	                	this.setState({
	                		redirect : true
	                	})
	                }
	            }).catch((error) => {
	            	console.log(error);
	        });
		}
	}

	handleCountryName(event){
		this.setState({
			country_name : event.target.value
		})
	}

	handleImageChange(event){
		this.setState({
			country_image : event.target.files[0],
			image_name : event.target.files[0].name,
			image_preview : URL.createObjectURL(event.target.files[0])
		})
	}

	render(){
		if (this.state.redirect) {
	    	return <Redirect to='/country/manage_country' />;
	    }
		return(
			<>
			<div className="container">
				<form onSubmit={ this.handleSubmit.bind(this) }>
					<div style={{ marginTop : '30px' }} className=" form-group row">
						<label className="col-sm-2 col-form-label">Country Name</label>
						<div className="col-sm-6">
							<div className="input-group">
								<input
						            type="text"
						            onChange={this.handleCountryName.bind(this)}
						            value={this.state.country_name}
						            className ="form-control"
						        />
					        </div>
				        	<p style={{color:"red",margin : 'auto auto auto auto'}} >{this.state.error.country_name_error}</p>
				        </div>
				    </div>
				    <div className=" form-group row">
					    <label className="col-sm-2 col-form-label">Country Image</label>
					    <div className="col-sm-6">
					        <div className="custom-file input-group">
							    <input onChange={this.handleImageChange.bind(this)} type="file" accept="image/*" className="custom-file-input" />
							    <label className="custom-file-label" >{ this.state.image_name }</label>
							</div>
							<p style={{color:"red",margin : 'auto auto auto auto'}} >{this.state.error.country_image_error}</p>
						</div>
					</div>
					{
						this.state.image_preview !== "" && 
						<div className='text-center'>
							<img style={{ width : '200px', height : '200px' }} src = { this.state.image_preview } className="img-fluid img-thumbnail" alt="Preview File" />
						</div>
					}
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

export default EditCountry;