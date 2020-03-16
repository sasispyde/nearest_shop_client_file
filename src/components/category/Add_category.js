import React from 'react';
// import axios from '../../axios';


class AddCategory extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {
			data : [],
			cat_name : [""],
			questions: []
		}
	}

	handleSubmit(event){
		event.preventDefault();
		let index_of_empty_string = this.state.questions.indexOf("");
		if(this.state.cat_name[0] !== "" && index_of_empty_string === -1){
			let data = {
				category_name : this.state.cat_name[0],
				sub_category_name : this.state.questions	
			}
			
		}
	}

	handleText = i => e => {
	    let questions = [...this.state.questions]
	    questions[i] = e.target.value
	    this.setState({
	      questions
	    })
	}

	handleCatName = i => e => {
	    let questions = [...this.state.cat_name]
	    questions[0] = e.target.value
	    this.setState({
	      cat_name : questions
	    })
	}

	handleDelete = i => e => {
	    e.preventDefault();
	    console.log("called");
	    let questions = [
	      ...this.state.questions.slice(0, i),
	      ...this.state.questions.slice(i + 1)
	    ]
	    this.setState({
	      questions
	    })
	}

	addQuestion = e => {
	    e.preventDefault()
	    let questions = this.state.questions.concat([''])
	    this.setState({
	      questions
	    })
	}

	render(){
		return(
			<>
			<div className="container">
				<hr/>
				<form onSubmit={ this.handleSubmit.bind(this) }>
					<div className=" form-group row">
						<label className="col-sm-2 col-form-label">Categoty Name</label>
						<div className="col-sm-6">
							<input
					            type="text"
					            onChange={this.handleCatName(0)}
					            value={this.state.cat_name[0]}
					            className ="form-control"
					        />	
				        	<button title="Add Category" className="btn btn-outline-success btn-sm" onClick={this.addQuestion}>Add Sub Category</button>
				        </div>
				    </div>
			        {this.state.questions.map((question, index) => (
			          <div className=" form-group row" key={index}>
			          	<label className="col-sm-2 col-form-label">Sub Categoty Name </label>
			            <div className="col-sm-6">
				            <input
				              type="text"
				              onChange={this.handleText(index)}
				              value={question}
				              className ="form-control"
				            />
			            	<button title="Remove" className="btn btn-outline-danger btn-sm" onClick={this.handleDelete(index)}>X</button>
			            </div>
			          </div>
			        ))}
			        <br />
				    <div className="form-group row">
					    <div className="col-sm-6" style={{ margin:'auto' }}>
					      <input type="submit" className="btn btn-primary" />
					    </div>
					</div>
			    </form>
		    </div>
			</>
		)
	}
}

export default AddCategory