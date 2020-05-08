import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from '../../axios';

const options = [
  { value: 'salt', label: 'Salt' },
  { value: 'chicken', label: 'Chicken' },
  { value: 'masala', label: 'Masala' },
];

class addRecipe extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			recipe_name : "",
			description : "",
			category : "",
			country : '',
			incredients : null,
			cooking_time : "",
			type : "",
			n_type : '',
			tips : [''],
			process: [""],
			precess_error:[""],
			timing : "",
			image_name : "Choose the file...",
			image_file : null,
			image_preview : '',
			video_links : [''],
			show_non_veg_field : false
		}
	}

	componentDidMount(){
		axios.get('/recipe/get_bacic_data').then((response)=>{
			console.log(response);
		}).catch((err)=>{
			console.log(err);
		})
	}

	handleChange(event){
		let name = event.target.name;
		if(name === 'type') {
			if(event.target.value === 'non_veg'){
				this.setState({
					show_non_veg_field : true,
					[name] : event.target.value
				})
			} else {
				this.setState({
					show_non_veg_field : false,
					[name] : event.target.value
				})
			}
		} else {
			this.setState({
				[name]  : event.target.value
			})
		}
	}

	handleSubmit(event){
		event.preventDefault();
		const formData = new FormData();
        formData.append('recipe_image',this.state.image_file);
        formData.append('data',JSON.stringify(this.state));
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post('/recipe/add_recipe',formData,config).then((response)=>{
        	console.log(response);
        }).catch((err)=>{
        	console.log(err)
        })
	}

	handleAddStep = e => {
	    e.preventDefault();
	    if(this.state.process.indexOf("") === -1){
		    let process_filed = this.state.process.concat([''])
		    let process_filed_error = this.state.precess_error.concat([''])
		    this.setState({
		      process : process_filed,
		      process_error : process_filed_error
		    })
	    }
	}	

	handleAddTip = e => {
	    e.preventDefault();
	    if(this.state.tips.indexOf("") === -1){
		    let tips_field = this.state.tips.concat([''])
		    this.setState({
		      tips : tips_field,
		    })
	    }
	}

	handleAddLink = e => {
	    e.preventDefault();
	    if(this.state.video_links.indexOf("") === -1){
		    let link_field = this.state.video_links.concat([''])
		    this.setState({
		      video_links : link_field,
		    })
	    }
	}

	handleDelete = i => e => {
	    e.preventDefault();
	    let process_filed = [
	      ...this.state.process.slice(0, i),
	      ...this.state.process.slice(i + 1)
	    ]
	   	let process_filed_error = [
	      ...this.state.precess_error.slice(0, i),
	      ...this.state.precess_error.slice(i + 1)
	    ]
	    this.setState({
		    process : process_filed,
		    process_error : process_filed_error
		})
	}	

	handleDeleteTip = i => e => {
	    e.preventDefault();
	    let tips_field = [
	      ...this.state.tips.slice(0, i),
	      ...this.state.tips.slice(i + 1)
	    ]
	    this.setState({
		    tips : tips_field,
		})
	}

	handleDeleteLink = i => e => {
	    e.preventDefault();
	    let link_field = [
	      ...this.state.video_links.slice(0, i),
	      ...this.state.video_links.slice(i + 1)
	    ]
	    this.setState({
		    video_links : link_field,
		})
	}

	handleProcess = i => e => {
	    let process_filed = [...this.state.process]
	    process_filed[i] = e.target.value
	    this.setState({
	      process : process_filed
	    })
	}	

	handleTips = i => e => {
	    let tips_field = [...this.state.tips]
	    tips_field[i] = e.target.value
	    this.setState({
	      tips : tips_field
	    })
	}

	handleLink = i => e => {
	    let link_field = [...this.state.video_links]
	    link_field[i] = e.target.value
	    this.setState({
	      video_links : link_field
	    })
	}

	handleIncedientschange = selectedOption => {
		this.setState({ 
    		incredients : selectedOption
    	})
  	};

  	handleImageChange(event){
  		if(event.target.files !== undefined){
			this.setState({
				image_file : event.target.files[0],
				image_name : event.target.files[0].name,
				image_preview : URL.createObjectURL(event.target.files[0])
			})
  		}
	}

	render(){
		return(
			<>
			<div className='container'>
				<form onSubmit={ this.handleSubmit.bind(this) } >
					<div style={{ marginTop : '30px' }} className=" form-group row">
						<label className="col-sm-2 col-form-label">Recipe Name</label>
						<div className="col-sm-6">
							<div className="input-group">
								<input title="Recipe Name" type="text" className='form-control' onChange={this.handleChange.bind(this)} name="recipe_name" value={this.state.recipe_name} placeholder="Recipe Name" />
					        </div>
				        </div>
				    </div>
				    <div className=" form-group row">
						<label className="col-sm-2 col-form-label">Recipe Type</label>
						<div className="col-sm-6">
							<div className="input-group">
								<select title="Country Name" name="type" onChange = { this.handleChange.bind(this) } className="form-control">
								  	<option value=''>Recipe Type</option>
								  	<option value="veg">Veg</option>
						            <option value="non_veg">Non_veg</option>
						            <option value="both">Both</option>
						            <option value="none">None</option>
								</select>
					        </div>
				        </div>
				    </div>
				    {
				    	this.state.show_non_veg_field && 
				    	<div className=" form-group row">
							<label className="col-sm-2 col-form-label">Non veg Type</label>
							<div className="col-sm-6">
								<div className="input-group">
									<select title="Country Name" name="n_type" onChange = { this.handleChange.bind(this) } className="form-control">
									  	<option value=''>Recipe Type</option>
									  	<option value="meat">Meat</option>
							            <option value="fish">Fish</option>
							            <option value="chicken">Chicken</option>
							            <option value="beaf">Beaf</option>
									</select>
						        </div>
					        </div>
				    	</div>
				    }
				    <div className=" form-group row">
						<label className="col-sm-2 col-form-label">Cousine Country</label>
						<div className="col-sm-6">
							<div className="input-group">
								<select title="Country Name" name="country" onChange = { this.handleChange.bind(this) } className="form-control">
								  	<option value=''>Country Origin</option>
								  	<option value="India">India</option>
						            <option value="Spine">Spine</option>
						            <option value="Mexcican">Mexcican</option>
						            <option value="Italian">Italian</option>
								</select>
					        </div>
				        </div>
				    </div>
				    <div className=" form-group row">
						<label className="col-sm-2 col-form-label">Recipe Type</label>
						<div className="col-sm-6">
							<div className="input-group">
								<select title="Recipe Category" name="category" onChange = { this.handleChange.bind(this) } className="form-control">
								  	<option value=''>Category</option>
								  	<option value="Briyani">Briyani</option>
						            <option value="Noodles">Noodles</option>
						            <option value="Rice">Rice</option>
						            <option value="Salad">Salad</option>
								</select>
					        </div>
				        </div>
				    </div>
				    <div className=" form-group row">
						<label className="col-sm-2 col-form-label">Better Time To Eat</label>
						<div className="col-sm-6">
							<div className="input-group">
								<select title="Recipe Category" name="timing" onChange = { this.handleChange.bind(this) } className="form-control">
								  	<option value=''>Time to Eat</option>
								  	<option value="breakfest">Breakfest</option>
						            <option value="lunch">Lunch</option>
						            <option value="dinner">Dinner</option>
						            <option value="all_time">All Time</option>
								</select>
					        </div>
				        </div>
				    </div>
				    <div className=" form-group row">
						<label className="col-sm-2 col-form-label">Recipe Incredients</label>
						<div className="col-sm-6">
							<Select
								className=""
						        value={this.state.incredients}
						        closeMenuOnSelect={false}
		      					components={makeAnimated()}
						        onChange={this.handleIncedientschange}
						        isMulti
						        options={options}
						      />
				        </div>
				    </div>
				    {this.state.process.map((process, index) => (
			          <div className=" form-group row" key={index}>
			          	<label className="col-sm-2 col-form-label">Process ( Step { index + 1 } )</label>
			            <div className="col-sm-6">
				            <div className="input-group">
					            <input
					              type="text"
					              title = "Recipe Process"
					              onChange={this.handleProcess(index)}
					              value={process}
					              className ="form-control"
					            />&nbsp;&nbsp;
				            	{ index === 0 ? <button style={{ fontSize : '18px' }} title="Add Process" className="btn btn-outline-success btn-sm" onClick={this.handleAddStep}>+</button> : <button title="Remove" className="btn btn-outline-danger btn-sm" onClick={this.handleDelete(index)}>X</button> }
				            </div>
			          		<p style={{color:"red",margin : 'auto auto auto auto'}} >{ this.state.precess_error[index] }</p>
			          	</div>
			          </div>
			        ))}
			        <div className=" form-group row">
						<label className="col-sm-2 col-form-label">Cooking Time</label>
						<div className="col-sm-6">
							<div className="input-group">
								<select title="Recipe Category" name="cooking_time" onChange = { this.handleChange.bind(this) } className="form-control">
								  	<option value="">How Long It Takes To Cook</option>
								  	<option value="0-15">0 - 15 Mins</option>
								  	<option value="15-30">15 - 30 Mins</option>
								  	<option value="30-45">30 - 45 Mins</option>
								  	<option value="45-60">45 mins - 1 Hour</option>
								  	<option value="60-above">1 - 2 Hour</option>
								  	<option value="120-above">2 - 3 Hour</option>
								  	<option value="180-above">3 - 4 Hour</option>
								</select>
					        </div>
				        </div>
				    </div>
				    <div className=" form-group row">
						<label className="col-sm-2 col-form-label">Recipe Description</label>
						<div className="col-sm-6">
							<div className="input-group">
								<textarea title="Recipe Description" className='form-control' name='description' onChange={this.handleChange.bind(this)} placeholder="References..."></textarea>
					        </div>
				        </div>
				    </div>
				    {this.state.tips.map((tip, index) => (
			          <div className=" form-group row" key={index}>
			          	<label className="col-sm-2 col-form-label">Tips ( Tip { index + 1 } )</label>
			            <div className="col-sm-6">
				            <div className="input-group">
					            <input
					              type="text"
					              title = "Recipe Tips"
					              onChange={this.handleTips(index)}
					              value={tip}
					              className ="form-control"
					            />&nbsp;&nbsp;
				            	{ index === 0 ? <button style={{ fontSize : '18px' }} title="Add Tips" className="btn btn-outline-success btn-sm" onClick={this.handleAddTip}>+</button> : <button title="Remove" className="btn btn-outline-danger btn-sm" onClick={this.handleDeleteTip(index)}>X</button> }
				            </div>
			          	</div>
			          </div>
			        ))}
			        {this.state.video_links.map((link, index) => (
			          <div className=" form-group row" key={index}>
			          	<label className="col-sm-2 col-form-label">Video Links ( Link { index + 1 } )</label>
			            <div className="col-sm-6">
				            <div className="input-group">
					            <input
					              type="text"
					              title = "Recipe Tips"
					              onChange={this.handleLink(index)}
					              value={link}
					              className ="form-control"
					            />&nbsp;&nbsp;
				            	{ index === 0 ? <button style={{ fontSize : '18px' }} title="Add Link" className="btn btn-outline-success btn-sm" onClick={this.handleAddLink}>+</button> : <button title="Remove" className="btn btn-outline-danger btn-sm" onClick={this.handleDeleteLink(index)}>X</button> }
				            </div>
			          	</div>
			          </div>
			        ))}
			        <div className=" form-group row">
					    <label className="col-sm-2 col-form-label">Country Image</label>
					    <div className="col-sm-6">
					        <div className="custom-file input-group">
							    <input onChange={this.handleImageChange.bind(this)} type="file" accept="image/*" className="custom-file-input" />
							    <label className="custom-file-label" >{ this.state.image_name }</label>
							</div>
						</div>
					</div>
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

export default addRecipe;