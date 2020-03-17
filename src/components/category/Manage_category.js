import React from 'react';
import axios from '../../axios';
import { Link } from "react-router-dom";

class ManageCategory extends React.Component{

	constructor(props) {
	    super(props);
	    this.state = {
	    	res : []
	    }
	}

	componentDidMount(){
		// axios.get('/category').then((result) => {
		// 	if(result.data.status !== 0){
		// 		this.setState({
		// 			res : result.data.data
		// 		});
		// 	} else {
		// 		console.log(result.data.data)
		// 	}
		// }).catch((err) => {
		// 	console.log(err);
		// })
	}

	deleteCategoryHandler( e , id ){
		let data = {
			delete_id : id
		}
		axios.post('/category/delete',data,{ headers: {'Accept': 'application/json'} }).then((result)=>{
			if(result.data.status !== 0){
				this.setState({
					res : result.data.data
				})
			}
		}).catch((err)=>{
			console.log(err);
		})
	}

	render() {
		return(
			<>
			<div className="container-fluid">
				<hr />
				<Link className="btn btn-outline-primary btn-sm" to={`/category/add_category`}>Add Category</Link>
				<hr/>
				<div className="table-responsive">
					<table className="table table-bordered table-hover" style = {{ textAlign : 'center' ,backgroundColor : '#E3F2FD' }}>
					  <thead>
					    <tr>
					      <th scope="col">S.No</th>
					      <th scope="col">Category Name</th>
					      <th scope="col">Subcategory</th>
					      <th scope="col">Status</th>
					      <th scope="col">Action</th>
					    </tr>
					  </thead>
					  <tbody>
					  { 
					    this.state.res.map((data,i) => 	
		                    <tr key={i}>
		                    	<td>{i+1}</td>
		                        <td>{data['category_name']}</td>
		                        <td>{data['sub_category'].join(",").substring(0,20)}</td>
		                        { data['status'] === "A" ? <td style={{ color : 'green' }}>Active</td> : <td style={{ color : 'red' }}>Blocked</td> }
		                        <td>
		                        <div className="btn-group" role="group" aria-label="Basic example">
		                        	<Link className="btn btn-outline-success btn-sm" to={`/category/edit/${data['_id']}`}>Edit</Link>&nbsp;
								  	<button type="button" className="btn btn-outline-info btn-sm">Block</button>&nbsp;
								  	<button type="button" onClick={((e) => this.deleteCategoryHandler(e, data['_id']))} className="btn btn-outline-danger btn-sm">Delete</button>
								</div>
		                        </td>
		                   	</tr>
						)
					  }
					  </tbody>
					</table>
				</div>
			</div>
			</>
		)
	}
}

export default ManageCategory;