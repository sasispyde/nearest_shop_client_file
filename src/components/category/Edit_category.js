import React from 'react';
import axios from '../../axios';
import { Redirect } from 'react-router';


let id = "";
class EditCategory extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data : [],
			cat_name : [""],
			sub_category_name: [],
			custom_interval_error  : '',
			redirect : false
		}
	}

	componentDidMount(){
		// const url = window.location.href;
		// id = url.split("/");
		// id = id[5];
		// axios.get(`/category/edit/${id}`).then((result)=>{
		// 	if(result.data.status){
		// 		this.setState({
		// 			cat_name : result.data.data[0]['category_name'],
		// 			sub_category_name : result.data.data[0]['sub_category']
		// 		})
		// 	} else {
		// 		console.log(result.data.data)
		// 	}
		// }).catch((err)=>{
		// 	console.log(err);
		// })
	}

	handleSubmit(event){
		event.preventDefault();
		let index_of_empty_string = this.state.sub_category_name.indexOf("");
		if(this.state.cat_name[0] !== "" && index_of_empty_string === -1){
			let data = {
				category_name : this.state.cat_name,
				sub_category : this.state.sub_category_name	
			}
			axios.patch(`/category/edit/${id}`,data , { headers: {'Accept': 'application/json'}}).then((result)=>{
				if(result.data.status === 1){
					this.setState({
						redirect : true
					})
				}
			}).catch((err)=>{
				console.log(err);
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
	    //let category_name = [...this.state.cat_name]
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