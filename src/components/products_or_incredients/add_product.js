import React from 'react';
import axios from '../../axios';

class addProduct extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			response : [],
			sub_category_response : [],
			main_category_response : [],
			product_name : '',
			main_category : '',
			sub_category : '',
			main_category_1 : '',
			description : '',
			quantity : '',
			price : '',
			total_available_count  : '',
			disabled : "disabled",
			disabled_main_cat : 'disabled',
			current_date : '',
			expairy_date : '',
			image_name : 'Choose File...',
			image_preview : '',
			image_error : '',
			image_file : '',
			shop_id : ''
		}
	}

	handleImageChange(event){
		if( event.target.files !== undefined ){
			this.setState({
				image_file : event.target.files[0],
				image_name : event.target.files[0].name,
				image_preview : URL.createObjectURL(event.target.files[0])
			})
		}
	}

	componentDidMount(){
		axios.get('/category/get_category').then((response)=>{
			let date_ =  new Date();
			let month = date_.getMonth();
			let date = date_.getDate();
			
			month = month < 10 ? '0'+month : month; 
			date = date < 10 ? '0'+date : date; 

			date = date_.getFullYear()+'-'+month+'-'+date;
			if(response.data.data.length > 0){
				this.setState({
					current_date : date,
					response : response.data.data
				})
			}
		}).catch((err)=>{
			console.log(err);
		})
	}

	handleChange(event){
		if(event.target.name === 'main_category'){
			let value = event.target.value;
			if(event.target.value !== ''){
				axios.get('/category/sub_cat_name/'+event.target.value).then((response)=>{
					if(response.data.data[0]['sub_category'].length > 0){
						this.setState({
							disabled : "",
							sub_category_response : response.data.data[0]['sub_category'],
							main_category : value
						})
					}
				}).catch((err)=>{
					console.log(err);
				})
				
			} else {
				this.setState({
					disabled : "disabled",
					sub_category_response : [],
					main_category : ''
				})
			}
		} else if(event.target.name === 'main_category_1'){
			let value = event.target.value;
			if(event.target.value !== ''){
				axios.get('/category/main_category/'+event.target.value).then((response)=>{
					if(response.data.data.length > 0){
						this.setState({
							disabled_main_cat : "",
							main_category_response : response.data.data,
							main_category_1 : value
						})
					}
				}).catch((err)=>{
					console.log(err);
				})
			} else {
				this.setState({
					disabled_main_cat : "disabled",
					main_category_response : [],
					main_category_1 : '',
					disabled : "disabled",
					sub_category_response : [],
					main_category : ''
				})
			}
		} else {
			let name = event.target.name;
			this.setState({
				[name] : event.target.value
			})
		}
	}

	handleSubmit(event){
		event.preventDefault();
		const formData = new FormData();
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
		let data = {
			main_category :this.state.main_category,
			sub_category : this.state.sub_category,
			product_name : this.state.product_name,
			description : this.state.description,
			main_category_1 : this.state.main_category_1,
			total_available_count : this.state.total_available_count,
			expairy_date : new Date(this.state.expairy_date).toISOString()
		}

		formData.append('product_image',this.state.image_file);
        formData.append('data',JSON.stringify(data));

        axios.post('/product/add_product',formData,config).then((response) => {
        	console.log(response);
        }).catch((err) => {
        	console.log(err);
        })
	}

	render(){
		return(
			<>
			<form onSubmit={ this.handleSubmit.bind(this) } >
				<div style={{ marginTop : '30px' }} className='container'>
					<div className=" form-group row">
						<label className="col-sm-2 col-form-label">Shop Name</label>
						<div className="col-sm-6">
							<div className="input-group">
								<select onChange={ this.handleChange.bind(this) } title="Shop Name" name="shop_id" className="form-control">
								  	<option value=''>Select The Shop</option>
								  	{
										this.state.response.map((data,index)=>
											<option key={ index } value={data['_id']}>{data['category_name']}</option>
										)
									}
								</select>
					        </div>
				        </div>
				    </div>
					<div className=" form-group row">
						<label className="col-sm-2 col-form-label">Main Category</label>
						<div className="col-sm-6">
							<div className="input-group">
								<select onChange={ this.handleChange.bind(this) } title="Product Type" name="main_category_1"  className="form-control">
								  	<option value=''>Select the main category</option>
								  	{
										this.state.response.map((data,index)=>
											<option key={ index } value={data['category_name']}>{data['category_name']}</option>
										)
									}
								</select>
					        </div>
				        </div>
				    </div>
					<div className=" form-group row">
						<label className="col-sm-2 col-form-label">Product Type</label>
						<div className="col-sm-6">
							<div className="input-group">
								<select disabled = { this.state.disabled_main_cat } onChange={ this.handleChange.bind(this) } title="Product Type" name="main_category"  className="form-control">
								  	<option value=''>Select the main category</option>
								  	{
										this.state.main_category_response.map((data,index)=>
											<option key={ index } value={data['category_name']}>{data['category_name']}</option>
										)
									}
								</select>
					        </div>
				        </div>
				    </div>
				    <div className=" form-group row">
						<label className="col-sm-2 col-form-label">Product Sub Type</label>
						<div className="col-sm-6">
							<div className="input-group">
								<select disabled = { this.state.disabled } onChange={ this.handleChange.bind(this) } title="Product Type" name="sub_category"  className="form-control">
								  	<option value=''>Select the sub category</option>
								  	{
										this.state.sub_category_response.map((data,index)=>
											<option key={ index }  value={data}>{data}</option>
										)
									}
								</select>
					        </div>
				        </div>
				    </div>
				    <div className=" form-group row">
						<label className="col-sm-2 col-form-label">Product Name</label>
						<div className="col-sm-6">
							<div className="input-group">
								<input title="Product Name" type="text" name = 'product_name' className='form-control' onChange={this.handleChange.bind(this)}  value={this.state.product_name} placeholder="Product Name" />
					        </div>
				        </div>
				    </div>
				    <div className=" form-group row">
						<label className="col-sm-2 col-form-label">Totol Count</label>
						<div className="col-sm-6">
							<div className="input-group">
								<input title="Total Count" type="number" name='total_available_count' className='form-control' onChange={this.handleChange.bind(this)}  value={this.state.total_available_count} placeholder="Total available count" />
					        </div>
				        </div>
				    </div>
				    <div className=" form-group row">
						<label className="col-sm-2 col-form-label">Product Price</label>
						<div className="col-sm-6">
							<div className="input-group">
								<input title="Total Count" type="number" name='price' className='form-control' onChange={this.handleChange.bind(this)}  value={this.state.price} placeholder="Product Price" />
					        </div>
				        </div>
				    </div>
				    <div className=" form-group row">
						<label className="col-sm-2 col-form-label">Expairy Date</label>
						<div className="col-sm-6">
							<div className="input-group">
								<input type="date" className='form-control' name="expairy_date" onChange={this.handleChange.bind(this)} value={ this.state.expairy_date } min={this.state.current_date} />
					        </div>
				        </div>
				    </div>
				    <div className=" form-group row">
						<label className="col-sm-2 col-form-label">Product Description</label>
						<div className="col-sm-6">
							<div className="input-group">
								<textarea title="Product Description" className='form-control' name='description' onChange={this.handleChange.bind(this)} placeholder="Product Description"></textarea>
					        </div>
				        </div>
				    </div>
				    <div className=" form-group row">
					    <label className="col-sm-2 col-form-label">Product Image</label>
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
							<img style={{ width : '200px', height : '200px', margin : 'auto' }} src = { this.state.image_preview } className="img-fluid img-thumbnail" alt="Preview File" />
						</div>
					}
				    <div className="form-group row">
					    <div className="col-sm-6" style={{ margin:'auto' }}>
					      <input type="submit" className="btn btn-outline-primary" />
					    </div>
					</div>
				</div>
			</form>
			</>
		)
	}
}

export default addProduct;