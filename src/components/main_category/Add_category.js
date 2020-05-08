import React from 'react';
import axios from '../../axios';
import { Redirect } from 'react-router';

class AddCategory extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			cat_name : "",
			name_error : '',
			country_image : null,
			image_name : 'Choose File...',
			image_preview : '',
			image_error : '',
			redirect : false
		}
	}

	handleSubmit(event){
		event.preventDefault();
		if(this.state.cat_name.trim() !== "" && this.state.country_image !== null){

			const formData = new FormData();

	        formData.append('categoryImage',this.state.country_image);
	        formData.append('name',this.state.cat_name);
			
			axios.post('/main_category/add_category',formData,{ headers: { 'content-type': 'multipart/form-data'} }).then((result)=>{
				if(result.data.status !== 0 && result.data.status !== 4){
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
			let image_error = '';
			if(this.state.cat_name.trim() === ''){
				name_error = 'Field must not be empty';
			}
			if(this.state.country_image === null){
				image_error = 'Field must not be empty';
			}
			this.setState({
				name_error : name_error,
				image_error : image_error
			})
		}
	}

	handleChange(event){
		let name = event.target.name;
		let value = event.target.value;
		this.setState({
			[name] : value
		})
	}

	handleImageChange(event){
		if( event.target.files !== undefined ){
			this.setState({
				country_image : event.target.files[0],
				image_name : event.target.files[0].name,
				image_preview : URL.createObjectURL(event.target.files[0])
			})
		}
	}

	render(){
		if (this.state.redirect) {
	    	return <Redirect to='/main_category/manage_category' />;
	    }
		return(
			<>
			<div className="container">
				<form onSubmit={ this.handleSubmit.bind(this) }>
					<div style={{ marginTop : '30px' }} className=" form-group row">
						<label className="col-sm-2 col-form-label">Main Category Name</label>
						<div className="col-sm-6">
							<div className="input-group">
								<input title="Recipe Name" type="text" className='form-control' onChange={this.handleChange.bind(this)} name="cat_name" value={this.state.cat_name} placeholder="Category Name" />
					        </div>
				        <p style={{color:"red",padding : '5px',margin : 'auto auto auto auto'}} >{this.state.name_error}</p>
				        </div>
				    </div>
				    <div className=" form-group row">
					    <label className="col-sm-2 col-form-label">Category Image</label>
					    <div className="col-sm-6">
					        <div className="custom-file input-group">
							    <input onChange={this.handleImageChange.bind(this)} type="file" accept="image/*" className="custom-file-input" />
							    <label className="custom-file-label" >{ this.state.image_name }</label>
							</div>
							<p style={{color:"red",margin : 'auto auto auto auto'}} >{this.state.image_error}</p>
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

export default AddCategory